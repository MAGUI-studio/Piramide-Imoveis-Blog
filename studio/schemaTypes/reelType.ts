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
      title: 'Título do Vídeo / Reel',
      type: 'string',
      placeholder: 'Ex: Tour Completo no Decorado do Residencial YVY Aquarius',
      description: 'Título curto e chamativo para exibição no carrossel de vídeos.',
      validation: (rule) => rule.required().max(120).error('O título do vídeo é obrigatório.'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Capa / Thumbnail (Formato Vertical 9:16)',
      type: 'image',
      description:
        'Foto de capa no formato vertical (tipo Story / Reel, 1080x1920px) para carregamento instantâneo no carrossel.',
      options: {hotspot: true},
      validation: (rule) => rule.required().error('A capa do vídeo é obrigatória.'),
    }),
    defineField({
      name: 'videoFile',
      title: 'Arquivo de Vídeo (.mp4 ou .webm)',
      type: 'file',
      description:
        'Faça upload do vídeo em formato vertical (máximo 30 MB). Dica: Utilize ferramentas como Handbrake para comprimir o arquivo mantendo ótima qualidade visual.',
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
      title: 'URL Direta do Vídeo (Opcional / CDN Externa)',
      type: 'url',
      placeholder: 'Ex: https://cdn.seusite.com/videos/tour-aquarius.mp4',
      description: 'Caso o vídeo esteja hospedado em um servidor externo ou CDN, cole o link direto aqui.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição dos Destaques do Imóvel',
      type: 'text',
      rows: 3,
      placeholder: 'Ex: Cobertura duplex com 4 suítes, piscina privativa e vista definitiva para a Serra da Mantiqueira...',
      description: 'Texto exibido no modal do player de vídeo detalhando as características do imóvel.',
    }),
    defineField({
      name: 'propertyTitle',
      title: 'Nome do Imóvel / Empreendimento Relacionado',
      type: 'string',
      placeholder: 'Ex: Residencial Parque Una São José dos Campos',
      description: 'Nome do empreendimento ou condomínio apresentado no vídeo.',
    }),
    defineField({
      name: 'propertyUrl',
      title: 'Link do Imóvel no Portal da Pirâmide',
      type: 'url',
      placeholder: 'Ex: https://piramideimoveis.com.br/imoveis/parque-una',
      description: 'Link direto para a ficha do imóvel no site da Pirâmide Imóveis.',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Link do Post Oficial no Instagram',
      type: 'url',
      placeholder: 'Ex: https://www.instagram.com/reel/C-xyz123/',
      description: 'Permite que o usuário assista ou compartilhe o reel diretamente pelo Instagram.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      description: 'Data de lançamento do vídeo para ordenação cronológica.',
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
