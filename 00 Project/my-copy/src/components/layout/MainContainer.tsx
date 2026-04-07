'use client';
import { useLayoutHeight } from "@/hooks/useWindowHeight";

export default function MainContainer({ children }: { children: React.ReactNode }) {
    const minHeight = useLayoutHeight('main-header', 'main-footer');
    return (
        <div id="container"style={{ minHeight, transition: 'min-height 0.2s ease' }}>
            {children}
        </div>
    )
}