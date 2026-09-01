import type { Metadata } from "next";
import {
  InfiniteMarquee,
  TeamHeroSection,
  TeamGridFilter,
  type TeamMember,
} from "@/src/components/sobre";

export const metadata: Metadata = {
  title: "Nosso Time de Corretores & Consultores | Pirâmide Imóveis",
  description:
    "Conheça a equipe de corretores credenciados e consultores imobiliários da Pirâmide Imóveis em São José dos Campos e no Litoral Norte.",
  alternates: {
    canonical: "/sobre-nos/nosso-time",
  },
  openGraph: {
    title: "Nosso Time de Especialistas | Pirâmide Imóveis",
    description:
      "Corretores credenciados e consultores especializados em lançamentos, loteamentos e alto padrão.",
    url: "/sobre-nos/nosso-time",
  },
};


export default function NossoTimePage() {

  
  const leadership: TeamMember[] = [
    {
      name: "Rafael Marques",
      role: "Sócio-Proprietário",
      creci: "CRECI 83891F",
      image: "/utils/equipe/rafael-marques.webp",
      email: "rafael@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98158-4103", url: "https://api.whatsapp.com/send?phone=5512981584103" },
        { label: "(12) 98100-5673", url: "https://api.whatsapp.com/send?phone=5512981005673" },
      ],
    },
    {
      name: "Sueli Marques",
      role: "Sócia-Proprietária",
      creci: "CRECI 31082",
      image: "/utils/equipe/sueli-marques.webp",
      email: "sueliadv@uol.com.br",
      whatsapps: [
        { label: "(12) 98158-4105", url: "https://api.whatsapp.com/send?phone=5512981584105" },
      ],
    },
    {
      name: "Priscila Marques",
      role: "Diretora Comercial",
      creci: "CRECI 208415",
      image: "/utils/equipe/priscila-marques.webp",
      email: "priscila@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98147-6169", url: "https://api.whatsapp.com/send?phone=5512981476169" },
      ],
    },
    {
      name: "Fernando César",
      role: "Diretor Comercial",
      creci: "CRECI 82550",
      image: "/utils/equipe/fernando-cesar.webp",
      email: "fernando@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99722-1641", url: "https://api.whatsapp.com/send?phone=5512997221641" },
      ],
    },
  ];

  
  const brokers: TeamMember[] = [
    {
      name: "Amanda Souza",
      role: "Corretora",
      image: "/utils/equipe/amanda-souza.webp",
      email: "amanda@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98188-1219", url: "https://api.whatsapp.com/send?phone=5512981881219" },
      ],
    },
    {
      name: "Ana Cristina Magalhães",
      role: "Corretora",
      creci: "CRECI 269644",
      image: "/utils/equipe/ana-cristima-magalhaes.webp",
      email: "anacristina@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98262-1330", url: "https://api.whatsapp.com/send?phone=5512982621330" },
      ],
    },
    {
      name: "André Luiz Martins",
      role: "Corretor",
      creci: "CRECI 297473",
      image: "/utils/equipe/andre-luiz-martins.webp",
      email: "andre@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99713-5651", url: "https://api.whatsapp.com/send?phone=5512997135651" },
      ],
    },
    {
      name: "André Massa",
      role: "Corretor",
      image: "/utils/placeholder.svg",
      whatsapps: [
        { label: "(12) 99630-4381", url: "https://api.whatsapp.com/send?phone=5512996304381" },
      ],
    },
    {
      name: "Andrea Ribeiro",
      role: "Corretora",
      creci: "CRECI 71744",
      image: "/utils/equipe/andrea-ribeiro.webp",
      email: "andrea@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99132-613", url: "https://api.whatsapp.com/send?phone=551299132613" },
      ],
    },
    {
      name: "Angélica de Medeiros",
      role: "Corretora",
      creci: "CRECI 146638",
      image: "/utils/equipe/angelica-de-medeiros.webp",
      email: "angelica@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99230-7980", url: "https://api.whatsapp.com/send?phone=5512992307980" },
      ],
    },
    {
      name: "Ari Ribeiro",
      role: "Corretor",
      creci: "CRECI 294357",
      image: "/utils/equipe/ari-ribeiro.webp",
      whatsapps: [
        { label: "(12) 99126-4566", url: "https://api.whatsapp.com/send?phone=5512991264566" },
      ],
      instagram: "https://www.instagram.com/ari.imoveis",
    },
    {
      name: "Armando Siqueira",
      role: "Corretor",
      creci: "CRECI 185146",
      image: "/utils/equipe/armando-siqueira.webp",
      email: "armando@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99714-6290", url: "https://api.whatsapp.com/send?phone=5512997146290" },
      ],
    },
    {
      name: "Carlos Marks",
      role: "Corretor",
      creci: "CRECI 253146",
      image: "/utils/equipe/carlos-marks.webp",
      email: "luiscarlos@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99129-5108", url: "https://api.whatsapp.com/send?phone=5512991295108" },
      ],
    },
    {
      name: "Carlos Santos",
      role: "Corretor",
      creci: "CRECI 202965",
      image: "/utils/equipe/carlos-santos.webp",
      email: "carlos@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99763-3300", url: "https://api.whatsapp.com/send?phone=5512997633300" },
      ],
    },
    {
      name: "Cesar Santos",
      role: "Corretor",
      creci: "CRECI 226627",
      image: "/utils/equipe/cesar-santos.webp",
      email: "cesar@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98891-5158", url: "https://api.whatsapp.com/send?phone=5512988915158" },
      ],
    },
    {
      name: "Claudemir Valério",
      role: "Corretor",
      creci: "CRECI 138965",
      image: "/utils/equipe/claudemir-valerio.webp",
      email: "claudemir@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98200-2933", url: "https://api.whatsapp.com/send?phone=5512982002933" },
      ],
    },
    {
      name: "Dayse Gonçalves",
      role: "Corretora",
      creci: "CRECI 146663",
      image: "/utils/equipe/dayse-goncalves.webp",
      email: "dayse@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99715-4313", url: "https://api.whatsapp.com/send?phone=5512997154313" },
      ],
    },
    {
      name: "Diego Motta",
      role: "Corretor",
      creci: "CRECI 290367",
      image: "/utils/equipe/diego-motta.webp",
      email: "diegomotta@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99636-4255", url: "https://api.whatsapp.com/send?phone=5512996364255" },
      ],
    },
    {
      name: "Dulce Pinho",
      role: "Corretora",
      creci: "CRECI 275.311",
      image: "/utils/equipe/dulce-pinho.webp",
      email: "dulce@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98161-8767", url: "https://api.whatsapp.com/send?phone=5512981618767" },
      ],
    },
    {
      name: "Edimilson Muniz",
      role: "Corretor",
      creci: "CRECI 303286F",
      image: "/utils/equipe/edimilson-muniz.webp",
      email: "edimilson@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99125-1332", url: "https://api.whatsapp.com/send?phone=5512991251332" },
      ],
    },
    {
      name: "Edson Oreste de Souza",
      role: "Corretor",
      creci: "CRECI 137227",
      image: "/utils/equipe/edson-oreste-de-souza.webp",
      email: "edy@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98889-3516", url: "https://api.whatsapp.com/send?phone=5512988893516" },
      ],
    },
    {
      name: "Eduardo Oliveira",
      role: "Corretor",
      creci: "CRECI 205.317",
      image: "/utils/equipe/eduardo-oliveira.webp",
      email: "eduardo@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98866-3020", url: "https://api.whatsapp.com/send?phone=5512988663020" },
      ],
    },
    {
      name: "Elisabeth Myslinsky",
      role: "Corretora",
      creci: "CRECI 227792",
      image: "/utils/equipe/elisabeth-myslinsky.webp",
      email: "elisabeth@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98844-5138", url: "https://api.whatsapp.com/send?phone=5512988445138" },
      ],
    },
    {
      name: "Erfan Rahmani",
      role: "Corretor",
      image: "/utils/equipe/erfan-rahmani.webp",
      email: "erfan@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99732-6644", url: "https://api.whatsapp.com/send?phone=5512997326644" },
      ],
    },
    {
      name: "Eva Figueiredo",
      role: "Corretora",
      creci: "CRECI 83352",
      image: "/utils/equipe/eva-figueiredo.webp",
      email: "eva@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99103-3102", url: "https://api.whatsapp.com/send?phone=5512991033102" },
      ],
    },
    {
      name: "Fabiana Gimenez",
      role: "Corretora",
      creci: "CRECI 203522",
      image: "/utils/equipe/fabiana-gimenez.webp",
      email: "fabiana@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(11) 98175-6763", url: "https://api.whatsapp.com/send?phone=5511981756763" },
      ],
    },
    {
      name: "Fernando Abrahao",
      role: "Corretor",
      creci: "CRECI 328747",
      image: "/utils/placeholder.svg",
      email: "fernandoabrahao@piramideimoveissj.com.br",
      whatsapps: [
        { label: "(11) 98711-9888", url: "https://api.whatsapp.com/send?phone=551198711988" },
      ],
    },
    {
      name: "Flávio Alves",
      role: "Corretor",
      creci: "CRECI 258442",
      image: "/utils/equipe/flavio-alves.webp",
      email: "flavio@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98172-426", url: "https://api.whatsapp.com/send?phone=551298172426" },
      ],
    },
    {
      name: "Gabriel Barros",
      role: "Corretor",
      creci: "CRECI 76994",
      image: "/utils/equipe/gabriel-barros.webp",
      email: "gabriel@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(53) 99957-9956", url: "https://api.whatsapp.com/send?phone=5553999579956" },
      ],
      instagram: "https://www.instagram.com/corretorgabrielbarros97",
    },
    {
      name: "Gilson Aparecido de Oliveira",
      role: "Corretor",
      image: "/utils/equipe/gilson-aparecido-de-oliveira.webp",
      email: "gilson@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99104-2999", url: "https://api.whatsapp.com/send?phone=5512991042999" },
      ],
    },
    {
      name: "Glaucia Ohira",
      role: "Corretora",
      creci: "CRECI 197545",
      image: "/utils/equipe/glaucia-ohira.webp",
      email: "glaucia@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99128-6211", url: "https://api.whatsapp.com/send?phone=5512991286211" },
      ],
    },
    {
      name: "Guilherme Munhoz Lopes",
      role: "Corretor",
      creci: "CRECI 331233",
      image: "/utils/equipe/guilherme-munhoz-lopes.webp",
      email: "guilherme@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98858-6833", url: "https://api.whatsapp.com/send?phone=5512988586833" },
      ],
      instagram: "https://www.instagram.com/guilherme.imoveis.sjc",
    },
    {
      name: "Henrique Gomes",
      role: "Corretor",
      image: "/utils/placeholder.svg",
      whatsapps: [
        { label: "(12) 99729-3831", url: "https://api.whatsapp.com/send?phone=5512997293831" },
      ],
    },
    {
      name: "Hugo Noda",
      role: "Corretor",
      creci: "CRECI 300628",
      image: "/utils/equipe/hugo-noda.webp",
      email: "hugo@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 97406-5221", url: "https://api.whatsapp.com/send?phone=5512974065221" },
      ],
    },
    {
      name: "Jose Luiz",
      role: "Corretor",
      creci: "CRECI 206522",
      image: "/utils/equipe/jose-luiz.webp",
      email: "joseluiz@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99709-6843", url: "https://api.whatsapp.com/send?phone=5512997096843" },
      ],
      instagram: "https://www.instagram.com/jlr.juniorcorretor/",
    },
    {
      name: "José Roberto",
      role: "Corretor",
      creci: "CRECI 171086",
      image: "/utils/equipe/jose-roberto.webp",
      email: "joseroberto@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99217-4476", url: "https://api.whatsapp.com/send?phone=5512992174476" },
      ],
    },
    {
      name: "Laiza Molas",
      role: "Corretora",
      creci: "CRECI 199.959",
      image: "/utils/equipe/laiza-molas.webp",
      whatsapps: [
        { label: "(12) 97814-1774", url: "https://api.whatsapp.com/send?phone=5512978141774" },
      ],
    },
    {
      name: "Léiah Matos",
      role: "Corretora",
      creci: "CRECI 286328",
      image: "/utils/equipe/leiah-matos.webp",
      email: "leiah.matos@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98886-1928", url: "https://api.whatsapp.com/send?phone=5512988861928" },
      ],
    },
    {
      name: "Lidia Noccerino",
      role: "Corretora",
      image: "/utils/equipe/lidia-noccerino.webp",
      email: "lidia@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99791-1538", url: "https://api.whatsapp.com/send?phone=5512997911538" },
      ],
    },
    {
      name: "Lilian Oliveira",
      role: "Corretora",
      creci: "CRECI 124915",
      image: "/utils/equipe/lilian-oliveira.webp",
      email: "lilian@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98110-0176", url: "https://api.whatsapp.com/send?phone=5512981100176" },
      ],
    },
    {
      name: "Marcos Toledo",
      role: "Corretor",
      creci: "CRECI 291692",
      image: "/utils/placeholder.svg",
      email: "marcos@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99790-9946", url: "https://api.whatsapp.com/send?phone=5512997909946" },
      ],
    },
    {
      name: "Mário Luiz da Silva",
      role: "Corretor",
      creci: "CRECI 139182",
      image: "/utils/equipe/mario-luiz-da-silva.webp",
      email: "mario@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(11) 97991-0521", url: "https://api.whatsapp.com/send?phone=5511979910521" },
      ],
    },
    {
      name: "Mércia Avelar Lopes",
      role: "Corretora",
      creci: "CRECI 137.709-F",
      image: "/utils/equipe/mercia-avelar-lopes.webp",
      email: "mercia@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 97813-3663", url: "https://api.whatsapp.com/send?phone=5512978133663" },
      ],
    },
    {
      name: "Mirella Marino",
      role: "Corretora",
      creci: "CRECI 304860",
      image: "/utils/equipe/mirella-marino.webp",
      email: "mirella@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98214-1510", url: "https://api.whatsapp.com/send?phone=5512982141510" },
      ],
    },
    {
      name: "Monique Araujo",
      role: "Corretora",
      creci: "CRECI 243546",
      image: "/utils/equipe/monique-araujo.webp",
      email: "monique@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98250-0071", url: "https://api.whatsapp.com/send?phone=5512982500071" },
      ],
    },
    {
      name: "Pedro Sampaio",
      role: "Corretor",
      creci: "CRECI 190385",
      image: "/utils/equipe/pedro-sampaio.webp",
      whatsapps: [
        { label: "(12) 98118-4902", url: "https://api.whatsapp.com/send?phone=5512981184902" },
      ],
    },
    {
      name: "Roberto Nese",
      role: "Corretor",
      creci: "CRECI 238456",
      image: "/utils/equipe/roberto-nese.webp",
      email: "roberto@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99800-7563", url: "https://api.whatsapp.com/send?phone=5512998007563" },
      ],
    },
    {
      name: "Rodrigo Manuce",
      role: "Corretor",
      creci: "CRECI 97885",
      image: "/utils/equipe/rodrigo-manuce.webp",
      email: "rodrigo.manuce@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98811-7037", url: "https://api.whatsapp.com/send?phone=5512988117037" },
      ],
    },
    {
      name: "Rodrigo Monteiro",
      role: "Corretor",
      creci: "CRECI 96952",
      image: "/utils/equipe/rodrigo-monteiro.webp",
      email: "rodrigo@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98859-6335", url: "https://api.whatsapp.com/send?phone=5512988596335" },
      ],
    },
    {
      name: "Rogéria Pontes",
      role: "Corretora",
      creci: "CRECI 268375",
      image: "/utils/equipe/rogeria-pontes.webp",
      email: "rogeria@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99799-6869", url: "https://api.whatsapp.com/send?phone=5512997996869" },
      ],
    },
    {
      name: "Ruth Oliveira",
      role: "Corretora",
      creci: "CRECI 255326",
      image: "/utils/equipe/ruth-oliveira.webp",
      email: "ruth@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99153-6788", url: "https://api.whatsapp.com/send?phone=5512991536788" },
      ],
    },
    {
      name: "Stela Marton",
      role: "Corretora",
      creci: "CRECI 269866",
      image: "/utils/equipe/stela-marton.webp",
      email: "stelamarton@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98111-4745", url: "https://api.whatsapp.com/send?phone=5512981114745" },
      ],
    },
    {
      name: "Thaís Wagmaker",
      role: "Corretora",
      creci: "CRECI 301677-F",
      image: "/utils/equipe/thais-wagmaker.webp",
      email: "thais@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98810-0520", url: "https://api.whatsapp.com/send?phone=5512988100520" },
      ],
      instagram: "https://www.instagram.com/thaiswagmaker.corretora",
    },
    {
      name: "Vilma Aparecida",
      role: "Corretora",
      creci: "CRECI 198978",
      image: "/utils/placeholder.svg",
      email: "vilma@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 98109-6724", url: "https://api.whatsapp.com/send?phone=5512981096724" },
      ],
    },
    {
      name: "Wandreia Maciel",
      role: "Corretora",
      creci: "CRECI 261919",
      image: "/utils/equipe/wandreia-maciel.webp",
      email: "wandreia@piramideimoveissjc.com.br",
      whatsapps: [
        { label: "(12) 99762-4818", url: "https://api.whatsapp.com/send?phone=5512997624818" },
      ],
    },
  ];

  
  const allTeam = [...leadership, ...brokers];

  return (
    <div className="w-full text-foreground transition-colors">
      
      <TeamHeroSection />

      
      <section id="equipe" className="relative w-full pb-16 sm:pb-24 lg:pb-28">
        <div className="w-full max-w-440 mx-auto px-6 md:px-12 space-y-8 sm:space-y-12">
          
          <div className="flex flex-col items-center text-center justify-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase font-heading tracking-tight text-foreground">
              Nossos Corretores & Consultores
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Conecte-se diretamente com os especialistas credenciados da Pirâmide Imóveis.
            </p>
          </div>

          
          <TeamGridFilter members={allTeam} />
        </div>
      </section>

      
      <InfiniteMarquee />
    </div>
  );
}
