import { createClient } from "@sanity/client";
import { newsArticles, type NewsSection } from "../src/lib/data/news";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Error: Faltan variables requeridas de Sanity (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET o SANITY_API_WRITE_TOKEN)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-03-01",
  useCdn: false,
});

// ─── Conversión de secciones a bloques Portable Text ───────────────────────────
type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: "normal" | "h2";
  listItem?: "bullet";
  level?: number;
  markDefs: unknown[];
  children: {
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
  }[];
};

function convertSectionsToPortableText(sections: NewsSection[]): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];

  sections.forEach((section, secIdx) => {
    if (section.type === "paragraph") {
      blocks.push({
        _key: `b-${secIdx}`,
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: `s-${secIdx}-0`,
            _type: "span",
            marks: [],
            text: section.text,
          },
        ],
      });
    } else if (section.type === "heading") {
      blocks.push({
        _key: `b-${secIdx}`,
        _type: "block",
        style: "h2",
        markDefs: [],
        children: [
          {
            _key: `s-${secIdx}-0`,
            _type: "span",
            marks: [],
            text: section.text,
          },
        ],
      });
    } else if (section.type === "list") {
      section.items.forEach((itemText, itemIdx) => {
        blocks.push({
          _key: `b-${secIdx}-${itemIdx}`,
          _type: "block",
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [
            {
              _key: `s-${secIdx}-${itemIdx}-0`,
              _type: "span",
              marks: [],
              text: itemText,
            },
          ],
        });
      });
    }
  });

  return blocks;
}

// ─── Ejecución de migración / validación idempotente ───────────────────────────
async function run() {
  console.log("==> Consultando documentos 'noticia' en Sanity...");

  const existingDocs = await client.fetch<
    {
      _id: string;
      title: string;
      slug?: string;
      category?: string;
      featured?: boolean;
      bodyBlockCount?: number;
    }[]
  >(
    '*[_type == "noticia"] | order(date desc) { _id, title, "slug": slug.current, category, featured, "bodyBlockCount": count(body) }'
  );

  const expectedSlugs = newsArticles.map((a) => a.slug);
  const expectedIds = expectedSlugs.map((s) => `noticia-${s}`);

  console.log(`==> Documentos 'noticia' existentes en dataset: ${existingDocs.length}`);

  // Caso 1: Existen exactamente los 3 IDs esperados
  const hasAllExpected =
    existingDocs.length === expectedIds.length &&
    expectedIds.every((id) => existingDocs.some((d) => d._id === id));

  if (hasAllExpected) {
    console.log("==> Verificando integridad de los 3 documentos existentes...");

    let validationErrors = 0;

    const featuredCount = existingDocs.filter((d) => d.featured).length;
    if (featuredCount !== 1) {
      console.error(
        `ERROR: Se esperaba exactamente 1 noticia destacada, se encontraron ${featuredCount}`
      );
      validationErrors++;
    }

    for (const doc of existingDocs) {
      if (!expectedSlugs.includes(doc.slug ?? "")) {
        console.error(`ERROR: Slug inesperado '${doc.slug}' en ID '${doc._id}'`);
        validationErrors++;
      }
      if (!doc.bodyBlockCount || doc.bodyBlockCount <= 0) {
        console.error(`ERROR: El documento '${doc._id}' no tiene bloques en body`);
        validationErrors++;
      }
      console.log(
        ` ✓ [OK] ID: ${doc._id} | Slug: ${doc.slug} | Cat: ${doc.category} | Destacada: ${doc.featured} | Bloques: ${doc.bodyBlockCount} | Título: "${doc.title}"`
      );
    }

    if (validationErrors > 0) {
      console.error(
        `DETENCIÓN: Se detectaron ${validationErrors} errores de validación en los documentos existentes.`
      );
      process.exit(1);
    }

    console.log("==> migración ya realizada, validación correcta, cero escrituras.");
    return;
  }

  // Caso 2: Dataset limpio (0 documentos) -> Proceder con la migración
  if (existingDocs.length === 0) {
    console.log(
      `==> Dataset limpio. Preparando transacción atómica para migrar ${newsArticles.length} noticias...`
    );

    const transaction = client.transaction();

    for (const article of newsArticles) {
      const docId = `noticia-${article.slug}`;
      const portableText = convertSectionsToPortableText(article.sections);
      const isoDate = `${article.date}T12:00:00.000Z`;

      const sanityDoc = {
        _id: docId,
        _type: "noticia",
        title: article.title,
        slug: {
          _type: "slug",
          current: article.slug,
        },
        excerpt: article.excerpt,
        date: isoDate,
        category: article.category,
        author: article.author,
        readTime: article.readTime,
        coverVariant: article.coverVariant,
        featured: article.featured,
        body: portableText,
      };

      transaction.createOrReplace(sanityDoc);
    }

    console.log("==> Ejecutando transacción atómica en Sanity...");
    await transaction.commit();
    console.log("==> Transacción confirmada exitosamente.");

    console.log("==> Verificando dataset post-migración...");
    const postDocs = await client.fetch<
      {
        _id: string;
        title: string;
        slug: string;
        category: string;
        featured: boolean;
        bodyBlockCount: number;
      }[]
    >(
      '*[_type == "noticia"] | order(date desc) { _id, title, "slug": slug.current, category, featured, "bodyBlockCount": count(body) }'
    );

    for (const doc of postDocs) {
      console.log(
        ` ✓ [OK] ID: ${doc._id} | Slug: ${doc.slug} | Cat: ${doc.category} | Destacada: ${doc.featured} | Bloques: ${doc.bodyBlockCount} | Título: "${doc.title}"`
      );
    }

    console.log("==> Migración completada y validada con éxito.");
    return;
  }

  // Caso 3: Estado parcial o con documentos inesperados -> Detener sin modificar nada
  console.error(
    "DETENCIÓN: Inconsistencia en el dataset. No contiene 0 documentos ni exactamente los 3 documentos esperados."
  );
  console.error("Documentos encontrados actualmente en Sanity:");
  existingDocs.forEach((d) => {
    console.error(` - ID: ${d._id} | Título: ${d.title} | Slug: ${d.slug ?? "N/A"}`);
  });
  console.error("No se sobrescribió ni eliminó ningún documento.");
  process.exit(1);
}

run().catch((err) => {
  console.error("Error durante la ejecución de la migración:", err.message);
  process.exit(1);
});
