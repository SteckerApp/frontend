
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Toast store ──────────────────────────────────────────────────────────────

export type ToastType = 'ok' | 'err' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  msg: string;
}

interface ToastState {
  list: Toast[];
  push: (type: ToastType, msg: string, ms?: number) => void;
  remove: (id: number) => void;
}

let tid = 0;

export const useToasts = create<ToastState>()((set) => ({
  list: [],

  push: (type, msg, ms = 4200) => {
    const id = ++tid;

    set((state) => ({
      list: [...state.list, { id, type, msg }],
    }));

    setTimeout(() => {
      set((state) => ({
        list: state.list.filter((toast) => toast.id !== id),
      }));
    }, ms);
  },

  remove: (id) =>
    set((state) => ({
      list: state.list.filter((toast) => toast.id !== id),
    })),
}));

// Imperative helper for use outside components
export const toast = {
  ok: (msg: string) => useToasts.getState().push('ok', msg),
  err: (msg: string) => useToasts.getState().push('err', msg),
  info: (msg: string) => useToasts.getState().push('info', msg),
};

// ── Modal store ──────────────────────────────────────────────────────────────

export interface ModalState {
  id: string | null;
  data: unknown;
  open: (id: string, data?: unknown) => void;
  close: () => void;
}

export const useModal = create<ModalState>()((set) => ({
  id: null,
  data: null,

  open: (id, data = null) => set({ id, data }),

  close: () => set({ id: null, data: null }),
}));

// ── Sidebar / layout ─────────────────────────────────────────────────────────

interface LayoutState {
  collapsed: boolean;
  toggle: () => void;
}

export const useLayout = create<LayoutState>()(
  persist(
    (set) => ({
      collapsed: false,

      toggle: () =>
        set((state) => ({
          collapsed: !state.collapsed,
        })),
    }),
    { name: 'layout' }
  )
);

// ── Notification badge count ─────────────────────────────────────────────────

interface BadgeState {
  count: number;
  set: (count: number) => void;
  dec: () => void;
  reset: () => void;
}

export const useBadge = create<BadgeState>()((set) => ({
  count: 0,

  set: (count) => set({ count }),

  dec: () =>
    set((state) => ({
      count: Math.max(0, state.count - 1),
    })),

  reset: () => set({ count: 0 }),
}));

// ── Page filters (persisted per-page) ────────────────────────────────────────

type FilterValue = unknown;

interface FilterPage {
  [key: string]: FilterValue;
}

interface FilterState {
  pages: Record<string, FilterPage>;
  setFilter: (page: string, key: string, val: FilterValue) => void;
  get: (page: string, key: string, def?: FilterValue) => FilterValue;
  reset: (page: string) => void;
}

export const useFilters = create<FilterState>()(
  persist(
    (set, get) => ({
      pages: {},

      setFilter: (page, key, val) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [page]: {
              ...state.pages[page],
              [key]: val,
            },
          },
        })),

      get: (page, key, def) => get().pages[page]?.[key] ?? def,

      reset: (page) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [page]: {},
          },
        })),
    }),
    { name: 'filters' }
  )
);
