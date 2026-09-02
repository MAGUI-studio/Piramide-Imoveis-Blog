import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export const tableType = defineType({
  name: 'table',
  title: 'Tabela de Dados (Comparativos)',
  type: 'object',
  icon: ThListIcon,
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
      title: 'Título da Tabela (Opcional)',
      placeholder: 'Ex: Comparativo de Preço por m² e Valorização por Bairro',
      description: 'Título exibido acima da tabela.',
    }),
    defineField({
      name: 'headers',
      type: 'array',
      title: 'Cabeçalhos das Colunas',
      description: 'Digite o nome de cada coluna (ex: "Bairro", "Preço Médio/m²", "Valorização Anual").',
      of: [{type: 'string'}],
      validation: (rule) => rule.min(2).warning('A tabela deve ter pelo menos 2 colunas.'),
    }),
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Linhas com os Dados',
      description: 'Adicione as linhas da tabela preenchendo as células correspondentes a cada coluna.',
      options: {
        modal: {
          type: 'dialog',
          width: 2,
        },
      },
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              type: 'array',
              title: 'Valores das Células',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Linha de Dados',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Tabela de Dados (Comparativos)',
        subtitle: 'Clique para editar linhas e colunas',
        media: ThListIcon,
      }
    },
  },
})
