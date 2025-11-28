import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppRootState } from "../store/store"
import { businessesActions } from "../features/businesses/businessSlice"
import { playerActions } from "../features/player/playerSlice"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"

const Market: React.FC = () => {
    const templates = useSelector((s:AppRootState) => s.businesses.templates)
    const cash = useSelector((s:AppRootState) => s.player.cash)
    const dispatch = useDispatch<AppDispatch>()
    const buy = (templateId: string, price: number) => {
        if (cash < price) {
            alert('Недостаточно денег')
            return
        }
        dispatch(businessesActions.addOwnedBusiness({templateId, price}))
        dispatch(playerActions.changeCash(-price))
        dispatch(playerActions.addOwnedBusinessId(templateId))
    }

    return (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Card>
                    <h3>Market</h3>
                    <div className="small">Доступные бизнесы — выбери, чтобы купить</div>
                </Card>
                <div className="grid">
                    {templates.map(t => (
                        <Card key={t.id}>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <div>
                                    <div style={{fontWeight:700}}>{t.name}</div>
                                    <div className="small" style={{marginTop:6}}>{t.description}</div>
                                    <div style={{marginTop:8}}>
                                        <span className="badge-accent">{t.tags?.join(', ')}</span>
                                    </div>
                                </div>
                                <div style={{textAlign:'right'}}>
                                    <div className="big-number">{t.basePrice} $</div>
                                    <Button variant="accent" style={{marginTop:8}} onClick={() => buy(t.id, t.basePrice)}>Buy</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
        </div>
    )
}

export default Market