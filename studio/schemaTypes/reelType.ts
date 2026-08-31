import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const reelType = defineType({
  name: 'reel',
  title: 'Vídeos & Reels',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Vídeo',
      type: 'string',
      description: 'Ex: Tour no Apartamento Decorado no Residencial YVY Aquarius',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Capa / Thumbnail (Formato Vertical 9:16)',
      type: 'image',
      description: 'Capa em alta resolução no formato vertical para exibição rápida no carrossel.',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Arquivo de Vídeo (.mp4 ou .webm)',
      type: 'file',
      description: 'Upload direto do vídeo em formato vertical (tamanho máximo permitido: 30 MB).',
      options: {
        accept: 'video/mp4,video/webm,video/quicktime',
      },
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value?.asset?._ref) return true
          const client = context.getClient({apiVersion: '2026-02-01'})
          const asset = await client.fetch(`*[_id == $id][0]`, {id: value.asset._ref})
          if (asset && typeof asset.size === 'number' && asset.size > 30 * 1024 * 1024) {
            const sizeInMb = (asset.size / (1024 * 1024)).toFixed(1)
            return `O vídeo selecionado tem ${sizeInMb} MB. O tamanho máximo permitido é de 30 MB. Por favor, comprima o arquivo antes de enviar.`
          }
          return true
        }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL do Vídeo (Opcional ou CDN Externa)',
      type: 'url',
      description: 'Link direto do vídeo (ex: https://.../video.mp4) caso não use o upload direto.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição do Vídeo',
      type: 'text',
      rows: 3,
      description: 'Texto detalhado explicando sobre o imóvel, metragem, diferenciais e localização.',
    }),
    defineField({
      name: 'propertyTitle',
      title: 'Nome do Imóvel / Empreendimento',
      type: 'string',
      description: 'Ex: Residencial Parque Una São José dos Campos',
    }),
    defineField({
      name: 'propertyUrl',
      title: 'Link do Imóvel no Site da Pirâmide',
      type: 'url',
      description: 'Link direto para a página do imóvel no portal da Pirâmide Imóveis.',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Link do Post no Instagram',
      type: 'url',
      description: 'Link para o post correspondente no perfil oficial @piramideimoveis.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'propertyTitle',
      media: 'thumbnail',
    },
  },
})
