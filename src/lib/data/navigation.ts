export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Conoce a Alfonso", href: "/about" },
  { label: "Agenda", href: "/events" },
  { label: "Súmate", href: "/volunteer" },
  { label: "Pregúntale a Alfonso", href: "/ask" },
  { label: "Contacto", href: "/contact" }
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Campaña",
    links: [
      { label: "Conoce a Alfonso", href: "/about" },
      { label: "Agenda", href: "/events" },
      { label: "Contacto", href: "/contact" }
    ]
  },
  {
    heading: "Participa",
    links: [
      { label: "Súmate", href: "/volunteer" },
      { label: "Pregúntale a Alfonso", href: "/ask" },
      { label: "Asistir a eventos", href: "/events" }
    ]
  }
];

export const timeline: { year: string; title: string; description: string }[] = [
  {
    year: "Yanahuara",
    title: "Vecino de toda la vida",
    description:
      "Nació, creció, estudió y ha desarrollado su vida en Yanahuara."
  },
  {
    year: "14 años",
    title: "Comunicación al servicio de Arequipa",
    description:
      "Fue conductor de noticias de Panamericana Televisión en Arequipa, en espacios como Buenos Días Perú y 24 Horas — Edición Central."
  },
  {
    year: "Gestión pública",
    title: "Experiencia en el sector público",
    description:
      "Se desempeñó como asesor, conociendo de cerca la gestión y los desafíos que enfrentan los ciudadanos."
  },
  {
    year: "2026",
    title: "Candidato a alcalde de Yanahuara",
    description:
      "Postula con el compromiso de poner su experiencia, preparación y vocación de servicio al trabajo por el distrito."
  }
];

export const values: { title: string; description: string }[] = [
  {
    title: "Integridad",
    description:
      "Actuar con honestidad, transparencia y coherencia en cada decisión."
  },
  {
    title: "Preparación",
    description:
      "Poner la experiencia profesional y el conocimiento de la gestión pública al servicio del distrito."
  },
  {
    title: "Responsabilidad",
    description:
      "Cumplir los compromisos, cuidar los recursos municipales y responder ante los vecinos."
  },
  {
    title: "Vocación de servicio",
    description:
      "Escuchar, atender y trabajar por el bienestar de todos los vecinos de Yanahuara."
  }
];
