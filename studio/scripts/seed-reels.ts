/**
 * Script de Seed para Vídeos & Reels no Sanity Studio - Pirâmide Imóveis
 * 
 * Cadastra vídeos verticais (Reels/Shorts) com thumbnails, links de imóveis e Instagram.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "y2fjdwuo";
const dataset = process.env.SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_TOKEN ||
  "sk0yWvRPK6Qi459wVyouH7GF8ZoDWlnaNmev2dZCrE2AZsI3fGHSJY5lN73DjOJpN2QAu4PIpAS61Sp7SvhueqfDZSfHAcQFZFOgJowyiQTUFfTq0TbszQoXIzfN9aziw92skWd0EJCOIrX8EbbAuAqpuqXrUcCwL2JmKnI3XNA8wmlFfWqh";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

async function uploadImageFromUrl(url: string, filename: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falha ao baixar imagem: ${res.statusText}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, { filename });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn(`  ⚠️ Não foi possível carregar imagem para ${filename}:`, err);
    return undefined;
  }
}

async function runSeedReels() {
  console.log(`\n🎬 Iniciando Seed de Vídeos & Reels no Sanity (${projectId} / ${dataset})...\n`);

  console.log("📸 Fazendo upload das capas verticais dos Reels...");

  const thumb1 = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    "reel_thumb_una.jpg"
  );
  const thumb2 = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    "reel_thumb_lemonde.jpg"
  );
  const thumb3 = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
    "reel_thumb_aquarius.jpg"
  );
  const thumb4 = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    "reel_thumb_urbanova.jpg"
  );
  const thumb5 = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    "reel_thumb_esplanada.jpg"
  );

  const sampleReels = [
    {
      _id: "reel-parque-una",
      _type: "reel",
      title: "Tour Exclusivo: O Novo Conceito de Bairro Planejado no Parque Una",
      thumbnail: thumb1,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description:
        "Conheça todos os detalhes do Parque Una São José dos Campos: arquitetura contemporânea, praças arborizadas, lagos e o melhor padrão de qualidade de vida do Vale do Paraíba.",
      propertyTitle: "Parque Una São José dos Campos",
      propertyUrl: "https://parqueuna.piramideimoveissjc.com.br/pt",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      _id: "reel-residencial-le-monde",
      _type: "reel",
      title: "Apartamento Decorado: Luxo e Sofisticação no Residencial Le Monde",
      thumbnail: thumb2,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description:
        "Espaços generosos, acabamentos de altíssimo padrão e uma vista deslumbrante. Venha se encantar com cada detalhe deste projeto único.",
      propertyTitle: "Residencial Le Monde",
      propertyUrl: "https://www.piramideimoveissjc.com.br/",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    },
    {
      _id: "reel-yvy-aquarius",
      _type: "reel",
      title: "YVY Aquarius: Sustentabilidade e Tecnologia no Coração do Jardim Aquarius",
      thumbnail: thumb3,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      description:
        "O empreendimento que redefine a conexão entre arquitetura moderna e natureza no Jardim Aquarius. Plantas flexíveis e lazer completo.",
      propertyTitle: "YVY Aquarius",
      propertyUrl: "https://www.piramideimoveissjc.com.br/",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    },
    {
      _id: "reel-casa-urbanova",
      _type: "reel",
      title: "Casa de Alto Padrão no Urbanova com Piscina de Borda Infinita",
      thumbnail: thumb4,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      description:
        "Mais de 450m² de área construída, 4 suítes, automação residencial completa e uma área gourmet perfeita para receber amigos e família.",
      propertyTitle: "Mansão no Urbanova",
      propertyUrl: "https://www.piramideimoveissjc.com.br/",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    },
    {
      _id: "reel-cobertura-esplanada",
      _type: "reel",
      title: "Cobertura Duplex no Jardim Esplanada com Vista 360 Graus",
      thumbnail: thumb5,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
      description:
        "Privacidade absoluta e localização nobre no Jardim Esplanada. Amplo terraço privativo com spa e espaço zen integrado.",
      propertyTitle: "Cobertura Jardim Esplanada",
      propertyUrl: "https://www.piramideimoveissjc.com.br/",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
  ];

  console.log("\n🚀 Publicando Reels no Sanity...");
  for (const reel of sampleReels) {
    try {
      await client.createOrReplace(reel);
      console.log(`  ✓ Reel criado/atualizado: ${reel.title}`);
    } catch (err) {
      console.error(`  ✗ Erro ao criar ${reel.title}:`, err);
    }
  }

  console.log("\n🎉 Seed de Vídeos & Reels concluído com sucesso no Sanity!\n");
}

runSeedReels().catch(console.error);
