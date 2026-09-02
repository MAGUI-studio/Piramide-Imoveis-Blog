import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, LinkIcon, PlayIcon} from '@sanity/icons'

export const blockContentType = defineType({
  title: 'Conteúdo do Artigo',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Bloco de Texto',
      type: 'block',
      styles: [
        {title: 'Parágrafo Normal', value: 'normal'},
        {title: 'Título H2 (Cria seção no Índice)', value: 'h2'},
        {title: 'Subtítulo H3 (Cria subseção no Índice)', value: 'h3'},
        {title: 'Título Menor H4', value: 'h4'},
        {title: 'Citação em Destaque (Blockquote)', value: 'blockquote'},
      ],
      lists: [
        {title: 'Lista com Marcadores (Pontos)', value: 'bullet'},
        {title: 'Lista Numerada (1, 2, 3...)', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrito (Strong)', value: 'strong'},
          {title: 'Itálico (Emphasis)', value: 'em'},
          {title: 'Sublinhado (Underline)', value: 'underline'},
          {title: 'Tachado (Strike)', value: 'strike-through'},
          {title: 'Código Inline', value: 'code'},
        ],
        annotations: [
          {
            title: 'Link Externo',
            name: 'link',
            type: 'object',
            icon: LinkIcon,
            description: 'Insira um link para qualquer site externo ou portal.',
            fields: [
              {
                title: 'URL de Destino',
                name: 'href',
                type: 'url',
                placeholder: 'https://exemplo.com.br',
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Abrir em Nova Aba?',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
              {
                title: 'Adicionar nofollow (SEO)?',
                name: 'nofollow',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
          {
            title: 'Link para Outro Artigo do Blog',
            name: 'internalLink',
            type: 'object',
            icon: LinkIcon,
            description: 'Crie links internos entre artigos para fortalecer o SEO do blog.',
            fields: [
              {
                title: 'Artigo Referenciado',
                name: 'reference',
                type: 'reference',
                to: [{type: 'post'}],
              },
            ],
          },
        ],
      },
    }),

    
    defineArrayMember({
      title: 'Imagem no Artigo',
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
      },
    }),

    
    defineArrayMember({
      title: 'Vídeo (YouTube / Vimeo)',
      type: 'youtube',
      icon: PlayIcon,
    }),

    
    defineArrayMember({
      name: 'callout',
      type: 'callout',
      title: 'Caixa de Destaque',
      hidden: true,
    }),
    defineArrayMember({
      name: 'calloutBlock',
      type: 'callout',
      title: 'Caixa de Destaque (Legado)',
      hidden: true,
    }),
    defineArrayMember({
      name: 'youtubeBlock',
      type: 'youtube',
      title: 'Vídeo (Legado)',
      hidden: true,
    }),
    defineArrayMember({
      name: 'cta',
      type: 'cta',
      title: 'Bloco de Conversão',
      hidden: true,
    }),
    defineArrayMember({
      name: 'ctaBlock',
      type: 'cta',
      title: 'Bloco de Conversão (Legado)',
      hidden: true,
    }),
    defineArrayMember({
      name: 'table',
      type: 'table',
      title: 'Tabela',
      hidden: true,
    }),
    defineArrayMember({
      name: 'tableBlock',
      type: 'table',
      title: 'Tabela (Legada)',
      hidden: true,
    }),
    defineArrayMember({
      name: 'faq',
      type: 'faq',
      title: 'FAQ',
      hidden: true,
    }),
    defineArrayMember({
      name: 'faqBlock',
      type: 'faq',
      title: 'FAQ (Legado)',
      hidden: true,
    }),
    defineArrayMember({
      name: 'gallery',
      type: 'gallery',
      title: 'Galeria',
      hidden: true,
    }),
    defineArrayMember({
      name: 'galleryBlock',
      type: 'gallery',
      title: 'Galeria (Legada)',
      hidden: true,
    }),
  ],
})
