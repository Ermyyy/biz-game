import type React from "react";

export const Card: React.FC<{className?: string; children: React.ReactNode}> = ({children, className=''}) => {
    return <div className={`card ${className}`.trim()}>{children}</div>
}