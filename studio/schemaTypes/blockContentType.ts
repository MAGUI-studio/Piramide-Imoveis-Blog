import {defineType, defineArrayMember, defineField} from 'sanity'
import {
  ImageIcon,
  LinkIcon,
  PlayIcon,
  InfoOutlineIcon,
  BulbOutlineIcon,
  WarningOutlineIcon,
  HelpCircleIcon,
  ThListIcon,
  ImagesIcon,
  EnvelopeIcon,
} from '@sanity/icons'

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
        {title: 'Título H2', value: 'h2'},
        {title: 'Título H3', value: 'h3'},
        {title: 'Título H4', value: 'h4'},
        {title: 'Citação / Destaque', value: 'blockquote'},
      ],
      lists: [
        {title: 'Lista com Marcadores', value: 'bullet'},
        {title: 'Lista Numerada', value: 'number'},
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
            fields: [
              {
                title: 'URL de Destino',
                name: 'href',
                type: 'url',
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
            title: 'Link para Outro Artigo',
            name: 'internalLink',
            type: 'object',
            icon: LinkIcon,
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
      name: 'imageBlock',
      title: 'Imagem com SEO',
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt Text)',
          description: 'Obrigatório para SEO e acessibilidade (Google Image Search).',
          validation: (rule) => rule.required().warning('Adicione texto alternativo para otimizar no Google.'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Legenda da Imagem',
        }),
        defineField({
          name: 'layout',
          type: 'string',
          title: 'Largura da Imagem',
          options: {
            list: [
              {title: 'Padrão (Largura do texto)', value: 'normal'},
              {title: 'Larga (Destaque)', value: 'wide'},
              {title: 'Tela Cheia (Full Width)', value: 'full'},
            ],
            layout: 'radio',
          },
          initialValue: 'normal',
        }),
      ],
    }),

    
    defineArrayMember({
      name: 'galleryBlock',
      title: 'Galeria de Imagens / Fotos',
      type: 'object',
      icon: ImagesIcon,
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Título da Galeria (Opcional)',
        }),
        defineField({
          name: 'images',
          type: 'array',
          title: 'Fotos da Galeria',
          of: [
            defineArrayMember({
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'caption',
                  type: 'string',
                  title: 'Legenda',
                }),
              ],
            }),
          ],
          validation: (rule) => rule.min(2).error('Adicione pelo menos 2 imagens na galeria.'),
        }),
        defineField({
          name: 'columns',
          type: 'number',
          title: 'Colunas no Desktop',
          options: {
            list: [
              {title: '2 Colunas', value: 2},
              {title: '3 Colunas', value: 3},
            ],
            layout: 'radio',
          },
          initialValue: 2,
        }),
      ],
      preview: {
        select: {
          title: 'title',
          images: 'images',
        },
        prepare({title, images}) {
          return {
            title: title || 'Galeria de Imagens',
            subtitle: `${images?.length || 0} imagens`,
            media: ImagesIcon,
          }
        },
      },
    }),

    
    defineArrayMember({
      name: 'youtubeBlock',
      title: 'Vídeo (YouTube / Vimeo)',
      type: 'object',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'URL do Vídeo (YouTube ou Vimeo)',
          validation: (rule) => rule.required().error('Insira a URL do vídeo.'),
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Título do Vídeo (SEO & Acessibilidade)',
          validation: (rule) => rule.required().error('Insira um título para o vídeo.'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Legenda abaixo do vídeo (Opcional)',
        }),
      ],
      preview: {
        select: {
          title: 'title',
          url: 'url',
        },
        prepare({title, url}) {
          return {
            title: title || 'Vídeo Embed',
            subtitle: url,
            media: PlayIcon,
          }
        },
      },
    }),

    
    defineArrayMember({
      name: 'calloutBlock',
      title: 'Caixa de Destaque / Alerta',
      type: 'object',
      icon: BulbOutlineIcon,
      fields: [
        defineField({
          name: 'type',
          type: 'string',
          title: 'Tipo de Destaque',
          options: {
            list: [
              {title: '💡 Dica de Ouro (Tip)', value: 'tip'},
              {title: 'ℹ️ Informação / Nota (Info)', value: 'info'},
              {title: '⚠️ Atenção / Cuidado (Warning)', value: 'warning'},
              {title: '💬 Citação Especial (Quote)', value: 'quote'},
            ],
            layout: 'radio',
          },
          initialValue: 'tip',
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Título da Caixa (Opcional)',
        }),
        defineField({
          name: 'content',
          type: 'text',
          rows: 3,
          title: 'Texto do Destaque',
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {
          title: 'title',
          content: 'content',
          type: 'type',
        },
        prepare({title, content, type}) {
          return {
            title: title || `Destaque (${type})`,
            subtitle: content,
            media:
              type === 'warning'
                ? WarningOutlineIcon
                : type === 'info'
                  ? InfoOutlineIcon
                  : BulbOutlineIcon,
          }
        },
      },
    }),

    
    defineArrayMember({
      name: 'ctaBlock',
      title: 'Bloco de Conversão (CTA / WhatsApp)',
      type: 'object',
      icon: EnvelopeIcon,
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Título da Chamada',
          placeholder: 'Quer simular seu financiamento imobiliário?',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          rows: 2,
          title: 'Descrição Curta',
          placeholder: 'Fale agora com nossa equipe de especialistas da Pirâmide Imóveis.',
        }),
        defineField({
          name: 'buttonText',
          type: 'string',
          title: 'Texto do Botão',
          placeholder: 'Simular no WhatsApp',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'buttonUrl',
          type: 'string',
          title: 'Link ou Mensagem do WhatsApp',
          description: 'Se for WhatsApp, digite o link direto ou deixe em branco para usar o WhatsApp padrão da Pirâmide.',
        }),
        defineField({
          name: 'isWhatsApp',
          type: 'boolean',
          title: 'É um botão direto para o WhatsApp?',
          initialValue: true,
        }),
      ],
      preview: {
        select: {
          title: 'title',
          buttonText: 'buttonText',
        },
        prepare({title, buttonText}) {
          return {
            title: title || 'Bloco de Conversão (CTA)',
            subtitle: `Botão: ${buttonText}`,
            media: EnvelopeIcon,
          }
        },
      },
    }),

    
    defineArrayMember({
      name: 'tableBlock',
      title: 'Tabela de Dados (Comparativos)',
      type: 'object',
      icon: ThListIcon,
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Título da Tabela (Opcional)',
        }),
        defineField({
          name: 'headers',
          type: 'array',
          title: 'Cabeçalhos das Colunas',
          of: [{type: 'string'}],
          validation: (rule) => rule.min(2).error('A tabela deve ter pelo menos 2 colunas.'),
        }),
        defineField({
          name: 'rows',
          type: 'array',
          title: 'Linhas da Tabela',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'cells',
                  type: 'array',
                  title: 'Células da Linha',
                  of: [{type: 'string'}],
                }),
              ],
              preview: {
                select: {
                  cells: 'cells',
                },
                prepare({cells}) {
                  return {
                    title: cells?.join(' | ') || 'Linha vazia',
                  }
                },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: 'title',
          headers: 'headers',
          rows: 'rows',
        },
        prepare({title, headers, rows}) {
          return {
            title: title || 'Tabela de Dados',
            subtitle: `${headers?.length || 0} colunas, ${rows?.length || 0} linhas`,
            media: ThListIcon,
          }
        },
      },
    }),

    
    defineArrayMember({
      name: 'faqBlock',
      title: 'FAQ - Perguntas Frequentes (Google Schema)',
      type: 'object',
      icon: HelpCircleIcon,
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Título da Seção de FAQ',
          initialValue: 'Perguntas Frequentes',
        }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Perguntas e Respostas',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  type: 'string',
                  title: 'Pergunta',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'answer',
                  type: 'text',
                  rows: 3,
                  title: 'Resposta',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  question: 'question',
                  answer: 'answer',
                },
                prepare({question, answer}) {
                  return {
                    title: question,
                    subtitle: answer,
                  }
                },
              },
            }),
          ],
          validation: (rule) => rule.min(1).error('Adicione pelo menos 1 pergunta no FAQ.'),
        }),
      ],
      preview: {
        select: {
          title: 'title',
          items: 'items',
        },
        prepare({title, items}) {
          return {
            title: title || 'FAQ - Perguntas Frequentes',
            subtitle: `${items?.length || 0} perguntas (Gera FAQPage JSON-LD)`,
            media: HelpCircleIcon,
          }
        },
      },
    }),
  ],
})
