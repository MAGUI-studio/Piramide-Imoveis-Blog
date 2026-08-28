import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Categoria',
      type: 'string',
      validation: (rule) => rule.required().error('O nome da categoria é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da Categoria',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa da Categoria',
      type: 'image',
      description: 'Imagem ilustrativa para o menu visual de categorias e cards.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Descrição (Para listagens e SEO)',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
