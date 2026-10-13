import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { AuthState, Credentials, Tokens, User } from '@/types/auth.types'


const load = (k: string): string | null => localStorage.getItem(k)

const initialState: AuthState = {
  token: load('token'),
  refreshToken: load('rt'),
  user: null,
  permissions: [],
  roles: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<Credentials>) => {
      state.token = payload.token
      state.refreshToken = payload.refreshToken ?? null
      state.user = payload.user
      state.permissions = payload.permissions
      state.roles = payload.roles
      localStorage.setItem('token', payload.token)
      if (payload.refreshToken) {
        localStorage.setItem('rt', payload.refreshToken)
      } else {
        localStorage.removeItem('rt')
      }
    },
    // Use this after a token refresh, when only the tokens change
    setTokens: (state, { payload }: PayloadAction<Tokens>) => {
      state.token = payload.token
      state.refreshToken = payload.refreshToken
      localStorage.setItem('token', payload.token)
      if (payload.refreshToken) {
        localStorage.setItem('rt', payload.refreshToken)
      } else {
        localStorage.removeItem('rt')
      }
    },
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload
    },
    clearAuth: (state) => {
      state.token = null
      state.refreshToken = null
      state.user = null
      state.permissions = []
      state.roles = []
      localStorage.removeItem('token')
      localStorage.removeItem('rt')
    },
  },
})

export const { setCredentials, setTokens, setUser, clearAuth } = authSlice.actions

export const selectUser = (s: RootState) => s.auth.user
export const selectToken = (s: RootState) => s.auth.token
export const selectRefreshToken = (s: RootState) => s.auth.refreshToken
export const selectPermissions = (s: RootState) => s.auth.permissions
export const selectRoles = (s: RootState) => s.auth.roles

export default authSlice.reducer