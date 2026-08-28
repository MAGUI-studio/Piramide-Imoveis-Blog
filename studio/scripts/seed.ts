/**
 * Seed Script para Sanity Studio - Pirâmide Imóveis
 * 
 * Cria Autores, Cidades, Categorias e Artigos completos com imagens em alta resolução no Sanity.
 */

import { createClient } from "sanity";

const projectId = process.env.SANITY_PROJECT_ID || "y2fjdwuo";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || "sk0yWvRPK6Qi459wVyouH7GF8ZoDWlnaNmev2dZCrE2AZsI3fGHSJY5lN73DjOJpN2QAu4PIpAS61Sp7SvhueqfDZSfHAcQFZFOgJowyiQTUFfTq0TbszQoXIzfN9aziw92skWd0EJCOIrX8EbbAuAqpuqXrUcCwL2JmKnI3XNA8wmlFfWqh";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

// Helper para fazer upload de imagens a partir de URL
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

async function runSeed() {
  console.log(`\n🚀 Iniciando Seed completo no Sanity (${projectId} / ${dataset})...\n`);

  // Imagens de alta resolução do Unsplash
  console.log("📸 Fazendo upload de imagens de cidades e categorias...");
  
  const imgSjc = await uploadImageFromUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", "sjc.jpg");
  const imgUbatuba = await uploadImageFromUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", "ubatuba.jpg");
  const imgJacarei = await uploadImageFromUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop", "jacarei.jpg");
  const imgCampos = await uploadImageFromUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop", "campos.jpg");

  const imgMercado = await uploadImageFromUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", "mercado.jpg");
  const imgFinanciamento = await uploadImageFromUrl("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop", "financiamento.jpg");
  const imgLuxo = await uploadImageFromUrl("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop", "luxo.jpg");
  const imgArquitetura = await uploadImageFromUrl("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop", "arquitetura.jpg");
  const imgGastronomia = await uploadImageFromUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop", "gastronomia.jpg");

  const imgAvatarGuilherme = await uploadImageFromUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", "avatar_guilherme.jpg");
  const imgAvatarAna = await uploadImageFromUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", "avatar_ana.jpg");
  const imgAvatarRedacao = await uploadImageFromUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", "avatar_redacao.jpg");

  // 1. Criar Autores
  console.log("\n👤 Criando Autores...");
  const authors = [
    {
      _id: "author-guilherme-bustamante",
      _type: "author",
      name: "Guilherme Bustamante",
      slug: { _type: "slug", current: "guilherme-bustamante" },
      role: "Especialista em Mercado Imobiliário & Análise de Investimentos",
      creci: "CRECI 9390-J",
      image: imgAvatarGuilherme,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Profissional com mais de 10 anos de experiência no mercado imobiliário do Vale do Paraíba, especializado em análises de valorização patrimonial, lançamentos residenciais e comerciais de alto padrão.",
            },
          ],
        },
      ],
      linkedinUrl: "https://www.linkedin.com/company/piramide-im%C3%B3veis-queops-ltda",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      email: "contato@piramideimoveis.com.br",
    },
    {
      _id: "author-ana-silva",
      _type: "author",
      name: "Ana Silva",
      slug: { _type: "slug", current: "ana-silva" },
      role: "Consultora de Crédito Imobiliário & Financiamento",
      creci: "CRECI 12450-F",
      image: imgAvatarAna,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Especialista em planejamento financeiro e estruturação de crédito para aquisição de imóveis, atuando na redução do Custo Efetivo Total (CET) e otimização do FGTS.",
            },
          ],
        },
      ],
      linkedinUrl: "https://www.linkedin.com/company/piramide-im%C3%B3veis-queops-ltda",
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      email: "credito@piramideimoveis.com.br",
    },
    {
      _id: "author-redacao-piramide",
      _type: "author",
      name: "Redação Pirâmide",
      slug: { _type: "slug", current: "redacao-piramide" },
      role: "Equipe Editorial Pirâmide Imóveis",
      creci: "CRECI 9390-J",
      image: imgAvatarRedacao,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Conteúdos elaborados pelos analistas e consultores da Imobiliária Pirâmide, trazendo dados confiáveis, tendências e análises de mercado em São José dos Campos e Litoral Norte.",
            },
          ],
        },
      ],
      email: "blog@piramideimoveis.com.br",
    },
  ];

  for (const author of authors) {
    await client.createOrReplace(author);
    console.log(`  ✓ Autor: ${author.name}`);
  }

  // 2. Criar Cidades
  console.log("\n📍 Criando Cidades...");
  const cities = [
    {
      _id: "city-sao-jose-dos-campos",
      _type: "city",
      name: "São José dos Campos",
      slug: { _type: "slug", current: "sao-jose-dos-campos" },
      state: "SP",
      image: imgSjc,
      description: "Polo tecnológico e principal centro imobiliário do Vale do Paraíba, com destaque para Jardim Aquarius, Urbanova e Jardim Esplanada.",
    },
    {
      _id: "city-ubatuba",
      _type: "city",
      name: "Ubatuba",
      slug: { _type: "slug", current: "ubatuba" },
      state: "SP",
      image: imgUbatuba,
      description: "Capital do surfe no Litoral Norte paulista, com alta demanda por imóveis de lazer, casas pé na areia e locação por temporada.",
    },
    {
      _id: "city-jacarei",
      _type: "city",
      name: "Jacareí",
      slug: { _type: "slug", current: "jacarei" },
      state: "SP",
      image: imgJacarei,
      description: "Cidade vizinha a SJC em forte expansão imobiliária e logística, com excelentes opções de condomínios fechados.",
    },
    {
      _id: "city-campos-do-jordao",
      _type: "city",
      name: "Campos do Jordão",
      slug: { _type: "slug", current: "campos-do-jordao" },
      state: "SP",
      image: imgCampos,
      description: "Destino nobre na Serra da Mantiqueira, referência em casas de campo e chalés de luxo para inverno e temporada.",
    },
  ];

  for (const city of cities) {
    await client.createOrReplace(city);
    console.log(`  ✓ Cidade: ${city.name} (${city.state})`);
  }

  // 3. Criar Categorias
  console.log("\n🏷️ Criando Categorias...");
  const categories = [
    {
      _id: "category-mercado-imobiliario",
      _type: "category",
      title: "Mercado Imobiliário",
      slug: { _type: "slug", current: "mercado-imobiliario" },
      image: imgMercado,
      description: "Análises de valorização, projeções de preço por metro quadrado e tendências em São José dos Campos e região.",
    },
    {
      _id: "category-financiamento-credito",
      _type: "category",
      title: "Financiamento & Crédito",
      slug: { _type: "slug", current: "financiamento-and-credito" },
      image: imgFinanciamento,
      description: "Estratégias de taxas de juros, uso inteligente do FGTS, simulações SAC vs Price e economia real no financiamento.",
    },
    {
      _id: "category-imoveis-de-luxo",
      _type: "category",
      title: "Imóveis de Luxo",
      slug: { _type: "slug", current: "imoveis-de-luxo" },
      image: imgLuxo,
      description: "Casas em condomínios fechados, coberturas e empreendimentos com arquitetura autoral e alto padrão de acabamento.",
    },
    {
      _id: "category-cidades-bairros",
      _type: "category",
      title: "Cidades & Bairros",
      slug: { _type: "slug", current: "cidades" },
      image: imgSjc,
      description: "Guias completos sobre infraestrutura, escolas, segurança e qualidade de vida em cada bairro e cidade.",
    },
    {
      _id: "category-arquitetura-design",
      _type: "category",
      title: "Arquitetura & Design",
      slug: { _type: "slug", current: "arquitetura" },
      image: imgArquitetura,
      description: "Ideias de decoração, biofilia, sustentabilidade e soluções arquitetônicas contemporâneas.",
    },
    {
      _id: "category-gastronomia-lifestyle",
      _type: "category",
      title: "Gastronomia & Lazer",
      slug: { _type: "slug", current: "gastronomia" },
      image: imgGastronomia,
      description: "Dicas de restaurantes, passeios e o melhor da vida urbana e praiana para quem mora ou visita a região.",
    },
  ];

  for (const category of categories) {
    await client.createOrReplace(category);
    console.log(`  ✓ Categoria: ${category.title}`);
  }

  // 4. Criar Artigos / Posts
  console.log("\n📰 Criando Artigos com os 3 Tópicos de Destaque...");
  const posts = [
    {
      _id: "post-financiamento-2026",
      _type: "post",
      title: "Como Funciona o Financiamento Imobiliário em 2026: Guia de Taxas e FGTS",
      slug: { _type: "slug", current: "como-funciona-o-financiamento-imobiliario-em-2026" },
      featured: true,
      publishedAt: new Date("2026-02-15T10:00:00Z").toISOString(),
      excerpt: "Entenda a diferença prática entre Tabela SAC e Price, como usar o FGTS na entrada e as estratégias comprovadas para conseguir a menor taxa de juros na compra do seu imóvel.",
      mainImage: imgFinanciamento,
      highlight1Title: "SAC vs Price sem Segredos",
      highlight1Description: "Qual modalidade gera mais economia de juros no longo prazo",
      highlight2Title: "Uso Estratégico do FGTS",
      highlight2Description: "Como abater a entrada e amortizar parcelas com eficiência",
      highlight3Title: "Menores Taxas Bancárias",
      highlight3Description: "Dicas para negociar o Custo Efetivo Total com os bancos",
      author: { _type: "reference", _ref: "author-ana-silva" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [{ _type: "reference", _ref: "category-financiamento-credito" }],
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Adquirir um imóvel financiado em 2026 exige um planejamento financeiro estruturado. Com as recentes atualizações no teto do SFH e as novas políticas dos principais bancos do país, os compradores têm à disposição diversas modalidades de amortização.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [
            {
              _type: "span",
              text: "1. Tabela SAC ou Tabela Price: Qual escolher?",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "No Sistema de Amortização Constante (SAC), o valor da parcela diminui mês a mês. Isso acontece porque o montante amortizado da dívida permanece fixo em cada prestação, reduzindo mais rapidamente o saldo devedor e gerando uma economia expressiva no total de juros pagos ao longo do contrato.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [
            {
              _type: "span",
              text: "2. Como utilizar seu FGTS da melhor forma",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "O saldo do Fundo de Garantia pode ser empregado tanto para compor a entrada quanto para amortizar o saldo devedor a cada 2 anos, reduzindo os juros futuros ou diminuindo o prazo final do financiamento.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-valorizacao-sjc-aquarius-urbanova",
      _type: "post",
      title: "São José dos Campos: Por que Aquarius e Urbanova Lideram a Valorização",
      slug: { _type: "slug", current: "sao-jose-dos-campos-aquarius-urbanova-valorizacao" },
      featured: true,
      publishedAt: new Date("2026-02-20T14:30:00Z").toISOString(),
      excerpt: "Com novos centros comerciais, infraestrutura planejada e condomínios de alto padrão, a Zona Oeste de São José dos Campos consolida-se como o maior polo de liquidez imobiliária.",
      mainImage: imgLuxo,
      highlight1Title: "Polo de Alta Liquidez",
      highlight1Description: "Imóveis que valorizam acima da média do estado de SP",
      highlight2Title: "Qualidade de Vida & Parques",
      highlight2Description: "Ciclovias, praças e segurança nos condomínios fechados",
      highlight3Title: "Infraestrutura Completa",
      highlight3Description: "Comércio, colégios de ponta e gastronomia renomada",
      author: { _type: "reference", _ref: "author-guilherme-bustamante" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-mercado-imobiliario" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "A valorização contínua de São José dos Campos é impulsionada pela combinação de polos de tecnologia, aeronáutica e uma infraestrutura urbana de primeiro mundo. O Jardim Aquarius e o Urbanova destacam-se pela oferta de condomínios horizontais e apartamentos de alto padrão com alta taxa de valorização.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-ubatuba-investimento-temporada",
      _type: "post",
      title: "Investir em Imóveis em Ubatuba: Oportunidades no Litoral Norte",
      slug: { _type: "slug", current: "investir-em-imoveis-em-ubatuba-litoral-norte" },
      featured: true,
      publishedAt: new Date("2026-02-25T09:15:00Z").toISOString(),
      excerpt: "Descubra quais praias de Ubatuba oferecem o melhor retorno sobre o investimento (ROI) para locação via plataformas digitais e valorização patrimonial a médio prazo.",
      mainImage: imgUbatuba,
      highlight1Title: "Retorno com Temporada",
      highlight1Description: "Taxas de ocupação elevadas durante o ano inteiro",
      highlight2Title: "Praias Mais Valorizadas",
      highlight2Description: "Praia Grande, Tenório, Toninhas e Enseada em destaque",
      highlight3Title: "Liquidez e Valorização",
      highlight3Description: "Alta procura por casas modernas e apartamentos perto do mar",
      author: { _type: "reference", _ref: "author-redacao-piramide" },
      city: { _type: "reference", _ref: "city-ubatuba" },
      categories: [
        { _type: "reference", _ref: "category-mercado-imobiliario" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "O mercado imobiliário de Ubatuba passou por uma grande modernização arquitetônica nos últimos anos. Novos empreendimentos com design contemporâneo têm atraído investidores que buscam conciliar lazer em família e renda passiva recorrente.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-arquitetura-autoral-alto-padrao",
      _type: "post",
      title: "Tendências da Arquitetura Autoral em Residências de Alto Padrão no Vale",
      slug: { _type: "slug", current: "tendencias-arquitetura-autoral-alto-padrao-vale" },
      featured: false,
      publishedAt: new Date("2026-02-26T16:00:00Z").toISOString(),
      excerpt: "Conheça os elementos que definem as mansões contemporâneas: integração com a natureza, biofilia, concreto aparente, madeira nobre e automação residencial completa.",
      mainImage: imgArquitetura,
      author: { _type: "reference", _ref: "author-guilherme-bustamante" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-arquitetura-design" },
      ],
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Projetos arquitetônicos contemporâneos no Vale do Paraíba priorizam a iluminação natural, ventilação cruzada e o uso de materiais sustentáveis. A integração entre ambientes sociais e áreas verdes externas transforma a experiência de morar.",
            },
          ],
        },
      ],
    },
  ];

  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`  ✓ Artigo: ${post.title}`);
  }

  console.log("\n🎉 SEED EXECUTADO COM SUCESSO NO SANITY!");
  console.log("Todos os autores, cidades, categorias e posts com imagens foram cadastrados com sucesso!\n");
}

runSeed().catch((err) => {
  console.error("❌ Erro durante a execução do seed:", err);
  process.exit(1);
});
