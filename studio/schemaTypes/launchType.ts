import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const launchType = defineType({
  name: 'launch',
  title: 'Lançamentos',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Lançamento',
      type: 'string',
      placeholder: 'Ex: Residencial Le Monde',
      validation: (rule) => rule.required().error('O título do lançamento é obrigatório.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem / Banner do Lançamento',
      type: 'image',
      description: 'Banner do empreendimento para exibição no carrossel.',
      options: {hotspot: true},
      validation: (rule) => rule.required().error('A imagem do lançamento é obrigatória.'),
    }),
    defineField({
      name: 'alt',
      title: 'Texto Alternativo da Imagem (Alt)',
      type: 'string',
      placeholder: 'Ex: Banner promocional do Residencial Le Monde',
      description: 'Texto descritivo da imagem para SEO e acessibilidade.',
    }),
    defineField({
      name: 'href',
      title: 'Link de Destino / URL',
      type: 'url',
      placeholder: 'Ex: https://www.piramideimoveissjc.com.br/...',
      description: 'Link direto para onde o usuário será redirecionado ao clicar no banner.',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https']}).error('O link de destino é obrigatório.'),
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Defina a ordem numérica de exibição (ex: 1, 2, 3...). Menor número aparece primeiro.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Ordem Manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}, {field: '_createdAt', direction: 'asc'}],
    },
  ],
})
