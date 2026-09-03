import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'
import {validateImageSize} from './imageValidation'

export const authorType = defineType({
  name: 'author',
  title: 'Autor / Corretor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome Completo do Autor',
      type: 'string',
      placeholder: 'Ex: Carlos Eduardo ou Ana Silva',
      description: 'Nome profissional do consultor ou membro da equipe editorial.',
      validation: (rule) => rule.required().error('O nome do autor é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da Página do Autor',
      type: 'slug',
      description:
        'O link da página de perfil do autor (ex: "/autor/carlos-eduardo"). Clique no botão "Generate" para criar automaticamente.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug do autor é obrigatório.'),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Especialidade Profissional',
      type: 'string',
      placeholder: 'Ex: Especialista em Mercado Imobiliário & Análise de Investimentos',
      description:
        'Cargo ou área de atuação. Exibido logo abaixo do nome do autor no artigo e fortalece o critério E-E-A-T do Google.',
      validation: (rule) => rule.required().error('Defina o cargo ou especialidade do autor.'),
    }),
    defineField({
      name: 'creci',
      title: 'Registro Profissional CRECI (Opcional)',
      type: 'string',
      placeholder: 'Ex: CRECI 9390-J ou CRECI 12450-F',
      description:
        'Número de registro no Conselho Regional de Corretores de Imóveis. Passa muita credibilidade e segurança aos leitores.',
    }),
    defineField({
      name: 'image',
      title: 'Foto de Perfil (Avatar)',
      type: 'image',
      description:
        'Foto nítida em formato quadrado (proporção 1:1, mín. 1080x1080px). Utilize imagens em formato .webp ou .png (preferencialmente .webp para máxima qualidade e performance). Limite máximo: 2 MB.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          placeholder: 'Ex: Foto de perfil de Carlos Eduardo, especialista imobiliário',
          description: 'Descrição da imagem para acessibilidade e leitores de tela.',
        },
      ],
      validation: (rule) =>
        rule.required().error('A foto do autor é obrigatória para a credibilidade do artigo.').custom(validateImageSize(2)),
    }),
    defineField({
      name: 'bio',
      title: 'Biografia Resumida',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
      description:
        'Breve resumo da trajetória, anos de experiência no mercado do Vale do Paraíba e principais conquistas profissionais.',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Link do Perfil no LinkedIn',
      type: 'url',
      placeholder: 'Ex: https://www.linkedin.com/in/seunome',
      description: 'Link direto para o perfil profissional no LinkedIn.',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Link do Perfil no Instagram',
      type: 'url',
      placeholder: 'Ex: https://www.instagram.com/piramideimoveis',
      description: 'Link direto para o perfil no Instagram.',
    }),
    defineField({
      name: 'email',
      title: 'E-mail Profissional de Contato',
      type: 'string',
      placeholder: 'Ex: corretor@piramideimoveis.com.br',
      description: 'E-mail institucional do corretor ou da equipe editorial.',
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
