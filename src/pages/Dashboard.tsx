import type React from "react";
import { useSelector } from "react-redux";
import type { AppRootState } from "../store/store";

export const Dashboard: React.FC = () => {
    const player = useSelector((s: AppRootState) => s.player)
    const templates = useSelector((s:AppRootState) => s.businesses.templates)
    const owned = useSelector((s:AppRootState)=> s.businesses.owned)
    const netWorth = player.cash + owned.reduce((acc, b) => {
        const t = templates.find(tt => tt.id === b.templateId)
        if (!t) return acc
        return acc + Math.round(t.basePrice * (1 + b.level * 0.1))
    }, 0)
    return (
        <div>
            <div className="card">
                <h3>Overview</h3>
                <div style={{display:'flex',gap:20,marginTop:10}}>
                    <div>
                        <div className="small">Cash</div>
                        <div className="big-number">{player.cash} $</div>
                    </div>
                    <div>
                        <div className="small">Level</div>
                        <div className="big-number">{player.level}</div>
                    </div>
                    <div>
                        <div className="small">Net worth</div>
                        <div className="big-number">{netWorth} $</div>
                    </div>
                </div>
            </div>
            <div className="card">
                <h3>Owned businesses ({owned.length})</h3>
                {owned.length === 0 ? <div className="small">У тебя пока нет бизнесов. Загляни в Market.</div> :
                    <ul>
                        {owned.map((b) => {
                            const t = templates.find(tt => tt.id === b.templateId)
                            return <li key={b.id} style={{marginTop:8}}><strong>{b.customName ?? t?.name}</strong> — lvl {b.level} — priceBought {b.priceBought} $</li>
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}