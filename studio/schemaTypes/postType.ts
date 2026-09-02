import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon, BulbOutlineIcon, HelpCircleIcon, EnvelopeIcon, PlayIcon, ImagesIcon} from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Artigo do Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'featuredTopics',
      title: '3 Tópicos Principais do Destaque (Carrossel Hero)',
      description:
        'Aparecem como 3 "pílulas" de resumo rápido no rodapé do banner principal na página inicial quando o artigo está marcado em Destaque.',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'calloutSection',
      title: 'Caixa de Destaque / Dica do Consultor (Opcional)',
      description:
        'Adicione uma caixa estilizada de dica de ouro, atenção ou citação especial exibida com destaque no artigo.',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'faqSection',
      title: 'FAQ - Perguntas Frequentes do Artigo (Opcional - Google Schema)',
      description:
        'Adicione perguntas e respostas frequentes sobre o tema do artigo. O sistema gera automaticamente os dados estruturados (FAQPage) para o Google.',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'ctaSection',
      title: 'Bloco de Conversão / WhatsApp Personalizado (Opcional)',
      description:
        'Personalize a chamada comercial e o botão de WhatsApp no final do artigo. Se não preenchido, o blog exibirá o CTA padrão da imobiliária.',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'videoSection',
      title: 'Vídeo em Destaque (YouTube / Vimeo - Opcional)',
      description:
        'Incorpore um vídeo de tour virtual ou explicação técnica no artigo.',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'gallerySection',
      title: 'Galeria de Fotos do Imóvel / Região (Opcional)',
      description:
        'Adicione uma grade elegante de fotos adicionais para enriquecer o artigo.',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'seo',
      title: 'Otimização para SEO & Google',
      description:
        'Configure como este artigo aparecerá nos resultados de pesquisa do Google e nos compartilhamentos de redes sociais (WhatsApp, LinkedIn, Facebook).',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'featured',
      title: 'Artigo em Destaque (Carrossel Hero)',
      type: 'boolean',
      description:
        'Ative esta opção para colocar este artigo no carrossel de capa principal na página inicial do blog. Ao ativar, preencha os 3 tópicos de destaque abaixo.',
      initialValue: false,
    }),

    
    defineField({
      name: 'highlight1Title',
      title: 'Tópico 01 - Título Curto',
      type: 'string',
      fieldset: 'featuredTopics',
      placeholder: 'Ex: SAC vs Price sem Segredos',
      description:
        'Título de impacto do primeiro tópico (máximo 30 caracteres). Ficará em negrito no card de destaque.',
      hidden: ({document}) => !document?.featured,
    }),
    defineField({
      name: 'highlight1Description',
      title: 'Tópico 01 - Descrição',
      type: 'string',
      fieldset: 'featuredTopics',
      placeholder: 'Ex: Qual modalidade gera mais economia de juros no longo prazo para o comprador.',
      description:
        'Explicação breve do primeiro ponto abordado no artigo (máximo 150 caracteres).',
      hidden: ({document}) => !document?.featured,
    }),

    defineField({
      name: 'highlight2Title',
      title: 'Tópico 02 - Título Curto',
      type: 'string',
      fieldset: 'featuredTopics',
      placeholder: 'Ex: Uso Estratégico do FGTS',
      description:
        'Título de impacto do segundo tópico (máximo 30 caracteres).',
      hidden: ({document}) => !document?.featured,
    }),
    defineField({
      name: 'highlight2Description',
      title: 'Tópico 02 - Descrição',
      type: 'string',
      fieldset: 'featuredTopics',
      placeholder: 'Ex: Como abater o valor de entrada e amortizar parcelas com máxima eficiência financeira.',
      description:
        'Explicação breve do segundo ponto abordado no artigo (máximo 150 caracteres).',
      hidden: ({document}) => !document?.featured,
    }),

    defineField({
      name: 'highlight3Title',
      title: 'Tópico 03 - Título Curto',
      type: 'string',
      fieldset: 'featuredTopics',
      placeholder: 'Ex: Menores Taxas Bancárias',
      description:
        'Título de impacto do terceiro tópico (máximo 30 caracteres).',
      hidden: ({document}) => !document?.featured,
    }),
    defineField({
      name: 'highlight3Description',
      title: 'Tópico 03 - Descrição',
      type: 'string',
      fieldset: 'featuredTopics',
      placeholder: 'Ex: Estratégias práticas para negociar o Custo Efetivo Total direto com os principais bancos.',
      description:
        'Explicação breve do terceiro ponto abordado no artigo (máximo 150 caracteres).',
      hidden: ({document}) => !document?.featured,
    }),

    
    defineField({
      name: 'title',
      title: 'Título Principal do Artigo (H1)',
      type: 'string',
      placeholder: 'Ex: Como Funciona o Financiamento Imobiliário em 2026: Guia de Taxas e FGTS',
      description:
        'O título principal do artigo exibido no topo da página. Deve ser claro, atraente e conter a palavra-chave principal.',
      validation: (rule) => rule.required().error('O título do artigo é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da URL (Endereço na Web)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      placeholder: 'como-funciona-financiamento-imobiliario-2026',
      description:
        'Endereço amigável na web (ex: como-funciona-o-financiamento-imobiliario-em-2026). Dica: Clique no botão "Generate" ao lado para criar automaticamente a partir do título.',
      validation: (rule) => rule.required().error('O slug da URL é obrigatório.'),
    }),
    defineField({
      name: 'author',
      title: 'Autor / Especialista Responsável',
      type: 'reference',
      to: [{type: 'author'}],
      description:
        'Selecione o corretor ou especialista que assina o artigo. Essencial para autoridade técnica (E-E-A-T) e credibilidade no Google.',
      validation: (rule) => rule.required().error('Selecione um autor para o artigo.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa (Principal)',
      type: 'image',
      description:
        'Foto de alta resolução para o topo do artigo e para os cards de listagem. Formato recomendado: Horizontal (16:9 ou 1200x800px). Use a ferramenta de "Hotspot" para definir o ponto focal da imagem.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt Text)',
          placeholder: 'Ex: Vista aérea panorâmica dos edifícios e praças do Jardim Aquarius em São José dos Campos',
          description:
            'Descreva o que aparece na foto. É fundamental para acessibilidade de leitores de tela e para o ranqueamento no Google Imagens.',
          validation: (rule) => rule.required().warning('Adicione texto alternativo para otimizar no Google.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Legenda da Imagem',
          placeholder: 'Ex: Jardim Aquarius: polo de alta valorização e qualidade de vida na Zona Oeste de SJC.',
          description:
            'Texto curto exibido logo abaixo da foto principal no artigo para dar contexto aos leitores.',
        },
      ],
      validation: (rule) => rule.required().error('Adicione uma imagem de capa para o post.'),
    }),
    defineField({
      name: 'categories',
      title: 'Categorias do Artigo',
      type: 'array',
      description:
        'Selecione uma ou mais categorias temáticas (ex: Mercado Imobiliário, Financiamento, Lançamentos). Isso organiza o artigo nos hubs de navegação do site.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (rule) => rule.min(1).error('Selecione pelo menos uma categoria.'),
    }),
    defineField({
      name: 'city',
      title: 'Cidade / Região Relacionada (Opcional)',
      type: 'reference',
      to: [{type: 'city'}],
      description:
        'Se este artigo for focado em um município específico (ex: São José dos Campos, Ubatuba, Jacareí, Campos do Jordão), selecione-o aqui para ativar o card regional de imóveis na sidebar.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags & Tópicos (Palavras-chave)',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      placeholder: 'Digite a tag e pressione Enter (ex: Urbanova, Alto Padrão, SAC, Investimento)',
      description:
        'Tags criam botões temáticos no final do post e conectam artigos relacionados que tratam do mesmo assunto.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      description:
        'Data e horário oficial de lançamento do artigo. Controla a ordem cronológica nas listagens.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Última Atualização (SEO)',
      type: 'datetime',
      description:
        'Preencha sempre que fizer melhorias ou atualizar dados no artigo. Isso sinaliza ao Google e aos leitores que o conteúdo está atualizado e confiável.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo do Artigo (Excerto)',
      type: 'text',
      rows: 3,
      placeholder: 'Ex: Entenda a diferença prática entre Tabela SAC e Price, como usar o FGTS na entrada e as estratégias para conseguir a menor taxa de juros...',
      description:
        'Texto introdutório curto (até 250 caracteres) exibido nos cards da página inicial, nas buscas e nos compartilhamentos sociais.',
      validation: (rule) => rule.required().max(250).warning('Mantenha o resumo em até 250 caracteres para não quebrar o layout dos cards.'),
    }),

    
    defineField({
      name: 'body',
      title: 'Conteúdo do Artigo (Editor de Texto Rico)',
      description:
        'Escreva o corpo completo do artigo. Use Títulos H2 e H3 (que geram o Índice automático), parágrafos, listas com marcadores, negrito, links e fotos.',
      type: 'blockContent',
    }),

    
    defineField({
      name: 'calloutStyle',
      title: 'Estilo do Destaque',
      type: 'string',
      fieldset: 'calloutSection',
      description: 'Escolha a cor e o ícone da caixa de destaque.',
      options: {
        list: [
          {title: 'Dica de Ouro', value: 'tip'},
          {title: 'Informação Importante', value: 'info'},
          {title: 'Atenção', value: 'warning'},
          {title: 'Citação Especial', value: 'quote'},
        ],
        layout: 'radio',
      },
      initialValue: 'tip',
    }),
    defineField({
      name: 'calloutTitle',
      title: 'Título da Caixa de Destaque',
      type: 'string',
      fieldset: 'calloutSection',
      placeholder: 'Ex: Dica do Consultor Especialista',
      description: 'Título em negrito exibido no topo da caixa de destaque.',
    }),
    defineField({
      name: 'calloutContent',
      title: 'Texto da Mensagem de Destaque',
      type: 'text',
      rows: 3,
      fieldset: 'calloutSection',
      placeholder: 'Ex: Se a sua renda atual comportar a primeira parcela na Tabela SAC, escolha-a. A economia acumulada ultrapassa o valor de um carro zero km.',
      description: 'Texto principal exibido dentro da caixa de destaque.',
    }),

    
    defineField({
      name: 'faqTitle',
      title: 'Título da Seção de FAQ',
      type: 'string',
      fieldset: 'faqSection',
      placeholder: 'Ex: Perguntas Frequentes sobre Financiamento Imobiliário',
      initialValue: 'Perguntas Frequentes',
    }),
    defineField({
      name: 'faqItems',
      title: 'Lista de Perguntas e Respostas',
      type: 'array',
      fieldset: 'faqSection',
      description: 'Adicione perguntas e respostas. O sistema formata como sanfona interativa e gera dados estruturados para o Google.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Pergunta',
              placeholder: 'Ex: Posso usar meu saldo do FGTS na compra de um imóvel na planta?',
            }),
            defineField({
              name: 'answer',
              type: 'text',
              rows: 3,
              title: 'Resposta Explicativa',
              placeholder: 'Ex: Sim, desde que o imóvel esteja enquadrado nas regras do SFH e você cumpra os requisitos...',
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
            prepare({title}) {
              return {
                title: title || 'Nova Pergunta de FAQ',
                media: HelpCircleIcon,
              }
            },
          },
        }),
      ],
    }),

    
    defineField({
      name: 'ctaTitle',
      title: 'Título da Chamada (CTA)',
      type: 'string',
      fieldset: 'ctaSection',
      placeholder: 'Ex: Quer Simular seu Financiamento sem Compromisso?',
      description: 'Frase chamativa para despertar o interesse do leitor.',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Texto Explicativo da Chamada',
      type: 'text',
      rows: 2,
      fieldset: 'ctaSection',
      placeholder: 'Ex: Nossos especialistas calculam as menores taxas entre os principais bancos para o seu perfil.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Texto do Botão de Ação',
      type: 'string',
      fieldset: 'ctaSection',
      placeholder: 'Ex: Falar com Especialista no WhatsApp',
      initialValue: 'Falar com Especialista no WhatsApp',
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'Link Personalizado de WhatsApp / Destino',
      type: 'string',
      fieldset: 'ctaSection',
      placeholder: 'Ex: https://wa.me/5512991599801?text=Quero%20simular',
      description: 'Se deixar em branco, o sistema usará o WhatsApp padrão da Pirâmide Imóveis.',
    }),

    
    defineField({
      name: 'videoUrl',
      title: 'Link do Vídeo no YouTube ou Vimeo (16:9 Horizontal)',
      type: 'url',
      fieldset: 'videoSection',
      placeholder: 'Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ ou https://youtu.be/dQw4w9WgXcQ',
      description:
        'Cole o link oficial do vídeo horizontal (16:9). Não utilize links de YouTube Shorts aqui (para vídeos verticais 9:16 estilo Reels, use a seção de Reels do blog). Exemplos válidos: https://www.youtube.com/watch?v=dQw4w9WgXcQ ou https://vimeo.com/76979871.',
    }),
    defineField({
      name: 'videoTitle',
      title: 'Título do Vídeo',
      type: 'string',
      fieldset: 'videoSection',
      placeholder: 'Ex: Tour Virtual pelo Empreendimento',
    }),
    defineField({
      name: 'videoCaption',
      title: 'Legenda do Vídeo (Opcional)',
      type: 'string',
      fieldset: 'videoSection',
      placeholder: 'Ex: Assista aos detalhes exclusivos do projeto.',
    }),

    
    defineField({
      name: 'galleryTitle',
      title: 'Título da Galeria de Fotos',
      type: 'string',
      fieldset: 'gallerySection',
      placeholder: 'Ex: Fotos das Áreas de Lazer e Fachada',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Fotos da Galeria',
      type: 'array',
      fieldset: 'gallerySection',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo (Alt Text)',
              placeholder: 'Ex: Piscina com borda infinita e vista para a serra',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Legenda da Foto',
              placeholder: 'Ex: Vista ao pôr do sol',
            }),
          ],
        }),
      ],
    }),

    
    defineField({
      name: 'metaTitle',
      title: 'Título para o Google (Meta Title)',
      type: 'string',
      fieldset: 'seo',
      placeholder: 'Ex: Financiamento Imobiliário em 2026: Guia de Taxas e FGTS | Pirâmide Imóveis',
      description:
        'O título em azul que o usuário vê ao pesquisar no Google. Recomendado: entre 50 e 60 caracteres. Se deixar em branco, o sistema usará o título principal do artigo.',
      validation: (rule) =>
        rule.max(70).warning('Títulos com mais de 65 caracteres costumam ser cortados pelo Google com reticências (...).'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descrição para o Google (Meta Description)',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      placeholder: 'Ex: Saiba como economizar juros no financiamento imobiliário em 2026. Compare SAC vs Price, veja como usar o FGTS e simule agora com a Pirâmide Imóveis.',
      description:
        'O parágrafo de resumo preto que aparece logo abaixo do título no Google. Recomendado: entre 140 e 160 caracteres. Se deixar em branco, o sistema usará o resumo do artigo.',
      validation: (rule) =>
        rule.max(160).warning('Recomendado: máximo de 160 caracteres para visualização perfeita no Google mobile e desktop.'),
    }),
    defineField({
      name: 'seoImage',
      title: 'Imagem Exclusiva para Redes Sociais (Open Graph / WhatsApp)',
      type: 'image',
      fieldset: 'seo',
      description:
        'Imagem opcional personalizada para compartilhamento no WhatsApp, Facebook e LinkedIn (1200x630px). Se deixar em branco, o sistema usará a foto de capa do artigo.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL Canônica (Opcional)',
      type: 'url',
      fieldset: 'seo',
      description:
        'Preencha apenas se este artigo for uma cópia autorizada de outro site e você deseja transferir a autoridade de SEO para a fonte original.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar dos Mecanismos de Busca (noindex)?',
      type: 'boolean',
      fieldset: 'seo',
      description:
        'Se ativado, impede o Google de indexar e exibir esta página nas buscas. Deixe desmarcado para artigos públicos.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
      featured: 'featured',
    },
    prepare({title, author, media, date, featured}) {
      const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR') : 'Rascunho'
      const badge = featured ? '[Destaque] ' : ''
      return {
        title: `${badge}${title || 'Artigo sem título'}`,
        subtitle: `${formattedDate} • Por ${author || 'Redação'}`,
        media,
      }
    },
  },
})
