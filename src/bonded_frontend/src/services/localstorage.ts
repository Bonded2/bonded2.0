import localforage from 'localforage'

const compressImage = async (
    file: Blob,
    quality = 0.7,
    maxWidth = 1920
): Promise<Blob> => {
    const bitmap = await createImageBitmap(file)
    const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1

    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width * scale
    canvas.height = bitmap.height * scale

    const ctx = canvas.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

    return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob!), 'image/jpeg', quality)
    })
}

const createShim = (db: LocalForage, cache: Record<string, any>) => ({
    getItem: (k: string) => cache.hasOwnProperty(k) ? cache[k] : null,
    setItem: async (k: string, v: any) => {
        let valueToStore = v
        if (v instanceof Blob && v.type.startsWith('image/')) {
            valueToStore = await compressImage(v, 0.7, 1920)
        }
        cache[k] = valueToStore
        await db.setItem(k, valueToStore)
        return valueToStore
    },
    removeItem: async (k: string) => {
        delete cache[k]
        await db.removeItem(k)
    },
    clear: async () => {
        Object.keys(cache).forEach(k => delete cache[k])
        await db.clear()
    },
    key: (i: number) => Object.keys(cache)[i] || null,
    get length() { return Object.keys(cache).length }
})

// Wrap all top-level awaits in an async IIFE
;(async () => {
    // Local Storage Shim
    const localDB = localforage.createInstance({
        name: 'bonded',
        storeName: 'BondedData'
    })
    const localCache: Record<string, any> = {}
    await localDB.iterate((value, key) => { localCache[key] = value })
    const localShim = createShim(localDB, localCache)
    Object.defineProperty(window, 'localStorage', { value: localShim })

    // Session Storage Shim
    const sessionDB = localforage.createInstance({
        name: 'bonded',
        storeName: 'preview'
    })
    const sessionCache: Record<string, any> = {}
    await sessionDB.iterate((value, key) => { sessionCache[key] = value })
    const sessionShim = createShim(sessionDB, sessionCache)
    Object.defineProperty(window, 'sessionStorage', { value: sessionShim })

    const params = new URLSearchParams(location.search)
    const emailParam = params.get('from')

    if (emailParam) {
        try {
            const decodedEmail = decodeURIComponent(emailParam)
            await localStorage.setItem('bonded-invitation-mail', decodedEmail)
        } catch (err) {
            console.error('Failed to decode email param', err)
        }
    }
})()
