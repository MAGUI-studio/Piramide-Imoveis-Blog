import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {validateImageSize} from './imageValidation'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Categoria',
      type: 'string',
      placeholder: 'Ex: Mercado Imobiliário, Financiamento & Crédito, Imóveis de Luxo',
      description: 'Nome temático principal exibido no menu e nos filtros de artigos.',
      validation: (rule) => rule.required().error('O nome da categoria é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug da URL da Categoria',
      type: 'slug',
      description:
        'Endereço da página da categoria (ex: "/categoria/mercado-imobiliario"). Clique em "Generate" para preencher automaticamente com base no nome.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug da categoria é obrigatório.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa da Categoria',
      type: 'image',
      description:
        'Foto representativa de alta resolução (proporção 16:9 ou 1920x1080px) exibida nos carrosséis e cards do hub de categorias. Utilize imagens em formato .webp ou .png (preferencialmente .webp para máxima qualidade e performance). Limite máximo: 2 MB.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          placeholder: 'Ex: Fachada de casa contemporânea de alto padrão',
          description: 'Descrição da imagem para acessibilidade e SEO.',
        },
      ],
      validation: (rule) =>
        rule.warning('Recomendado adicionar uma imagem de capa para a categoria.').custom(validateImageSize(2)),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Resumida (Para listagens e SEO)',
      type: 'text',
      rows: 2,
      placeholder: 'Ex: Análises de valorização, projeções de preço por metro quadrado e tendências no Vale do Paraíba.',
      description:
        'Breve explicação sobre os temas abordados nesta categoria (aparece no topo da página e nos metadados do Google).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
