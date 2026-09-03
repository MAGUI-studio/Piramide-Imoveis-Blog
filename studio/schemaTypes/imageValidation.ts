import type { CustomValidator } from 'sanity'

export const validateImageSize = (maxMb = 2): CustomValidator => {
  return async (value: any, context: any) => {
    if (!value?.asset?._ref) return true
    const client = context.getClient({apiVersion: '2026-02-01'})
    const asset = await client.fetch('*[_id == $id][0]', {id: value.asset._ref})
    if (asset && typeof asset.size === 'number' && asset.size > maxMb * 1024 * 1024) {
      const sizeInMb = (asset.size / (1024 * 1024)).toFixed(1)
      return `A imagem selecionada possui ${sizeInMb} MB. O limite máximo permitido é de ${maxMb} MB. Recomendamos comprimir e utilizar formato .webp ou .png (preferencialmente .webp).`
    }
    return true
  }
}
