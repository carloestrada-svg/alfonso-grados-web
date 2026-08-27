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
    year: "2026",
    title: "Alcalde de Yanahuara",
    description:
      "Candidatura comprometida con el desarrollo, la seguridad y el bienestar de los vecinos de Yanahuara."
  }
];

export const values: { title: string; description: string }[] = [
  {
    title: "Cercanía",
    description:
      "Una gestión de puertas abiertas para escuchar y atender a cada vecino de Yanahuara."
  },
  {
    title: "Transparencia",
    description:
      "Cuentas claras y honestidad en cada acción por el bienestar de nuestro distrito."
  },
  {
    title: "Compromiso",
    description:
      "Trabajo constante y dedicación para que Yanahuara recupere su brillo y tranquilidad."
  },
  {
    title: "Vocación de servicio",
    description:
      "El Sol volverá a brillar en Yanahuara con un liderazgo al servicio de toda la comunidad."
  }
];
