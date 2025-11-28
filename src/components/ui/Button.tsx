import type React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'accent'
    className?: string
}
export const Button: React.FC<Props> = ({children, variant='default', className = '', ...rest}) => {
    const cls = `btn ${variant === 'accent' ? 'btn-accent' : ''} ${className}`.trim()
    return (
        <button className={cls} {...rest}>
            {children}
        </button>
    )
}   