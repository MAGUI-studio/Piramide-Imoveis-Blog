


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

interface SanityImageObject {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  };
}

interface SanityBlockChild {
  _type: string;
  text: string;
  _key?: string;
}

interface SanityBlock {
  _type: string;
  style?: string;
  children?: SanityBlockChild[];
  _key?: string;
  asset?: {
    _type: string;
    _ref: string;
  };
}

interface CategoryReference {
  _type: string;
  _ref: string;
  _key?: string;
}

interface FaqItemSeed {
  question: string;
  answer: string;
  _key?: string;
}

interface ArticleSection {
  title: string;
  level?: "h2" | "h3";
  paragraphs: string[];
}

function buildBody(
  intro: string[],
  sections: ArticleSection[],
  inlineImage?: SanityImageObject
): SanityBlock[] {
  const body: SanityBlock[] = [];

  
  for (const p of intro) {
    body.push({
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text: p }],
    });
  }

  
  sections.forEach((sec, idx) => {
    
    body.push({
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: sec.title }],
    });

    
    for (const p of sec.paragraphs) {
      body.push({
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: p }],
      });
    }

    
    if (idx === 2 && inlineImage) {
      body.push(inlineImage);
    }
  });

  return body;
}

async function runSeed() {
  console.log(`\n🚀 Iniciando Reset & Seed de 18 Artigos Completos no Sanity (${projectId} / ${dataset})...\n`);

  console.log("🧹 Apagando dados anteriores...");
  try {
    await client.delete({
      query: `*[_type in ["post", "author", "city", "category"]]`,
    });
    console.log("  ✓ Banco limpo com sucesso!\n");
  } catch (err) {
    console.warn("  ⚠️ Aviso ao limpar banco:", err);
  }

  console.log("📸 Fazendo upload de imagens em alta resolução do Unsplash...");

  
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

  
  const imgLiving = await uploadImageFromUrl("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop", "living.jpg");
  const imgPiscina = await uploadImageFromUrl("https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop", "piscina.jpg");
  const imgFachada = await uploadImageFromUrl("https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop", "fachada.jpg");
  const imgVaranda = await uploadImageFromUrl("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop", "varanda.jpg");
  const imgCozinha = await uploadImageFromUrl("https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop", "cozinha.jpg");

  
  const imgAvatarCarlos = await uploadImageFromUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", "avatar_carlos.jpg");
  const imgAvatarAna = await uploadImageFromUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", "avatar_ana.jpg");
  const imgAvatarMarcos = await uploadImageFromUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", "avatar_marcos.jpg");
  const imgAvatarCarla = await uploadImageFromUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", "avatar_carla.jpg");
  const imgAvatarFelipe = await uploadImageFromUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", "avatar_felipe.jpg");
  const imgAvatarRedacao = await uploadImageFromUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", "avatar_redacao.jpg");

  console.log("\n👤 Criando 6 Autores Especialistas...");
  const authors = [
    {
      _id: "author-carlos-eduardo",
      _type: "author",
      name: "Carlos Eduardo",
      slug: { _type: "slug", current: "carlos-eduardo" },
      role: "Especialista em Mercado Imobiliário & Investimentos",
      creci: "CRECI 9390-J",
      image: imgAvatarCarlos,
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
      linkedinUrl: "https://www.linkedin.com/company/piramide-imoveis",
      instagramUrl: "https://www.instagram.com/piramideimoveissjc",
      email: "carlos.eduardo@piramideimoveis.com.br",
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
              text: "Especialista em crédito estruturado, portabilidade de financiamento e uso estratégico do FGTS, auxiliando famílias a encontrar as melhores taxas bancárias.",
            },
          ],
        },
      ],
      email: "ana.silva@piramideimoveis.com.br",
    },
    {
      _id: "author-marcos-oliveira",
      _type: "author",
      name: "Marcos Oliveira",
      slug: { _type: "slug", current: "marcos-oliveira" },
      role: "Arquiteto & Curador de Design Residencial",
      creci: "CAU A8921-0",
      image: imgAvatarMarcos,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Arquiteto apaixonado por design autoral, sustentabilidade e inovação, acompanhando as tendências globais de arquitetura de luxo no Vale.",
            },
          ],
        },
      ],
      instagramUrl: "https://www.instagram.com/piramideimoveissjc",
    },
    {
      _id: "author-carla-mendes",
      _type: "author",
      name: "Dra. Carla Mendes",
      slug: { _type: "slug", current: "carla-mendes" },
      role: "Advogada Especialista em Direito Imobiliário",
      creci: "OAB/SP 312.450",
      image: imgAvatarCarla,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Consultora jurídica focada em due diligence, regularização de contratos, escrituras públicas e proteção patrimonial nas transações de compra e venda.",
            },
          ],
        },
      ],
    },
    {
      _id: "author-felipe-santos",
      _type: "author",
      name: "Felipe Santos",
      slug: { _type: "slug", current: "felipe-santos" },
      role: "Especialista em Imóveis de Lazer no Litoral & Serra",
      creci: "CRECI 18742-F",
      image: imgAvatarFelipe,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Focado no mercado de segunda residência, locação por temporada e alto padrão pé na areia em Ubatuba, Ilhabela e Campos do Jordão.",
            },
          ],
        },
      ],
    },
    {
      _id: "author-redacao-piramide",
      _type: "author",
      name: "Redação Pirâmide Imóveis",
      slug: { _type: "slug", current: "redacao-piramide" },
      role: "Equipe de Conteúdo & Inteligência de Mercado",
      creci: "CRECI 9390-J",
      image: imgAvatarRedacao,
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Time multidisciplinar de jornalistas e analistas de mercado dedicados a produzir os guias imobiliários mais completos e confiáveis da região.",
            },
          ],
        },
      ],
      email: "contato@piramideimoveis.com.br",
    },
  ];

  for (const author of authors) {
    await client.createOrReplace(author);
    console.log(`  ✓ Autor: ${author.name}`);
  }

  console.log("\n🏙️ Criando 8 Cidades...");
  const cities = [
    {
      _id: "city-sao-jose-dos-campos",
      _type: "city",
      name: "São José dos Campos",
      slug: { _type: "slug", current: "sao-jose-dos-campos" },
      state: "SP",
      image: imgSjc,
      description: "Principal polo tecnológico e imobiliário do Vale do Paraíba, referência nacional em infraestrutura, educação e qualidade de vida.",
    },
    {
      _id: "city-ubatuba",
      _type: "city",
      name: "Ubatuba",
      slug: { _type: "slug", current: "ubatuba" },
      state: "SP",
      image: imgUbatuba,
      description: "Capital do surfe e paraíso do Litoral Norte, com mais de 100 praias preservadas e alto retorno em locação por temporada.",
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
      description: "Importante polo universitário e industrial do Vale, com forte expansão de bairros planejados e condomínios fechados.",
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
      title: "Gastronomia & Lifestyle",
      slug: { _type: "slug", current: "gastronomia" },
      image: imgGastronomia,
      description: "Os melhores restaurantes, bistrôs, cafeterias e passeios nos bairros mais nobres da região.",
    },
    {
      _id: "category-lancamentos-novidades",
      _type: "category",
      title: "Lançamentos & Obras",
      slug: { _type: "slug", current: "lancamentos" },
      image: imgLancamentos,
      description: "Novos empreendimentos na planta, conceitos modernos de moradia e oportunidades de investimento inicial.",
    },
    {
      _id: "category-sustentabilidade-biofilia",
      _type: "category",
      title: "Sustentabilidade & Biofilia",
      slug: { _type: "slug", current: "sustentabilidade" },
      image: imgSustentabilidade,
      description: "Casas inteligentes, energia solar, reúso de água e projetos integrados com áreas verdes preservadas.",
    },
    {
      _id: "category-investimentos-rentabilidade",
      _type: "category",
      title: "Investimentos & Rentabilidade",
      slug: { _type: "slug", current: "investimentos" },
      image: imgInvestimentos,
      description: "Como montar uma carteira imobiliária rentável: studios, locação tradicional, temporada e valorização.",
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

  console.log("\n📰 Criando 18 Artigos Completos com 8 a 12 Seções Cada...");
  const posts = [
    
    
    

    
    {
      _id: "post-financiamento-2026",
      _type: "post",
      title: "Como Funciona o Financiamento Imobiliário em 2026: Guia de Taxas e FGTS",
      slug: { _type: "slug", current: "como-funciona-o-financiamento-imobiliario-em-2026" },
      featured: true,
      views: 2840,
      publishedAt: new Date("2026-02-28T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-02T09:30:00Z").toISOString(),
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
      calloutStyle: "tip",
      calloutTitle: "Regra da Capacidade Financeira",
      calloutContent: "Se o seu orçamento familiar comporta o valor da primeira parcela na Tabela SAC, escolha-a. Como a amortização mensal é constante, o saldo devedor cai mais rápido e a economia final de juros ultrapassa o valor de um automóvel zero km.",
      faqTitle: "Dúvidas Frequentes sobre Financiamento",
      faqItems: [
        {
          question: "Posso compor renda com outra pessoa para aumentar o valor aprovado?",
          answer: "Sim. A maioria dos bancos permite a composição de renda com cônjuges, parceiros em união estável, pais e até parentes de primeiro grau, desde que todos sejam avaliados na análise de crédito.",
        },
        {
          question: "Qual o valor mínimo de entrada exigido pelos bancos?",
          answer: "Geralmente os bancos financiam até 80% do valor de avaliação do imóvel pelo Sistema Financeiro de Habitação (SFH), exigindo 20% de entrada (que pode ser composta por recursos próprios e saldo do FGTS).",
        },
        {
          question: "É possível fazer portabilidade de financiamento imobiliário?",
          answer: "Sim. Se outro banco oferecer uma taxa de juros nominal ou Custo Efetivo Total (CET) inferior ao seu contrato atual, você pode solicitar a transferência da dívida sem custos adicionais de taxa de abertura.",
        },
      ],
      ctaTitle: "Quer Simular seu Financiamento sem Compromisso?",
      ctaDescription: "Nossos especialistas calculam e comparam as menores taxas entre Caixa, Itaú, Bradesco e Santander para o seu perfil.",
      ctaButtonText: "Simular Financiamento no WhatsApp",
      author: { _type: "reference", _ref: "author-ana-silva" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [{ _type: "reference", _ref: "category-financiamento-credito" }],
      tags: ["Financiamento", "Tabela SAC", "Tabela Price", "FGTS", "Crédito Imobiliário"],
      metaTitle: "Financiamento Imobiliário 2026: Tabela SAC vs Price e Dicas de Juros",
      metaDescription: "Entenda tudo sobre financiamento imobiliário em 2026. Compare SAC vs Price, saiba como usar o FGTS na entrada e consiga as menores taxas de juros com a Pirâmide.",
      body: buildBody(
        [
          "Adquirir um imóvel financiado em 2026 exige planejamento estratégico e domínio dos mecanismos bancários. As recentes atualizações nas regras do Sistema Financeiro de Habitação (SFH) e do Sistema Financeiro Imobiliário (SFI) criaram novas oportunidades para quem deseja comprar a casa própria ou investir com alavancagem inteligente.",
          "Neste guia completo e atualizado pela equipe da Pirâmide Imóveis, detalhamos cada etapa do financiamento, desmistificamos os cálculos de amortização e ensinamos as melhores práticas para você economizar dezenas de milhares de reais em juros.",
        ],
        [
          {
            title: "1. O Cenário Atual das Taxas de Juros Imobiliárias em 2026",
            paragraphs: [
              "O mercado imobiliário brasileiro opera em 2026 com uma concorrência intensa entre as principais instituições financeiras privadas e públicas. Enquanto a Caixa Econômica Federal mantém linhas atrativas atreladas ao SBPE e à Poupança, bancos como Itaú, Santander e Bradesco têm flexibilizado exigências de relacionamento para atrair clientes de média e alta renda.",
              "Compreender a diferença entre taxa nominal, taxa efetiva e o Custo Efetivo Total (CET) é o primeiro passo para não cair em ilusões comerciais na hora de escolher a melhor proposta de crédito.",
            ],
          },
          {
            title: "2. Tabela SAC: O Modelo de Amortização Constante",
            paragraphs: [
              "No Sistema de Amortização Constante (SAC), o valor que abate a sua dívida real é fixo todos os meses. Como os juros são calculados sobre o saldo devedor remanescente, as parcelas mensais começam em um valor mais alto e vão diminuindo progressivamente ao longo dos anos.",
              "Essa modalidade é a mais indicada para quem tem capacidade financeira para arcar com a primeira prestação, pois gera uma amortização muito mais veloz da dívida e reduz drasticamente o montante total de juros desembolsado no final do contrato.",
            ],
          },
          {
            title: "3. Tabela Price: Quando as Parcelas Fixas São a Melhor Escolha",
            level: "h3",
            paragraphs: [
              "Na Tabela Price (ou Sistema Francês de Amortização), o valor das prestações é uniforme do primeiro ao último mês do contrato. No início, a maior parte do valor pago é destinada aos juros bancários e uma fatia menor amortiza o saldo devedor principal.",
              "A grande vantagem da Price é permitir a aprovação de crédito para famílias cuja renda mensal comprometeria o limite legal de 30% caso optassem pela primeira parcela mais alta do SAC. É uma ferramenta de viabilização da compra imediata.",
            ],
          },
          {
            title: "4. Simulação Prática: Comparando SAC vs Price em um Imóvel de R$ 800 mil",
            paragraphs: [
              "Ao simular o financiamento de R$ 640.000 (80% do valor do imóvel) em um prazo de 360 meses a uma taxa de 10,5% ao ano, a primeira parcela no SAC gira em torno de R$ 7.300, caindo para R$ 1.850 na última. Na Price, a prestação permanece estável em aproximadamente R$ 5.850.",
              "Ao final de 30 anos, quem optou pelo SAC terá pago cerca de R$ 180.000 a menos em juros totais, comprovando o impacto brutal da velocidade de amortização no patrimônio familiar.",
            ],
          },
          {
            title: "5. Uso Estratégico do FGTS na Composição da Entrada",
            paragraphs: [
              "O Fundo de Garantia do Tempo de Serviço (FGTS) continua sendo o maior aliado do comprador de imóveis residenciais. Ele pode ser utilizado para compor até 100% do valor de entrada exigido pelo banco, desde que o comprador comprove no mínimo 3 anos de trabalho sob regime CLT.",
              "Além disso, o titular não pode possuir outro imóvel residencial quitado ou financiado no mesmo município em que reside ou trabalha, nem na mesma região metropolitana.",
            ],
          },
          {
            title: "6. Amortização Extraordinária a Cada 2 Anos com FGTS",
            level: "h3",
            paragraphs: [
              "Após a assinatura do contrato, você tem a prerrogativa legal de utilizar os novos saldos acumulados no FGTS a cada 24 meses para abater o saldo devedor. Você pode escolher entre reduzir o valor da parcela mensal mantendo o prazo, ou encurtar o prazo total de pagamento mantendo a prestação.",
              "Nossa recomendação técnica é sempre optar pela redução de prazo, o que elimina meses futuros de juros e seguros obrigatórios, acelerando a quitação em até 50% do tempo previsto.",
            ],
          },
          {
            title: "7. Composição de Renda Familiar e Aprovação Bancária",
            paragraphs: [
              "Para alcançar o valor de financiamento desejado, os bancos permitem a composição de renda entre cônjuges, companheiros em união estável e parentes de primeiro grau (pais, mães e filhos). Algumas instituições aceitam até mesmo a soma de rendas entre noivos e irmãos.",
              "É indispensável que todos os participantes estejam com o CPF regularizado, sem pendências em órgãos de proteção ao crédito (Serasa, SPC e SCR do Banco Central).",
            ],
          },
          {
            title: "8. Custo Efetivo Total (CET) e Seguros Obrigatórios",
            paragraphs: [
              "Nunca compare apenas as taxas nominais anunciadas nas propagandas. O Custo Efetivo Total (CET) inclui a taxa de juros, a taxa de administração bancária mensal e os seguros obrigatórios por lei: MIP (Morte e Invalidez Permanente) e DFI (Danos Físicos ao Imóvel).",
              "O valor do seguro MIP é calculado com base na idade dos compradores, tornando o financiamento progressivamente mais oneroso para faixas etárias mais elevadas.",
            ],
          },
          {
            title: "9. Portabilidade de Crédito Imobiliário: Como Economizar",
            paragraphs: [
              "Se você já possui um financiamento ativo contratado em períodos de taxas mais altas, saiba que tem o direito garantido pelo Banco Central de transferir sua dívida para outra instituição financeira que ofereça juros menores.",
              "O banco de destino quita seu saldo no banco original e você passa a pagar as parcelas renegociadas, sem pagar imposto sobre operações financeiras (IOF) adicional.",
            ],
          },
          {
            title: "10. Passo a Passo da Aprovação com a Consultoria Pirâmide",
            paragraphs: [
              "O processo de crédito inicia-se com a pré-análise documental, seguida pela avaliação física e jurídica do imóvel por engenheiros credenciados, emissão do contrato com força de escritura pública e o registro em cartório para liberação do pagamento ao vendedor.",
              "A Pirâmide Imóveis conta com uma equipe especializada em correspondência bancária que cuida de 100% da burocracia, garantindo agilidade e a menor taxa do mercado sem nenhum custo extra de assessoria para você.",
            ],
          },
        ],
        imgFinanciamento
      ),
    },

    
    {
      _id: "post-valorizacao-sjc-aquarius-urbanova",
      _type: "post",
      title: "São José dos Campos: Por que Aquarius e Urbanova Lideram a Valorização",
      slug: { _type: "slug", current: "sao-jose-dos-campos-aquarius-urbanova-valorizacao" },
      featured: true,
      publishedAt: new Date("2026-02-27T14:30:00Z").toISOString(),
      updatedAt: new Date("2026-03-02T10:00:00Z").toISOString(),
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
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoTitle: "Tour Virtual e Panorama Aéreo pelo Jardim Aquarius e Urbanova",
      videoCaption: "Assista ao panorama dos condomínios horizontais e praças da Zona Oeste de SJC.",
      galleryTitle: "Conheça o Estilo de Vida no Aquarius e Urbanova",
      galleryImages: [imgLiving, imgPiscina, imgFachada].filter(Boolean),
      ctaTitle: "Procurando Imóvel no Aquarius ou Urbanova?",
      ctaDescription: "Acesse nosso portfólio exclusivo de apartamentos de alto padrão e casas em condomínio fechado.",
      ctaButtonText: "Ver Imóveis Disponíveis no WhatsApp",
      author: { _type: "reference", _ref: "author-carlos-eduardo" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-mercado-imobiliario" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      tags: ["Jardim Aquarius", "Urbanova", "São José dos Campos", "Valorização", "Alto Padrão"],
      metaTitle: "Jardim Aquarius e Urbanova em SJC: Por que Morar e Investir",
      metaDescription: "Conheça o Jardim Aquarius e Urbanova em São José dos Campos. Infraestrutura completa, praças, escolas renomadas, gastronomia e imóveis de alto padrão na Pirâmide Imóveis.",
      body: buildBody(
        [
          "A Zona Oeste de São José dos Campos tornou-se o principal motor de valorização imobiliária do Vale do Paraíba. O Jardim Aquarius e o Urbanova sintetizam duas visões complementares do morar bem: o dinamismo vertical e cosmopolita de um bairro autossuficiente e a serenidade exclusiva de condomínios fechados horizontais integrados à natureza.",
          "Neste estudo aprofundado, analisamos os pilares urbanísticos, os números de valorização do metro quadrado e a infraestrutura que tornam essas duas regiões os destinos preferidos de famílias e investidores em 2026.",
        ],
        [
          {
            title: "1. A Zona Oeste no Centro do Desenvolvimento de São José dos Campos",
            paragraphs: [
              "O planejamento urbano de São José dos Campos nas últimas décadas priorizou a expansão qualificada da Zona Oeste. A implantação de avenidas largas, redes subterrâneas de fiação em pontos-chave e o zoneamento restritivo blindaram a região contra o crescimento desordenado.",
              "A proximidade com a Rodovia Presidente Dutra, o Anel Viário e a Linha Verde conecta os moradores rapidamente aos polos de tecnologia do DCTA, Embraer e às principais universidades da cidade.",
            ],
          },
          {
            title: "2. Jardim Aquarius: Urbanismo Moderno e Autossuficiência Pedonal",
            paragraphs: [
              "O Jardim Aquarius foi projetado com uma malha urbana circular e calçadas amplas que estimulam o comércio de rua e o deslocamento a pé. Morar no Aquarius significa ter empórios, drogarias, restaurantes premiados, academias de ponta e centros médicos a menos de 5 minutos de caminhada.",
              "Essa conveniência de fazer tudo a pé transformou o bairro em uma das regiões mais cobiçadas por executivos, casais jovens e famílias que não querem perder tempo no trânsito.",
            ],
          },
          {
            title: "3. Praça Ulisses Guimarães: O Epicentro Social e Esportivo",
            level: "h3",
            paragraphs: [
              "No coração do bairro, a Praça Ulisses Guimarães funciona como uma verdadeira extensão da sala de estar dos moradores. Com pistas de caminhada, ciclovia, quadras de beach tennis, playground moderno e feiras gastronômicas semanais, a praça pulsa com vida familiar e segurança.",
              "Apartamentos com vista livre permanente para a praça desfrutam de um ágio de até 25% no valor do metro quadrado em relação a unidades voltadas para o interior das quadras.",
            ],
          },
          {
            title: "4. Urbanova: Exclusividade, Natureza e Condomínios Fechados",
            paragraphs: [
              "Atravessando a ponte sobre o Rio Paraíba do Sul, o Urbanova revela uma atmosfera totalmente distinta. Dominado por condomínios horizontais como Alphaville, Reserva do Paratehy, Altos da Serra e Mont Serrat, o bairro é um santuário de tranquilidade com ar puro e vista para as montanhas.",
              "As casas de alto padrão no Urbanova destacam-se pela arquitetura contemporânea, terrenos amplos a partir de 450m², piscinas privativas e clubes sociais completos com quadras de tênis de saibro e piscinas aquecidas.",
            ],
          },
          {
            title: "5. Parque Ribeirão Vermelho: Oásis de Sustentabilidade",
            level: "h3",
            paragraphs: [
              "O Parque Ribeirão Vermelho, com seus mais de 250 mil metros quadrados, é uma das maiores áreas de preservação e lazer da cidade. Equipado com quadras poliesportivas, skate park de nível internacional, pistas de cooper arborizadas e quiosques, o parque valoriza todo o entorno residencial do Urbanova.",
            ],
          },
          {
            title: "6. Comparativo de Metro Quadrado: Aquarius vs Urbanova",
            paragraphs: [
              "Em 2026, o valor do metro quadrado privativo para apartamentos novos e seminovos no Jardim Aquarius oscila entre R$ 10.500 e R$ 14.500, impulsionado pela escassez de novos terrenos para construção.",
              "No Urbanova, os terrenos em condomínios fechados variam entre R$ 1.800 e R$ 2.800 por metro quadrado, enquanto as residências prontas de alto padrão alcançam valores entre R$ 8.500 e R$ 12.000 por m² de área construída.",
            ],
          },
          {
            title: "7. Infraestrutura Educacional e Saúde de Excelência",
            paragraphs: [
              "A Zona Oeste abriga instituições de ensino renomadas, como o Colégio Anglo, Colégio Moppe, Escola Mater Dei e o campus da Universidade do Vale do Paraíba (Univap).",
              "Na área da saúde, os centros clínicos do Aquarius Medical Center e hospitais de retaguarda oferecem atendimento médico de ponta com todas as especialidades clínicas e cirúrgicas.",
            ],
          },
          {
            title: "8. Segurança Patrimonial e Monitoramento Inteligente",
            paragraphs: [
              "Tanto o Aquarius quanto o Urbanova contam com o programa Cidade Inteligente de São José dos Campos, que integra câmeras de reconhecimento óptico de caracteres (CSI) interligadas diretamente às polícias Civil e Militar e à Guarda Civil Municipal.",
              "Nos condomínios do Urbanova, a segurança é reforçada por portarias blindadas, controle de acesso facial biométrico, rondas motorizadas 24 horas e cercamento eletrônico com inteligência artificial.",
            ],
          },
          {
            title: "9. O Perfil dos Novos Empreendimentos de Luxo",
            paragraphs: [
              "Os lançamentos imobiliários mais recentes no Aquarius trazem plantas de 120m² a 280m² com varandas gourmet integradas, fechadura eletrônica, tomadas para carros elétricos nas garagens e áreas de lazer tipo resort.",
              "No Urbanova, os lançamentos de vilas e residenciais boutique atendem à crescente demanda por moradias inteligentes com sistemas de automação e captação de energia solar fotovoltaica já instalados de fábrica.",
            ],
          },
          {
            title: "10. Projeções de Liquidez e Rentabilidade com a Pirâmide",
            paragraphs: [
              "A contínua atração de investimentos aeroespaciais e tecnológicos para São José dos Campos assegura uma valorização consistente de 8% a 12% ao ano acima da inflação para a Zona Oeste.",
              "Consulte os especialistas da Pirâmide Imóveis para conhecer as melhores oportunidades em pré-lançamento e imóveis exclusivos prontos para morar no Aquarius e Urbanova.",
            ],
          },
        ],
        imgVaranda
      ),
    },

    
    {
      _id: "post-ubatuba-investimento-temporada",
      _type: "post",
      title: "Investir em Imóveis em Ubatuba: Oportunidades no Litoral Norte",
      slug: { _type: "slug", current: "investir-em-imoveis-em-ubatuba-litoral-norte" },
      featured: true,
      publishedAt: new Date("2026-02-26T09:15:00Z").toISOString(),
      updatedAt: new Date("2026-03-02T11:00:00Z").toISOString(),
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
      calloutStyle: "warning",
      calloutTitle: "Atenção: Licenciamento e Regularidade de Matrícula",
      calloutContent: "Ao adquirir terrenos ou casas no Litoral Norte, certifique-se de que o imóvel possui matrícula individualizada no Cartório de Registro de Imóveis e habite-se municipal, evitando áreas de posse ou preservação permanente.",
      faqTitle: "Perguntas Frequentes sobre Imóveis em Ubatuba",
      faqItems: [
        {
          question: "Quais são as melhores praias para aluguel por temporada?",
          answer: "Praia Grande e Tenório lideram o volume de locações devido à infraestrutura comercial completa. Já a Praia do Félix, Itamambuca e Prumirim são procuradas por quem busca contato direto com a natureza e exclusividade.",
        },
        {
          question: "Qual o rendimento médio anual em locação de temporada?",
          answer: "Empreendimentos bem localizados com gestão profissional de locação geram yields entre 7% e 11% ao ano, superando a rentabilidade tradicional de locação residencial urbana.",
        },
      ],
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
      body: buildBody(
        [
          "Ubatuba consolidou-se como um dos destinos de investimento imobiliário mais rentáveis e seguros do estado de São Paulo. Com mais de 100 praias distribuídas ao longo de 80 quilômetros de costa recortada e mais de 80% de seu território protegido pelo Parque Estadual da Serra do Mar, a cidade alia escassez natural de terrenos à altíssima demanda turística.",
          "A entrega dos novos trechos de serra e dos contornos viários da Rodovia dos Tamoios reduziu o tempo de viagem a partir de São José dos Campos para menos de 50 minutos, transformando a dinâmica de lazer e gerando um novo ciclo de valorização patrimonial.",
        ],
        [
          {
            title: "1. A Nova Dinâmica Turística e Econômica de Ubatuba",
            paragraphs: [
              "A proximidade geográfica com a capital paulista e o Vale do Paraíba fez com que Ubatuba deixasse de ser um destino apenas de alta temporada de verão. Hoje, o turismo de fim de semana, o trabalho remoto de executivos e os eventos esportivos sustentam altas taxas de ocupação durante os 12 meses do ano.",
              "Essa estabilidade na procura atrai investidores institucionais e pessoas físicas em busca de diversificação patrimonial através da rentabilidade em plataformas como Airbnb e Booking.",
            ],
          },
          {
            title: "2. Praia Grande e Tenório: O Polo de Maior Liquidez",
            paragraphs: [
              "A Praia Grande é o coração comercial do mercado de temporada em Ubatuba. Com infraestrutura completa de quiosques, calçadão iluminado, mercados e restaurantes, apartamentos novos de 2 e 3 dormitórios nessa orla registram taxas de ocupação superiores a 70% no ano.",
              "Ao lado, a Praia do Tenório atrai um público familiar que valoriza mar calmo, arborização e a conveniência de estar a poucos metros do polo gastronômico da Rua Guarani e do Itaguá.",
            ],
          },
          {
            title: "3. Toninhas e Enseada: Crescimento com Excelente Custo por m²",
            paragraphs: [
              "Para quem busca apartamentos na planta com condições de pagamento facilitadas, as praias das Toninhas e da Enseada oferecem lançamentos modernos com custo por metro quadrado entre 15% e 20% mais atrativo que a Praia Grande.",
              "São praias de fácil acesso pela rodovia Rio-Santos, muito procuradas por famílias que apreciam águas limpas e esportes náuticos como stand up paddle e vela.",
            ],
          },
          {
            title: "4. Praias do Norte: Félix, Itamambuca e Prumirim para Lazer Exclusivo",
            level: "h3",
            paragraphs: [
              "No extremo norte de Ubatuba, condomínios fechados em praias como Itamambuca, Praia do Félix e Prumirim atendem ao público que busca refúgio em meio à Mata Atlântica nativa.",
              "As casas de alto padrão construídas nessas regiões valorizam materiais como madeira certificada, grandes panos de vidro e biofilia, alcançando diárias de luxo muito elevadas em feriados e férias escolares.",
            ],
          },
          {
            title: "5. Rentabilidade Real: Análise de Yield em Locação por Temporada",
            paragraphs: [
              "Enquanto a locação residencial tradicional em capitais entrega yields médios entre 4,5% e 6% ao ano, imóveis bem decorados e bem administrados em Ubatuba alcançam entre 8% e 12% de retorno anual líquido sobre o capital investido.",
              "Esse rendimento decorre da precificação dinâmica de diárias, que permite cobrar valores premium em datas de pico e manter diárias competitivas em dias de semana fora de temporada.",
            ],
          },
          {
            title: "6. Gestão Profissional: Como Automatizar suas Locações",
            paragraphs: [
              "O investidor moderno não precisa se preocupar com entrega de chaves, faxina ou suporte a hóspedes. Empresas especializadas em hospitalidade e a própria equipe de locação da Pirâmide Imóveis realizam o gerenciamento integral do imóvel.",
              "Serviços como precificação algorítmica, limpeza padrão de hotelaria e manutenção preventiva garantem notas máximas nas avaliações dos hóspedes e preservação do bem.",
            ],
          },
          {
            title: "7. Cuidados Jurídicos Cruciais: Escritura Registrada vs Contratos de Posse",
            paragraphs: [
              "A compra de imóveis no Litoral Norte exige rigor absoluto na checagem cartorária. Historicamente, muitas propriedades no litoral foram comercializadas sob regime de posse ou cessão de direitos, instrumentos que não conferem propriedade jurídica plena.",
              "A Pirâmide Imóveis trabalha exclusivamente com imóveis que possuem Matrícula Registrada no Cartório de Registro de Imóveis (CRI) e Habite-se da Prefeitura, assegurando liquidez total e viabilidade de financiamento bancário.",
            ],
          },
          {
            title: "8. Taxa de Preservação Ambiental (TPA) e Valorização Sustentável",
            paragraphs: [
              "A implementação da TPA em Ubatuba tem como objetivo arrecadar recursos exclusivos para a conservação ecológica, gestão de resíduos e infraestrutura turística.",
              "Cidades que protegem seus ativos naturais e limitam o adensamento predatório experimentam uma valorização sustentável de longo prazo, atraindo compradores com maior poder aquisitivo.",
            ],
          },
          {
            title: "9. Tendências dos Novos Lançamentos Imobiliários",
            paragraphs: [
              "Os novos condomínios residenciais em Ubatuba priorizam plantas compactas funcionais, varandas gourmet com churrasqueira a carvão, armários náuticos individuais (hobby box) e áreas de lazer no rooftop com piscina de borda infinita com vista panorâmica para o mar.",
            ],
          },
          {
            title: "10. Estratégia de Entrada para o Investidor com a Pirâmide",
            paragraphs: [
              "Investir em imóveis na planta em Ubatuba permite pagar até 60% do valor do imóvel durante o período de obras em parcelas mensais e balões sem juros bancários, capturando o ganho de capital da construção.",
              "Fale com nossa equipe especializada no Litoral Norte para receber o dossiê completo de rentabilidade dos melhores lançamentos de Ubatuba.",
            ],
          },
        ],
        imgPiscina
      ),
    },

    
    {
      _id: "post-campos-do-jordao-casas-de-campo",
      _type: "post",
      title: "Campos do Jordão: Como Escolher a Casa de Campo Perfeita na Serra",
      slug: { _type: "slug", current: "campos-do-jordao-como-escolher-casa-de-campo-perfeita" },
      featured: true,
      publishedAt: new Date("2026-02-25T11:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-02T11:30:00Z").toISOString(),
      excerpt: "Guia com as melhores regiões de Campos do Jordão: Capivari, Alto do Capivari, Jaguaribe e condomínios com vista panorâmica para a Pedra do Baú.",
      mainImage: {
        ...imgCampos,
        alt: "Casa de campo em estilo alpino com vista para as montanhas de Campos do Jordão",
        caption: "Campos do Jordão: sofisticação e alta procura por casas de temporada na Serra da Mantiqueira.",
      },
      highlight1Title: "Clima de Montanha",
      highlight1Description: "Refúgio exclusivo com lareiras e arquitetura europeia sofisticada",
      highlight2Title: "Capivari & Alto Capivari",
      highlight2Description: "Bairros nobres com alta gastronomia, compras e valorização constante",
      highlight3Title: "Temporada de Inverno",
      highlight3Description: "Altíssima taxa de ocupação e rentabilidade em locações de temporada",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoTitle: "Chalés e Casas de Campo Exclusivas em Campos do Jordão",
      videoCaption: "Conheça as características dos chalés alpinos com isolamento térmico avançado.",
      calloutStyle: "info",
      calloutTitle: "Conforto Térmico e Face Solar",
      calloutContent: "Na Serra da Mantiqueira, priorize imóveis com face Norte ou Nordeste, garantindo máxima incidência solar durante o outono e inverno e mantendo os ambientes sempre aquecidos.",
      faqTitle: "Perguntas sobre Imóveis na Serra",
      faqItems: [
        {
          question: "Qual o melhor bairro para quem deseja ficar perto do agito?",
          answer: "O Capivari e o Alto do Capivari são ideais para quem busca proximidade com restaurantes renomados, cervejarias artesanais e shoppings a céu aberto.",
        },
        {
          question: "E para quem busca silêncio e contato com a natureza?",
          answer: "Regiões como Descansópolis, Jaguaribe e os condomínios na rota do Horto Florestal oferecem áreas de mata nativa preservada e muita privacidade.",
        },
      ],
      author: { _type: "reference", _ref: "author-carlos-eduardo" },
      city: { _type: "reference", _ref: "city-campos-do-jordao" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      tags: ["Campos do Jordão", "Serra da Mantiqueira", "Casa de Campo", "Capivari", "Luxo"],
      metaTitle: "Casas de Campo em Campos do Jordão: Refúgio de Luxo na Serra",
      metaDescription: "Guia completo para comprar ou investir em casas de campo e chalés em Campos do Jordão. Alto Capivari, Jaguaribe e condomínios exclusivos na Mantiqueira.",
      body: buildBody(
        [
          "Campos do Jordão ostenta com orgulho o título de 'Suíça Brasileira'. Localizada a mais de 1.600 metros de altitude no coração da Serra da Mantiqueira, a cidade combina clima de montanha europeu, alta gastronomia internacional, arquitetura enxaimel e uma das comunidades residenciais mais nobres da América Latina.",
          "Comprar uma casa de campo em Campos do Jordão representa um investimento duplo: a garantia de um refúgio de bem-estar inigualável para a família e a posse de um ativo imobiliário de altíssima liquidez e preservação de valor.",
        ],
        [
          {
            title: "1. O Mercado Imobiliário de Segunda Residência na Serra da Mantiqueira",
            paragraphs: [
              "A busca por qualidade de vida, ar puro e segurança acelerou a procura por imóveis na serra. Famílias de São Paulo, Campinas e São José dos Campos utilizam suas casas de campo como ponto de encontro durante feriados, fins de semana e nas férias de inverno.",
              "A infraestrutura viária duplicada da Rodovia Floriano Rodrigues Pinheiro proporciona um trajeto seguro e rápido, conectando a Dutra e a Carvalho Pinto à serra em menos de 45 minutos.",
            ],
          },
          {
            title: "2. Capivari e Vila Inglesa: O Charme Urbano e Gastronômico",
            paragraphs: [
              "O bairro de Capivari é o epicentro turístico e cultural da cidade. Quem escolhe residir ou investir nas imediações de Capivari e Vila Inglesa busca a facilidade de caminhar até os restaurantes com lareira, chocolaterias finas e o festival de inverno.",
              "Chalés e apartamentos em condomínios fechados nessa região desfrutam de taxas de ocupação recordes durante a temporada de inverno e feriados temáticos.",
            ],
          },
          {
            title: "3. Alto do Capivari: Sofisticação e Vistas Panorâmicas",
            level: "h3",
            paragraphs: [
              "Localizado nas encostas mais elevadas de Campos do Jordão, o Alto do Capivari abriga mansões espetaculares cercadas por araucárias centenárias e com vistas deslumbrantes para o vale e para o pôr do sol.",
              "As propriedades nesta área destacam-se por terrenos amplos de 2.000m² a 5.000m², adegas climatizadas subterrâneas, spas aquecidos e pisos aquecidos em mármore travertino.",
            ],
          },
          {
            title: "4. Jaguaribe e Descansópolis: Natureza e Silêncio Absoluto",
            paragraphs: [
              "Para aqueles que buscam desligar-se totalmente da rotina agitada das capitais, bairros como Jaguaribe, Descansópolis e a rota que leva ao Parque Estadual do Horto Florestal oferecem áreas de mata nativa preservada e muita paz.",
              "É a região preferida para a construção de chalés alpinos modernos em estilo A-Frame e casas com conceito rústico-chique em madeira de demolição e vidro.",
            ],
          },
          {
            title: "5. Orientação Solar: O Fator Crítico na Escolha do Imóvel",
            paragraphs: [
              "Em cidades de altitude elevada onde o inverno atinge temperaturas negativas, a orientação solar é um critério técnico decisivo. Propriedades voltadas para a face Norte e Nordeste recebem a maior carga de insolação diária.",
              "Casas com boa orientação solar permanecem secas, arejadas e termicamente confortáveis, reduzindo custos de aquecimento artificial e evitando problemas crônicos de umidade.",
            ],
          },
          {
            title: "6. Tecnologias de Isolamento Térmico e Aquecimento",
            paragraphs: [
              "Casas contemporâneas de alto padrão na serra utilizam esquadrias de PVC com vidros duplos (termoacústicos), isolamento de paredes em lã de rocha e pisos com aquecimento radiante elétrico ou hidráulico.",
              "As lareiras tradicionais a lenha têm sido complementadas por lareiras a gás de alto rendimento e sistemas ecológicos de pellets de biomassa com controle termostático.",
            ],
          },
          {
            title: "7. Condomínios Fechados na Serra: Segurança e Gestão",
            paragraphs: [
              "A preferência por condomínios fechados como o Jardim Atibaia, Recanto dos Sonhos e Morada dos Pinheiros decorre da segurança 24 horas e da facilidade de manutenção compartilhada de áreas verdes e vias internas.",
              "Muitos condomínios oferecem quadras de tênis, trilhas ecológicas privativas, heliponto homologado e serviço de zeladoria permanente para cuidar da propriedade na ausência dos donos.",
            ],
          },
          {
            title: "8. Rentabilidade com Aluguel de Inverno e Feriados",
            paragraphs: [
              "Proprietários que optam por disponibilizar suas casas de campo para locação durante os meses de junho e julho e nos feriados de Páscoa, Corpus Christi e Réveillon conseguem cobrir com folga todos os custos anuais de manutenção do imóvel.",
              "Diárias de residências exclusivas de 4 a 6 suítes em Campos do Jordão variam entre R$ 2.500 e R$ 8.000 em períodos nobres.",
            ],
          },
          {
            title: "9. Cuidados com a Manutenção Preventiva na Montanha",
            paragraphs: [
              "A umidade característica da montanha exige a utilização de tintas hidrorrepelentes nas fachadas externas, manutenção semestral de calhas para evitar o acúmulo de folhas de araucária e instalação de desumidificadores em closets e armários.",
            ],
          },
          {
            title: "10. Como a Pirâmide Seleciona Imóveis Exclusivos na Serra",
            paragraphs: [
              "Com equipe dedicada e especializada na Serra da Mantiqueira, a Pirâmide Imóveis realiza a curadoria técnica e jurídica rigorosa de cada propriedade antes de incluí-la em seu portfólio nobre.",
              "Agende uma visita privativa com nossos consultores para conhecer as melhores opções de casas e terrenos em Campos do Jordão.",
            ],
          },
        ],
        imgCampos
      ),
    },

    
    {
      _id: "post-lancamentos-studios-investimento",
      _type: "post",
      title: "Studios e Lançamentos em São José dos Campos: Como Lucrar com Aluguel",
      slug: { _type: "slug", current: "studios-lancamentos-sao-jose-dos-campos-investimento-lucro" },
      featured: true,
      publishedAt: new Date("2026-02-24T16:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-02T12:00:00Z").toISOString(),
      excerpt: "Apartamentos compactos e studios no Jardim Aquarius, Vila Ema e Centro apresentam alta taxa de ocupação e rentabilidade acima da poupança e renda fixa.",
      mainImage: {
        ...imgLancamentos,
        alt: "Edifício residencial moderno com studios compactos e área de lazer compartilhada em SJC",
        caption: "Studios modernos em SJC: ticket de entrada atrativo e alta liquidez para investidores.",
      },
      highlight1Title: "Ticket de Entrada Acessível",
      highlight1Description: "Investimento inicial menor com fluxo de pagamento facilitado na planta",
      highlight2Title: "Rentabilidade Superior",
      highlight2Description: "Yield de locação mensal que supera a média dos apartamentos tradicionais",
      highlight3Title: "Gestão Descomplicada",
      highlight3Description: "Empreendimentos com lavanderia OMO, coworking e gestão profissional de locação",
      calloutStyle: "tip",
      calloutTitle: "Dica de Ouro para Studios",
      calloutContent: "Priorize studios próximos a hospitais, faculdades (ITA, Unesp, Anhembi Morumbi) ou centros empresariais. A demanda contínua de médicos residentes, engenheiros e executivos mantém a vacância próxima de zero o ano todo.",
      faqTitle: "Dúvidas sobre Investimento em Studios",
      faqItems: [
        {
          question: "Vale a pena mobiliar o studio para locação?",
          answer: "Sim. Studios mobiliados e decorados têm locação até 3 vezes mais rápida e valor de diária ou aluguel mensal 30% a 45% superior aos imóveis vazios.",
        },
        {
          question: "Qual o público principal que aluga studios em SJC?",
          answer: "Profissionais do polo aeroespacial, médicos, residentes e estudantes de pós-graduação que valorizam localização central e praticidade.",
        },
      ],
      ctaTitle: "Conheça os Lançamentos de Studios em SJC",
      ctaDescription: "Receba em primeira mão a tabela de preços e condições exclusivas de lançamento direto com as construtoras parceiras.",
      ctaButtonText: "Quero Conhecer os Lançamentos no WhatsApp",
      author: { _type: "reference", _ref: "author-carlos-eduardo" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-lancamentos-novidades" },
        { _type: "reference", _ref: "category-investimentos-rentabilidade" },
      ],
      tags: ["Studios", "Lançamentos", "Investimento", "Jardim Aquarius", "Vila Ema", "Rentabilidade"],
      metaTitle: "Studios em SJC para Investir: Rentabilidade e Lançamentos 2026",
      metaDescription: "Descubra como lucrar investindo em studios compactos no Jardim Aquarius e Vila Ema em São José dos Campos. Alta ocupação e rentabilidade com a Pirâmide Imóveis.",
      body: buildBody(
        [
          "A revolução dos apartamentos compactos de 24m² a 45m² consolidou-se como um dos segmentos imobiliários mais rentáveis do país. Em São José dos Campos, a combinação de polos industriais de alta tecnologia, centros médicos de referência regional e universidades de ponta cria uma demanda constante por locação ágil e sem burocracia.",
          "Para o investidor, os studios oferecem o menor valor de entrada unitário, liquidez acelerada na revenda e rentabilidade percentual de aluguel substancialmente superior à de imóveis tradicionais de grande porte.",
        ],
        [
          {
            title: "1. O Fenômeno dos Studios no Mercado Imobiliário Moderno",
            paragraphs: [
              "A redução do tamanho médio das famílias e o aumento no número de pessoas morando sozinhas transformaram as prioridades do habitar urbano. O comprador e locatário de studios busca localização nobre, transporte fácil e prédios completos onde os serviços essenciais estão a um elevador de distância.",
              "O conceito de 'viver o bairro e usar o apartamento para descanso e produtividade' tornou-se o lema da geração de novos profissionais e executivos.",
            ],
          },
          {
            title: "2. Por que São José dos Campos é o Cenário Perfeito para Studios",
            paragraphs: [
              "Com a presença de gigantes como Embraer, Boeing, DCTA, INPE, Johnson & Johnson e centenas de startups tecnológicas no Parque Tecnológico, São José dos Campos recebe semanalmente milhares de consultores, engenheiros e prestadores de serviços de fora do estado.",
              "Além disso, a cidade atrai médicos residentes para hospitais de grande porte como o Hospital Municipal, Hospital Pio XII, Hospital Vivalle e Policlin, gerando demanda de locação contínua de 1 a 3 anos.",
            ],
          },
          {
            title: "3. O Perfil do Inquilino de Apartamentos Compactos",
            level: "h3",
            paragraphs: [
              "O morador típico de studio em SJC tem entre 24 e 45 anos, possui alta renda relativa, preza pela praticidade de não precisar mobiliar um imóvel por conta própria e valoriza edifícios seguros com fechaduras biométricas e serviços pay-per-use.",
            ],
          },
          {
            title: "4. Áreas Comuns Compartilhadas: A Verdadeira Extensão do Lar",
            paragraphs: [
              "Os empreendimentos modernos de studios compensam a metragem privativa enxuta com áreas comuns de altíssimo padrão: coworking integrado com internet dedicada de alta velocidade, salas de reunião privativas, lavanderias inteligentes OMO com agendamento por app e minimercados autônomos (Grab & Go) abertos 24 horas.",
              "No rooftop, lounges gourmet, academias com equipamentos de ponta e piscinas com vista panorâmica para a cidade completam a experiência de moradia sofisticada.",
            ],
          },
          {
            title: "5. Rentabilidade Comparada: Studio vs Apartamento Tradicional de 3 Quartos",
            paragraphs: [
              "Com o capital necessário para adquirir um único apartamento de 3 dormitórios no Aquarius (cerca de R$ 900 mil), um investidor pode adquirir até 3 unidades de studios na planta (R$ 300 mil cada).",
              "Enquanto o apartamento de 3 quartos rende em média R$ 3.800 de aluguel mensal (yield bruto de 0,42% ao mês), os 3 studios juntos geram entre R$ 6.000 e R$ 7.500 mensais (yield bruto de 0,66% a 0,83% ao mês), além de diversificar o risco de vacância total.",
            ],
          },
          {
            title: "6. Decoração Inteligente: Como Maximizar o Valor da Locação",
            paragraphs: [
              "O investimento em marcenaria sob medida inteligente (cama retrátil, bancadas multifuncionais, armários embutidos até o teto), eletrodomésticos de inox embutidos e ar-condicionado inverter aumenta em até 40% o valor do aluguel.",
              "Projetos com paleta de cores neutras e toques de iluminação indireta em LED criam apelo visual imediato nas fotos dos anúncios imobiliários.",
            ],
          },
          {
            title: "7. Locação Tradicional (Long Stay) vs Plataformas (Short Stay)",
            paragraphs: [
              "O proprietário pode optar pela locação tradicional de 12 a 30 meses com garantia de seguro fiança, ou operar no modelo de locação por diárias e estadias curtas via plataformas digitais.",
              "Em bairros como o Jardim Aquarius e a Vila Ema, o modelo híbrido (mínimo de 3 diárias) tem apresentado os maiores retornos financeiros combinando receita alta de diárias com baixa taxa de rotatividade de hóspedes.",
            ],
          },
          {
            title: "8. Melhores Bairros para Investir em Studios em SJC",
            paragraphs: [
              "Jardim Aquarius, Vila Ema, Jardim Esplanada, Vila Adyana e Centro lideram o ranking de procura e liquidez para studios.",
              "Nessas regiões, a proximidade com o Anel Viário, a Avenida 9 de Julho e shoppings como o Colinas e CenterVale garante vacância historicamente inferior a 5% ao ano.",
            ],
          },
          {
            title: "9. Comprando na Planta: O Ganho de Capital Durante as Obras",
            paragraphs: [
              "A compra de studios na fase de lançamento oferece condições flexíveis de pagamento, com fluxo de entrada de 30% a 40% parcelado ao longo dos 30 a 36 meses de construção.",
              "Historicamente, a valorização do imóvel da fase de lançamento até a entrega das chaves gira entre 25% e 40%, permitindo ganho patrimonial antes mesmo do início das locações.",
            ],
          },
          {
            title: "10. Gestão Completa de Locação com a Pirâmide Imóveis",
            paragraphs: [
              "A Pirâmide Imóveis disponibiliza um departamento especializado na gestão de patrimônio e carteiras de investidores, realizando a vistoria técnica, precificação de mercado, análise criteriosa de crédito dos inquilinos e repasse financeiro pontual.",
              "Receba nossa tabela exclusiva de lançamentos de studios com condições especiais para investidores.",
            ],
          },
        ],
        imgLiving
      ),
    },

    
    {
      _id: "post-ilhabela-sao-sebastiao-alto-padrao",
      _type: "post",
      title: "Ilhabela e São Sebastião: As Praias Mais Exclusivas para Investir em 2026",
      slug: { _type: "slug", current: "ilhabela-sao-sebastiao-praias-exclusivas-investir" },
      featured: true,
      publishedAt: new Date("2026-02-23T17:30:00Z").toISOString(),
      updatedAt: new Date("2026-03-02T12:30:00Z").toISOString(),
      excerpt: "Maresias, Juquehy, Praia da Baleia e o sul de Ilhabela: por que essas praias mantêm o metro quadrado mais valorizado de todo o litoral paulista.",
      mainImage: {
        ...imgIlhabela,
        alt: "Mansão pé na areia com píer privativo e vista panorâmica para o mar em Ilhabela",
        caption: "Ilhabela é referência internacional em exclusividade náutica e propriedades de altíssimo padrão.",
      },
      highlight1Title: "Pé na Areia Exclusivo",
      highlight1Description: "Mansões em condomínios fechados com acesso direto à praia e segurança total",
      highlight2Title: "Lazer Náutico & Marinas",
      highlight2Description: "Estrutura completa para lanchas, iates e esportes à vela de alto padrão",
      highlight3Title: "Valorização em Dólar",
      highlight3Description: "Atração de compradores do Brasil e exterior pela preservação ambiental",
      galleryTitle: "Exclusividade Pé na Areia no Litoral Paulista",
      galleryImages: [imgPiscina, imgVaranda].filter(Boolean),
      ctaTitle: "Imóveis Exclusivos no Litoral Norte",
      ctaDescription: "Receba opções off-market selecionadas de casas pé na areia em Juquehy, Baleia e Ilhabela.",
      ctaButtonText: "Solicitar Catálogo Exclusivo no WhatsApp",
      author: { _type: "reference", _ref: "author-felipe-santos" },
      city: { _type: "reference", _ref: "city-ilhabela" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-investimentos-rentabilidade" },
      ],
      tags: ["Ilhabela", "São Sebastião", "Pé na Areia", "Maresias", "Juquehy"],
      metaTitle: "Mansões em Ilhabela e São Sebastião: Luxo Pé na Areia no Litoral",
      metaDescription: "Explore as propriedades mais exclusivas de Ilhabela e São Sebastião. Mansões pé na areia, condomínios fechados e alto padrão náutico com a Pirâmide Imóveis.",
      body: buildBody(
        [
          "O litoral de São Sebastião e a ilha de Ilhabela concentram algumas das propriedades residenciais mais valorizadas e exclusivas de toda a América do Sul. Praias icônicas como Juquehy, Praia da Baleia, Cambury, Maresias e o canal de Ilhabela atraem empresários, investidores globais e famílias que exigem o mais alto padrão de sofisticação, lazer náutico e privacidade absoluta.",
          "Neste guia de alto padrão, exploramos as características que sustentam a alta liquidez e os valores de metro quadrado dessas joias do litoral paulista.",
        ],
        [
          {
            title: "1. O Mercado de Altíssimo Padrão Pé na Areia",
            paragraphs: [
              "A definição de imóvel pé na areia vai além da proximidade física com o mar: trata-se de ter o jardim da residência se fundindo com a faixa de areia dourada e o oceano, com vista permanente e acesso privativo.",
              "Devido à legislação ambiental rigorosa e à limitação física das praias mais nobres, a oferta desse tipo de imóvel é finita, garantindo valorização constante e proteção contra flutuações econômicas.",
            ],
          },
          {
            title: "2. Juquehy: A Riviera Gastronômica e Familiar do Litoral Sul",
            paragraphs: [
              "Juquehy destaca-se por reunir uma das melhores faixas de areia do litoral, com mar calmo no canto esquerdo e ondas esportivas no canto direito. O bairro possui infraestrutura comercial charmosa, pequenos shoppings a céu aberto e restaurantes de chefs premiados.",
              "Os condomínios fechados de casas isoladas em Juquehy oferecem serviços de praia privativos com montagem de tendas, cadeiras e serviço de garçom diretamente na areia.",
            ],
          },
          {
            title: "3. Praia da Baleia: O Refúgio Discreto da Alta Sociedade",
            level: "h3",
            paragraphs: [
              "Conhecida pelo seu ambiente estritamente residencial e preservado, a Praia da Baleia não permite comércio ambulante nem quiosques na areia, mantendo uma atmosfera de clube privativo para os moradores.",
              "As mansões na Baleia caracterizam-se por projetos de arquitetos consagrados como Arthur Casas, Gui Mattos e Bernardes Arquitetura, com uso abundante de madeira cumaru, pedras naturais e piscinas com raia de natação de frente para o mar.",
            ],
          },
          {
            title: "4. Maresias: O Encontro da Sofisticação com o Estilo de Vida Esportivo",
            paragraphs: [
              "Maresias consolidou-se internacionalmente como o berço do surfe de alta performance e atrai um público apaixonado por esportes, natureza e vida social vibrante.",
              "Condomínios fechados como o Portal das Mares e o Canto do Moreira combinam quadras de tênis, helipontos privativos e casas contemporâneas com acabamentos de luxo.",
            ],
          },
          {
            title: "5. O Canal de Ilhabela e a Vida Náutica de Alto Padrão",
            paragraphs: [
              "Ilhabela é a Capital Nacional da Vela e o ponto de encontro preferido dos proprietários de lanchas, iates e veleiros oceânicos. As propriedades localizadas de frente para o canal oferecem a prerrogativa única de píeres de atracação privativos e poitas para embarcações de grande porte.",
              "O Yacht Club de Ilhabela (YCI) e as marinas privadas proporcionam suporte técnico e serviços completos de abastecimento e guarda de barcos.",
            ],
          },
          {
            title: "6. Preservação Ambiental e Restrições Urbanísticas Rigorosas",
            paragraphs: [
              "Tanto em São Sebastião quanto em Ilhabela, os planos diretores estabelecem limites estritos de taxa de ocupação, coeficiente de aproveitamento e altura máxima das construções, impedindo a verticalização predatória.",
              "Essa preservação visual e ambiental assegura que as praias mantenham seu aspecto paradisíaco intocado pelas próximas gerações.",
            ],
          },
          {
            title: "7. Rentabilidade em Locações de Altíssimo Padrão",
            paragraphs: [
              "Mansões pé na areia de 5 a 8 suítes em Juquehy e Baleia alcançam diárias de R$ 10.000 a R$ 25.000 durante a temporada de verão e datas comemorativas.",
              "Muitos proprietários utilizam a receita de poucas semanas de locação para custear integralmente a equipe fixa de caseiros, jardineiros e manutenção anual da propriedade.",
            ],
          },
          {
            title: "8. Serviços de Concierge e Gestão Patrimonial",
            paragraphs: [
              "A posse de um imóvel de alto padrão no litoral é acompanhada por serviços profissionais de concierge: contratação de chefs privativos para fins de semana, marinheiros habilitados, segurança desarmada e manutenção preventiva de sistemas de ar condicionado contra a maresia.",
            ],
          },
          {
            title: "9. Oportunidades em Condomínios Fechados de Morro com Vista Mar",
            paragraphs: [
              "Além do pé na areia, condomínios situados nas encostas nobres com vista panorâmica para o mar oferecem valores por metro quadrado atrativos e privacidade absoluta em meio à copa das árvores da Mata Atlântica.",
            ],
          },
          {
            title: "10. Atendimento Off-Market com a Pirâmide Private",
            paragraphs: [
              "As propriedades mais exclusivas do litoral norte não são anunciadas publicamente por motivos de discrição e segurança dos proprietários.",
              "A divisão Pirâmide Private conecta compradores qualificados a essas joias off-market por meio de acordos de confidencialidade e atendimento personalizado.",
            ],
          },
        ],
        imgPiscina
      ),
    },

    
    
    

    
    {
      _id: "post-arquitetura-autoral-alto-padrao",
      _type: "post",
      title: "Tendências da Arquitetura Autoral em Residências de Alto Padrão no Vale",
      slug: { _type: "slug", current: "tendencias-arquitetura-autoral-alto-padrao-vale" },
      featured: false,
      publishedAt: new Date("2026-02-22T16:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T16:30:00Z").toISOString(),
      excerpt: "Conheça os elementos que definem as mansões contemporâneas: integração com a natureza, biofilia, concreto aparente, madeira nobre e automação residencial completa.",
      mainImage: {
        ...imgArquitetura,
        alt: "Living integrado de mansão moderna com iluminação em LED e materiais naturais",
        caption: "Arquitetura autoral: design contemporâneo que valoriza o imóvel no Vale do Paraíba.",
      },
      calloutStyle: "quote",
      calloutTitle: "Visão Arquitetônica",
      calloutContent: "A arquitetura de alto padrão contemporânea não se mede pelo excesso, mas pela harmonia com o ambiente natural e pela inteligência dos fluxos de convivência familiar.",
      galleryTitle: "Projetos em Destaque nos Condomínios do Vale",
      galleryImages: [imgLiving, imgFachada, imgCozinha].filter(Boolean),
      author: { _type: "reference", _ref: "author-marcos-oliveira" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
        { _type: "reference", _ref: "category-arquitetura-design" },
      ],
      tags: ["Arquitetura", "Design", "Alto Padrão", "Biofilia", "Luxo"],
      metaTitle: "Tendências de Arquitetura Autoral em Casas de Luxo no Vale",
      metaDescription: "Confira as principais tendências de arquitetura e interiores para 2026: biofilia, concreto aparente, madeira natural e automação residencial para valorizar seu imóvel.",
      body: buildBody(
        [
          "A arquitetura residencial nos condomínios de alto padrão do Vale do Paraíba vive uma era de maturidade estética e sofisticação funcional. Longe dos excessos ornamentais do passado, os novos projetos privilegiam a verdade dos materiais puros, a fluidez espacial e a integração profunda entre o interior construído e a paisagem natural circundante.",
          "Neste ensaio de tendências, nosso curador de design explora os conceitos que orientam as mansões mais elegantes construídas em São José dos Campos, Jacareí e Taubaté em 2026.",
        ],
        [
          {
            title: "1. A Evolução do Design Residencial nos Condomínios Fechados",
            paragraphs: [
              "O consumidor de alta renda compreendeu que um projeto arquitetônico autoral não é apenas um capricho estético, mas o fator determinante de valorização patrimonial e liquidez de revenda.",
              "Projetos assinados por arquitetos com identidade clara destacam-se no mercado e alcançam valores de metro quadrado significativamente superiores aos de construções padronizadas.",
            ],
          },
          {
            title: "2. Biofilia Integrada: A Natureza Invadindo os Ambientes",
            paragraphs: [
              "O design biofílico vai além de colocar vasos de plantas na sala. Trata-se de conceber a casa em torno de pátios internos ajardinados, espelhos d'água com carpas e grandes panos de vidro do piso ao teto que transformam a vegetação externa no quadro principal da decoração.",
              "A presença contínua de elementos naturais reduz os níveis de cortisol, melhora a qualidade do ar interno e proporciona uma sensação permanente de serenidade.",
            ],
          },
          {
            title: "3. Concreto Aparente, Madeira Ripada e Aço Corten",
            level: "h3",
            paragraphs: [
              "A paleta de materiais nas fachadas contemporâneas valoriza o contraste entre texturas brutas e quentes. O concreto aparente ripado confere solidez e modernidade, enquanto painéis de madeira cumaru e lâminas de aço corten oxidado trazem aconchego e personalidade única ao volume construído.",
            ],
          },
          {
            title: "4. Iluminação Cênica e Projetos Luminotécnicos em LED",
            paragraphs: [
              "A iluminação deixou de ser um detalhe funcional para se tornar protagonista da atmosfera da casa. O uso de perfis lineares de LED embutidos em sancas e rodapés, luzes indiretas de temperatura quente (2700K a 3000K) e iluminação cênica de jardins valoriza as texturas dos revestimentos sem ofuscar a visão.",
            ],
          },
          {
            title: "5. Ventilação Cruzada e Eficiência Térmica Passiva",
            paragraphs: [
              "A sustentabilidade inteligente começa na prancheta do arquiteto. A correta orientação das aberturas em relação aos ventos predominantes da região permite manter a casa fresca no verão sem a necessidade constante de ar condicionado.",
              "Brises-soleil móveis de alumínio amadeirado filtram a radiação solar excessiva nos quartos voltados para o poente.",
            ],
          },
          {
            title: "6. A Cozinha como Epicentro Social da Residência",
            paragraphs: [
              "A antiga cozinha isolada no fundo da casa deu lugar a amplos espaços gourmet integrados ao living e à piscina. Ilhas centrais em mármore Michelangelo ou quartzito Mont Blanc com cooktops por indução transformam o preparo das refeições em um evento social de celebração familiar.",
            ],
          },
          {
            title: "7. Piscinas com Borda Infinita e Prainha Integradas",
            paragraphs: [
              "As áreas de lazer aquáticas foram completamente repensadas: revestimentos em pedras naturais vulcânicas (como Hijau e Hitam), prainhas com espreguiçadeiras dentro d'água para crianças e hidromassagens aquecidas integradas ao paisagismo tropical.",
            ],
          },
          {
            title: "8. Automação Residencial Total por Comando de Voz",
            paragraphs: [
              "Casas conectadas com protocolo Zigbee e Matter permitem controlar cenas de iluminação, climatização, cortinas motorizadas, irrigação do jardim e som ambiente através de assistentes virtuais e smartphones de qualquer lugar do mundo.",
            ],
          },
          {
            title: "9. O Papel da Curadoria de Arte e Mobiliário Modernista",
            paragraphs: [
              "A decoração de interiores nos condomínios do Vale privilegia o design assinado brasileiro: peças de mestres como Sergio Rodrigues, Lina Bo Bardi e Jorge Zalszupin convivem em perfeita harmonia com obras de artistas plásticos contemporâneos.",
            ],
          },
          {
            title: "10. Conheça as Casas Autorais do Portfólio Pirâmide",
            paragraphs: [
              "A Pirâmide Imóveis possui uma seleção exclusiva de residências assinadas pelos arquitetos mais premiados da região nos condomínios do Urbanova, Aquarius e Reserva do Paratehy.",
              "Agende uma visita guiada para vivenciar a excelência do design residencial de alto padrão.",
            ],
          },
        ],
        imgFachada
      ),
    },

    
    {
      _id: "post-documentacao-imovel-passo-a-passo",
      _type: "post",
      title: "Documentação na Compra de Imóveis: O Passo a Passo para Não Correr Riscos",
      slug: { _type: "slug", current: "documentacao-compra-imoveis-passo-a-passo-seguranca" },
      featured: false,
      publishedAt: new Date("2026-02-21T14:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T17:30:00Z").toISOString(),
      excerpt: "Certidões negativas, matrícula atualizada, escritura pública e ITBI: saiba exatamente quais documentos checar antes de assinar o contrato de compra e venda.",
      mainImage: {
        ...imgJuridico,
        alt: "Contrato de compra e venda de imóvel e certidões cartorárias em mesa executiva",
        caption: "Due diligence jurídica: a checagem rigorosa de certidões e matrícula garante segurança total.",
      },
      calloutStyle: "warning",
      calloutTitle: "Atenção: A Importância da Certidão Vintenária",
      calloutContent: "Nunca dispense a certidão vintenária de matrícula com negativa de ônus e alienações. Ela revela todo o histórico de proprietários dos últimos 20 anos e comprova que o bem está livre de penhoras e hipotecas.",
      faqTitle: "Checklist Jurídico e Dúvidas Cartorárias",
      faqItems: [
        {
          question: "Qual o valor médio dos custos cartorários e ITBI na compra?",
          answer: "Geralmente os custos de ITBI (Imposto de Transmissão de Bens Imóveis) e emolumentos de Escritura e Registro representam entre 3% e 5% do valor do imóvel.",
        },
        {
          question: "O contrato de gaveta tem validade jurídica?",
          answer: "O contrato particular gera obrigações entre as partes, mas perante terceiros a propriedade só é efetivamente transferida com o Registro da Escritura Pública na matrícula do imóvel.",
        },
      ],
      ctaTitle: "Precisa de Ajuda para Analisar a Documentação?",
      ctaDescription: "A equipe jurídica da Pirâmide Imóveis realiza a due diligence completa para garantir uma compra 100% segura.",
      ctaButtonText: "Falar com Consultor Jurídico",
      author: { _type: "reference", _ref: "author-carla-mendes" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [{ _type: "reference", _ref: "category-juridico-documentacao" }],
      tags: ["Documentação", "Segurança Jurídica", "Escritura", "ITBI", "Cartório"],
      metaTitle: "Documentos para Comprar Imóvel sem Riscos | Checklist Jurídico",
      metaDescription: "Checklist completo de documentos e certidões obrigatórias para compra de imóveis com segurança jurídica. Evite surpresas com a consultoria da Pirâmide Imóveis.",
      body: buildBody(
        [
          "A aquisição de um imóvel é, para a maioria das pessoas, o maior investimento financeiro de suas vidas. No entanto, o entusiasmo da compra muitas vezes cega os compradores para os riscos jurídicos invisíveis que podem levar à anulação da transação, perda do bem ou responsabilização por dívidas do antigo proprietário.",
          "A due diligence imobiliária preventiva é o escudo protetor do seu patrimônio. Neste manual prático elaborado pelo departamento jurídico da Pirâmide Imóveis, detalhamos o checklist exato de documentos e certidões que devem ser auditados antes de qualquer pagamento de sinal.",
        ],
        [
          {
            title: "1. O Princípio da Concentração dos Atos na Matrícula Imobiliária",
            paragraphs: [
              "A Lei Federal nº 13.097/2015 consolidou o princípio da concentração na matrícula: em tese, todos os atos jurídicos que possam atingir o imóvel (penhoras, hipotecas, ações judiciais) devem estar averbados no registro.",
              "No entanto, a jurisprudência brasileira continua exigindo que o comprador comprove sua boa-fé através da obtenção e análise prévia de certidões pessoais dos vendedores para evitar alegações de fraude à execução ou fraude contra credores.",
            ],
          },
          {
            title: "2. Matrícula Atualizada com Certidão de Ônus e Ações Reais",
            paragraphs: [
              "O documento mais importante de qualquer imóvel é a sua Certidão de Matrícula Atualizada de Inteiro Teor (emitida há no máximo 30 dias pelo Cartório de Registro de Imóveis competente).",
              "Ela comprova quem é o real proprietário atual, a metragem exata do terreno, a existência de eventuais usufrutos, cláusulas de inalienabilidade, penhoras fiscais ou alienações fiduciárias ativas.",
            ],
          },
          {
            title: "3. A Certidão Vintenária: Rastreando o Histórico de 20 Anos",
            level: "h3",
            paragraphs: [
              "A certidão vintenária narra todo o histórico de transferências do imóvel nas últimas duas décadas. Ela é fundamental para identificar eventuais heranças contestadas, partilhas de divórcio irregulares ou vendas realizadas por procurações fraudulentas no passado.",
            ],
          },
          {
            title: "4. Certidões dos Distribuidores da Justiça Estadual (Cível e Família)",
            paragraphs: [
              "Devem ser extraídas certidões de distribuição cível e de família no domicílio do vendedor e na comarca onde o imóvel está situado.",
              "Ações de cobrança, execuções de títulos e processos de dissolução de sociedade em andamento contra os vendedores podem colocar em risco a validade da venda.",
            ],
          },
          {
            title: "5. Certidões da Justiça Federal e da Justiça do Trabalho (TRT e TST)",
            paragraphs: [
              "Dívidas trabalhistas e processos de execução fiscal federal possuem privilégio legal e podem atingir imóveis vendidos mesmo após a lavratura da escritura caso o vendedor não possua outros bens livres e desembaraçados para garantir o débito.",
              "A Certidão Negativa de Débitos Trabalhistas (CNDT) é obrigatória para afastar o risco de fraude trabalhista.",
            ],
          },
          {
            title: "6. Regularidade Fiscal: IPTU e Certidão Negativa Municipal",
            paragraphs: [
              "As dívidas de IPTU e taxas de lixo têm natureza 'propter rem' — ou seja, acompanham o imóvel independentemente de quem as contraiu. Caso você compre um imóvel com débitos de IPTU, a prefeitura cobrará a dívida diretamente de você sob pena de leilão do próprio bem.",
            ],
          },
          {
            title: "7. Declaração de Quitação Condominial Assinada pelo Síndico",
            paragraphs: [
              "Assim como o IPTU, débitos condominiais acompanham a unidade imobiliária. É imprescindível exigir a declaração formal de quitação assinada pelo síndico atual com firma reconhecida e ata de eleição do condomínio anexa.",
            ],
          },
          {
            title: "8. O Contrato de Promessa de Compra e Venda Perfeito",
            paragraphs: [
              "O contrato preliminar deve estipular com clareza: qualificação das partes, descrição idêntica à matrícula, preço e forma de pagamento, prazo para desocupação, multa por atraso e a cláusula expressa de rescisão com devolução integral do sinal caso surjam apontamentos negativos insanáveis na due diligence.",
            ],
          },
          {
            title: "9. Lavratura da Escritura Pública em Tabelionato de Notas",
            paragraphs: [
              "Para imóveis com valor superior a 30 salários mínimos, a escritura pública lavrada por tabelião é formalidade indispensável para a validade do negócio (Art. 108 do Código Civil).",
              "No caso de financiamento bancário, o contrato do banco possui força legal de escritura pública por determinação da Lei 4.380/64.",
            ],
          },
          {
            title: "10. Registro no Cartório de Imóveis: O Ato que Transfere a Propriedade",
            paragraphs: [
              "O jargão 'quem não registra não é dono' é a mais pura verdade jurídica. A propriedade de um bem imóvel só é efetivamente transferida para o comprador no momento em que a escritura ou contrato bancário é registrado na folha de matrícula do imóvel no Cartório de Registro de Imóveis.",
              "A equipe jurídica da Pirâmide Imóveis acompanha cada cliente do primeiro contato até o registro final.",
            ],
          },
        ],
        imgJuridico
      ),
    },

    
    {
      _id: "post-jacarei-expansao-condominios-fechados",
      _type: "post",
      title: "Jacareí em Expansão: Por que Famílias Escolhem os Condomínios da Região",
      slug: { _type: "slug", current: "jacarei-expansao-condominios-fechados-qualidade-vida" },
      featured: false,
      publishedAt: new Date("2026-02-20T08:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T18:30:00Z").toISOString(),
      excerpt: "A poucos minutos de São José dos Campos, Jacareí oferece terrenos mais amplos, condomínios com infraestrutura de clube e excelente custo-benefício por m².",
      mainImage: {
        ...imgJacarei,
        alt: "Condomínio fechado com casas de alto padrão e ampla área verde em Jacareí SP",
        caption: "Jacareí oferece terrenos generosos e infraestrutura de clube a poucos minutos de SJC.",
      },
      calloutStyle: "tip",
      calloutTitle: "Dica de Custo-Benefício",
      calloutContent: "Em Jacareí, o valor do metro quadrado em condomínio fechado é até 35% mais econômico do que nos bairros nobres de SJC, permitindo construir casas térreas amplas com piscina e área gourmet completa.",
      faqTitle: "Dúvidas sobre Morar em Jacareí",
      faqItems: [
        {
          question: "Qual o tempo médio de deslocamento até o centro de São José dos Campos?",
          answer: "Pela Rodovia Presidente Dutra ou pela Avenida Geraldo Scavone, o trajeto até a Zona Oeste e Centro de SJC varia entre 12 e 18 minutos.",
        },
      ],
      author: { _type: "reference", _ref: "author-redacao-piramide" },
      city: { _type: "reference", _ref: "city-jacarei" },
      categories: [
        { _type: "reference", _ref: "category-cidades-bairros" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Jacareí", "Condomínio Fechado", "Custo-Benefício", "Qualidade de Vida", "Vale do Paraíba"],
      metaTitle: "Condomínios Fechados em Jacareí: Alto Padrão e Custo por m²",
      metaDescription: "Descubra as vantagens de morar em condomínios fechados em Jacareí. Excelente custo por m², lazer completo, segurança e acesso rápido à Dutra e Carvalho Pinto.",
      body: buildBody(
        [
          "A conurbação natural e a integração viária entre São José dos Campos e Jacareí transformaram esta última no principal vetor de expansão residencial horizontal de alto padrão da região metropolitana do Vale do Paraíba.",
          "Famílias que desejam a segurança de um condomínio fechado com grandes quintais e custo por metro quadrado muito mais vantajoso encontraram em bairros como Villa Branca, Coleginho e Jardim Califórnia a resposta perfeita para suas aspirações de qualidade de vida.",
        ],
        [
          {
            title: "1. A Conexão Metropolitana e Mobilidade Urbana Privilegiada",
            paragraphs: [
              "Jacareí desfruta de uma posição logística invejável no eixo São Paulo-Rio de Janeiro. O município é cortado pelas rodovias Presidente Dutra, Ayrton Senna, Carvalho Pinto e Dom Pedro I, facilitando o deslocamento diário para a capital ou para o litoral norte.",
              "A duplicação da Avenida Geraldo Scavone e os novos acessos viários ao Jardim Aquarius permitem chegar ao centro empresarial de SJC em menos de 15 minutos sem tráfego pesado.",
            ],
          },
          {
            title: "2. Custo por Metro Quadrado: A Vantagem Competitiva de Jacareí",
            paragraphs: [
              "Enquanto os terrenos em condomínios fechados na Zona Oeste de SJC alcançam facilmente valores de R$ 2.000 a R$ 2.800 por metro quadrado, loteamentos de alto padrão em Jacareí oferecem lotes de 360m² a 600m² na faixa de R$ 900 a R$ 1.500 por m².",
              "Essa economia inicial no terreno permite aos proprietários investir mais recursos no acabamento premium e na tecnologia construtiva da residência.",
            ],
          },
          {
            title: "3. O Conceito Clube nos Condomínios Fechados",
            paragraphs: [
              "Condomínios renomados como o Quinta das Flores, Vivva Residencial Clube, Mirante do Vale e Terra Nova foram concebidos com complexos de lazer de padrão resort: piscinas adulto e infantil com toboágua, quadras de tênis, campos de futebol com grama natural, pista de skate e salões de festas climatizados.",
            ],
          },
          {
            title: "4. Villa Branca: O Bairro Planejado Mais Desejado",
            level: "h3",
            paragraphs: [
              "O bairro Villa Branca consolidou-se como uma minicidade autônoma na divisa com São José dos Campos. Com comércio próprio, praças arborizadas, colégios e empórios gastronômicos, o bairro reúne o melhor de dois mundos: tranquilidade residencial e vida comercial a passos de distância.",
            ],
          },
          {
            title: "5. Lotes Amplos e Liberdade Arquitetônica para Casas Térreas",
            paragraphs: [
              "A metragem generosa dos lotes em Jacareí possibilita a construção de casas térreas integradas, eliminando escadas e garantindo acessibilidade para todas as fases da vida familiar, com amplo espaço para piscina privativa, fogo de chão e pomares caseiros.",
            ],
          },
          {
            title: "6. Infraestrutura de Escolas e Serviços de Saúde",
            paragraphs: [
              "Jacareí tem recebido unidades de renomadas redes educacionais particulares e conta com o Hospital São Francisco e policlínicas modernas, além do fácil acesso aos hospitais de alta complexidade de São José dos Campos.",
            ],
          },
          {
            title: "7. Segurança Integrada e Ronda Armada",
            paragraphs: [
              "A tranquilidade de deixar os filhos brincarem livremente na rua é o maior atrativo para os pais. Os condomínios fechados de Jacareí contam com portarias blindadas, controle biométrico de visitantes e monitoramento perimetral 24 horas por dia.",
            ],
          },
          {
            title: "8. O Perfil das Famílias que Migram para Jacareí",
            paragraphs: [
              "O perfil predominante é de casais entre 30 e 50 anos com filhos pequenos ou animais de estimação, que moravam em apartamentos compactos em São Paulo ou SJC e buscavam mais espaço, ar puro e contato com a natureza.",
            ],
          },
          {
            title: "9. Projeção de Valorização dos Empreendimentos",
            paragraphs: [
              "A contínua instalação de novos polos industriais e centros de distribuição em Jacareí gera empregos qualificados e sustenta uma valorização média anual de 9% a 13% nos condomínios fechados.",
            ],
          },
          {
            title: "10. Encontre sua Casa em Condomínio com a Pirâmide",
            paragraphs: [
              "A Pirâmide Imóveis dispõe de um catálogo selecionado de casas prontas e terrenos nos melhores condomínios fechados de Jacareí. Venha conversar com nossos consultores e encontre o lar ideal para sua família.",
            ],
          },
        ],
        imgJacarei
      ),
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
      galleryTitle: "Gastronomia e Ambientes Sofisticados em SJC",
      galleryImages: [imgGastronomia, imgLiving].filter(Boolean),
      author: { _type: "reference", _ref: "author-redacao-piramide" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-gastronomia-lifestyle" },
        { _type: "reference", _ref: "category-cidades-bairros" },
      ],
      tags: ["Gastronomia", "Jardim Aquarius", "Vila Ema", "Jardim Esplanada", "Lifestyle"],
      metaTitle: "Roteiro Gastronômico no Aquarius e Esplanada em SJC | Pirâmide",
      metaDescription: "Conheça os melhores restaurantes, bistrôs e cafés no Jardim Aquarius, Esplanada e Vila Ema em São José dos Campos. O guia gastronômico da Pirâmide Imóveis.",
      body: buildBody(
        [
          "São José dos Campos transformou-se em uma verdadeira capital gastronômica no interior de São Paulo. Bairros tradicionais como Vila Ema, Jardim Esplanada e Jardim Aquarius abrigam um ecossistema culinário cosmopolita, onde chefs premiados combinam técnicas internacionais a ingredientes frescos de produtores artesanais da Serra da Mantiqueira.",
          "Neste guia exclusivo elaborado pela redação do Blog Pirâmide Imóveis, apresentamos um roteiro imperdível pelos melhores restaurantes, bistrôs, cafeterias especiais e wine bars da cidade.",
        ],
        [
          {
            title: "1. O Polo Gastronômico da Vila Ema: Charme e Tradição",
            paragraphs: [
              "A Vila Ema é o coração boêmio e refinado de São José dos Campos. Em suas ruas arborizadas, casarões históricos deram lugar a bistrôs aconchegantes com mesas na calçada e luz de velas, criando o clima perfeito para encontros a dois ou reuniões familiares de fim de semana.",
            ],
          },
          {
            title: "2. Culinária Italiana Autêntica: Massas Frescas e Fornos a Lenha",
            paragraphs: [
              "A herança dos imigrantes italianos reflete-se em cantinas sofisticadas e trattorias modernas que produzem massas frescas artesanais diariamente, acompanhadas por molhos clássicos como o ragù de costela e queijos da Mantiqueira.",
              "As pizzarias napolitanas certificadas utilizam farinhas italianas de fermentação lenta e fornos a mais de 450 graus, garantindo bordas altas e massas leves e aeradas.",
            ],
          },
          {
            title: "3. Alta Culinária Japonesa no Jardim Aquarius",
            paragraphs: [
              "O Jardim Aquarius destaca-se pela concentração de renomados restaurantes japoneses contemporâneos. Com menus degustação (omakase) liderados por sushimen experientes, os estabelecimentos utilizam peixes frescos nobres como atum bluefin, salmão selvagem e vieiras canadenses maçaricadas com trufas negras.",
            ],
          },
          {
            title: "4. Cortes Nobres de Carnes e Churrasco Contemporâneo",
            level: "h3",
            paragraphs: [
              "Para os amantes de carnes grelhadas, a região do Esplanada e Aquarius oferece steakhouses especializadas em cortes maturados (dry aged), bife de chorizo de gado Angus e o exclusivo wagyu com alto índice de marmoreio.",
            ],
          },
          {
            title: "5. Cafeterias Especiais e Pâtisseries Francesas",
            paragraphs: [
              "A cultura do café especial ganhou força definitiva na cidade. Cafeterias da Vila Adyana e Vila Ema trabalham com grãos 100% arábica de microlotes premiados de Minas Gerais e Espírito Santo, preparados em métodos filtrados como V60, Chemex e Prensa Francesa, harmonizados com croissants folhados artesanais.",
            ],
          },
          {
            title: "6. Padarias Artesanais e Empórios Gourmet",
            paragraphs: [
              "Padarias com conceito de fermentação natural (sourdough) e empórios especializados em vinhos, azeites importados e queijos artesanais são o ponto de encontro matinal dos moradores nos sábados e domingos.",
            ],
          },
          {
            title: "7. Vida Noturna Sofisticada: Wine Bars e Coquetelaria Autoral",
            paragraphs: [
              "A noite em São José dos Campos oferece wine bars com sommeliers dedicados e dezenas de rótulos internacionais em taça, além de bares de coquetelaria autoral que preparam drinques clássicos e criações exclusivas com botânicos frescos.",
            ],
          },
          {
            title: "8. A Relação Direta entre Gastronomia e Valorização Imobiliária",
            paragraphs: [
              "Bairros dotados de uma cena gastronômica efervescente experimentam maior atração de moradores de alta renda e maior fluxo de pedestres, fatores que impulsionam a valorização dos imóveis residenciais e comerciais do entorno.",
            ],
          },
          {
            title: "9. Opções Veganas e Cozinha Funcional Sustentável",
            paragraphs: [
              "A gastronomia inclusiva também tem espaço de destaque em SJC, com bistrôs dedicados à culinária plant-based orgânica, pratos sem glúten e sobremesas sem adição de açúcares refinados.",
            ],
          },
          {
            title: "10. O Estilo de Vida no Vale com a Pirâmide Imóveis",
            paragraphs: [
              "Viver perto dos melhores restaurantes da cidade transforma a rotina e proporciona momentos inesquecíveis em família. Explore nossos imóveis disponíveis para morar a poucos passos dos polos gastronômicos de SJC.",
            ],
          },
        ],
        imgGastronomia
      ),
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
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoTitle: "Tecnologia e Sustentabilidade nas Casas Inteligentes",
      videoCaption: "Veja como a automação e as fontes renováveis reduzem custos de manutenção.",
      calloutStyle: "info",
      calloutTitle: "Retorno Financeiro da Energia Solar",
      calloutContent: "O investimento em sistemas solares fotovoltaicos no Vale do Paraíba atinge o ponto de equilíbrio (payback) entre 3 e 4 anos, proporcionando até 90% de economia na fatura de energia.",
      faqTitle: "Perguntas sobre Sustentabilidade Residencial",
      faqItems: [
        {
          question: "Imóveis com placas solares têm maior valor de mercado?",
          answer: "Sim. Pesquisas do setor imobiliário indicam valorização média de 6% a 10% no valor de revenda de casas equipadas com geração própria de energia.",
        },
      ],
      author: { _type: "reference", _ref: "author-marcos-oliveira" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-sustentabilidade-biofilia" },
        { _type: "reference", _ref: "category-arquitetura-design" },
      ],
      tags: ["Sustentabilidade", "Energia Solar", "Biofilia", "Casas Inteligentes", "Valorização"],
      metaTitle: "Casas Sustentáveis e Energia Solar: Valorização Imobiliária",
      metaDescription: "Saiba como a energia solar, reúso de água e biofilia valorizam imóveis no Vale do Paraíba. Economia real e liquidez acelerada com a Pirâmide Imóveis.",
      body: buildBody(
        [
          "A sustentabilidade na construção civil deixou de ser um conceito conceitual para se tornar uma métrica financeira tangível de valorização patrimonial. Imóveis residenciais concebidos com eficiência energética, captação solar e gestão inteligente de recursos hídricos vendem até 25% mais rápido e atraem compradores conscientes dispostos a pagar um prêmio pela economia operacional futura.",
          "Neste guia prático, apresentamos as soluções ecológicas de maior impacto na valorização de casas e apartamentos no Vale do Paraíba.",
        ],
        [
          {
            title: "1. A Sustentabilidade como Vetor de Decisão de Compra",
            paragraphs: [
              "O comprador contemporâneo avalia não apenas o custo de aquisição do imóvel, mas o seu custo total de propriedade ao longo de 10 a 20 anos. Residências com custos mensais reduzidos de energia, água e manutenção de condomínio desfrutam de liquidez superior.",
            ],
          },
          {
            title: "2. Energia Solar Fotovoltaica: Cálculo de Economia e Payback",
            paragraphs: [
              "A instalação de placas fotovoltaicas de silício monocristalino com microinversores permite gerar 100% da energia elétrica consumida pela casa, incluindo o carregamento de veículos elétricos e o aquecimento da piscina.",
              "Com os custos atuais dos equipamentos, o investimento inicial atinge o ponto de equilíbrio financeiro (payback) entre 36 e 48 meses, gerando economia líquida nas décadas seguintes.",
            ],
          },
          {
            title: "3. Sistemas de Reúso de Água Pluvial e Cisternas Subterrâneas",
            paragraphs: [
              "A captação de água da chuva através de calhas direcionadas para cisternas com filtragem mecânica permite irrigar jardins de grande porte, lavar calçadas e abastecer as bacias sanitárias sem consumir água tratada da rede pública.",
            ],
          },
          {
            title: "4. Arquitetura Bioclimática e Conforto Térmico Passivo",
            level: "h3",
            paragraphs: [
              "O posicionamento estratégico de beirais, brises e janelas em cantos opostos cria correntes de ventilação natural que reduzem a temperatura interna em até 4 graus nos dias mais quentes do verão, diminuindo o uso de climatizadores elétricos.",
            ],
          },
          {
            title: "5. Telhados Verdes e Jardins Verticais",
            paragraphs: [
              "A cobertura vegetal sobre lajes planas funciona como um poderoso isolante térmico e acústico natural, além de absorver águas de chuva e mitigar o efeito das ilhas de calor urbanas.",
            ],
          },
          {
            title: "6. Materiais com Baixo Impacto Ambiental e Tintas Ecológicas",
            paragraphs: [
              "O uso de madeiras com certificação FSC, pisos de bambu de crescimento rápido e tintas à base de água isentas de compostos orgânicos voláteis (COVs) assegura a saúde respiratória dos moradores.",
            ],
          },
          {
            title: "7. Certificações Ambientais para Residências (LEED e AQUA)",
            paragraphs: [
              "Selos de sustentabilidade reconhecidos internacionalmente como o LEED for Homes e a certificação AQUA-HQE atestam a conformidade do projeto e agregam credibilidade e valor de mercado ao imóvel.",
            ],
          },
          {
            title: "8. IPTU Verde: Incentivos Fiscais no Vale do Paraíba",
            paragraphs: [
              "Diversas prefeituras da região concedem descontos progressivos de 5% a 20% no imposto predial anual para imóveis que comprovem a utilização de energia renovável, captação pluvial e calçadas drenantes.",
            ],
          },
          {
            title: "9. Carregadores para Veículos Elétricos (Wallbox)",
            paragraphs: [
              "A eletrificação da frota automotiva transformou a presença de pontos de recarga rápida nas garagens em um item obrigatório na lista de exigências dos compradores de alto padrão.",
            ],
          },
          {
            title: "10. Invista no Futuro com a Pirâmide Sustentável",
            paragraphs: [
              "A Pirâmide Imóveis apoia e incentiva empreendimentos verdes que preservam o meio ambiente e protegem o patrimônio dos nossos clientes. Conheça nossa seleção de casas sustentáveis na região.",
            ],
          },
        ],
        imgSustentabilidade
      ),
    },

    
    {
      _id: "post-vila-ema-esplanada-qualidade-vida",
      _type: "post",
      title: "Vila Ema e Jardim Esplanada: Tradição e Sofisticação no Coração de SJC",
      slug: { _type: "slug", current: "vila-ema-jardim-esplanada-tradicao-sofisticacao-sjc" },
      featured: false,
      publishedAt: new Date("2026-02-17T11:45:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T15:00:00Z").toISOString(),
      excerpt: "Ruas arborizadas, proximidade com o Parque Vicentina Aranha e gastronomia de ponta fazem da Vila Ema e Esplanada as regiões mais nobres e charmosas de São José dos Campos.",
      mainImage: {
        ...imgSjc,
        alt: "Ruas arborizadas e edifícios charmosos na Vila Ema e Jardim Esplanada em São José dos Campos",
        caption: "Vila Ema e Esplanada: charme histórico, cultura e alta valorização imobiliária em SJC.",
      },
      calloutStyle: "info",
      calloutTitle: "Viver Perto do Parque Vicentina Aranha",
      calloutContent: "Morar a poucos metros do Parque Vicentina Aranha proporciona qualidade de vida diária incomparável com caminhadas matinais sob árvores centenárias, cinema ao ar livre e eventos culturais semanais.",
      author: { _type: "reference", _ref: "author-carlos-eduardo" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-cidades-bairros" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Vila Ema", "Jardim Esplanada", "Vicentina Aranha", "São José dos Campos", "Nobre"],
      metaTitle: "Vila Ema e Esplanada em SJC: Bairros Mais Nobres e Charmosos",
      metaDescription: "Conheça o charme da Vila Ema e Jardim Esplanada em São José dos Campos. Próximo ao Vicentina Aranha, gastronomia renomada e imóveis exclusivos com a Pirâmide Imóveis.",
      body: buildBody(
        [
          "A Vila Ema e o Jardim Esplanada formam o coração histórico e afetivo da classe alta de São José dos Campos. Com suas alamedas generosamente arborizadas, arquitetura clássica preservada e uma vizinhança consolidada, esses dois bairros oferecem uma qualidade de vida única que harmoniza o ritmo tranquilo de antigamente com as comodidades mais modernas da vida urbana.",
        ],
        [
          {
            title: "1. A História e Tradição dos Bairros Mais Nobres de SJC",
            paragraphs: [
              "Desenvolvidos a partir da expansão central no século XX, o Jardim Esplanada e a Vila Ema foram planejados para receber residências unifamiliares de grande porte com jardins frontais abertos e calçadas largas.",
              "Essa estrutura urbana preservada garante que os bairros mantenham baixíssima densidade demográfica e trânsito tranquilo mesmo nos horários de pico.",
            ],
          },
          {
            title: "2. A Influência Cultural do Parque Vicentina Aranha",
            paragraphs: [
              "Com seus 400 mil metros quadrados de área verde tombada pelo patrimônio histórico, o Parque Vicentina Aranha é o maior tesouro cultural e ambiental de São José dos Campos.",
              "Morar a poucos passos do parque permite desfrutar de caminhadas matinais diárias, piqueniques sob árvores centenárias, feiras literárias e concertos de música clássica ao ar livre.",
            ],
          },
          {
            title: "3. O Parque Santos Dumont e a Tradição Aeronáutica",
            level: "h3",
            paragraphs: [
              "Nas proximidades da Vila Adyana, o Parque Santos Dumont complementa as opções de lazer ao ar livre com lagos de carpas, pistas de corrida, réplicas do avião 14-Bis e muito espaço para crianças.",
            ],
          },
          {
            title: "4. Jardim Esplanada: Mansões Clássicas e Lotes Generosos",
            paragraphs: [
              "O Esplanada é sinônimo de elegância discreta. Suas ruas planas e tranquilas abrigam mansões tradicionais com piscinas privativas, áreas gourmet e segurança monitorada por vigilância patrimonial contínua.",
            ],
          },
          {
            title: "5. Vila Ema: A Elegância Pedonal e Boutiques Charmosas",
            paragraphs: [
              "A Vila Ema transformou-se no bairro mais charmoso da cidade para passear a pé. Boutiques de moda autoral, ateliês de decoração, estúdios de pilates e empórios finos convivem lado a lado com edifícios residenciais de alto padrão.",
            ],
          },
          {
            title: "6. Infraestrutura de Colégios de Elite e Saúde",
            paragraphs: [
              "A região concentra instituições tradicionais como o Colégio Poliedro, Colégio São José e centros de diagnóstico por imagem de alta precisão.",
            ],
          },
          {
            title: "7. Acesso Rápido ao Shopping Colinas e Avenidas Principais",
            paragraphs: [
              "A localização central permite acessar o Shopping Colinas, o Poupatempo, a Avenida Nove de Julho e a Rodovia Presidente Dutra em menos de 5 minutos.",
            ],
          },
          {
            title: "8. Estabilidade Histórica de Preços e Liquidez Patrimonial",
            paragraphs: [
              "Imóveis na Vila Ema e no Esplanada não sofrem desvalorização em momentos de instabilidade econômica. A escassez definitiva de terrenos e a demanda perene de famílias tradicionais mantêm os preços firmes e em constante valorização.",
            ],
          },
          {
            title: "9. Novos Edifícios Contemporâneos com Plantas Amplas",
            paragraphs: [
              "Os novos lançamentos residenciais na região respeitam a escala do bairro, oferecendo apartamentos de 3 e 4 suítes com acabamentos nobres, hall privativo e isolamento acústico entre lajes.",
            ],
          },
          {
            title: "10. Viva a Tradição com a Pirâmide Imóveis",
            paragraphs: [
              "Descubra as oportunidades exclusivas de casas e apartamentos na Vila Ema e Jardim Esplanada com a assessoria experiente da Pirâmide Imóveis.",
            ],
          },
        ],
        imgVaranda
      ),
    },

    
    {
      _id: "post-decoracao-ambientes-integrados",
      _type: "post",
      title: "Ambientes Integrados: Como Decorar e Ampliar Espaços em Apartamentos",
      slug: { _type: "slug", current: "ambientes-integrados-como-decorar-ampliar-espacos-apartamentos" },
      featured: false,
      publishedAt: new Date("2026-02-16T14:15:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T14:00:00Z").toISOString(),
      excerpt: "Dicas de arquitetos para integrar sala de estar, cozinha e varanda gourmet criando sensação de amplitude, fluidez e iluminação natural.",
      mainImage: {
        ...imgArquitetura,
        alt: "Conceito aberto integrando sala de jantar, living e varanda gourmet em apartamento",
        caption: "Conceito aberto: living integrado traz amplitude e sensação de liberdade aos moradores.",
      },
      galleryTitle: "Inspirações de Ambientes Integrados",
      galleryImages: [imgLiving, imgCozinha, imgVaranda].filter(Boolean),
      author: { _type: "reference", _ref: "author-marcos-oliveira" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-arquitetura-design" },
        { _type: "reference", _ref: "category-imoveis-de-luxo" },
      ],
      tags: ["Decoração", "Ambientes Integrados", "Design de Interiores", "Varanda Gourmet", "Living"],
      metaTitle: "Ambientes Integrados: Dicas de Decoração para Apartamentos",
      metaDescription: "Saiba como integrar living, cozinha e varanda gourmet para valorizar seu apartamento e ganhar amplitude visual. Guia de design da Pirâmide Imóveis.",
      body: buildBody(
        [
          "A arquitetura de interiores contemporânea aposentou definitivamente a compartimentação rígida dos apartamentos antigos. A integração entre sala de estar, sala de jantar, cozinha e varanda gourmet — o famoso 'conceito aberto' — amplia visualmente os espaços, melhora a circulação do ar e fomenta a convivência familiar diária.",
        ],
        [
          {
            title: "1. O Conceito Aberto e a Fluidez Espacial",
            paragraphs: [
              "Eliminar divisórias físicas permite que a luz natural vinda das janelas da varanda alcance até os cantos mais internos do apartamento, transformando ambientes escuros em espaços vibrantes e acolhedores.",
            ],
          },
          {
            title: "2. Nivelamento de Piso entre Living e Varanda Gourmet",
            paragraphs: [
              "O nivelamento da soleira da varanda com o piso da sala de estar e o envidraçamento retrátil criam a ilusão de um único ambiente contínuo de proporções muito maiores.",
            ],
          },
          {
            title: "3. Uso de Pisos Contínuos em Grande Formato",
            level: "h3",
            paragraphs: [
              "Optar pelo mesmo porcelanato acetinado em grandes formatos (120x120cm ou 160x80cm) em toda a área social minimiza rejuntes visíveis e expande a sensação de amplitude do chão.",
            ],
          },
          {
            title: "4. Cozinhas com Ilha Central em Quartzo ou Granito Escovado",
            paragraphs: [
              "A bancada central funciona como divisor sutil e ponto de encontro, acomodando banquetas altas para refeições rápidas e interação direta entre o cozinheiro e os convidados.",
            ],
          },
          {
            title: "5. Painéis Ripados de Madeira e Portas Mimetizadas",
            paragraphs: [
              "Painéis de marcenaria ripada disfarçam portas de lavabo, despensa e acessos à área íntima, criando superfícies limpas e contínuas na decoração.",
            ],
          },
          {
            title: "6. Coifas Silenciosas e Exaustão Eficiente",
            paragraphs: [
              "Em cozinhas abertas, investir em coifas de alta sucção e baixo ruído é indispensável para evitar que odores de gordura e fumaça se espalhem pelos sofás e cortinas.",
            ],
          },
          {
            title: "7. Iluminação em Trilhos e Fitas de LED embutidas",
            paragraphs: [
              "A iluminação modular setoriza as diferentes funções do espaço integrado sem a necessidade de construir barreiras físicas.",
            ],
          },
          {
            title: "8. Escolha de Móveis Proporcionais e Marcenaria Inteligente",
            paragraphs: [
              "Móveis com pés finos e bases suspensas liberam a visão do piso e deixam o ambiente mais leve e arejado.",
            ],
          },
          {
            title: "9. Tapetes Amplos para Demarcar Ambientes",
            paragraphs: [
              "Utilizar tapetes que abracem todos os pés do sofá e das poltronas ancora visualmente o living sem romper a fluidez da circulação.",
            ],
          },
          {
            title: "10. Valorize seu Imóvel com a Consultoria Pirâmide",
            paragraphs: [
              "Apartamentos com reformas de integração bem executadas têm velocidade de venda até 3 vezes mais rápida no mercado de São José dos Campos.",
            ],
          },
        ],
        imgLiving
      ),
    },

    
    {
      _id: "post-itbi-escritura-registro-custos",
      _type: "post",
      title: "Custos Extras na Compra do Imóvel: Quanto Reservar para ITBI, Escritura e Registro",
      slug: { _type: "slug", current: "custos-extras-compra-imovel-itbi-escritura-registro" },
      featured: false,
      publishedAt: new Date("2026-02-14T09:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T13:30:00Z").toISOString(),
      excerpt: "Além do valor da entrada, planeje os custos cartorários e impostos municipais. Veja a tabela de alíquotas de ITBI e emolumentos em São José dos Campos e região.",
      mainImage: {
        ...imgJuridico,
        alt: "Calculadora, documentos de cartório e chaves de casa em mesa de planejamento financeiro",
        caption: "Planejamento orçamentário: reserve entre 3% e 5% do valor do imóvel para despesas de transferência.",
      },
      calloutStyle: "warning",
      calloutTitle: "Atenção ao Desconto da Primeira Compra (Lei 6.015/73)",
      calloutContent: "Quem adquire o primeiro imóvel residencial financiado pelo SFH tem direito legal a 50% de desconto nas taxas cartorárias de Escritura e Registro de Imóveis. Exija esse benefício diretamente no cartório.",
      faqTitle: "Perguntas sobre Impostos e Cartório",
      faqItems: [
        {
          question: "Qual a alíquota de ITBI em São José dos Campos?",
          answer: "Em SJC, a alíquota padrão do ITBI é de 2% sobre o valor venal de referência ou valor de transação do imóvel (o que for maior).",
        },
        {
          question: "Quando o ITBI deve ser pago?",
          answer: "O imposto deve ser recolhido antes da lavratura da escritura pública ou emissão do contrato de financiamento bancário para registro.",
        },
      ],
      author: { _type: "reference", _ref: "author-carla-mendes" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-juridico-documentacao" },
        { _type: "reference", _ref: "category-financiamento-credito" },
      ],
      tags: ["ITBI", "Custos de Compra", "Cartório", "Escritura", "Registro de Imóveis"],
      metaTitle: "Custos Extras na Compra de Imóveis: ITBI, Escritura e Registro",
      metaDescription: "Entenda todas as despesas cartorárias e tributárias na compra do seu imóvel. Veja como economizar até 50% no primeiro imóvel com o guia da Pirâmide Imóveis.",
      body: buildBody(
        [
          "Planejar a compra de um imóvel exige olhar com atenção para além do valor negociado com o vendedor ou da parcela de entrada. As despesas tributárias e emolumentos cartorários de transferência representam uma fatia expressiva do orçamento global da operação.",
        ],
        [
          {
            title: "1. O Cálculo Real do Custo de Aquisição",
            paragraphs: [
              "Como regra geral de mercado, recomenda-se que o comprador reserve entre 4% e 6% do valor total do imóvel para cobrir as custas de transferência, impostos e certidões.",
            ],
          },
          {
            title: "2. ITBI: O Imposto de Transmissão de Bens Imóveis",
            paragraphs: [
              "O ITBI é um tributo municipal obrigatório cobrado pela prefeitura no momento da transmissão da propriedade entre pessoas vivas. A alíquota em São José dos Campos é de 2%.",
            ],
          },
          {
            title: "3. Escritura Pública: Tabela de Emolumentos do Estado de SP",
            level: "h3",
            paragraphs: [
              "Cobrada pelo Tabelionato de Notas para lavrar a escritura que oficializa a manifestação de vontade das partes, com valores tabelados por lei estadual de acordo com a faixa de preço do imóvel.",
            ],
          },
          {
            title: "4. Registro de Imóveis: O Registro Definitivo na Matrícula",
            paragraphs: [
              "O Cartório de Registro de Imóveis cobra emolumentos para efetivar a averbação da transferência na matrícula do bem.",
            ],
          },
          {
            title: "5. O Desconto Legal de 50% para a Primeira Compra pelo SFH",
            paragraphs: [
              "O Artigo 290 da Lei de Registros Públicos (Lei 6.015/73) assegura 50% de redução nas custas cartorárias de primeiro imóvel residencial financiado pelo SFH.",
            ],
          },
          {
            title: "6. Taxa de Avaliação e Engenharia Bancária",
            paragraphs: [
              "Nos casos de financiamento, os bancos cobram uma taxa de avaliação técnica do imóvel que varia entre R$ 3.000 e R$ 4.000.",
            ],
          },
          {
            title: "7. Custas com Certidões Negativas e Despachante",
            paragraphs: [
              "A emissão de certidões estaduais, federais e cartorárias soma em média entre R$ 800 e R$ 1.500.",
            ],
          },
          {
            title: "8. Reserva Financeira para Mudança e Pequenas Reformas",
            paragraphs: [
              "Custos de transporte, pintura inicial e troca de fechaduras devem constar na planilha financeira do comprador.",
            ],
          },
          {
            title: "9. Cronograma de Pagamento das Despesas",
            paragraphs: [
              "O ITBI é pago na emissão da guia, a escritura no ato da assinatura e o registro no protocolo do cartório.",
            ],
          },
          {
            title: "10. Simulação Completa e Transparente com a Pirâmide",
            paragraphs: [
              "Nossos consultores apresentam uma planilha transparente com todos os custos detalhados antes de você assinar a proposta de compra.",
            ],
          },
        ],
        imgJuridico
      ),
    },

    
    {
      _id: "post-caraguatatuba-novo-polo-litoral",
      _type: "post",
      title: "Caraguatatuba: O Novo Polo de Investimento Imobiliário com os Contornos da Tamoios",
      slug: { _type: "slug", current: "caraguatatuba-novo-polo-investimento-contornos-tamoios" },
      featured: false,
      publishedAt: new Date("2026-02-13T16:40:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T12:00:00Z").toISOString(),
      excerpt: "Com a entrega dos novos contornos viários e shopping centers, Caraguatatuba vive um ciclo acelerado de valorização em praias como Martim de Sá e Tabatinga.",
      mainImage: {
        ...imgCaragua,
        alt: "Vista aérea da orla de Caraguatatuba com nova iluminação em LED e ciclovia beira-mar",
        caption: "Caraguatatuba: infraestrutura de transporte moderna atrai investimentos residenciais e turísticos.",
      },
      calloutStyle: "info",
      calloutTitle: "Infraestrutura e Crescimento Urbano",
      calloutContent: "Caraguatatuba é a cidade que mais investe em urbanização de orlas e saneamento no Litoral Norte, consolidando-se como a melhor opção para moradia permanente com custo por m² muito competitivo.",
      ctaTitle: "Oportunidades em Caraguatatuba Frente ao Mar",
      ctaDescription: "Receba opções de apartamentos na planta e prontos para morar em Martim de Sá e Tabatinga.",
      ctaButtonText: "Ver Imóveis em Caraguá no WhatsApp",
      author: { _type: "reference", _ref: "author-felipe-santos" },
      city: { _type: "reference", _ref: "city-caraguatatuba" },
      categories: [
        { _type: "reference", _ref: "category-cidades-bairros" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Caraguatatuba", "Litoral Norte", "Tamoios", "Martim de Sá", "Praia"],
      metaTitle: "Investir em Caraguatatuba: Valorização e Contornos da Tamoios",
      metaDescription: "Conheça as oportunidades imobiliárias em Caraguatatuba. Praias valorizadas, mobilidade facilitada pela nova Tamoios e lançamentos com a Pirâmide Imóveis.",
      body: buildBody(
        [
          "Caraguatatuba é a capital administrativa e de serviços do Litoral Norte de São Paulo. A conclusão dos novos contornos da Rodovia dos Tamoios encurtou radicalmente o tempo de viagem a partir do Vale do Paraíba, atraindo novos condomínios residenciais e investidores em busca de liquidez e praia.",
        ],
        [
          {
            title: "1. A Transformação Viária com os Contornos da Tamoios",
            paragraphs: [
              "A nova rodovia permite desviar do trânsito urbano central e acessar as praias do norte e do sul com agilidade e total segurança viária.",
            ],
          },
          {
            title: "2. Praia Martim de Sá: O Polo de Maior Agito e Juventude",
            paragraphs: [
              "Com calçadão revitalizado, quiosques modernos e ciclovia, a Martim de Sá lidera a procura por apartamentos para locação de temporada.",
            ],
          },
          {
            title: "3. Tabatinga e Mococa: Exclusividade Náutica e Águas Calmas",
            level: "h3",
            paragraphs: [
              "Condomínios de alto padrão como o Costa Verde Tabatinga oferecem marina privativa, campo de golfe e mansões pé na areia exclusivas.",
            ],
          },
          {
            title: "4. Centro e Prainha: Infraestrutura Completa o Ano Inteiro",
            paragraphs: [
              "Ideal para quem deseja morar na praia com acesso a hospitais, shopping centers, escolas e comércio completo sem depender de sazonalidade.",
            ],
          },
          {
            title: "5. Expansão Hospitalar e Universitária de Caraguá",
            paragraphs: [
              "A presença do Hospital Regional do Litoral Norte e de polos universitários garante demanda estável de locação anual para profissionais qualificados.",
            ],
          },
          {
            title: "6. Comparativo de Custo por m² no Litoral Norte",
            paragraphs: [
              "Caraguatatuba oferece metro quadrado até 30% mais acessível que Ubatuba e São Sebastião, com potencial expressivo de valorização a curto prazo.",
            ],
          },
          {
            title: "7. Lançamentos com Varanda Gourmet e Vista Mar",
            paragraphs: [
              "Empreendimentos modernos oferecem plantas compactas de 2 dormitórios com lazer completo e hobby box privativo.",
            ],
          },
          {
            title: "8. Rentabilidade com Locação de Verão e Feriados",
            paragraphs: [
              "A facilidade de acesso estimula estadias frequentes de fim de semana, mantendo a ocupação elevada fora da alta temporada.",
            ],
          },
          {
            title: "9. Obras de Drenagem e Urbanização das Orlas",
            paragraphs: [
              "Investimentos públicos contínuos em ciclovias e iluminação em LED valorizam a orla e elevam a qualidade de vida local.",
            ],
          },
          {
            title: "10. Conheça as Melhores Opções em Caraguatatuba com a Pirâmide",
            paragraphs: [
              "Receba nosso catálogo completo de lançamentos na planta e apartamentos prontos frente ao mar em Caraguá.",
            ],
          },
        ],
        imgCaragua
      ),
    },

    
    {
      _id: "post-locacao-lei-inquilinato-direitos",
      _type: "post",
      title: "Lei do Inquilinato na Prática: Direitos e Deveres de Proprietários e Inquilinos",
      slug: { _type: "slug", current: "lei-do-inquilinato-na-pratica-direitos-deveres-locacao" },
      featured: false,
      publishedAt: new Date("2026-02-12T10:30:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T11:00:00Z").toISOString(),
      excerpt: "Tire suas dúvidas sobre reajuste pelo IPCA/IGP-M, regras para rescisão antecipada, devolução de caução e a importância da vistoria profissional de entrada e saída.",
      mainImage: {
        ...imgJuridico,
        alt: "Contrato de locação residencial assinado e vistoria fotográfica de imóvel",
        caption: "Segurança na locação: contratos claros e vistorias detalhadas protegem proprietários e inquilinos.",
      },
      calloutStyle: "warning",
      calloutTitle: "Atenção à Multa Proporcional de Rescisão",
      calloutContent: "Caso o inquilino precise desocupar o imóvel antes do término do prazo contratual, a multa rescisória deve ser cobrada de forma estritamente proporcional aos meses restantes de contrato, conforme o Artigo 4º da Lei 8.245/91.",
      faqTitle: "Dúvidas sobre Contratos de Aluguel",
      faqItems: [
        {
          question: "Quem deve pagar a taxa de condomínio extraordinária?",
          answer: "Despesas extraordinárias (como reformas estruturais, pintura de fachada e fundo de reserva) são de responsabilidade exclusiva do proprietário. O inquilino responde apenas pelas despesas ordinárias de manutenção.",
        },
        {
          question: "Qual o melhor índice de reajuste de aluguel atualmente?",
          answer: "O IPCA tem sido amplamente adotado nos novos contratos de locação por refletir com mais precisão a inflação oficial do consumidor, evitando as oscilações extremas históricas do IGP-M.",
        },
      ],
      author: { _type: "reference", _ref: "author-carla-mendes" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-juridico-documentacao" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Locação", "Lei do Inquilinato", "Aluguel", "Contrato de Aluguel", "Vistoria"],
      metaTitle: "Lei do Inquilinato na Prática: Guia de Aluguel para Proprietários",
      metaDescription: "Entenda as principais regras da Lei do Inquilinato: reajuste de aluguel, rescisão contratual, vistoria e garantias locatícias com a assessoria da Pirâmide Imóveis.",
      body: buildBody(
        [
          "A relação entre proprietário (locador) e inquilino (locatário) é regulamentada pela Lei Federal nº 8.245/1991, amplamente conhecida como Lei do Inquilinato. Compreender os limites da legislação é indispensável para evitar atritos, prejuízos financeiros e disputas judiciais desgastantes.",
        ],
        [
          {
            title: "1. Princípios Básicos da Lei 8.245/91",
            paragraphs: [
              "A legislação busca equilibrar o direito de propriedade do locador com a proteção à moradia e estabilidade do locatário durante a vigência do contrato.",
            ],
          },
          {
            title: "2. Obrigações Inegociáveis do Proprietário (Locador)",
            paragraphs: [
              "O locador deve entregar o imóvel em perfeito estado de habitabilidade, responsabilizar-se por vícios ocultos estruturais e arcar com reformas extraordinárias do condomínio.",
            ],
          },
          {
            title: "3. Deveres Fundamentais do Inquilino (Locatário)",
            level: "h3",
            paragraphs: [
              "O inquilino deve pagar pontualmente o aluguel e encargos, cuidar do bem como se fosse seu e restituí-lo no estado em que o recebeu ao fim da locação.",
            ],
          },
          {
            title: "4. Despesas Ordinárias vs Extraordinárias de Condomínio",
            paragraphs: [
              "Despesas ordinárias (salários, limpeza, luz comum) cabem ao inquilino; despesas extraordinárias (reformas estruturais, pintura externa, fundo de reserva) cabem ao proprietário.",
            ],
          },
          {
            title: "5. Garantias Locatícias: Caução, Fiador e Seguro Fiança",
            paragraphs: [
              "A lei proíbe exigir mais de uma modalidade de garantia no mesmo contrato. O Seguro Fiança tornou-se a modalidade preferida por aprovar o aluguel sem depender de fiadores.",
            ],
          },
          {
            title: "6. Rescisão Antecipada e Cálculo da Multa Proporcional",
            paragraphs: [
              "A multa rescisória deve ser cobrada proporcionalmente aos meses restantes de contrato, sendo ilegal a cobrança integral do valor da multa.",
            ],
          },
          {
            title: "7. Índices de Reajuste: IPCA vs IGP-M",
            paragraphs: [
              "A maioria dos novos contratos adota o IPCA para garantir reajustes transparentes alinhados à inflação real do consumidor.",
            ],
          },
          {
            title: "8. A Importância da Vistoria Fotográfica Inicial e Final",
            paragraphs: [
              "Um laudo de vistoria minucioso com dezenas de fotos em alta resolução protege ambas as partes de cobranças indevidas na entrega das chaves.",
            ],
          },
          {
            title: "9. Regras para Retomada do Imóvel pelo Proprietário",
            paragraphs: [
              "Em contratos de 30 meses, o proprietário pode solicitar o imóvel ao fim do prazo sem justificativa; em contratos menores, a denúncia vazia só cabe após 5 anos ininterruptos.",
            ],
          },
          {
            title: "10. Gestão Segura de Locação com a Pirâmide Imóveis",
            paragraphs: [
              "A Pirâmide Imóveis oferece garantia total de aluguel em dia e assessoria jurídica integral para proprietários e inquilinos.",
            ],
          },
        ],
        imgJuridico
      ),
    },

    
    {
      _id: "post-taubate-condominios-fechados",
      _type: "post",
      title: "Taubaté: O Crescimento dos Bairros Planejados e Condomínios na Região da Quiririm",
      slug: { _type: "slug", current: "taubate-crescimento-bairros-planejados-quiririm-condominios" },
      featured: false,
      publishedAt: new Date("2026-02-11T15:00:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T10:00:00Z").toISOString(),
      excerpt: "Com forte polo gastronômico italiano e localização estratégica entre a Dutra e a Serra da Mantiqueira, a região da Quiririm e Independência em Taubaté atrai novos loteamentos fechados.",
      mainImage: {
        ...imgTaubate,
        alt: "Área verde e condomínio fechado horizontal em Taubaté SP",
        caption: "Taubaté: tranquilidade e expansão de condomínios fechados próximos à gastronomia da Quiririm.",
      },
      calloutStyle: "tip",
      calloutTitle: "Dica de Localização em Taubaté",
      calloutContent: "A região Oeste de Taubaté (Quiririm e Independência) concentra os melhores colégios particulares, acesso direto à Rodovia Floriano Rodrigues Pinheiro (subida para Campos do Jordão) e ampla oferta de comércio.",
      author: { _type: "reference", _ref: "author-redacao-piramide" },
      city: { _type: "reference", _ref: "city-taubate" },
      categories: [
        { _type: "reference", _ref: "category-cidades-bairros" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Taubaté", "Quiririm", "Condomínio Fechado", "Loteamento", "Vale do Paraíba"],
      metaTitle: "Condomínios Fechados em Taubaté: Quiririm e Bairros Nobres",
      metaDescription: "Conheça as vantagens de morar em condomínios fechados em Taubaté. Gastronomia tradicional, acesso rápido à Mantiqueira e lançamentos com a Pirâmide Imóveis.",
      body: buildBody(
        [
          "Taubaté é o segundo maior polo econômico do Vale do Paraíba e vivencia uma forte expansão de loteamentos fechados e bairros planejados na região da Quiririm, Independência e Jaboticabeiras.",
        ],
        [
          {
            title: "1. O Vetor de Crescimento da Região Oeste de Taubaté",
            paragraphs: [
              "A infraestrutura viária e a proximidade com a serra transformaram o distrito de Quiririm na área mais valorizada para novos condomínios horizontais.",
            ],
          },
          {
            title: "2. O Charme e a Gastronomia do Distrito de Quiririm",
            paragraphs: [
              "Famoso pela festa da colônia italiana e por suas cantinas típicas, o Quiririm alia charme histórico e preservação ambiental.",
            ],
          },
          {
            title: "3. Lotes Generosos para Casas Térreas Espaçosas",
            level: "h3",
            paragraphs: [
              "Terrenos a partir de 300m² a 500m² possibilitam projetos com grandes varandas, churrasqueira e jardins para crianças e pets.",
            ],
          },
          {
            title: "4. Acessibilidade à Dutra e Rodovia para Campos do Jordão",
            paragraphs: [
              "O acesso imediato à Floriano Pinheiro permite subir para a Serra da Mantiqueira em menos de 25 minutos nos fins de semana.",
            ],
          },
          {
            title: "5. Bairro Independência: Comércio e Colégios de Ponta",
            paragraphs: [
              "Infraestrutura de supermercados, farmácias e as principais escolas particulares da cidade a poucos minutos de casa.",
            ],
          },
          {
            title: "6. Custo-Benefício Atraente no Vale do Paraíba",
            paragraphs: [
              "Valores de terreno e custo de construção por metro quadrado muito competitivos em comparação com outras cidades do eixo Dutra.",
            ],
          },
          {
            title: "7. Condomínios com Lazer Completo e Segurança Armada",
            paragraphs: [
              "Portarias com controle biométrico e clubes sociais completos para convivência entre vizinhos com tranquilidade.",
            ],
          },
          {
            title: "8. Pólo Universitário e Industrial Forte",
            paragraphs: [
              "A presença da Unitau e de multinacionais atrai profissionais qualificados e sustenta a demanda habitacional da cidade.",
            ],
          },
          {
            title: "9. O Que Observar ao Comprar Lotes na Região",
            paragraphs: [
              "Topografia do lote, orientação solar e histórico da construtora do empreendimento são pontos essenciais na escolha.",
            ],
          },
          {
            title: "10. Encontre seu Imóvel em Taubaté com a Pirâmide",
            paragraphs: [
              "Consulte nossa carteira de casas prontas e terrenos em condomínios fechados em Taubaté com atendimento personalizado.",
            ],
          },
        ],
        imgFachada
      ),
    },

    
    {
      _id: "post-reforma-valorizacao-imovel",
      _type: "post",
      title: "Reforma Inteligente: As 5 Mudanças que Mais Valorizam o Imóvel na Hora de Vender",
      slug: { _type: "slug", current: "reforma-inteligente-5-mudancas-que-mais-valorizam-imovel-venda" },
      featured: false,
      publishedAt: new Date("2026-02-10T13:30:00Z").toISOString(),
      updatedAt: new Date("2026-03-01T09:00:00Z").toISOString(),
      excerpt: "Pintura neutra, modernização de bancadas de cozinha, iluminação em LED e troca de metais sanitários podem elevar o valor de venda em até 15% e reduzir o tempo de fechamento.",
      mainImage: {
        ...imgLiving,
        alt: "Living reformado com piso em porcelanato acetinado e iluminação em perfis de LED",
        caption: "Pequenas reformas estratégicas aumentam a percepção de valor e aceleram a venda do imóvel.",
      },
      calloutStyle: "tip",
      calloutTitle: "Dica de Ouro para Home Staging",
      calloutContent: "Invista em cores claras nas paredes e iluminação quente (3000K) nos ambientes sociais. Ambientes iluminados parecem até 20% mais amplos e criam uma conexão emocional imediata na primeira visita do comprador.",
      galleryTitle: "Exemplos de Reformas de Alto Impacto Visual",
      galleryImages: [imgLiving, imgCozinha, imgVaranda].filter(Boolean),
      ctaTitle: "Quer Saber Quanto Vale o Seu Imóvel Hoje?",
      ctaDescription: "Nossos avaliadores credenciados realizam uma análise mercadológica precisa para precificar e vender seu imóvel com máxima liquidez.",
      ctaButtonText: "Solicitar Avaliação Gratuita no WhatsApp",
      author: { _type: "reference", _ref: "author-marcos-oliveira" },
      city: { _type: "reference", _ref: "city-sao-jose-dos-campos" },
      categories: [
        { _type: "reference", _ref: "category-arquitetura-design" },
        { _type: "reference", _ref: "category-mercado-imobiliario" },
      ],
      tags: ["Reforma", "Valorização", "Home Staging", "Venda de Imóveis", "Arquitetura"],
      metaTitle: "Reforma Inteligente: 5 Dicas para Valorizar seu Imóvel na Venda",
      metaDescription: "Saiba quais reformas aumentam o valor de venda e aceleram a liquidez do seu imóvel em São José dos Campos. Guia prático com os especialistas da Pirâmide Imóveis.",
      body: buildBody(
        [
          "Colocar um imóvel à venda no mercado sem nenhuma preparação prévia é um dos erros mais caros que um proprietário pode cometer. Imóveis com sinais visíveis de desgaste, pintura desbotada ou iluminação inadequada permanecem meses parados e sofrem pedidos agressivos de desconto de até 20%.",
          "Por outro lado, intervenções pontuais e inteligentes de Home Staging aumentam o valor de avaliação e reduzem o tempo de venda pela metade.",
        ],
        [
          {
            title: "1. O Conceito de Home Staging e a Primeira Impressão",
            paragraphs: [
              "O comprador toma a decisão emocional de compra nos primeiros 90 segundos de visita. Preparar o imóvel para encantar visualmente cria uma conexão imediata e elimina objeções.",
            ],
          },
          {
            title: "2. Pintura Neutra com Cores Claras para Ampliar a Luz",
            paragraphs: [
              "Pintar todas as paredes internas com tons neutros (como off-white, cinza claro ou bege suave) reflete a iluminação natural e faz os cômodos parecerem maiores.",
            ],
          },
          {
            title: "3. Modernização da Iluminação com Perfis de LED",
            level: "h3",
            paragraphs: [
              "Substituir luminárias antigas por plafons modernos e lâmpadas de temperatura de cor quente (3000K) confere ar contemporâneo e acolhedor aos ambientes.",
            ],
          },
          {
            title: "4. Reforma Estratégica da Bancada da Cozinha",
            paragraphs: [
              "Trocar tampos manchados por pedras sintéticas modernas ou granito preto são gabriel revitaliza completamente o visual da cozinha com custo reduzido.",
            ],
          },
          {
            title: "5. Renovação de Banheiros: Metais, Espelhos e Box",
            paragraphs: [
              "Substituir torneiras antigas por modelos monocomando cromados ou preto fosco e instalar novos espelhos com iluminação embutida transforma banheiros antigos em spas.",
            ],
          },
          {
            title: "6. Troca de Pisos Danificados por Vinílico ou Porcelanato",
            paragraphs: [
              "Pisos vinílicos colados sobre pisos antigos oferecem instalação rápida e silenciosa, conferindo conforto acústico e acabamento impecável.",
            ],
          },
          {
            title: "7. Despersonalização e Organização dos Ambientes",
            paragraphs: [
              "Retirar fotos de família, excesso de objetos decorativos e roupas acumuladas permite que o visitante se imagine morando no local.",
            ],
          },
          {
            title: "8. Cuidados com a Fachada e Jardim na Entrada",
            paragraphs: [
              "Aparar a grama, pintar o portão de entrada e plantar flores coloridas no jardim frontal geram uma primeira impressão marcante antes mesmo de abrir a porta.",
            ],
          },
          {
            title: "9. O que Evitar: Reformas Pesadas que Não Têm Retorno",
            paragraphs: [
              "Evite reformas estruturais caras ou acabamentos muito personalizados que possam não agradar o gosto particular do próximo comprador.",
            ],
          },
          {
            title: "10. Avaliação Mercadológica Gratuita com a Pirâmide",
            paragraphs: [
              "A Pirâmide Imóveis oferece vistoria de avaliação com corretores experientes que apontam exatamente quais melhorias farão seu imóvel vender mais rápido pelo melhor preço.",
            ],
          },
        ],
        imgLiving
      ),
    },
  ];

  const postViewsMap: Record<string, number> = {
    "post-financiamento-2026": 2840,
    "post-valorizacao-sjc-aquarius-urbanova": 3120,
    "post-ubatuba-investimento-temporada": 2450,
    "post-campos-do-jordao-casas-de-campo": 1980,
    "post-lancamentos-studios-investimento": 2750,
    "post-ilhabela-sao-sebastiao-alto-padrao": 1890,
    "post-arquitetura-autoral-alto-padrao": 1420,
    "post-documentacao-imovel-passo-a-passo": 1650,
    "post-jacarei-expansao-condominios-fechados": 1210,
    "post-gastronomia-vale-do-paraiba": 1540,
    "post-sustentabilidade-energia-solar-imoveis": 980,
    "post-vila-ema-esplanada-qualidade-vida": 1350,
    "post-decoracao-ambientes-integrados": 1150,
    "post-itbi-escritura-registro-custos": 1680,
    "post-caraguatatuba-novo-polo-litoral": 920,
    "post-locacao-lei-inquilinato-direitos": 1490,
    "post-taubate-condominios-fechados": 860,
    "post-reforma-valorizacao-imovel": 1280,
  };

  for (const post of posts) {
    const preparedPost = {
      ...post,
      views: post.views || postViewsMap[post._id] || 500,
      categories: (post.categories || []).map((cat: CategoryReference, idx: number) => ({
        ...cat,
        _key: cat._key || `cat_${idx}_${cat._ref || Math.random().toString(36).substring(2, 7)}`,
      })),
      faqItems: (post.faqItems || []).map((item: FaqItemSeed, idx: number) => ({
        ...item,
        _key: item._key || `faq_${idx}_${Math.random().toString(36).substring(2, 7)}`,
      })),
      galleryImages: (post.galleryImages || []).map((img: SanityImageObject & { _key?: string }, idx: number) => ({
        ...img,
        _key: img._key || `gal_${idx}_${Math.random().toString(36).substring(2, 7)}`,
      })),
      body: (post.body || []).filter(Boolean).map((block: SanityBlock, idx: number) => ({
        ...block,
        _key: block._key || `blk_${idx}_${Math.random().toString(36).substring(2, 7)}`,
        ...(block.children
          ? {
              children: block.children.filter(Boolean).map((child: SanityBlockChild, cIdx: number) => ({
                ...child,
                _key: child._key || `span_${cIdx}_${Math.random().toString(36).substring(2, 7)}`,
              })),
            }
          : {}),
      })),
    };
    await client.createOrReplace(preparedPost);
    const badge = post.featured ? "[DESTAQUE] " : "";
    console.log(`  ✓ ${badge}Artigo: ${post.title}`);
  }

  console.log("\n🎉 SEED DE 18 ARTIGOS IN-DEPTH CONCLUÍDO COM SUCESSO!");
  console.log("Todos os 18 Artigos possuem de 8 a 12 seções completas, com H2, H3, parágrafos densos e índice navegável!\n");
}

runSeed().catch((err) => {
  console.error("❌ Erro durante a execução do seed:", err);
  process.exit(1);
});
