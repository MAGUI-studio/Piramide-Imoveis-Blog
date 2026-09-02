import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const cityType = defineType({
  name: 'city',
  title: 'Cidade / Região',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Cidade',
      type: 'string',
      placeholder: 'Ex: São José dos Campos, Ubatuba, Jacareí, Campos do Jordão, Caraguatatuba',
      description: 'Nome oficial do município atendido pela Pirâmide Imóveis.',
      validation: (rule) => rule.required().error('O nome da cidade é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da URL da Cidade',
      type: 'slug',
      description:
        'Endereço da página da cidade (ex: "/cidade/sao-jose-dos-campos"). Clique no botão "Generate" para preencher automaticamente.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug da cidade é obrigatório.'),
    }),
    defineField({
      name: 'state',
      title: 'Estado (Sigla UF)',
      type: 'string',
      placeholder: 'SP',
      description: 'Sigla do estado com 2 letras (ex: SP, RJ, MG).',
      initialValue: 'SP',
      validation: (rule) => rule.required().max(2).error('Digite a sigla com exatamente 2 letras.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem Representativa da Cidade',
      type: 'image',
      description:
        'Foto marcante da cidade (praia, skyline urbano, serra, praças) em proporção 16:9 ou 1200x800px.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          placeholder: 'Ex: Orla e praia de Caraguatatuba no Litoral Norte',
          description: 'Texto acessível para leitores de tela e Google Imagens.',
        },
      ],
      validation: (rule) => rule.required().error('Adicione uma foto da cidade para ilustrar os cards.'),
    }),
    defineField({
      name: 'description',
      title: 'Resumo sobre a Cidade & Mercado Imobiliário',
      type: 'text',
      rows: 3,
      placeholder: 'Ex: Principal polo de tecnologia e inovação do Vale do Paraíba, referência em qualidade de vida e condomínios de alto padrão.',
      description:
        'Texto informativo sobre a infraestrutura, localização e diferenciais da cidade para quem deseja morar ou investir.',
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
