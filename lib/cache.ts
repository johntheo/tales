interface CacheEntry {
  threadId: string
  runId: string
  output?: string
  timestamp: number
}

class InMemoryCache {
  private static instance: InMemoryCache
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

  private constructor() {
    // Initialize the cache in the global object if it doesn't exist
    if (!(global as any).__processingCache) {
      (global as any).__processingCache = new Map()
      console.log('InMemoryCache initialized in global scope')
    }
  }

  static getInstance(): InMemoryCache {
    if (!InMemoryCache.instance) {
      InMemoryCache.instance = new InMemoryCache()
    }
    return InMemoryCache.instance
  }

  private get cache(): Map<string, CacheEntry> {
    return (global as any).__processingCache
  }

  get(identifier: string): CacheEntry | null {
    console.log('Cache get called for:', identifier)
    console.log('Current cache size:', this.cache.size)
    console.log('Cache entries:', Array.from(this.cache.entries()))
    
    const entry = this.cache.get(identifier)
    if (!entry) {
      console.log('No cache entry found for:', identifier)
      return null
    }

    // Check if entry is expired
    const age = Date.now() - entry.timestamp
    console.log('Cache entry age:', age, 'ms')
    
    if (age > this.CACHE_TTL) {
      console.log('Cache entry expired for:', identifier)
      this.cache.delete(identifier)
      return null
    }

    console.log('Returning cached entry for:', identifier)
    return entry
  }

  set(identifier: string, entry: Omit<CacheEntry, 'timestamp'>): void {
    console.log('Cache set called for:', identifier)
    console.log('Entry to cache:', entry)
    
    this.cache.set(identifier, {
      ...entry,
      timestamp: Date.now()
    })
    
    console.log('Cache size after set:', this.cache.size)
  }

  delete(identifier: string): void {
    console.log('Cache delete called for:', identifier)
    this.cache.delete(identifier)
  }

  clear(): void {
    console.log('Cache clear called')
    this.cache.clear()
  }
}

export const ProcessingCache = InMemoryCache.getInstance() 