import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const authorType = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Autor',
      type: 'string',
      validation: (rule) => rule.required().error('O nome do autor é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug do Autor',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Especialidade (E-E-A-T)',
      type: 'string',
      placeholder: 'Ex: Especialista em Mercado Imobiliário & Financiamento',
      description: 'Reforça a autoridade e especialidade do autor para o algoritmo do Google.',
    }),
    defineField({
      name: 'creci',
      title: 'CRECI (Opcional)',
      type: 'string',
      placeholder: 'Ex: CRECI 9390-J',
    }),
    defineField({
      name: 'image',
      title: 'Foto / Avatar',
      type: 'image',
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
      validation: (rule) => rule.required().error('A foto do autor é importante para a credibilidade do artigo.'),
    }),
    defineField({
      name: 'bio',
      title: 'Biografia do Autor',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
      description: 'Breve resumo da trajetória profissional do autor.',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Perfil no LinkedIn (URL)',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Perfil no Instagram (URL)',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
