import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { LegalSection } from "@/components/shared/LegalSection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    `Términos y condiciones de uso del sitio web oficial de la campaña de ${candidate.fullName}, candidato a ${candidate.office}.`
};

const heroMeta = [
  { label: "Sitio", value: `Campaña ${candidate.fullName}` },
  { label: "Cargo", value: candidate.office },
  { label: "Legislación", value: "Peruana" },
  { label: "Actualización", value: "Agosto 2026" }
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        index="00"
        title="Términos y condiciones."
        emphasis="condiciones"
        description="Condiciones de uso del sitio web oficial de la campaña de Alfonso Grados, candidato a Alcalde de Yanahuara."
        subtitle="Al navegar por este sitio, aceptas estas condiciones. Son breves y están escritas en lenguaje claro."
        meta={heroMeta}
      />

      <LegalSection
        index="01"
        label="Sobre este sitio"
        title="¿Qué es esta página?"
      >
        <p>
          Este es el sitio web informativo oficial de la campaña de{" "}
          <strong>{candidate.fullName}</strong>, candidato a{" "}
          <strong>{candidate.office}</strong>, {candidate.district},{" "}
          {candidate.region}, {candidate.country}.
        </p>
        <p>
          Este sitio <strong>no es</strong> una página de la Municipalidad
          Distrital de Yanahuara ni de ninguna otra entidad pública. Su
          único propósito es informar a la ciudadanía sobre la candidatura, las
          propuestas y las actividades de la campaña.
        </p>
      </LegalSection>

      <LegalSection
        index="02"
        label="Contenidos"
        title="Actualización de información."
        bg="cream"
      >
        <p>
          Los contenidos publicados en este sitio — propuestas, actividades,
          cronogramas y textos — son de carácter informativo y pueden actualizarse
          en cualquier momento conforme avance la campaña.
        </p>
        <p>
          La campaña procura mantener la información disponible y correcta, pero
          no garantiza disponibilidad ininterrumpida ni que todos los datos sean
          precisos en todo momento. Las redes sociales y WhatsApp son los canales
          más actualizados.
        </p>
      </LegalSection>

      <LegalSection
        index="03"
        label="Uso del sitio"
        title="Uso lícito y responsable."
      >
        <p>
          Puedes navegar libremente por este sitio con fines personales e
          informativos. Al hacerlo, te comprometes a utilizarlo de manera lícita y
          a no realizar ninguna de las siguientes acciones:
        </p>
        <ul className="flex list-none flex-col gap-2 pl-0">
          {[
            "Intentar interrumpir, dañar o alterar el funcionamiento del sitio.",
            "Suplantar la identidad del candidato, la campaña o sus colaboradores.",
            "Usar el sitio o sus contenidos para fines comerciales no autorizados.",
            "Acceder sin autorización a sistemas o información restringida."
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[0.7em] h-px w-4 shrink-0 bg-brand-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection
        index="04"
        label="Propiedad intelectual"
        title="Materiales de campaña."
        bg="cream"
      >
        <p>
          Los elementos de identidad visual, textos, fotografías, logotipos,
          videos y demás materiales publicados en este sitio pertenecen a la
          campaña o se usan con la autorización correspondiente.
        </p>
        <p>
          Puedes compartirlos con fines informativos y no comerciales, respetando
          la autoría y sin modificarlos de manera que pueda inducir a engaño o
          tergiversar el mensaje original. No está permitida su reutilización con
          fines distintos a los informativos sin autorización expresa.
        </p>
      </LegalSection>

      <LegalSection
        index="05"
        label="Servicios externos"
        title="WhatsApp y redes sociales."
      >
        <p>
          Este sitio contiene enlaces a WhatsApp, Facebook, Instagram y TikTok.
          Al acceder a cualquiera de estos servicios, el usuario sale de este
          sitio y queda sujeto a las condiciones de uso y políticas de privacidad
          de cada plataforma, que la campaña no controla.
        </p>
        <p>
          Los botones de WhatsApp abren una conversación con un mensaje
          precompletado. El usuario siempre puede modificar o cancelar el mensaje
          antes de enviarlo.
        </p>
      </LegalSection>

      <LegalSection
        index="06"
        label="Modificaciones"
        title="Actualizaciones de estos términos."
        bg="cream"
      >
        <p>
          La campaña puede actualizar estos términos cuando sea necesario. La
          fecha de la última revisión se indica en el encabezado de esta página.
          Continuar usando el sitio tras una actualización implica la aceptación
          de los nuevos términos.
        </p>
      </LegalSection>

      <LegalSection
        index="07"
        label="Legislación"
        title="Ley aplicable."
      >
        <p>
          Estos términos y condiciones se rigen por la legislación de la
          República del Perú. Cualquier controversia derivada del uso de este
          sitio se someterá a los tribunales competentes conforme a la
          normativa peruana vigente.
        </p>
        <p>
          Para cualquier consulta sobre estos términos, puedes comunicarte con
          la campaña a través de WhatsApp:{" "}
          <a
            href="https://wa.me/51991506516?text=Hola%2C%20quiero%20comunicarme%20con%20la%20campa%C3%B1a%20de%20Alfonso%20Grados."
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red underline-offset-4 hover:underline"
          >
            Escribir por WhatsApp
          </a>
          .
        </p>
      </LegalSection>
    </>
  );
}
