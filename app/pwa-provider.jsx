'use client'

import { useEffect } from 'react'
import { Workbox } from 'workbox-window'

export function PWAProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/service-worker.js')

      wb.addEventListener('waiting', () => {
        if (confirm('New version available! Refresh to update?')) {
          wb.addEventListener('controlling', () => {
            window.location.reload()
          })
          wb.messageSkipWaiting()
        }
      })

      wb.register()
    }
  }, [])

  return null
}
