import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon, InfoOutlineIcon, WarningOutlineIcon} from '@sanity/icons'

export const calloutType = defineType({
  name: 'callout',
  title: 'Caixa de Destaque / Alerta',
  type: 'object',
  icon: BulbOutlineIcon,
  options: {
    modal: {
      type: 'dialog',
      width: 2,
    },
  },
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Estilo do Destaque',
      description: 'Escolha o tipo de caixa para definir a cor e o ícone.',
      options: {
        list: [
          {title: 'Dica de Ouro', value: 'tip'},
          {title: 'Informação Importante', value: 'info'},
          {title: 'Atenção', value: 'warning'},
          {title: 'Citação Especial', value: 'quote'},
        ],
        layout: 'radio',
      },
      initialValue: 'tip',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título da Caixa (Opcional)',
      placeholder: 'Ex: Dica do Consultor ou Regra da Rescisão Antecipada',
      description: 'Título em negrito exibido no topo da caixa de destaque.',
    }),
    defineField({
      name: 'content',
      type: 'text',
      rows: 3,
      title: 'Texto da Mensagem de Destaque',
      placeholder: 'Ex: Se a sua renda atual comportar a primeira parcela na Tabela SAC, escolha-a. A economia acumulada ultrapassa o valor de um carro zero km.',
      description: 'Conteúdo principal da mensagem de alerta.',
      validation: (rule) => rule.required().warning('Preencha a mensagem para exibir o destaque.'),
    }),
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare({type}) {
      const typeLabels: Record<string, string> = {
        tip: 'Dica de Ouro',
        info: 'Informação Importante',
        warning: 'Atenção',
        quote: 'Citação Especial',
      }
      return {
        title: typeLabels[type] || 'Caixa de Destaque / Alerta',
        subtitle: 'Clique para editar o texto e estilo',
        media:
          type === 'warning'
            ? WarningOutlineIcon
            : type === 'info'
              ? InfoOutlineIcon
              : BulbOutlineIcon,
      }
    },
  },
})
