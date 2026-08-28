import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon, StarIcon} from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Post do Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'featuredTopics',
      title: '📌 3 Tópicos Principais do Destaque (Carrossel Hero)',
      description: 'Preencha os 3 tópicos/pilares que aparecem na base do Hero do blog.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'seo',
      title: '🔍 Otimização para SEO & Google',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'featured',
      title: '⭐ Artigo em Destaque (Carrossel Hero)',
      type: 'boolean',
      description: 'Marque para exibir este post no carrossel de destaque principal da página inicial.',
      initialValue: false,
    }),

    
    defineField({
      name: 'highlight1Title',
      title: 'Tópico 01 - Título',
      type: 'string',
      fieldset: 'featuredTopics',
      description: 'Máximo 30 caracteres',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((val, context) => {
          if (context.document?.featured) {
            if (!val) return 'O título do Tópico 01 é obrigatório quando em destaque.'
            if (val.length > 30) return 'O título não pode ter mais de 30 caracteres.'
          }
          return true
        }),
    }),
    defineField({
      name: 'highlight1Description',
      title: 'Tópico 01 - Descrição',
      type: 'string',
      fieldset: 'featuredTopics',
      description: 'Máximo 50 caracteres',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((val, context) => {
          if (context.document?.featured) {
            if (!val) return 'A descrição do Tópico 01 é obrigatória quando em destaque.'
            if (val.length > 50) return 'A descrição não pode ter mais de 50 caracteres.'
          }
          return true
        }),
    }),

    defineField({
      name: 'highlight2Title',
      title: 'Tópico 02 - Título',
      type: 'string',
      fieldset: 'featuredTopics',
      description: 'Máximo 30 caracteres',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((val, context) => {
          if (context.document?.featured) {
            if (!val) return 'O título do Tópico 02 é obrigatório quando em destaque.'
            if (val.length > 30) return 'O título não pode ter mais de 30 caracteres.'
          }
          return true
        }),
    }),
    defineField({
      name: 'highlight2Description',
      title: 'Tópico 02 - Descrição',
      type: 'string',
      fieldset: 'featuredTopics',
      description: 'Máximo 50 caracteres',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((val, context) => {
          if (context.document?.featured) {
            if (!val) return 'A descrição do Tópico 02 é obrigatória quando em destaque.'
            if (val.length > 50) return 'A descrição não pode ter mais de 50 caracteres.'
          }
          return true
        }),
    }),

    defineField({
      name: 'highlight3Title',
      title: 'Tópico 03 - Título',
      type: 'string',
      fieldset: 'featuredTopics',
      description: 'Máximo 30 caracteres',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((val, context) => {
          if (context.document?.featured) {
            if (!val) return 'O título do Tópico 03 é obrigatório quando em destaque.'
            if (val.length > 30) return 'O título não pode ter mais de 30 caracteres.'
          }
          return true
        }),
    }),
    defineField({
      name: 'highlight3Description',
      title: 'Tópico 03 - Descrição',
      type: 'string',
      fieldset: 'featuredTopics',
      description: 'Máximo 50 caracteres',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((val, context) => {
          if (context.document?.featured) {
            if (!val) return 'A descrição do Tópico 03 é obrigatória quando em destaque.'
            if (val.length > 50) return 'A descrição não pode ter mais de 50 caracteres.'
          }
          return true
        }),
    }),

    defineField({
      name: 'title',
      title: 'Título do Artigo',
      type: 'string',
      validation: (rule) =>
        rule.required().max(100).warning('Títulos entre 50 e 70 caracteres performam melhor no Google.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da URL',
      type: 'slug',
      description: 'Endereço amigável na web (ex: como-financiar-imovel-sjc)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug é obrigatório para gerar a URL do artigo.'),
    }),
    defineField({
      name: 'author',
      title: 'Autor do Artigo',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required().warning('Defina o autor para fortalecer a autoridade (E-E-A-T).'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem Principal (Capa)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt Text)',
          description: 'Obrigatório para SEO e Google Imagens.',
          validation: (rule) => rule.required().error('O alt text da imagem de capa é obrigatório.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Legenda da Imagem',
        },
      ],
      validation: (rule) => rule.required().error('Adicione uma imagem de capa para o post.'),
    }),
    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (rule) => rule.min(1).error('Selecione pelo menos uma categoria.'),
    }),
    defineField({
      name: 'city',
      title: 'Cidade / Região (Opcional)',
      type: 'reference',
      to: [{type: 'city'}],
      description: 'Selecione se este artigo for focado em uma cidade específica (ex: Ubatuba, São José dos Campos, etc).',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Palavras-chave',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Ex: Financiamento, Jardim Aquarius, Urbanova, Investimento.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Última Atualização (SEO)',
      type: 'datetime',
      description: 'Indica ao Google que o artigo recebeu atualizações recentes.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo do Post',
      type: 'text',
      rows: 3,
      description: 'Resumo cativante exibido nas listagens e cards.',
      validation: (rule) => rule.required().max(250).warning('Mantenha o resumo em até 250 caracteres.'),
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo do Artigo',
      type: 'blockContent',
    }),

    
    defineField({
      name: 'metaTitle',
      title: 'Título SEO (Meta Title)',
      type: 'string',
      fieldset: 'seo',
      description: 'Título que aparece nos resultados do Google. Se vazio, o título do post será utilizado.',
      validation: (rule) =>
        rule.max(65).warning('Recomendado: até 60 caracteres para não ser cortado na busca.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descrição SEO (Meta Description)',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description: 'Descrição exibida na busca do Google. Se vazia, o resumo será utilizado.',
      validation: (rule) =>
        rule.max(160).warning('Recomendado: entre 140 e 160 caracteres.'),
    }),
    defineField({
      name: 'seoImage',
      title: 'Imagem para Redes Sociais (Open Graph / WhatsApp)',
      type: 'image',
      fieldset: 'seo',
      description: 'Imagem personalizada ao compartilhar no WhatsApp/LinkedIn (1200x630px). Se vazia, usará a imagem de capa.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL Canônica (Opcional)',
      type: 'url',
      fieldset: 'seo',
      description: 'Use apenas se este artigo foi republicado de outra fonte oficial.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar dos Mecanismos de Busca (noindex)',
      type: 'boolean',
      fieldset: 'seo',
      initialValue: false,
      description: 'Marque apenas se NÃO quiser que esta página seja indexada no Google.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
      featured: 'featured',
    },
    prepare(selection) {
      const {author, publishedAt, featured} = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('pt-BR') : ''
      return {
        ...selection,
        title: `${featured ? '⭐ ' : ''}${selection.title}`,
        subtitle: `${author ? `Por ${author}` : 'Sem autor'} • ${date}`,
      }
    },
  },
})
