import type React from "react";
import { useSelector } from "react-redux";
import type { AppRootState } from "../store/store";
import { Link } from "react-router-dom";


const AppShell: React.FC<{children: React.ReactNode}> = ({children}) => {
    const cash = useSelector((s: AppRootState) => s.player.cash)
    const name = useSelector((s: AppRootState) => s.player.name)
    return (
        <div className="app-shell">
            <div className="sidebar">
                <div style={{marginBottom:16}}>
                    <div style={{fontWeight:700}}>{name}</div>
                    <div className="small">Баланс: <span className="big-number">
                        {cash} $</span>
                    </div>
                </div>
                <nav>
                    <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                    <Link className="nav-link" to="/market">Market</Link>
                </nav>
                <div style={{marginTop:20}} className="small">ПЕРЕЙДИ В МОЙ ТГК</div>
            </div>
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