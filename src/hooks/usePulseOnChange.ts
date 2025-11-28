import { useEffect, useRef, useState } from "react";

export function usePulseOnChange<T>(val: T, ms = 420) {
    const [pulse, setPulse] = useState(false)
    const prev = useRef<T | undefined>(undefined)
    useEffect(() => {
        if (prev.current !== undefined && prev.current !== val) {
            setPulse(true)
            const t = setTimeout(() => setPulse(false), ms)
            return () => clearTimeout(t)
        }
        prev.current = val
    }, [val, ms])
    return pulse
}