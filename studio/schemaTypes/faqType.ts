import {defineField, defineType, defineArrayMember} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ - Perguntas Frequentes (Google Schema)',
  type: 'object',
  icon: HelpCircleIcon,
  options: {
    modal: {
      type: 'dialog',
      width: 2,
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título da Seção de FAQ',
      placeholder: 'Ex: Perguntas Frequentes sobre Financiamento',
      initialValue: 'Perguntas Frequentes',
      description: 'Título exibido no início da seção de perguntas e respostas.',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Perguntas e Respostas',
      description: 'Adicione perguntas e respostas. O sistema gera automaticamente dados estruturados (FAQPage) para o Google.',
      options: {
        modal: {
          type: 'dialog',
          width: 2,
        },
      },
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Pergunta',
              placeholder: 'Ex: Posso usar meu saldo do FGTS na compra de um imóvel na planta?',
              validation: (rule) => rule.required().error('A pergunta é obrigatória.'),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              rows: 3,
              title: 'Resposta Explicativa',
              placeholder: 'Ex: Sim, desde que o imóvel esteja enquadrado nas regras do SFH e você cumpra os requisitos...',
              validation: (rule) => rule.required().error('A resposta é obrigatória.'),
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Item de Pergunta & Resposta',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ - Perguntas Frequentes (Google Schema)',
        subtitle: 'Clique para editar perguntas e respostas',
        media: HelpCircleIcon,
      }
    },
  },
})
