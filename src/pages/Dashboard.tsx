import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppRootState } from "../store/store";
import { usePulseOnChange } from "../hooks/usePulseOnChange";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export const Dashboard: React.FC = () => {
    const player = useSelector((s: AppRootState) => s.player)
    const templates = useSelector((s:AppRootState) => s.businesses.templates)
    const owned = useSelector((s:AppRootState)=> s.businesses.owned)
    const dispatch = useDispatch<AppDispatch>()

    const netWorth = player.cash + owned.reduce((acc, b) => {
        const t = templates.find(tt => tt.id === b.templateId)
        if (!t) return acc
        return acc + Math.round(t.basePrice * (1 + b.level * 0.1))
    }, 0)

    const pulseCash = usePulseOnChange(player.cash)
    const pulseNet = usePulseOnChange(netWorth)
    return (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Card>
                    <h3>Overview</h3>
                    <div style={{display:'flex',gap:20,marginTop:10,alignItems:'center'}}>
                        <div>
                            <div className="small">Cash</div>
                            <div className={`big-number ${pulseCash ? 'neon' : ''}`}>{player.cash} $</div>
                        </div>
                        <div>
                            <div className="small">Level</div>
                            <div className="big-number">{player.level}</div>
                        </div>
                        <div>
                            <div className="small">Net worth</div>
                            <div className={`big-number ${pulseNet ? 'neon secondary' : ''}`}>{netWorth} $</div>
                        </div>

                        <div style={{marginLeft:'auto'}}>
                            <Button onClick={() => dispatch(tickDay())}>Tick Day</Button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h3>Owned businesses ({owned.length})</h3>
                    {owned.length === 0 ? <div className="small">У тебя пока нет бизнесов. Загляни в Market.</div> :
                        <ul>
                            {owned.map((b) => {
                                const t = templates.find(tt => tt.id === b.templateId)
                                return <li key={b.id} style={{marginTop:8}}><strong>{b.customName ?? t?.name}</strong> — lvl {b.level} — priceBought {b.priceBought} $</li>
                            })}
                        </ul>
                    }
                </Card>
        </div>
    )
}