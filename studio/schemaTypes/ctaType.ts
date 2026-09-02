import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const ctaType = defineType({
  name: 'cta',
  title: 'Bloco de Conversão (CTA / WhatsApp)',
  type: 'object',
  icon: EnvelopeIcon,
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
      title: 'Título da Chamada (CTA)',
      placeholder: 'Ex: Quer Simular seu Financiamento sem Compromisso?',
      description: 'Frase chamativa que desperta o interesse do leitor.',
      validation: (rule) => rule.required().warning('Defina o título da chamada.'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      title: 'Texto Explicativo',
      placeholder: 'Ex: Nossos especialistas calculam as menores taxas entre os principais bancos para o seu perfil.',
      description: 'Explicação rápida do benefício de falar com um corretor.',
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Texto do Botão',
      placeholder: 'Ex: Falar com Especialista no WhatsApp',
      description: 'Texto do botão de ação.',
      initialValue: 'Falar com Especialista no WhatsApp',
      validation: (rule) => rule.required().error('O texto do botão é obrigatório.'),
    }),
    defineField({
      name: 'buttonUrl',
      type: 'string',
      title: 'Link Personalizado de WhatsApp / Destino (Opcional)',
      placeholder: 'Ex: https://wa.me/5512991599801?text=Quero%20simular',
      description: 'Se deixar em branco, o sistema usará o WhatsApp padrão da Pirâmide com o assunto do artigo.',
    }),
    defineField({
      name: 'isWhatsApp',
      type: 'boolean',
      title: 'Abrir direto no WhatsApp?',
      description: 'Se ativado, adiciona o ícone oficial do WhatsApp e formata a mensagem com contexto.',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bloco de Conversão (CTA / WhatsApp)',
        subtitle: 'Clique para editar a chamada e botão',
        media: EnvelopeIcon,
      }
    },
  },
})
