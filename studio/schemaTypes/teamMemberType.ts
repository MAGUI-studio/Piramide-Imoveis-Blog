import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'
import {validateImageSize} from './imageValidation'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Equipe / Time de Corretores',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome Completo',
      type: 'string',
      placeholder: 'Ex: Rafael Marques',
      description: 'Nome profissional do membro da equipe.',
      validation: (rule) => rule.required().error('O nome é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador / Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug é obrigatório.'),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Função',
      type: 'string',
      placeholder: 'Ex: Sócio-Proprietário, Diretora Comercial, Gerente Comercial, Corretor',
      description: 'Cargo exibido no card do profissional.',
      validation: (rule) => rule.required().error('O cargo é obrigatório.'),
    }),
    defineField({
      name: 'tier',
      title: 'Nível / Hierarquia',
      type: 'string',
      description: 'Define em qual grupo o membro pertence para a ordenação automática na página Nosso Time.',
      options: {
        list: [
          {title: '1. Sócios & Proprietários (Fixo no topo)', value: 'leadership_founders'},
          {title: '2. Diretoria Comercial (Fixo)', value: 'leadership_directors'},
          {title: '3. Gerência Comercial (Fixo)', value: 'management'},
          {title: '4. Corretores & Consultores (Ordem Alfabética)', value: 'broker'},
        ],
        layout: 'radio',
      },
      initialValue: 'broker',
      validation: (rule) => rule.required().error('Selecione o nível hierárquico.'),
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição (Opcional)',
      type: 'number',
      description: 'Número para ordenar membros dentro do mesmo grupo hierárquico (ex: 1, 2, 3...).',
    }),
    defineField({
      name: 'creci',
      title: 'Registro CRECI (Opcional)',
      type: 'string',
      placeholder: 'Ex: CRECI 83891F',
      description: 'Número de registro profissional no CRECI.',
    }),
    defineField({
      name: 'image',
      title: 'Foto de Perfil',
      type: 'image',
      description:
        'Foto nítida em proporção 1:1 (mín. 1080x1080px). Formato recomendado: .webp ou .png (preferencialmente .webp). Limite máximo: 2 MB.',
      options: {hotspot: true},
      validation: (rule) =>
        rule.warning('Recomendado adicionar foto de perfil.').custom(validateImageSize(2)),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          placeholder: 'Ex: Foto de Rafael Marques',
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'E-mail Profissional',
      type: 'string',
      placeholder: 'Ex: rafael@piramideimoveissjc.com.br',
    }),
    defineField({
      name: 'whatsapps',
      title: 'Números de WhatsApp',
      type: 'array',
      description: 'Adicione um ou mais números de WhatsApp para contato direto.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Número Formatado',
              type: 'string',
              placeholder: 'Ex: (12) 98158-4103',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link do WhatsApp',
              type: 'string',
              placeholder: 'Ex: https://api.whatsapp.com/send?phone=5512981584103',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'instagram',
      title: 'Link do Instagram (Opcional)',
      type: 'url',
      placeholder: 'Ex: https://www.instagram.com/thaiswagmaker.corretora',
    }),
    defineField({
      name: 'active',
      title: 'Ativo no Site?',
      type: 'boolean',
      description: 'Desmarque caso o profissional não faça mais parte da equipe ativa.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Hierarquia & Nome',
      name: 'tierAndName',
      by: [
        {field: 'tier', direction: 'asc'},
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Nome (A-Z)',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
