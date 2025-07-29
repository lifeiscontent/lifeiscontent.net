import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry } from 'serwist'
import { Serwist } from 'serwist'

// This declares the value of `injectionPoint` to TypeScript.
declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: WorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
})

serwist.addEventListeners()

// Note: defaultCache uses mixed strategies:
// - Static assets (JS/CSS): StaleWhileRevalidate
// - Images: StaleWhileRevalidate with 30-day expiration
// - Navigation: NetworkFirst with offline fallback
//
// For blog post updates:
// - Service worker manifest updates automatically on new builds
// - Users get fresh blog content due to NetworkFirst navigation strategy
// - Static assets update in background via StaleWhileRevalidate
