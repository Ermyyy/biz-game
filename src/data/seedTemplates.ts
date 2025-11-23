import type { BusinessTemplate } from "../types";

export const initialTemplates: BusinessTemplate[] = [
    {
        id: 'b_tiny_cafe',
        name: 'Кофейня на углу',
        description: 'Небольшая кофейня с постоянными посетителями.',
        basePrice: 1000,
        baseIncomePerDay: 120,
        baseExpensePerDay: 40,
        volatility: 0.05,
        tags: ['retail', 'food']
    },
    {
        id: 'b_web_shop',
        name: 'Интернет-магазин',
        description: 'Небольшой e-commerce, продажи из дома.',
        basePrice: 5000,
        baseIncomePerDay: 600,
        baseExpensePerDay: 200,
        volatility: 0.12,
        tags: ['online', 'retail']
    },
    {
        id: 'b_taxi',
        name: 'Такси-агрегатор',
        description: 'Сервис, который связывает водителей и клиентов.',
        basePrice: 15000,
        baseIncomePerDay: 2200,
        baseExpensePerDay: 900,
        volatility: 0.2,
        tags: ['services', 'platform']
    }
]