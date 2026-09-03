import {defineField, defineType, defineArrayMember} from 'sanity'
import {ImagesIcon} from '@sanity/icons'
import {validateImageSize} from './imageValidation'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Galeria de Imagens / Fotos',
  type: 'object',
  icon: ImagesIcon,
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
      title: 'Título da Galeria (Opcional)',
      placeholder: 'Ex: Fotos das Áreas Comuns do Condomínio',
      description: 'Título exibido acima da grade de fotos.',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Fotos da Galeria',
      description:
        'Adicione as fotos que comporão a galeria. Formato recomendado: .webp ou .png (preferencialmente .webp para máxima qualidade e performance). Limite máximo: 2 MB por foto.',
      options: {
        modal: {
          type: 'dialog',
          width: 2,
        },
      },
      of: [
        defineArrayMember({
          type: 'image',
          validation: (rule) => rule.custom(validateImageSize(2)),
          options: {
            hotspot: true,
            modal: {
              type: 'dialog',
              width: 2,
            },
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
              placeholder: 'Ex: Piscina com borda infinita',
              validation: (rule) => rule.required().warning('Adicione o alt text para acessibilidade.'),
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
    prepare() {
      return {
        title: 'Galeria de Imagens / Fotos',
        subtitle: 'Clique para gerenciar fotos da galeria',
        media: ImagesIcon,
      }
    },
  },
})
