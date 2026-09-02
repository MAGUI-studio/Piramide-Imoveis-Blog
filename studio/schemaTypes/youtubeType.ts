import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const youtubeType = defineType({
  name: 'youtube',
  title: 'Vídeo (YouTube / Vimeo)',
  type: 'object',
  icon: PlayIcon,
  options: {
    modal: {
      type: 'dialog',
      width: 2,
    },
  },
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Link do Vídeo (YouTube ou Vimeo)',
      placeholder: 'Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Cole o link completo do vídeo no YouTube ou Vimeo.',
      validation: (rule) => rule.required().error('Insira a URL do vídeo.'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título do Vídeo (Acessibilidade & SEO)',
      placeholder: 'Ex: Tour Virtual pelo Conceito de Studios Modernos em SJC',
      description: 'Título descritivo para leitores de tela e Google.',
      validation: (rule) => rule.required().error('Insira um título para o vídeo.'),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Legenda abaixo do vídeo (Opcional)',
      placeholder: 'Ex: Assista à análise técnica sobre rentabilidade em São José dos Campos.',
      description: 'Texto curto explicativo exibido abaixo do vídeo.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Vídeo Incorporado (YouTube / Vimeo)',
        subtitle: 'Clique para editar o link e informações',
        media: PlayIcon,
      }
    },
  },
})
