import * as sharp from 'sharp'
import { throwDefaultError } from 'src/common/errors'

export class ImageAdjustment {

    constructor() {}

    async resize(imageBuffer: Buffer, compactSize: boolean = false): Promise<Buffer> {

        // tamanho maximo para imagens compactas
        const MAX_WIDTH_IMG_COMPACT = 400
        const MAX_HEIGHT_IMG_COMPACT = 320

        // tamanho maximo para imagens não compactas
        const MAX_WIDTH_IMAGE = 1200
        const MAX_HEIGHT_IMAGE = 900

        try {
            const img = await sharp(imageBuffer)

            // captura os dados da imagem
            const metadata = await img.metadata()

            // varivais que ira definir o tamanho maximo da imagem
            let maxWidth = compactSize ? MAX_WIDTH_IMG_COMPACT : MAX_WIDTH_IMAGE
            let maxHeight = compactSize ? MAX_HEIGHT_IMG_COMPACT : MAX_HEIGHT_IMAGE

            // variaveis utilizadas para o redimensionamento
            let width = null
            let height = null

            if (metadata.width && metadata.height) {
                // verifica se a imagem esta na horizontal ou vertical
                if (metadata.width > metadata.height) {
                    width = metadata.width > maxWidth ? maxWidth : metadata.width
                } else {
                    height = metadata.height > maxHeight ? maxHeight : metadata.height
                }
            }

            // realiza o redimensionamento da imagem
            let imgRezise = await img.resize(width, height, {
                fit: 'inside'
            })

            // retorna o buffer da imagem redimensionada
            return await imgRezise.toBuffer()
        } catch (error) {
            throwDefaultError(error)
        }
    }
}