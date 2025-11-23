import { v4 as uuid } from 'uuid'
import type { Player } from '../../types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const nowIso = () => new Date().toISOString()

const initialPlayer: Player = {
    id: uuid(),
    name: 'FutureMilioner',
    level: 1,
    exp: 0,
    cash: 5000,
    skills: {negotiation: 0, management: 0, marketing: 0},
    ownedBusinessIds: [],
    createdAt: nowIso(),
}

const slice = createSlice({
    name: 'player',
    initialState: initialPlayer,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        changeCash(state, action: PayloadAction<number>) {
            state.cash += action.payload
        },
        addOwnedBusinessId(state, action: PayloadAction<string>) {
            state.ownedBusinessIds.push(action.payload)
        },
        removeOwnedBusinessId(state, action: PayloadAction<string>) {
            state.ownedBusinessIds = state.ownedBusinessIds.filter(id => id !== action.payload)
        },
        addExp(state, action: PayloadAction<number>) {
            state.exp += action.payload
            const expToNext = Math.floor(100 * Math.pow(state.level, 1.5))
            while (state.exp >= expToNext) {
                state.exp -= expToNext
                state.level += 1
            }
        },
        upgradeSkill(state, action: PayloadAction<{skill: keyof Player['skills']}>) {
            const skill = action.payload.skill
            state.skills[skill] = (state.skills[skill] ?? 0) + 1
        },
        resetPlayer(state) {
            Object.assign(state, initialPlayer)
        }
    }
})

export const playerActions = slice.actions
export const playerReducer = slice.reducer