export type NewsSection =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Propuestas" | "Alfonso te explica" | "Campaña" | "Actividades";
  author: string;
  readTime: string;
  coverVariant: 1 | 2 | 3;
  sections: NewsSection[];
  featured: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "cinco-prioridades-para-recuperar-yanahuara",
    title: "Cinco prioridades para recuperar Yanahuara",
    excerpt:
      "La campaña de Alfonso Grados identifica cinco áreas de trabajo urgente: patrimonio, seguridad, limpieza, espacio público y la recuperación de Magnopata. Cada una con problema claro, acción definida y seguimiento transparente.",
    date: "2026-08-27",
    category: "Propuestas",
    author: "Equipo de campaña de Alfonso Grados",
    readTime: "5 min",
    coverVariant: 1,
    featured: true,
    sections: [
      {
        type: "paragraph",
        text: "Yanahuara tiene una identidad única en Arequipa: su arquitectura de sillar, sus plazas, sus espacios de encuentro y la calidez de sus vecinos. Sin embargo, en los últimos años se han acumulado problemas que afectan la calidad de vida diaria. La propuesta de Alfonso Grados parte de reconocer esos problemas con honestidad y proponer acciones concretas, con coordinación clara, plazos realistas e indicadores que permitan a la ciudadanía hacer seguimiento."
      },
      {
        type: "heading",
        text: "1. Patrimonio e identidad"
      },
      {
        type: "paragraph",
        text: "La zona monumental de Yanahuara concentra un patrimonio arquitectónico y cultural que distingue al distrito. Las fachadas de sillar, las calles empedradas y el mirador forman parte de la identidad colectiva. El problema es que este patrimonio se deteriora progresivamente por falta de mantenimiento, contaminación visual, cableado aéreo y un comercio que no siempre respeta el entorno."
      },
      {
        type: "paragraph",
        text: "La acción propuesta incluye plantear coordinación con el Ministerio de Cultura y el Gobierno Regional de Arequipa para activar mecanismos de conservación, ordenar la publicidad en la zona monumental, promover gestiones con las empresas distribuidoras para el soterramiento progresivo del cableado, e implementar iluminación monumental y señalización turística que valore el entorno sin saturarlo."
      },
      {
        type: "heading",
        text: "2. Seguridad ciudadana"
      },
      {
        type: "paragraph",
        text: "La percepción de inseguridad ha crecido en distintas zonas del distrito. El serenazgo es el primer recurso con que cuenta la municipalidad, y su fortalecimiento es una prioridad. Esto implica mejorar la cobertura de rondas, coordinar con la Policía Nacional del Perú, mejorar la iluminación en zonas con mayor incidencia y fortalecer los mecanismos de comunicación entre vecinos, juntas vecinales y la municipalidad."
      },
      {
        type: "paragraph",
        text: "La municipalidad no puede resolver la seguridad de forma aislada, pero sí puede coordinar mejor los recursos existentes y ser más transparente sobre los avances. Los indicadores de seguimiento incluirán la cobertura de serenazgo por zona y la respuesta a reportes ciudadanos."
      },
      {
        type: "heading",
        text: "3. Limpieza y cuidado ambiental"
      },
      {
        type: "paragraph",
        text: "La limpieza pública es uno de los servicios que más impacta la percepción del distrito. Yanahuara debe tener calles limpias, puntos ecológicos bien ubicados y una gestión de residuos que involucre a los vecinos. La propuesta incluye revisar las rutas y frecuencias de recojo, fortalecer la separación en origen y mejorar el mantenimiento de áreas verdes."
      },
      {
        type: "heading",
        text: "4. Espacio público y ornato"
      },
      {
        type: "paragraph",
        text: "Las plazas, bermas, veredas y áreas verdes de Yanahuara son espacios de encuentro que merecen cuidado permanente. El ornato no es un lujo: es parte de la dignidad del distrito. La propuesta contempla un plan de mantenimiento continuo con responsables identificados, así como la participación de los vecinos en el cuidado de su entorno inmediato."
      },
      {
        type: "heading",
        text: "5. Recuperación de Magnopata"
      },
      {
        type: "paragraph",
        text: "Magnopata es el parque más extenso de Yanahuara y tiene un potencial enorme como espacio de recreación familiar. Sin embargo, su estado actual limita su uso pleno. La propuesta es recuperarlo de forma progresiva: evaluar la infraestructura existente, mejorar el acceso, habilitar zonas deportivas y de encuentro con criterios ambientales, y garantizar un mantenimiento permanente que asegure su uso ordenado, seguro y transparente."
      },
      {
        type: "heading",
        text: "Transparencia como principio"
      },
      {
        type: "paragraph",
        text: "Para cada una de estas cinco prioridades, la propuesta de Alfonso Grados plantea informar públicamente sobre el problema identificado, las acciones impulsadas, la coordinación con otras entidades y los avances alcanzados. Yanahuara merece una gestión que rinda cuentas."
      }
    ]
  },
  {
    slug: "magnopata-debe-volver-a-ser-de-las-familias",
    title: "Magnopata debe volver a ser de las familias",
    excerpt:
      "El parque más extenso de Yanahuara tiene el potencial de convertirse en un referente de recreación familiar. Alfonso explica cómo se propone recuperarlo con criterios ambientales, sociales y de transparencia.",
    date: "2026-08-27",
    category: "Alfonso te explica",
    author: "Equipo de campaña de Alfonso Grados",
    readTime: "4 min",
    coverVariant: 2,
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "Magnopata es el parque más extenso de Yanahuara. Tiene dimensiones que ningún otro espacio del distrito puede ofrecer: área verde, posibilidades de recreación y un entorno natural que, bien cuidado, puede ser un lugar de encuentro para familias, deportistas y vecinos de todas las edades. Sin embargo, su estado actual limita ese potencial."
      },
      {
        type: "heading",
        text: "Recuperación progresiva del acceso"
      },
      {
        type: "paragraph",
        text: "El primer paso es garantizar que los vecinos puedan acceder al parque de forma cómoda y segura. Eso implica evaluar el estado de los ingresos actuales, mejorar la iluminación en los accesos y establecer horarios de apertura claros. La recuperación no puede ser de un día para otro, pero sí puede comenzar con acciones concretas y visibles desde el inicio de la gestión."
      },
      {
        type: "heading",
        text: "Evaluación y mejora de infraestructura"
      },
      {
        type: "paragraph",
        text: "Antes de intervenir, es necesario conocer el estado real de la infraestructura existente. La municipalidad promoverá una evaluación técnica que identifique qué está en condiciones de uso, qué requiere mantenimiento y qué necesita reposición. A partir de esa evaluación se priorizarán las intervenciones, con recursos propios del municipio y coordinación con el Gobierno Regional y el Ministerio de Vivienda cuando corresponda."
      },
      {
        type: "heading",
        text: "Espacios de recreación familiar"
      },
      {
        type: "paragraph",
        text: "Magnopata debe tener zonas para que las familias puedan pasar tiempo juntas: áreas de juegos para niños, espacios sombreados para adultos mayores, senderos para caminata. El diseño de estas zonas debe consultar a los vecinos, porque son ellos quienes mejor conocen qué necesitan."
      },
      {
        type: "heading",
        text: "Zonas deportivas y de encuentro"
      },
      {
        type: "paragraph",
        text: "El parque también puede albergar infraestructura deportiva básica: canchas multiusos, áreas de ejercicio al aire libre, espacios para actividades grupales. El objetivo es que Magnopata sea un lugar activo, no un espacio subutilizado."
      },
      {
        type: "heading",
        text: "Criterios ambientales y sostenibilidad"
      },
      {
        type: "paragraph",
        text: "Cualquier intervención en Magnopata debe respetar y fortalecer su condición de espacio verde. La propuesta incluye criterios de sostenibilidad ambiental: preservar la cobertura vegetal existente, incorporar especies nativas adaptadas al clima de Arequipa, gestionar el riego de forma eficiente y evitar la impermeabilización innecesaria del suelo."
      },
      {
        type: "heading",
        text: "Mantenimiento permanente"
      },
      {
        type: "paragraph",
        text: "Uno de los problemas recurrentes en los parques municipales es que se inauguran con entusiasmo pero se deterioran por falta de mantenimiento continuo. La propuesta plantea desarrollar un plan de mantenimiento permanente con personal responsable y mecanismos de reporte ciudadano cuando algo se deteriora o requiere atención."
      },
      {
        type: "heading",
        text: "Uso ordenado, seguro y transparente"
      },
      {
        type: "paragraph",
        text: "El parque debe tener reglas de uso claras, conocidas por todos y aplicadas de forma consistente. Eso incluye el horario de cierre, las actividades permitidas y las restricciones necesarias para proteger el entorno. La seguridad en el interior del parque también es parte de la propuesta, con presencia de serenazgo en los horarios de mayor afluencia."
      },
      {
        type: "heading",
        text: "Transparencia e información pública"
      },
      {
        type: "list",
        items: [
          "Se propone publicar la evaluación técnica de infraestructura en una etapa temprana de la gestión.",
          "Se plantea informar el plan de intervención por zonas con criterios de priorización claros.",
          "Se informarán los avances de las obras y el mantenimiento de forma accesible para los vecinos.",
          "Se considera generar espacios de participación ciudadana para conocer la percepción sobre el parque.",
          "Se publicarán los criterios de uso y los mecanismos de reporte ciudadano."
        ]
      }
    ]
  },
  {
    slug: "como-protegeremos-la-zona-monumental",
    title: "Cómo protegeremos la zona monumental",
    excerpt:
      "La arquitectura de sillar, las plazas y el mirador de Yanahuara forman parte del patrimonio de Arequipa. Alfonso explica las acciones concretas para conservar ese legado sin afectar la vida cotidiana de los vecinos.",
    date: "2026-08-27",
    category: "Alfonso te explica",
    author: "Equipo de campaña de Alfonso Grados",
    readTime: "4 min",
    coverVariant: 3,
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "La zona monumental de Yanahuara es uno de los espacios más valiosos del distrito. Sus fachadas de sillar, sus calles, su mirador y su plaza forman parte de la identidad de Arequipa y son motivo de orgullo para quienes vivimos aquí. Proteger ese patrimonio no es solo una obligación legal: es una responsabilidad con las generaciones futuras y con los vecinos que hoy conviven con él."
      },
      {
        type: "heading",
        text: "Conservación de fachadas tradicionales de sillar"
      },
      {
        type: "paragraph",
        text: "Las fachadas de sillar son el elemento más visible del patrimonio arquitectónico de Yanahuara. Su conservación requiere coordinación entre la municipalidad, el Ministerio de Cultura y los propietarios de los inmuebles. La gestión de Alfonso Grados promoverá mecanismos de asesoría técnica para los vecinos que necesiten intervenir sus fachadas, con criterios claros de preservación y procedimientos ágiles para obtener las autorizaciones necesarias."
      },
      {
        type: "heading",
        text: "Ordenamiento de publicidad y reducción de contaminación visual"
      },
      {
        type: "paragraph",
        text: "La zona monumental sufre una presión creciente por parte de la publicidad comercial que no respeta el entorno histórico. Carteles, anuncios y elementos visuales que no guardan relación con la arquitectura del lugar degradan la experiencia del espacio. La municipalidad aplicará su reglamento de publicidad exterior con mayor rigor en la zona monumental y trabajará con los comerciantes para encontrar soluciones que permitan identificar sus negocios sin afectar el entorno."
      },
      {
        type: "heading",
        text: "Acciones progresivas frente al cableado aéreo"
      },
      {
        type: "paragraph",
        text: "El cableado aéreo es uno de los elementos que más impacta negativamente la percepción de la zona monumental. Su solución definitiva —el soterramiento— requiere coordinación con las empresas distribuidoras de electricidad y telecomunicaciones, así como financiamiento que supera la capacidad del municipio por sí solo. La propuesta es iniciar gestiones formales con las empresas y con el Gobierno Regional para avanzar en un plan de soterramiento progresivo, comenzando por las calles de mayor valor patrimonial."
      },
      {
        type: "heading",
        text: "Iluminación monumental"
      },
      {
        type: "paragraph",
        text: "Una buena iluminación nocturna valoriza el patrimonio arquitectónico y mejora la seguridad del espacio. La municipalidad promoverá la implementación de iluminación monumental en los elementos más representativos de la zona: la iglesia, el mirador y las calles principales. Esta iluminación debe ser técnicamente adecuada para resaltar el sillar sin producir contaminación lumínica."
      },
      {
        type: "heading",
        text: "Señalización turística"
      },
      {
        type: "paragraph",
        text: "Los visitantes que llegan a Yanahuara merecen encontrar señalización clara que los oriente en el recorrido patrimonial. La señalización debe ser discreta, coherente con el entorno y estar disponible en español, con posibilidad de incorporar información en otros idiomas en los puntos de mayor afluencia turística. Esto también beneficia a los vecinos, porque ordena el flujo de visitantes."
      },
      {
        type: "heading",
        text: "Ordenamiento del comercio, tránsito y estacionamientos"
      },
      {
        type: "paragraph",
        text: "La actividad comercial y el tránsito vehicular son dos de los principales factores que generan presión sobre la zona monumental. La propuesta incluye revisar la regulación del comercio ambulatorio en las inmediaciones del mirador y la plaza, mejorar el ordenamiento del tránsito en las calles patrimoniales y definir criterios claros para el uso de estacionamientos que no afecten la circulación peatonal ni el acceso a los inmuebles históricos."
      },
      {
        type: "heading",
        text: "Reducción de ruido"
      },
      {
        type: "paragraph",
        text: "El ruido excesivo en la zona monumental afecta tanto a los vecinos que residen allí como a la experiencia del lugar. La municipalidad aplicará las normas de control de ruido con mayor consistencia, especialmente en los horarios nocturnos y en eventos que se realicen en el entorno del mirador y la plaza."
      },
      {
        type: "heading",
        text: "Turismo responsable y respetuoso con los vecinos"
      },
      {
        type: "paragraph",
        text: "El turismo es una oportunidad para Yanahuara, pero debe gestionarse de forma que beneficie a los vecinos y no los perjudique. Eso implica regular los horarios y el volumen de visitas en los momentos de mayor concentración, coordinar con operadores turísticos para promover un comportamiento respetuoso en la zona y asegurar que los beneficios económicos del turismo se distribuyan de forma justa en el distrito."
      }
    ]
  }
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return newsArticles.find((a) => a.featured);
}
