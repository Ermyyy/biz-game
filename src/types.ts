export type SkillKey = 'negotiation' | 'management' | 'marketing'

export interface Player {
    id: string
    name: string
    level: number
    exp: number
    cash: number
    skills: Record<SkillKey, number>
    ownedBusinessIds: string[]
    createdAt: string
}

export interface BusinessTemplate {
    id: string
    name: string
    description?: string
    basePrice: number
    baseIncomePerDay: number
    baseExpensePerDay: number
    volatility: number
    tags?: string[]
}

export interface OwnedBusiness {
    id: string
    templateId: string
    level: number
    lastPayout?: string
    customName?: string
    priceBought: number
    reputation: number
}