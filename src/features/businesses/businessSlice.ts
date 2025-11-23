import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { BusinessTemplate, OwnedBusiness } from '../../types'
import { initialTemplates } from '../../data/seedTemplates'
import { v4 as uuid } from 'uuid'

interface BusinessesState {
  templates: BusinessTemplate[]
  owned: OwnedBusiness[]
}

const initialState: BusinessesState = {
  templates: initialTemplates,
  owned: []
}

const slice = createSlice({
  name: 'businesses',
  initialState,
  reducers: {
    addOwnedBusiness(state, action: PayloadAction<{ templateId: string; price: number }>) {
      const id = uuid()
      state.owned.push({
        id,
        templateId: action.payload.templateId,
        level: 0,
        lastPayout: undefined,
        priceBought: action.payload.price,
        reputation: 50
      })
    },
    sellBusiness(state, action: PayloadAction<{ id: string }>) {
      state.owned = state.owned.filter(b => b.id !== action.payload.id)
    },
    upgradeBusiness(state, action: PayloadAction<{ id: string }>) {
      const b = state.owned.find(x => x.id === action.payload.id)
      if (b) b.level += 1
    },
    setTemplates(state, action: PayloadAction<BusinessTemplate[]>) {
      state.templates = action.payload
    },
    resetBusinesses(state) {
      state.templates = initialTemplates
      state.owned = []
    }
  }
})
export const businessesActions = slice.actions
export const businessesReducer = slice.reducer
