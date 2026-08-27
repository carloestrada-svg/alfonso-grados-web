export const candidate = {
  firstName: "Alfonso",
  lastName: "Grados",
  fullName: "Alfonso Grados",
  office: "Alcalde de Yanahuara",
  district: "Yanahuara",
  region: "Arequipa",
  country: "Perú",
  tagline: "El Sol volverá a brillar en Yanahuara.",
  mission:
    "El Sol volverá a brillar en Yanahuara.",
  heroPitch:
    "Alfonso Grados, candidato a Alcalde de Yanahuara, Arequipa. Una gestión cercana, transparente y comprometida con el bienestar de todos los vecinos.",
  shortBio:
    "Alfonso Grados es candidato a Alcalde de Yanahuara, Arequipa, Perú. Su candidatura nace del compromiso con el desarrollo local, la transparencia y el bienestar de los vecinos de Yanahuara.",
  longBio: [
    "Alfonso Grados es un candidato comprometido con Yanahuara, un distrito de Arequipa que merece una gestión municipal cercana, honesta y orientada al bienestar de sus vecinos.",
    "Su propuesta se centra en recuperar la confianza de la comunidad a través de una administración transparente, obras concretas y un liderazgo al servicio de los yanahuarinos."
  ],
  contact: {
    email: "",
    phone: "",
    address: "Yanahuara, Arequipa, Perú"
  },
  socials: [] as Array<{ label: string; href: string }>,
  stats: [
    { value: "120K+", label: "Puertas visitadas" },
    { value: "58", label: "Zonas recorridas" },
    { value: "14,200", label: "Voluntarios" }
  ]
} as const;

export type Candidate = typeof candidate;
