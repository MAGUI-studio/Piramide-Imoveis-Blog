import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const youtubeType = defineType({
  name: 'youtube',
  title: 'Vídeo (YouTube / Vimeo)',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Link do Vídeo no YouTube ou Vimeo',
      placeholder: 'Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ ou https://youtu.be/dQw4w9WgXcQ',
      description:
        'Cole o link oficial do vídeo horizontal (16:9) do YouTube ou Vimeo. Não utilize links de YouTube Shorts aqui (para vídeos verticais 9:16 estilo Reels, utilize a seção "Reels" do blog). Exemplos válidos: https://www.youtube.com/watch?v=dQw4w9WgXcQ ou https://vimeo.com/76979871.',
      validation: (rule) =>
        rule
          .required()
          .error('Cole o link do vídeo no YouTube ou Vimeo.')
          .uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({url}) {
      return {
        title: 'Vídeo no Artigo (Player)',
        subtitle: url || 'Cole a URL do YouTube ou Vimeo',
        media: PlayIcon,
      }
    },
  },
})
