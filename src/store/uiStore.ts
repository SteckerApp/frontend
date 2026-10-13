import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Toast store ───────────────────────────────────────────────────────────────
let tid = 0
export const useToasts = create((set) => ({
  list: [],
  push: (type, msg, ms = 4200) => {
    const id = ++tid
    set((s) => ({ list: [...s.list, { id, type, msg }] }))
    setTimeout(() => set((s) => ({ list: s.list.filter((t) => t.id !== id) })), ms)
  },
  remove: (id) => set((s) => ({ list: s.list.filter((t) => t.id !== id) })),
}))

// Imperative helper for use outside components
export const toast = {
  ok:   (m) => useToasts.getState().push('ok',   m),
  err:  (m) => useToasts.getState().push('err',  m),
  info: (m) => useToasts.getState().push('info', m),
}

// ── Modal store ───────────────────────────────────────────────────────────────
export const useModal = create((set) => ({
  id:   null,
  data: null,
  open:  (id, data = null) => set({ id, data }),
  close: ()                => set({ id: null, data: null }),
}))

// ── Sidebar / layout ──────────────────────────────────────────────────────────
export const useLayout = create(
  persist(
    (set) => ({ collapsed: false, toggle: () => set((s) => ({ collapsed: !s.collapsed })) }),
    { name: 'layout' }
  )
)

// ── Notification badge count ───────────────────────────────────────────────────
export const useBadge = create((set) => ({
  count: 0,
  set:   (n) => set({ count: n }),
  dec:   ()  => set((s) => ({ count: Math.max(0, s.count - 1) })),
  reset: ()  => set({ count: 0 }),
}))

// ── Page filters (persisted per-page) ─────────────────────────────────────────
export const useFilters = create(
  persist(
    (set, get) => ({
      pages: {},
      setFilter: (page, key, val) =>
        set((s) => ({ pages: { ...s.pages, [page]: { ...s.pages[page], [key]: val } } })),
      get: (page, key, def) => get().pages[page]?.[key] ?? def,
      reset: (page) => set((s) => ({ pages: { ...s.pages, [page]: {} } })),
    }),
    { name: 'filters' }
  )
)
