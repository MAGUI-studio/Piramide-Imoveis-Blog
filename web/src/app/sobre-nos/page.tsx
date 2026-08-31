import type { Metadata } from "next";
import { getBaseUrl } from "@/src/config/site";
import {
  HeroSection,
  AboutSection,
  LeadershipSection,
  UnitsSection,
  type ValueItem,
  type LeadershipMember,
  type UnitItem,
} from "@/src/components/sobre";

export const metadata: Metadata = {
  title: "Sobre a Pirâmide Imóveis | Tradição, Solidez e Inovação",
  description:
    "Conheça a história da Pirâmide Imóveis. Referência em lançamentos, imóveis de alto padrão e consultoria patrimonial em São José dos Campos, Vale do Paraíba e Litoral Norte.",
  alternates: {
    canonical: "/sobre-nos",
  },
  openGraph: {
    title: "Sobre a Pirâmide Imóveis | Tradição e Excelência",
    description:
      "Referência no mercado imobiliário do Vale do Paraíba e Litoral Norte. Conectamos você aos melhores lançamentos e imóveis de alto padrão.",
    url: "/sobre-nos",
    images: [
      {
        url: "/utils/piramide-imoveis-fachada.webp",
        width: 1200,
        height: 630,
        alt: "Sede da Pirâmide Imóveis - Jardim Esplanada",
      },
    ],
  },
};

export default function SobreNosPage() {
  const baseUrl = getBaseUrl();

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${baseUrl}/sobre-nos/#about`,
        name: "Sobre a Pirâmide Imóveis",
        description:
          "Transformando projetos de vida em patrimônio e realidade no Vale do Paraíba e Litoral Norte.",
        url: `${baseUrl}/sobre-nos`,
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${baseUrl}/#organization`,
        name: "Pirâmide Imóveis",
        url: baseUrl,
        logo: `${baseUrl}/logos/piramide/logo_color.svg`,
        foundingDate: "1982",
        description:
          "Referência no mercado imobiliário do Vale do Paraíba e Litoral Norte. Lançamentos, vendas, locação e consultoria patrimonial.",
        telephone: "+551232032400",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Avenida São João, 1301",
          addressLocality: "São José dos Campos",
          addressRegion: "SP",
          postalCode: "12242-840",
          addressCountry: "BR",
        },
        sameAs: [
          "https://www.instagram.com/piramideimoveis",
          "https://www.facebook.com/imobiliariapiramide",
          "https://www.youtube.com/@piramideimoveis9390",
          "https://www.linkedin.com/company/piramide-im%C3%B3veis-queops-ltda",
        ],
      },
    ],
  };

  const values: ValueItem[] = [
    {
      number: "01",
      title: "Compromisso com o cliente",
      icon: "ph:user-focus-bold",
    },
    {
      number: "02",
      title: "Ética e transparência",
      icon: "ph:scales-bold",
    },
    {
      number: "03",
      title: "Valorização das pessoas",
      icon: "ph:handshake-bold",
    },
    {
      number: "04",
      title: "Inovação com responsabilidade",
      icon: "ph:cpu-bold",
    },
    {
      number: "05",
      title: "Paixão pelo que fazemos",
      icon: "ph:fire-bold",
    },
  ];

  const leadership: LeadershipMember[] = [
    {
      name: "Rafael Marques",
      role: "Sócio-Proprietário",
      creci: "CRECI 83891F",
      image: "/utils/equipe/rafael-marques.webp",
    },
    {
      name: "Sueli Marques",
      role: "Sócia-Proprietária",
      creci: "CRECI 31082",
      image: "/utils/equipe/sueli-marques.webp",
    },
    {
      name: "Priscila Marques",
      role: "Diretora Comercial",
      creci: "CRECI 208415",
      image: "/utils/equipe/priscila-marques.webp",
    },
    {
      name: "Fernando César",
      role: "Diretor Comercial",
      creci: "CRECI 82550",
      image: "/utils/equipe/fernando-cesar.webp",
    },
  ];

  const units: UnitItem[] = [
    {
      name: "Unidade Jardim Esplanada",
      city: "São José dos Campos / SP",
      tag: "Sede Principal",
      image: "/utils/unidades/unidade-jardim-esplanada.webp",
      address: "Avenida São João, 1301 – Jardim Esplanada, 12242-840",
      phones: [
        { label: "(12) 99611-3126", href: "https://wa.me/5512996113126", isWhatsApp: true },
        { label: "(12) 3203-2400", href: "tel:+551232032400", isWhatsApp: false },
      ],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Piramide+Imoveis+Av+Sao+Joao+1301+Sao+Jose+dos+Campos",
      schedule: "Segunda a Sexta: 09h às 18h | Sábado: 09h às 13h",
    },
    {
      name: "Unidade Urbanova",
      city: "São José dos Campos / SP",
      image: "/utils/unidades/unidade-urbanova.webp",
      address: "Avenida Shishima Hifumi, 650 – Urbanova",
      phones: [
        { label: "(12) 99634-6627", href: "https://wa.me/5512996346627", isWhatsApp: true },
      ],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Piramide+Imoveis+Avenida+Shishima+Hifumi+650+Urbanova+SJC",
      schedule: "Segunda a Sexta: 09h às 18h | Sábado: 09h às 13h",
    },
    {
      name: "Unidade Litoral",
      city: "Caraguatatuba / SP",
      image: "/utils/unidades/unidade-caraguatatuba.webp",
      address: "Rua Presidente Washington Luiz, 17 – Centro",
      phones: [
        { label: "(12) 99634-6627", href: "https://wa.me/5512996346627", isWhatsApp: true },
        { label: "(12) 3882-2200", href: "tel:+551238822200", isWhatsApp: false },
      ],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Piramide+Imoveis+Rua+Presidente+Washington+Luiz+17+Caraguatatuba",
      schedule: "Segunda a Sexta: 09h às 18h | Sábado: 09h às 13h",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd),
        }}
      />

      <div className="w-full text-foreground transition-colors">
        
        <HeroSection />

        
        <AboutSection values={values} />

        
        <LeadershipSection members={leadership} />

        
        <UnitsSection units={units} />
      </div>
    </>
  );
}
