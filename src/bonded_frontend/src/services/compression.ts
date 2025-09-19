export const compressBase64Image = async (
    dataUrl: string,
    maxWidth: number,
    quality: number
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const scale = Math.min(1, maxWidth / img.width)
            const canvas = document.createElement('canvas')
            canvas.width = img.width * scale
            canvas.height = img.height * scale
            const ctx = canvas.getContext('2d')
            if (!ctx) return reject(new Error('Canvas context not available'))
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error('Failed to create blob'))
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.onerror = reject
                    reader.readAsDataURL(blob)
                },
                'image/jpeg',
                quality
            )
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = dataUrl
    })
}

export const compressImagesInEditorContent = async (
    content: any,
    maxWidth: number,
    quality: number
): Promise<any> => {
    if (!content || !content.content) return content

    const newContent = { ...content }

    for (const node of newContent.content) {
        if (node.type === 'image' && node.attrs?.src?.startsWith('data:image')) {
            try {
                const originalSize = (node.attrs.src.length * 3) / 4 / 1024 // KB
                node.attrs.src = await compressBase64Image(node.attrs.src, maxWidth, quality)
                const compressedSize = (node.attrs.src.length * 3) / 4 / 1024 // KB
                console.log(`Image compression:
  Original size: ${originalSize.toFixed(2)} KB
  Compressed size: ${compressedSize.toFixed(2)} KB
  Reduction: ${(originalSize - compressedSize).toFixed(2)} KB`)
            } catch (e) {
                console.error('Image compression failed', e)
            }
        }

        // Recurse if node has children
        if (node.content) {
            node.content = await compressImagesInEditorContent({ content: node.content }, maxWidth, quality).then(r => r.content)
        }
    }

    return newContent
}
