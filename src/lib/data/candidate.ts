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
    "Alfonso Grados es abogado y comunicador, vecino de Yanahuara de toda la vida y candidato a alcalde del distrito. Su trayectoria combina comunicación, experiencia en gestión pública y vocación de servicio.",
  longBio: [
    "Alfonso Grados tiene 44 años. Es abogado, comunicador y vecino de Yanahuara de toda la vida. Nació, creció, estudió y ha desarrollado su vida en el distrito que hoy busca servir como alcalde.",
    "Estudió en el Colegio Internacional Peruano Británico. Durante 14 años fue conductor de noticias de Panamericana Televisión en Arequipa, participando en espacios como Buenos Días Perú y 24 Horas — Edición Central.",
    "También cuenta con experiencia como asesor en el sector público, una trayectoria que le permitió conocer de cerca la gestión y los desafíos que enfrentan los ciudadanos.",
    "Su candidatura nace del compromiso de poner esa experiencia, preparación y vocación de servicio al trabajo por Yanahuara."
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
