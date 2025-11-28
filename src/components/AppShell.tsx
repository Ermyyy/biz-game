import type React from "react";
import { useSelector } from "react-redux";
import type { AppRootState } from "../store/store";
import { Link } from "react-router-dom";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";


const AppShell: React.FC<{children: React.ReactNode}> = ({children}) => {
    const cash = useSelector((s: AppRootState) => s.player.cash)
    const name = useSelector((s: AppRootState) => s.player.name)
    return (
        <div className="app-shell">
            <aside className="sidebar">
                <Card>
                    <div style={{display:'flex',flexDirection:'column',gap:8}}>
                        <div style={{fontWeight:700}}>{name}</div>
                        <div className="small">Баланс</div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                        <div className="big-number neon">{cash} $</div>
                        <Button variant="accent" onClick={() => alert('Чето пока нет :)')}>Top-up</Button>
                        </div>
                    </div>
                </Card>

                <nav>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/market">Market</Link>
                </nav>

                <div style={{marginTop:10}} className="small">DAY 2</div>
            </aside>
            <main className="main">
                <div className="header">
                    <h2>Biz Game</h2>
                    <div className="small">ТГК В ПРОФИЛЕ</div>
                </div>
                {children}
            </main>
        </div>
    )
}

export default AppShell