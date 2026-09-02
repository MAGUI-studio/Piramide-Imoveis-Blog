

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y2fjdwuo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || "sk0yWvRPK6Qi459wVyouH7GF8ZoDWlnaNmev2dZCrE2AZsI3fGHSJY5lN73DjOJpN2QAu4PIpAS61Sp7SvhueqfDZSfHAcQFZFOgJowyiQTUFfTq0TbszQoXIzfN9aziw92skWd0EJCOIrX8EbbAuAqpuqXrUcCwL2JmKnI3XNA8wmlFfWqh";

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

async function runSeed() {
  console.log(`\n🚀 Iniciando Reset & Seed Expandido no Sanity (${projectId} / ${dataset})...\n`);

  
  console.log("🧹 Apagando dados anteriores (posts, autores, cidades, categorias)...");
  try {
    await client.delete({
      query: `*[_type in ["post", "author", "city", "category"]]`,
    });
    console.log("  ✓ Banco de dados limpo com sucesso!\n");
  } catch (err) {
    console.warn("  ⚠️ Aviso ao limpar banco:", err);
  }

  
  console.log("📸 Fazendo upload de imagens de cidades, categorias, autores e posts...");

  
  const imgSjc = await uploadImageFromUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", "sjc.jpg");
  const imgUbatuba = await uploadImageFromUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", "ubatuba.jpg");
  const imgJacarei = await uploadImageFromUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop", "jacarei.jpg");
  const imgCampos = await uploadImageFromUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop", "campos.jpg");
  const imgTaubate = await uploadImageFromUrl("https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200&auto=format&fit=crop", "taubate.jpg");
  const imgCaragua = await uploadImageFromUrl("https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", "caragua.jpg");
  const imgIlhabela = await uploadImageFromUrl("https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop", "ilhabela.jpg");
  const imgSaoSebastiao = await uploadImageFromUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", "sao_sebastiao.jpg");

  
  const imgMercado = await uploadImageFromUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", "mercado.jpg");
  const imgFinanciamento = await uploadImageFromUrl("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop", "financiamento.jpg");
  const imgLuxo = await uploadImageFromUrl("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop", "luxo.jpg");
  const imgArquitetura = await uploadImageFromUrl("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop", "arquitetura.jpg");
  const imgGastronomia = await uploadImageFromUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop", "gastronomia.jpg");
  const imgLancamentos = await uploadImageFromUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop", "lancamentos.jpg");
  const imgSustentabilidade = await uploadImageFromUrl("https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop", "sustentabilidade.jpg");
  const imgInvestimentos = await uploadImageFromUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", "investimentos.jpg");
  const imgJuridico = await uploadImageFromUrl("https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop", "juridico.jpg");

  
  const imgAvatarGuilherme = await uploadImageFromUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", "avatar_guilherme.jpg");
  const imgAvatarAna = await uploadImageFromUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", "avatar_ana.jpg");
  const imgAvatarMarcos = await uploadImageFromUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", "avatar_marcos.jpg");
  const imgAvatarCarla = await uploadImageFromUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", "avatar_carla.jpg");
  const imgAvatarFelipe = await uploadImageFromUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", "avatar_felipe.jpg");
  const imgAvatarRedacao = await uploadImageFromUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", "avatar_redacao.jpg");

  
  console.log("\n👤 Criando 6 Autores...");
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
      email: "guilherme@piramideimoveis.com.br",
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
      email: "ana.silva@piramideimoveis.com.br",
    },
    {
      _id: "author-marcos-oliveira",
      _type: "author",
      name: "Marcos Oliveira",
      slug: { _type: "slug", current: "marcos-oliveira" },
      role: "Arquiteto Urbanista & Consultor de Alto Padrão",
      creci: "CAU A89230-1",
      image: imgAvatarMarcos,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Arquiteto focado em projetos contemporâneos, integração biofílica e condomínios fechados em São José dos Campos e Campos do Jordão.",
            },
          ],
        },
      ],
      linkedinUrl: "https://www.linkedin.com/company/piramide-im%C3%B3veis-queops-ltda",
      email: "marcos.arquiteto@piramideimoveis.com.br",
    },
    {
      _id: "author-carla-mendes",
      _type: "author",
      name: "Carla Mendes",
      slug: { _type: "slug", current: "carla-mendes" },
      role: "Advogada Especialista em Direito Imobiliário & Regularização",
      creci: "OAB/SP 340.890",
      image: imgAvatarCarla,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Assessora jurídica com foco em due diligence imobiliária, contratos de compra e venda, usufruto e estruturação de patrimônio familiar.",
            },
          ],
        },
      ],
      email: "juridico@piramideimoveis.com.br",
    },
    {
      _id: "author-felipe-santos",
      _type: "author",
      name: "Felipe Santos",
      slug: { _type: "slug", current: "felipe-santos" },
      role: "Especialista em Litoral Norte & Casas de Praia",
      creci: "CRECI 18902-F",
      image: imgAvatarFelipe,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Consultor focado em imóveis de veraneio e investimento por temporada em Ubatuba, Ilhabela e São Sebastião.",
            },
          ],
        },
      ],
      instagramUrl: "https://www.instagram.com/piramideimoveis",
      email: "felipe.litoral@piramideimoveis.com.br",
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

  
  console.log("\n📍 Criando 8 Cidades...");
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
    {
      _id: "city-taubate",
      _type: "city",
      name: "Taubaté",
      slug: { _type: "slug", current: "taubate" },
      state: "SP",
      image: imgTaubate,
      description: "Importante polo universitário e industrial do Vale, com forte expansão de bairros planejados e condomínios de médio e alto padrão.",
    },
    {
      _id: "city-caraguatatuba",
      _type: "city",
      name: "Caraguatatuba",
      slug: { _type: "slug", current: "caraguatatuba" },
      state: "SP",
      image: imgCaragua,
      description: "Principal polo comercial e de serviços do Litoral Norte, com nova infraestrutura viária e empreendimentos frente ao mar.",
    },
    {
      _id: "city-ilhabela",
      _type: "city",
      name: "Ilhabela",
      slug: { _type: "slug", current: "ilhabela" },
      state: "SP",
      image: imgIlhabela,
      description: "Paraíso insular de preservação e luxo, com mansões à beira-mar, marinas e alta valorização imobiliária internacional.",
    },
    {
      _id: "city-sao-sebastiao",
      _type: "city",
      name: "São Sebastião",
      slug: { _type: "slug", current: "sao-sebastiao" },
      state: "SP",
      image: imgSaoSebastiao,
      description: "Abriga praias icônicas como Maresias, Juquehy e Baleia, com casas de alto padrão e condomínios exclusivos.",
    },
  ];

  for (const city of cities) {
    await client.createOrReplace(city);
    console.log(`  ✓ Cidade: ${city.name} (${city.state})`);
  }

  
  console.log("\n🏷️ Criando 10 Categorias...");
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
    {
      _id: "category-lancamentos-exclusivos",
      _type: "category",
      title: "Lançamentos Exclusivos",
      slug: { _type: "slug", current: "lancamentos" },
      image: imgLancamentos,
      description: "Empreendimentos na planta, condomínios fechados recém-lançados e oportunidades em primeira mão.",
    },
    {
      _id: "category-investimentos-rentabilidade",
      _type: "category",
      title: "Investimentos & Rentabilidade",
      slug: { _type: "slug", current: "investimentos" },
      image: imgInvestimentos,
      description: "Como montar uma carteira de imóveis para renda passiva, locação por temporada e ganho de capital.",
    },
    {
      _id: "category-sustentabilidade-biofilia",
      _type: "category",
      title: "Sustentabilidade & Biofilia",
      slug: { _type: "slug", current: "sustentabilidade" },
      image: imgSustentabilidade,
      description: "Energia solar, reuso de água e integração da vegetação nativa no design residencial moderno.",
    },
    {
      _id: "category-juridico-documentacao",
      _type: "category",
      title: "Jurídico & Documentação",
      slug: { _type: "slug", current: "juridico" },
      image: imgJuridico,
      description: "Passo a passo de escritura, registro em cartório, ITBI e cuidados essenciais na compra do imóvel.",
    },
  ];

  for (const category of categories) {
    await client.createOrReplace(category);
    console.log(`  ✓ Categoria: ${category.title}`);
  }

  
  console.log("\n📰 Criando 10 Artigos Detalhados com Destaques e Tópicos...");
  const posts = [
    {
      _id: "post-financiamento-2026",
      _type: "post",
      title: "Como Funciona o Financiamento Imobiliário em 2026: Guia de Taxas e FGTS",
      slug: { _type: "slug", current: "como-funciona-o-financiamento-imobiliario-em-2026" },
      featured: true,
      publishedAt: new Date("2026-02-15T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T15:30:00Z").toISOString(),
      excerpt: "Entenda a diferença prática entre Tabela SAC e Price, como usar o FGTS na entrada e as estratégias comprovadas para conseguir a menor taxa de juros na compra do seu imóvel.",
      mainImage: {
        ...imgFinanciamento,
        alt: "Simulação de financiamento imobiliário e cálculo de taxas de juros no computador",
        caption: "Planejamento financeiro inteligente: compare Tabela SAC vs Price e use o FGTS a seu favor.",
      },
      highlight1Title: "SAC vs Price sem Segredos",
      highlight1Description: "Qual modalidade gera mais economia de juros no longo prazo para o comprador",
      highlight2Title: "Uso Estratégico do FGTS",
      highlight2Description: "Como abater o valor de entrada e amortizar parcelas com máxima eficiência financeira",
      highlight3Title: "Menores Taxas Bancárias",
      highlight3Description: "Estratégias práticas para negociar o Custo Efetivo Total direto com os principais bancos",
      author: { _type: "reference", _ref: "author-ana-silva" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [{ _type: "reference", _ref: "category-financiamento-credito" }],
      tags: ["Financiamento", "Tabela SAC", "Tabela Price", "FGTS", "Crédito Imobiliário"],
      metaTitle: "Financiamento Imobiliário 2026: Tabela SAC vs Price e Dicas de Juros",
      metaDescription: "Entenda tudo sobre financiamento imobiliário em 2026. Compare SAC vs Price, saiba como usar o FGTS na entrada e consiga as menores taxas de juros com a Pirâmide.",
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
              text: "2. Como utilizar seu FGTS com inteligência",
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
      updatedAt: new Date("2026-03-01T18:00:00Z").toISOString(),
      excerpt: "Com novos centros comerciais, infraestrutura planejada e condomínios de alto padrão, a Zona Oeste de São José dos Campos consolida-se como o maior polo de liquidez imobiliária.",
      mainImage: {
        ...imgLuxo,
        alt: "Praça Ulisses Guimarães e edifícios modernos no Jardim Aquarius, São José dos Campos",
        caption: "Jardim Aquarius e Urbanova: polos de alta valorização e qualidade de vida na Zona Oeste de SJC.",
      },
      highlight1Title: "Polo de Alta Liquidez",
      highlight1Description: "Imóveis que valorizam acima da média estadual no Vale do Paraíba",
      highlight2Title: "Qualidade de Vida & Parques",
      highlight2Description: "Ciclovias, praças arborizadas e segurança patrimonial nos condomínios fechados",
      highlight3Title: "Infraestrutura Completa",
      highlight3Description: "Comércio cosmopolita, colégios de ponta e gastronomia renomada",
      author: { _type: "reference", _ref: "author-guilherme-bustamante" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-mercado-imobiliario" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      tags: ["Jardim Aquarius", "Urbanova", "São José dos Campos", "Valorização", "Alto Padrão"],
      metaTitle: "Jardim Aquarius e Urbanova em SJC: Por que Morar e Investir",
      metaDescription: "Conheça o Jardim Aquarius e Urbanova em São José dos Campos. Infraestrutura completa, praças, escolas renomadas, gastronomia e imóveis de alto padrão na Pirâmide Imóveis.",
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
      updatedAt: new Date("2026-03-01T16:00:00Z").toISOString(),
      excerpt: "Descubra quais praias de Ubatuba oferecem o melhor retorno sobre o investimento (ROI) para locação via plataformas digitais e valorização patrimonial a médio prazo.",
      mainImage: {
        ...imgUbatuba,
        alt: "Praia de Ubatuba com mar calmo e vegetação nativa preservada no Litoral Norte de SP",
        caption: "Ubatuba combina valorização acelerada com alta liquidez em locação por temporada.",
      },
      highlight1Title: "Retorno com Temporada",
      highlight1Description: "Taxas de ocupação elevadas durante todos os meses do ano",
      highlight2Title: "Praias Mais Valorizadas",
      highlight2Description: "Praia Grande, Tenório, Toninhas e Enseada em grande destaque",
      highlight3Title: "Liquidez e Valorização",
      highlight3Description: "Alta procura por casas modernas e apartamentos próximos ao mar",
      author: { _type: "reference", _ref: "author-felipe-santos" },
      city: { _type: "reference", _ref: "city-ubatuba" },
      categories: [
        { _type: "reference", _ref: "category-mercado-imobiliario" },
        { _type: "reference", _ref: "category-cidades-bairros" },
        { _type: "reference", _ref: "category-investimentos-rentabilidade" },
      ],
      tags: ["Ubatuba", "Litoral Norte", "Temporada", "Investimento", "Praia"],
      metaTitle: "Investir em Imóveis em Ubatuba: Oportunidades no Litoral Norte",
      metaDescription: "Descubra por que Ubatuba atrai investidores de São Paulo e Vale do Paraíba. Oportunidades frente ao mar e alto retorno em locação de temporada.",
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
      updatedAt: new Date("2026-03-01T16:30:00Z").toISOString(),
      excerpt: "Conheça os elementos que definem as mansões contemporâneas: integração com a natureza, biofilia, concreto aparente, madeira nobre e automação residencial completa.",
      mainImage: {
        ...imgArquitetura,
        alt: "Living integrado de mansão moderna com iluminação em LED e materiais naturais",
        caption: "Arquitetura autoral: design contemporâneo que valoriza o imóvel no Vale do Paraíba.",
      },
      author: { _type: "reference", _ref: "author-marcos-oliveira" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-arquitetura-design" },
      ],
      tags: ["Arquitetura", "Design", "Alto Padrão", "Biofilia", "Luxo"],
      metaTitle: "Tendências de Arquitetura Autoral em Casas de Luxo no Vale",
      metaDescription: "Confira as principais tendências de arquitetura e interiores para 2026: biofilia, concreto aparente, madeira natural e automação residencial para valorizar seu imóvel.",
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
    {
      _id: "post-campos-do-jordao-casas-de-campo",
      _type: "post",
      title: "Campos do Jordão: Como Escolher a Casa de Campo Perfeita na Serra",
      slug: { _type: "slug", current: "campos-do-jordao-como-escolher-casa-de-campo-perfeita" },
      featured: false,
      publishedAt: new Date("2026-02-24T11:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T19:30:00Z").toISOString(),
      excerpt: "Guia com as melhores regiões de Campos do Jordão: Capivari, Alto do Capivari, Jaguaribe e condomínios com vista panorâmica para a Pedra do Baú.",
      mainImage: {
        ...imgCampos,
        alt: "Casa de campo em estilo alpino com vista para as montanhas de Campos do Jordão",
        caption: "Campos do Jordão: sofisticação e alta procura por casas de temporada na Serra da Mantiqueira.",
      },
      author: { _type: "reference", _ref: "author-guilherme-bustamante" },
      city: { _type: "reference", _ref: "city-campos-do-jordao" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      tags: ["Campos do Jordão", "Serra da Mantiqueira", "Casa de Campo", "Capivari", "Luxo"],
      metaTitle: "Casas de Campo em Campos do Jordão: Refúgio de Luxo na Serra",
      metaDescription: "Guia completo para comprar ou investir em casas de campo e chalés em Campos do Jordão. Alto Capivari, Jaguaribe e condomínios exclusivos na Mantiqueira.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Ter um refúgio na Serra da Mantiqueira combina o clima agradável de montanha com a valorização de um patrimônio exclusivo. Descubra como avaliar a orientação solar, o isolamento térmico e a facilidade de acesso no inverno.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-documentacao-imovel-passo-a-passo",
      _type: "post",
      title: "Documentação na Compra de Imóveis: O Passo a Passo para Não Correr Riscos",
      slug: { _type: "slug", current: "documentacao-compra-imoveis-passo-a-passo-seguranca" },
      featured: false,
      publishedAt: new Date("2026-02-23T14:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T17:30:00Z").toISOString(),
      excerpt: "Certidões negativas, matrícula atualizada, escritura pública e ITBI: saiba exatamente quais documentos checar antes de assinar o contrato de compra e venda.",
      mainImage: {
        ...imgJuridico,
        alt: "Contrato de compra e venda de imóvel e certidões cartorárias em mesa executiva",
        caption: "Due diligence jurídica: a checagem rigorosa de certidões e matrícula garante segurança total.",
      },
      author: { _type: "reference", _ref: "author-carla-mendes" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [{ _type: "reference", _ref: "category-juridico-documentacao" }],
      tags: ["Documentação", "Segurança Jurídica", "Escritura", "ITBI", "Cartório"],
      metaTitle: "Documentos para Comprar Imóvel sem Riscos | Checklist Jurídico",
      metaDescription: "Checklist completo de documentos e certidões obrigatórias para compra de imóveis com segurança jurídica. Evite surpresas com a consultoria da Pirâmide Imóveis.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "A segurança jurídica é o pilar mais importante de qualquer transação imobiliária. A due diligence preventiva identifica pendências fiscais, trabalhistas ou judiciais dos vendedores, blindando o patrimônio do comprador.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-ilhabela-sao-sebastiao-alto-padrao",
      _type: "post",
      title: "Ilhabela e São Sebastião: As Praias Mais Exclusivas para Investir em 2026",
      slug: { _type: "slug", current: "ilhabela-sao-sebastiao-praias-exclusivas-investir" },
      featured: false,
      publishedAt: new Date("2026-02-22T17:30:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T20:00:00Z").toISOString(),
      excerpt: "Maresias, Juquehy, Praia da Baleia e o sul de Ilhabela: por que essas praias mantêm o metro quadrado mais valorizado de todo o litoral paulista.",
      mainImage: {
        ...imgIlhabela,
        alt: "Mansão pé na areia com píer privativo e vista panorâmica para o mar em Ilhabela",
        caption: "Ilhabela é referência internacional em exclusividade náutica e propriedades de altíssimo padrão.",
      },
      author: { _type: "reference", _ref: "author-felipe-santos" },
      city: { _type: "reference", _ref: "city-ilhabela" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-investimentos-rentabilidade" },
      ],
      tags: ["Ilhabela", "São Sebastião", "Pé na Areia", "Maresias", "Juquehy"],
      metaTitle: "Mansões em Ilhabela e São Sebastião: Luxo Pé na Areia no Litoral",
      metaDescription: "Explore as propriedades mais exclusivas de Ilhabela e São Sebastião. Mansões pé na areia, condomínios fechados e alto padrão náutico com a Pirâmide Imóveis.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "O público de alta renda busca cada vez mais condomínios fechados pé na areia com infraestrutura de lazer náutico e serviços de hotelaria integrados.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-jacarei-expansao-condominios-fechados",
      _type: "post",
      title: "Jacareí em Expansão: Por que Famílias Escolhem os Condomínios da Região",
      slug: { _type: "slug", current: "jacarei-expansao-condominios-fechados-qualidade-vida" },
      featured: false,
      publishedAt: new Date("2026-02-21T08:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T18:30:00Z").toISOString(),
      excerpt: "A poucos minutos de São José dos Campos, Jacareí oferece terrenos mais amplos, condomínios com infraestrutura de clube e excelente custo-benefício por m².",
      mainImage: {
        ...imgJacarei,
        alt: "Condomínio fechado com casas de alto padrão e ampla área verde em Jacareí SP",
        caption: "Jacareí oferece terrenos generosos e infraestrutura de clube a poucos minutos de SJC.",
      },
      author: { _type: "reference", _ref: "author-redacao-piramide" },
      city: { _type: "reference", _ref: "city-jacarei" },
      categories: [
        { _type: "reference", _ref: "category-cidades-bairros" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Jacareí", "Condomínio Fechado", "Custo-Benefício", "Qualidade de Vida", "Vale do Paraíba"],
      metaTitle: "Condomínios Fechados em Jacareí: Alto Padrão e Custo por m²",
      metaDescription: "Descubra as vantagens de morar em condomínios fechados em Jacareí. Excelente custo por m², lazer completo, segurança e acesso rápido à Dutra e Carvalho Pinto.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Com a duplicação de vias de acesso e a proximidade com a Dutra e Carvalho Pinto, Jacareí tornou-se uma das escolhas preferidas para quem deseja morar em casa com muito espaço e segurança.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-gastronomia-vale-do-paraiba",
      _type: "post",
      title: "Roteiro Gastronômico: Os Melhores Restaurantes do Aquarius e Esplanada",
      slug: { _type: "slug", current: "roteiro-gastronomico-restaurantes-aquarius-esplanada" },
      featured: false,
      publishedAt: new Date("2026-02-19T19:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T21:30:00Z").toISOString(),
      excerpt: "Conheça as melhores opções de bistrôs, culinária italiana autêntica, alta gastronomia japonesa e cafeterias especiais em São José dos Campos.",
      mainImage: {
        ...imgGastronomia,
        alt: "Mesa posta de restaurante contemporâneo na Vila Ema e Jardim Aquarius em SJC",
        caption: "Vila Ema e Jardim Aquarius: os polos gastronômicos mais renomados de São José dos Campos.",
      },
      author: { _type: "reference", _ref: "author-redacao-piramide" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-gastronomia-lifestyle" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      tags: ["Gastronomia", "Jardim Aquarius", "Vila Ema", "Jardim Esplanada", "Lifestyle"],
      metaTitle: "Roteiro Gastronômico no Aquarius e Esplanada em SJC | Pirâmide",
      metaDescription: "Conheça os melhores restaurantes, bistrôs e cafés no Jardim Aquarius, Esplanada e Vila Ema em São José dos Campos. O guia gastronômico da Pirâmide Imóveis.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "A cena gastronômica de São José dos Campos evoluiu expressivamente, trazendo chefs premiados e conceitos cosmopolitas para os bairros mais nobres da cidade.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-sustentabilidade-energia-solar-imoveis",
      _type: "post",
      title: "Casas Sustentáveis: Como a Energia Solar e a Biofilia Valorizam seu Imóvel",
      slug: { _type: "slug", current: "casas-sustentaveis-energia-solar-biofilia-valorizacao" },
      featured: false,
      publishedAt: new Date("2026-02-18T15:20:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T22:30:00Z").toISOString(),
      excerpt: "Imóveis com certificação verde, placas fotovoltaicas e sistemas de reúso de água vendem até 25% mais rápido e geram economia real na conta de consumo.",
      mainImage: {
        ...imgSustentabilidade,
        alt: "Residência sustentável com painéis solares e integração paisagística com a natureza",
        caption: "Eficiência energética e arquitetura sustentável aumentam o valor de revenda do imóvel.",
      },
      author: { _type: "reference", _ref: "author-marcos-oliveira" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-sustentabilidade-biofilia" },
        { _type: "reference", _ref: "category-arquitetura-design" },
      ],
      tags: ["Sustentabilidade", "Energia Solar", "Biofilia", "Casas Inteligentes", "Valorização"],
      metaTitle: "Casas Sustentáveis e Energia Solar: Valorização Imobiliária",
      metaDescription: "Saiba como a energia solar, reúso de água e biofilia valorizam imóveis no Vale do Paraíba. Economia real e liquidez acelerada com a Pirâmide Imóveis.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "A eficiência energética e o conforto térmico natural não são apenas escolhas ecológicas, mas também decisões financeiras que aumentam a liquidez e a percepção de valor do imóvel.",
            },
          ],
        },
      ],
    },
  ];

  for (const post of posts) {
    const preparedPost = {
      ...post,
      categories: (post.categories || []).map((cat: any, idx: number) => ({
        ...cat,
        _key: cat._key || `cat_${idx}_${cat._ref || Math.random().toString(36).substring(2, 7)}`,
      })),
      body: (post.body || []).filter(Boolean).map((block: any, idx: number) => ({
        ...block,
        _key: block._key || `blk_${idx}_${Math.random().toString(36).substring(2, 7)}`,
        ...(block.children
          ? {
              children: block.children.filter(Boolean).map((child: any, cIdx: number) => ({
                ...child,
                _key: child._key || `span_${cIdx}_${Math.random().toString(36).substring(2, 7)}`,
              })),
            }
          : {}),
      })),
    };
    await client.createOrReplace(preparedPost);
    console.log(`  ✓ Artigo: ${post.title}`);
  }

  console.log("\n🎉 SEED EXPANDIDO CONCLUÍDO COM SUCESSO!");
  console.log("6 Autores, 8 Cidades, 10 Categorias e 10 Artigos com imagens em alta resolução foram cadastrados no Sanity!\n");
}

runSeed().catch((err) => {
  console.error("❌ Erro durante a execução do seed:", err);
  process.exit(1);
});
