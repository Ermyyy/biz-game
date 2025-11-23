// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { playerReducer } from '../features/player/playerSlice'
import { businessesReducer } from '../features/businesses/businessSlice'
import type { Player, BusinessTemplate, OwnedBusiness } from '../types'

const PERSIST_KEY = 'biz_game_v1'

interface BusinessesState {
  templates: BusinessTemplate[]
  owned: OwnedBusiness[]
}

export interface RootState {
  player: Player
  businesses: BusinessesState
}
function loadState(): Partial<RootState> | undefined {
  try {
    const raw = localStorage.getItem(PERSIST_KEY)
    if (!raw) return undefined
    return JSON.parse(raw) as Partial<RootState>
  } catch {
    return undefined
  }
}
function saveState(state: RootState) {
  try {
    const snapshot = {
      player: state.player,
      businesses: state.businesses
    }
    localStorage.setItem(PERSIST_KEY, JSON.stringify(snapshot))
  } catch {}
}
const rootReducer = combineReducers({
  player: playerReducer,
  businesses: businessesReducer
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState() as Partial<RootState> | undefined
})

store.subscribe(() => {
  const state = store.getState() as RootState
  saveState(state)
})

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
