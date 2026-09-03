import { createClient } from "next-sanity";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

let token = process.env.SANITY_API_TOKEN || "";
const envLocalPath = join(process.cwd(), ".env.local");
if (existsSync(envLocalPath)) {
  const envContent = readFileSync(envLocalPath, "utf8");
  const match = envContent.match(/SANITY_API_TOKEN=["']?([^"'\r\n]+)["']?/);
  if (match) {
    token = match[1];
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y2fjdwuo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

async function uploadLocalImage(filePath: string, filename: string) {
  try {
    if (!existsSync(filePath)) {
      console.warn('  Arquivo não encontrado:', filePath);
      return undefined;
    }
    const buffer = readFileSync(filePath);
    const asset = await client.assets.upload('image', buffer, { filename });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn('  Erro ao fazer upload da imagem:', filename, err);
    return undefined;
  }
}

async function runSeedLaunches() {
  console.log('\n😨 Iniciando seed de Lançamentos no Sanity...\n');
  const root = process.cwd();

  const launchItems = [
    {
      id: 'launch-parque-una',
      title: 'Parque Una São José dos Campos',
      alt: 'Parque Una São José dos Campos',
      file: join(root, 'public', 'banners', 'banner-parque-una.webp'),
      filename: 'banner-parque-una.webp',
      href: 'https://parqueuna.piramideimoveissjc.com.br/pt',
      order: 1,
    },
    {
      id: 'launch-le-monde',
      title: 'Residencial Le Monde',
      alt: 'Residencial Le Monde',
      file: join(root, 'public', 'banners', 'banner-le-monde.webp'),
      filename: 'banner-le-monde.webp',
      href:
        'https://www.piramideimoveissjc.com.br/imoveis/a-venda/le-monde-vila-adyana-vila-adyana-sao-jose-dos-campos-sp?cond_id=644692&search_name=Le+Monde+-++Vila+Adyana&localidade=Vila+Adyana%2C+São+José+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes',
      order: 2,
    },
    {
      id: 'launch-amarilis',
      title: 'Residencial Amarílis',
      alt: 'Residencial Amarílis',
      file: join(root, 'public', 'banners', 'banner-amarilis.webp'),
      filename: 'banner-amarilis.webp',
      href:
        'https://www.piramideimoveissjc.com.br/imoveis/a-venda/amarilis-urbanova-urbanova-sao-jose-dos-campos-sp?cond_id=635293&search_name=Amar%C3%ADlis+-++Urbanova&localidade=Urbanova%2C+São+José+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes',
      order: 3,
    },
    {
      id: 'launch-yvy',
      title: 'YVY Residences Massaguaçu',
      alt: 'YVY Residences Massaguaçu',
      file: join(root, 'public', 'banners', 'banner-YVY.webp'),
      filename: 'banner-YVY.webp',
      href:
        'https://www.piramideimoveissjc.com.br/imoveis/a-venda/yvy-residences-massaguacu-massaguacu-caraguatatuba-sp?cond_id=644732&search_name=Yvy+Residences+-++Massagua%C3%A7u&localidade=Massagua%C3%A7u%2C+Caraguatatuba%2C+SP&toggle_map=true&order=mais_relevantes',
      order: 4,
    },
    {
      id: 'launch-easy-home',
      title: 'Easy Home',
      alt: 'Easy Home',
      file: join(root, 'public', 'banners', 'banner-easy-home.webp'),
      filename: 'banner-easy-home.webp',
      href:
        'https://www.piramideimoveissjc.com.br/imoveis/a-venda/easy-home-jardim-aquarius-jardim-aquarius-sao-jose-dos-campos-sp?cond_id=644953&search_name=Easy+Home+-++Jardim+Aquarius&localidade=Jardim+Aquarius%2C+São+José+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes',
      order: 5,
    },
    {
      id: 'launch-blue-view',
      title: 'Blue View',
      alt: 'Blue View',
      file: join(root, 'public', 'banners', 'banner-blue-view.webp'),
      filename: 'banner-blue-view.webp',
      href:
        'https://www.piramideimoveissjc.com.br/imoveis/a-venda/blue-view-vila-industrial-vila-industrial-sao-jose-dos-campos-sp?cond_id=641742&search_name=Blue+View+-++Vila+Industrial&localidade=Vila+Industrial%2C+São+José+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes',
      order: 6,
    },
  ];

  for (const item of launchItems) {
    console.log('Adicionando lançamento:', item.title);
    const imageAsset = await uploadLocalImage(item.file, item.filename);

    const doc: Record<string, unknown> = {
      _id: item.id,
      _type: 'launch',
      title: item.title,
      alt: item.alt,
      href: item.href,
      order: item.order,
    };

    if (imageAsset) {
      doc.image = imageAsset;
    }

    await client.createOrReplace(doc);
    console.log('  ✓ Lançamento cadastrado/atualizado no Sanity:', item.title);
  }

  console.log('\n🎯 Todos os 6 lançamentos foram cadastrados com sucesso no Sanity!\n');
}

runSeedLaunches().catch(console.error);