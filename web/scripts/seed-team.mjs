import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value.trim();
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y2fjdwuo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

const teamMembers = [
  
  {
    name: "Rafael Marques",
    role: "Sócio-Proprietário",
    tier: "leadership_founders",
    order: 1,
    creci: "CRECI 83891F",
    imageFile: "rafael-marques.webp",
    email: "rafael@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98158-4103", url: "https://api.whatsapp.com/send?phone=5512981584103" },
      { label: "(12) 98100-5673", url: "https://api.whatsapp.com/send?phone=5512981005673" },
    ],
  },
  {
    name: "Sueli Marques",
    role: "Sócia-Proprietária",
    tier: "leadership_founders",
    order: 2,
    creci: "CRECI 31082",
    imageFile: "sueli-marques.webp",
    email: "sueliadv@uol.com.br",
    whatsapps: [
      { label: "(12) 98158-4105", url: "https://api.whatsapp.com/send?phone=5512981584105" },
    ],
  },
  {
    name: "Priscila Marques",
    role: "Diretora Comercial",
    tier: "leadership_directors",
    order: 1,
    creci: "CRECI 208415",
    imageFile: "priscila-marques.webp",
    email: "priscila@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98147-6169", url: "https://api.whatsapp.com/send?phone=5512981476169" },
    ],
  },
  {
    name: "Fernando César",
    role: "Diretor Comercial",
    tier: "leadership_directors",
    order: 2,
    creci: "CRECI 82550",
    imageFile: "fernando-cesar.webp",
    email: "fernando@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99722-1641", url: "https://api.whatsapp.com/send?phone=5512997221641" },
    ],
  },

  
  {
    name: "Rodrigo Monteiro",
    role: "Gerente Comercial",
    tier: "management",
    order: 1,
    creci: "CRECI 96952",
    imageFile: "rodrigo-monteiro.webp",
    email: "rodrigo@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98859-6335", url: "https://api.whatsapp.com/send?phone=5512988596335" },
    ],
  },
  {
    name: "Eva Figueiredo",
    role: "Gerente Comercial",
    tier: "management",
    order: 2,
    creci: "CRECI 83352",
    imageFile: "eva-figueiredo.webp",
    email: "eva@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99103-3102", url: "https://api.whatsapp.com/send?phone=5512991033102" },
    ],
  },
  {
    name: "Wandreia Maciel",
    role: "Gerente Comercial",
    tier: "management",
    order: 3,
    creci: "CRECI 261919",
    imageFile: "wandreia-maciel.webp",
    email: "wandreia@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99762-4818", url: "https://api.whatsapp.com/send?phone=5512997624818" },
    ],
  },
  {
    name: "Thaís Wagmaker",
    role: "Gerente Comercial",
    tier: "management",
    order: 4,
    creci: "CRECI 301677-F",
    imageFile: "thais-wagmaker.webp",
    email: "thais@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98810-0520", url: "https://api.whatsapp.com/send?phone=5512988100520" },
    ],
    instagram: "https://www.instagram.com/thaiswagmaker.corretora",
  },

  
  {
    name: "Amanda Souza",
    role: "Corretora",
    tier: "broker",
    imageFile: "amanda-souza.webp",
    email: "amanda@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98188-1219", url: "https://api.whatsapp.com/send?phone=5512981881219" },
    ],
  },
  {
    name: "Ana Cristina Magalhães",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 269644",
    imageFile: "ana-cristima-magalhaes.webp",
    email: "anacristina@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98262-1330", url: "https://api.whatsapp.com/send?phone=5512982621330" },
    ],
  },
  {
    name: "André Luiz Martins",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 297473",
    imageFile: "andre-luiz-martins.webp",
    email: "andre@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99713-5651", url: "https://api.whatsapp.com/send?phone=5512997135651" },
    ],
  },
  {
    name: "André Massa",
    role: "Corretor",
    tier: "broker",
    imageFile: null,
    whatsapps: [
      { label: "(12) 99630-4381", url: "https://api.whatsapp.com/send?phone=5512996304381" },
    ],
  },
  {
    name: "Andrea Ribeiro",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 71744",
    imageFile: "andrea-ribeiro.webp",
    email: "andrea@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99132-613", url: "https://api.whatsapp.com/send?phone=551299132613" },
    ],
  },
  {
    name: "Angélica de Medeiros",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 146638",
    imageFile: "angelica-de-medeiros.webp",
    email: "angelica@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99230-7980", url: "https://api.whatsapp.com/send?phone=5512992307980" },
    ],
  },
  {
    name: "Ari Ribeiro",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 294357",
    imageFile: "ari-ribeiro.webp",
    whatsapps: [
      { label: "(12) 99126-4566", url: "https://api.whatsapp.com/send?phone=5512991264566" },
    ],
    instagram: "https://www.instagram.com/ari.imoveis",
  },
  {
    name: "Armando Siqueira",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 185146",
    imageFile: "armando-siqueira.webp",
    email: "armando@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99714-6290", url: "https://api.whatsapp.com/send?phone=5512997146290" },
    ],
  },
  {
    name: "Carlos Marks",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 253146",
    imageFile: "carlos-marks.webp",
    email: "luiscarlos@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99129-5108", url: "https://api.whatsapp.com/send?phone=5512991295108" },
    ],
  },
  {
    name: "Carlos Santos",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 202965",
    imageFile: "carlos-santos.webp",
    email: "carlos@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99763-3300", url: "https://api.whatsapp.com/send?phone=5512997633300" },
    ],
  },
  {
    name: "Cesar Santos",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 226627",
    imageFile: "cesar-santos.webp",
    email: "cesar@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98891-5158", url: "https://api.whatsapp.com/send?phone=5512988915158" },
    ],
  },
  {
    name: "Claudemir Valério",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 138965",
    imageFile: "claudemir-valerio.webp",
    email: "claudemir@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98200-2933", url: "https://api.whatsapp.com/send?phone=5512982002933" },
    ],
  },
  {
    name: "Dayse Gonçalves",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 146663",
    imageFile: "dayse-goncalves.webp",
    email: "dayse@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99715-4313", url: "https://api.whatsapp.com/send?phone=5512997154313" },
    ],
  },
  {
    name: "Diego Motta",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 290367",
    imageFile: "diego-motta.webp",
    email: "diegomotta@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99636-4255", url: "https://api.whatsapp.com/send?phone=5512996364255" },
    ],
  },
  {
    name: "Dulce Pinho",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 275.311",
    imageFile: "dulce-pinho.webp",
    email: "dulce@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98161-8767", url: "https://api.whatsapp.com/send?phone=5512981618767" },
    ],
  },
  {
    name: "Edimilson Muniz",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 303286F",
    imageFile: "edimilson-muniz.webp",
    email: "edimilson@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99125-1332", url: "https://api.whatsapp.com/send?phone=5512991251332" },
    ],
  },
  {
    name: "Edson Oreste de Souza",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 137227",
    imageFile: "edson-oreste-de-souza.webp",
    email: "edy@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98889-3516", url: "https://api.whatsapp.com/send?phone=5512988893516" },
    ],
  },
  {
    name: "Eduardo Oliveira",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 205.317",
    imageFile: "eduardo-oliveira.webp",
    email: "eduardo@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98866-3020", url: "https://api.whatsapp.com/send?phone=5512988663020" },
    ],
  },
  {
    name: "Elisabeth Myslinsky",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 227792",
    imageFile: "elisabeth-myslinsky.webp",
    email: "elisabeth@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98844-5138", url: "https://api.whatsapp.com/send?phone=5512988445138" },
    ],
  },
  {
    name: "Erfan Rahmani",
    role: "Corretor",
    tier: "broker",
    imageFile: "erfan-rahmani.webp",
    email: "erfan@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99732-6644", url: "https://api.whatsapp.com/send?phone=5512997326644" },
    ],
  },
  {
    name: "Fabiana Gimenez",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 203522",
    imageFile: "fabiana-gimenez.webp",
    email: "fabiana@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(11) 98175-6763", url: "https://api.whatsapp.com/send?phone=5511981756763" },
    ],
  },
  {
    name: "Fernando Abrahao",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 328747",
    imageFile: null,
    email: "fernandoabrahao@piramideimoveissj.com.br",
    whatsapps: [
      { label: "(11) 98711-9888", url: "https://api.whatsapp.com/send?phone=551198711988" },
    ],
  },
  {
    name: "Flávio Alves",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 258442",
    imageFile: "flavio-alves.webp",
    email: "flavio@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98172-426", url: "https://api.whatsapp.com/send?phone=551298172426" },
    ],
  },
  {
    name: "Gabriel Barros",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 76994",
    imageFile: "gabriel-barros.webp",
    email: "gabriel@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(53) 99957-9956", url: "https://api.whatsapp.com/send?phone=5553999579956" },
    ],
    instagram: "https://www.instagram.com/corretorgabrielbarros97",
  },
  {
    name: "Gilson Aparecido de Oliveira",
    role: "Corretor",
    tier: "broker",
    imageFile: "gilson-aparecido-de-oliveira.webp",
    email: "gilson@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99104-2999", url: "https://api.whatsapp.com/send?phone=5512991042999" },
    ],
  },
  {
    name: "Glaucia Ohira",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 197545",
    imageFile: "glaucia-ohira.webp",
    email: "glaucia@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99128-6211", url: "https://api.whatsapp.com/send?phone=5512991286211" },
    ],
  },
  {
    name: "Guilherme Munhoz Lopes",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 331233",
    imageFile: "guilherme-munhoz-lopes.webp",
    email: "guilherme@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98858-6833", url: "https://api.whatsapp.com/send?phone=5512988586833" },
    ],
    instagram: "https://www.instagram.com/guilherme.imoveis.sjc",
  },
  {
    name: "Henrique Gomes",
    role: "Corretor",
    tier: "broker",
    imageFile: null,
    whatsapps: [
      { label: "(12) 99729-3831", url: "https://api.whatsapp.com/send?phone=5512997293831" },
    ],
  },
  {
    name: "Hugo Noda",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 300628",
    imageFile: "hugo-noda.webp",
    email: "hugo@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 97406-5221", url: "https://api.whatsapp.com/send?phone=5512974065221" },
    ],
  },
  {
    name: "Jose Luiz",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 206522",
    imageFile: "jose-luiz.webp",
    email: "joseluiz@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99709-6843", url: "https://api.whatsapp.com/send?phone=5512997096843" },
    ],
    instagram: "https://www.instagram.com/jlr.juniorcorretor/",
  },
  {
    name: "José Roberto",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 171086",
    imageFile: "jose-roberto.webp",
    email: "joseroberto@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99217-4476", url: "https://api.whatsapp.com/send?phone=5512992174476" },
    ],
  },
  {
    name: "Laiza Molas",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 199.959",
    imageFile: "laiza-molas.webp",
    whatsapps: [
      { label: "(12) 97814-1774", url: "https://api.whatsapp.com/send?phone=5512978141774" },
    ],
  },
  {
    name: "Léiah Matos",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 286328",
    imageFile: "leiah-matos.webp",
    email: "leiah.matos@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98886-1928", url: "https://api.whatsapp.com/send?phone=5512988861928" },
    ],
  },
  {
    name: "Lidia Noccerino",
    role: "Corretora",
    tier: "broker",
    imageFile: "lidia-noccerino.webp",
    email: "lidia@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99791-1538", url: "https://api.whatsapp.com/send?phone=5512997911538" },
    ],
  },
  {
    name: "Lilian Oliveira",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 124915",
    imageFile: "lilian-oliveira.webp",
    email: "lilian@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98110-0176", url: "https://api.whatsapp.com/send?phone=5512981100176" },
    ],
  },
  {
    name: "Marcos Toledo",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 291692",
    imageFile: null,
    email: "marcos@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99790-9946", url: "https://api.whatsapp.com/send?phone=5512997909946" },
    ],
  },
  {
    name: "Mário Luiz da Silva",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 139182",
    imageFile: "mario-luiz-da-silva.webp",
    email: "mario@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(11) 97991-0521", url: "https://api.whatsapp.com/send?phone=5511979910521" },
    ],
  },
  {
    name: "Mércia Avelar Lopes",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 137.709-F",
    imageFile: "mercia-avelar-lopes.webp",
    email: "mercia@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 97813-3663", url: "https://api.whatsapp.com/send?phone=5512978133663" },
    ],
  },
  {
    name: "Mirella Marino",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 304860",
    imageFile: "mirella-marino.webp",
    email: "mirella@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98214-1510", url: "https://api.whatsapp.com/send?phone=5512982141510" },
    ],
  },
  {
    name: "Monique Araujo",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 243546",
    imageFile: "monique-araujo.webp",
    email: "monique@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98250-0071", url: "https://api.whatsapp.com/send?phone=5512982500071" },
    ],
  },
  {
    name: "Pedro Sampaio",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 190385",
    imageFile: "pedro-sampaio.webp",
    whatsapps: [
      { label: "(12) 98118-4902", url: "https://api.whatsapp.com/send?phone=5512981184902" },
    ],
  },
  {
    name: "Roberto Nese",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 238456",
    imageFile: "roberto-nese.webp",
    email: "roberto@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99800-7563", url: "https://api.whatsapp.com/send?phone=5512998007563" },
    ],
  },
  {
    name: "Rodrigo Manuce",
    role: "Corretor",
    tier: "broker",
    creci: "CRECI 97885",
    imageFile: "rodrigo-manuce.webp",
    email: "rodrigo.manuce@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98811-7037", url: "https://api.whatsapp.com/send?phone=5512988117037" },
    ],
  },
  {
    name: "Rogéria Pontes",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 268375",
    imageFile: "rogeria-pontes.webp",
    email: "rogeria@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99799-6869", url: "https://api.whatsapp.com/send?phone=5512997996869" },
    ],
  },
  {
    name: "Ruth Oliveira",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 255326",
    imageFile: "ruth-oliveira.webp",
    email: "ruth@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 99153-6788", url: "https://api.whatsapp.com/send?phone=5512991536788" },
    ],
  },
  {
    name: "Stela Marton",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 269866",
    imageFile: "stela-marton.webp",
    email: "stelamarton@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98111-4745", url: "https://api.whatsapp.com/send?phone=5512981114745" },
    ],
  },
  {
    name: "Vilma Aparecida",
    role: "Corretora",
    tier: "broker",
    creci: "CRECI 198978",
    imageFile: null,
    email: "vilma@piramideimoveissjc.com.br",
    whatsapps: [
      { label: "(12) 98109-6724", url: "https://api.whatsapp.com/send?phone=5512981096724" },
    ],
  },
];

async function runSeed() {
  console.log(`Iniciando seed de ${teamMembers.length} membros da equipe...`);

  const imagesDir = path.resolve(__dirname, "../public/utils/equipe");
  const uploadedAssetsMap = new Map();

  for (const member of teamMembers) {
    const slug = slugify(member.name);
    const docId = `team-${slug}`;

    let imageAssetRef = null;
    if (member.imageFile) {
      const filePath = path.join(imagesDir, member.imageFile);
      if (fs.existsSync(filePath)) {
        if (uploadedAssetsMap.has(member.imageFile)) {
          imageAssetRef = uploadedAssetsMap.get(member.imageFile);
        } else {
          console.log(`Fazendo upload da foto: ${member.imageFile}...`);
          const fileStream = fs.createReadStream(filePath);
          const asset = await client.assets.upload("image", fileStream, {
            filename: member.imageFile,
            contentType: "image/webp",
          });
          imageAssetRef = asset._id;
          uploadedAssetsMap.set(member.imageFile, imageAssetRef);
        }
      }
    }

    const doc = {
      _id: docId,
      _type: "teamMember",
      name: member.name,
      slug: { _type: "slug", current: slug },
      role: member.role,
      tier: member.tier,
      active: true,
    };

    if (member.order !== undefined) doc.order = member.order;
    if (member.creci) doc.creci = member.creci;
    if (member.email) doc.email = member.email;
    if (member.instagram) doc.instagram = member.instagram;
    if (member.whatsapps && member.whatsapps.length > 0) {
      doc.whatsapps = member.whatsapps.map((w, idx) => ({
        _key: `wa-${idx}`,
        label: w.label,
        url: w.url,
      }));
    }
    if (imageAssetRef) {
      doc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAssetRef,
        },
        alt: `Foto de ${member.name}`,
      };
    }

    await client.createOrReplace(doc);
    console.log(`✓ Membro cadastrado/atualizado: ${member.name} (${member.role}) - Tier: ${member.tier}`);
  }

  console.log("\n🎉 Seed de todos os membros da equipe concluído com sucesso!");
}

runSeed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
