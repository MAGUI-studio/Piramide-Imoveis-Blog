import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const cityType = defineType({
  name: 'city',
  title: 'Cidade',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Cidade',
      type: 'string',
      description: 'Ex: São José dos Campos, Ubatuba, Jacareí, Campos do Jordão, Caraguatatuba',
      validation: (rule) => rule.required().error('O nome da cidade é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da Cidade',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug é obrigatório.'),
    }),
    defineField({
      name: 'state',
      title: 'Estado (UF)',
      type: 'string',
      initialValue: 'SP',
      validation: (rule) => rule.required().max(2),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa da Cidade',
      type: 'image',
      description: 'Foto representativa da cidade (praia, skyline, vista aérea).',
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
      title: 'Descrição / Resumo sobre a Cidade',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'state',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Sem nome',
        subtitle: subtitle ? `Estado: ${subtitle}` : '',
        media,
      }
    },
  },
})
