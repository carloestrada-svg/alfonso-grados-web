import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { LegalSection } from "@/components/shared/LegalSection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad y protección de datos personales del sitio oficial de la campaña de Alfonso Grados.",
  alternates: {
    canonical: "/politica-de-privacidad"
  },
  openGraph: {
    title: "Política de privacidad · Alfonso Grados",
    description:
      "Política de privacidad y protección de datos personales del sitio oficial de la campaña de Alfonso Grados.",
    url: "/politica-de-privacidad",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Política de privacidad · Alfonso Grados",
    description:
      "Política de privacidad y protección de datos personales del sitio oficial de la campaña de Alfonso Grados.",
    images: ["/twitter-image.png"]
  }
};

const heroMeta = [
  { label: "Responsable", value: "Campaña Alfonso Grados – Alcalde de Yanahuara" },
  { label: "Cargo", value: candidate.office },
  { label: "Distrito", value: candidate.district },
  { label: "Actualización", value: "Agosto 2026" }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        index="00"
        title="Política de privacidad."
        emphasis="privacidad"
        description="Cómo la campaña gestiona la información personal de los ciudadanos que se comunican con nosotros — explicado en lenguaje claro."
        subtitle="No recopilamos formularios en este sitio. No vendemos datos personales. Esta política explica qué ocurre cuando decides contactarnos."
        meta={heroMeta}
      />

      <LegalSection index="01" label="Alcance" title="¿A quién aplica esta política?">
        <p>
          La presente política de privacidad aplica al sitio web oficial de la
          campaña <strong>Campaña {candidate.fullName} – {candidate.office}</strong> y
          describe cómo tratamos la información personal de los ciudadanos que
          interactúan voluntariamente con nosotros a través de WhatsApp o de las
          redes sociales de la campaña.
        </p>
        <p>
          La campaña actúa de conformidad con la{" "}
          <strong>Ley N.º 29733, Ley de Protección de Datos Personales</strong>,
          y su{" "}
          <strong>
            Reglamento aprobado por el Decreto Supremo N.º 016-2024-JUS
          </strong>
          .
        </p>
      </LegalSection>

      <LegalSection
        index="02"
        label="Qué recibimos"
        title="Este sitio no recibe ni almacena formularios."
        bg="cream"
      >
        <p>
          Las páginas de voluntariado, preguntas, contacto y novedades de este
          sitio web <strong>no solicitan ni almacenan datos mediante formularios</strong>.
        </p>
        <p>
          Al navegar por el sitio, los servicios de alojamiento web podrían generar
          registros técnicos estándar (como dirección IP, tipo de navegador, fecha y
          hora de acceso) necesarios exclusivamente para garantizar el funcionamiento,
          rendimiento y la seguridad del sitio. Estos registros no se utilizan para
          identificar políticamente a los visitantes ni para elaborar perfiles comerciales.
        </p>
        <p>
          Los botones de acción disponibles en las distintas secciones dirigen
          voluntariamente al usuario a <strong>WhatsApp</strong>, con un mensaje
          precompletado que el propio ciudadano puede revisar, modificar o cancelar
          antes de enviarlo. La decisión de iniciar la comunicación es siempre tuya.
        </p>
      </LegalSection>

      <LegalSection index="03" label="Servicios externos" title="WhatsApp y redes sociales.">
        <p>
          Al pulsar un botón de WhatsApp o al acceder a nuestras redes sociales
          (Facebook, Instagram, TikTok), el usuario abandona este sitio y accede
          a plataformas de terceros sujetas a sus propias políticas de privacidad
          y condiciones de uso, que la campaña no controla ni puede modificar.
        </p>
        <p>
          Te recomendamos revisar las políticas de privacidad de WhatsApp y de
          cada plataforma social antes de compartir información personal.
        </p>
      </LegalSection>

      <LegalSection
        index="04"
        label="Finalidades"
        title="Para qué usamos tu información."
        bg="cream"
      >
        <p>
          Cuando un ciudadano decide escribirnos por WhatsApp, la información
          compartida (nombre, número de teléfono y contenido del mensaje) se
          utiliza exclusivamente para:
        </p>
        <ul className="flex list-none flex-col gap-2 pl-0">
          {[
            "Responder consultas y preguntas sobre la campaña o el distrito.",
            "Coordinar la participación de voluntarios que lo soliciten.",
            "Compartir información sobre actividades y propuestas cuando el ciudadano lo pida."
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[0.7em] h-px w-4 shrink-0 bg-brand-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          La campaña <strong>no vende datos personales</strong> ni los comparte
          con terceros para fines comerciales o ajenos a los descritos
          anteriormente.
        </p>
      </LegalSection>

      <LegalSection index="05" label="Conservación" title="¿Cuánto tiempo guardamos tu información?">
        <p>
          La campaña conservará la información recibida voluntariamente por WhatsApp
          únicamente mientras sea necesaria para atender la comunicación solicitada
          o para cumplir obligaciones legales aplicables.
        </p>
        <p>
          Ten en cuenta que WhatsApp opera como un servicio externo e independiente,
          por lo que gestiona sus propios plazos, copias de seguridad y políticas
          de almacenamiento sobre las conversaciones mantenidas en su plataforma.
        </p>
      </LegalSection>

      <LegalSection
        index="06"
        label="Tus derechos"
        title="Derechos de los titulares."
        bg="cream"
      >
        <p>
          De conformidad con la Ley N.º 29733 y su Reglamento, tienes derecho a:
        </p>
        <ul className="flex list-none flex-col gap-2 pl-0">
          {[
            "Información: conocer si tratamos datos personales sobre ti.",
            "Acceso: obtener una copia de los datos que tengamos.",
            "Rectificación: corregir datos inexactos o incompletos.",
            "Cancelación: solicitar la eliminación de tus datos.",
            "Oposición: oponerte al tratamiento de tus datos en los casos que la ley lo permita."
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[0.7em] h-px w-4 shrink-0 bg-brand-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection index="07" label="Contacto" title="Consultas sobre privacidad.">
        <p>
          Para ejercer tus derechos o formular cualquier consulta relacionada con
          la protección de datos personales, escríbenos directamente por WhatsApp:
        </p>
        <p>
          <a
            href="https://wa.me/51991506516?text=Hola%2C%20tengo%20una%20consulta%20sobre%20privacidad%20y%20protecci%C3%B3n%20de%20datos."
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red underline-offset-4 hover:underline"
          >
            Consulta de privacidad por WhatsApp
          </a>
        </p>
        <p>
          Esta política puede actualizarse cuando sea necesario. La fecha de la
          última revisión se indica en el encabezado de esta página.
        </p>
      </LegalSection>
    </>
  );
}
