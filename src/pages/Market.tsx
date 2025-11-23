import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppRootState } from "../store/store"
import { businessesActions } from "../features/businesses/businessSlice"
import { playerActions } from "../features/player/playerSlice"

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
        <div>
            <div className="card">
                <h3>Market</h3>
                <div className="small">Доступные бизнесы — выбери, чтобы купить</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:12}}>
                    {templates.map(t => (
                        <div key={t.id} className="card">
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <div>
                                    <div style={{fontWeight:700}}>{t.name}</div>
                                    <div className="small">{t.description}</div>
                                </div>
                                <div style={{textAlign:'right'}}>
                                    <div className="big-number">{t.basePrice} $</div>
                                    <button style={{marginTop:8}} onClick={() => buy(t.id, t.basePrice)}>Buy</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Market