import { useState } from "react";

interface UseGnbHoverReturn {
    isGnbHovered: boolean;
    handleGnbMouseEnter: () => void;
    handleGnbMouseLeave: () => void;
    handleGnbFocus: () => void;
    handleGnbBlur: () => void;
}

export function useGnbHover(): UseGnbHoverReturn {
    const [isGnbHovered, setIsGnbHovered] = useState(false);

    const handleGnbMouseEnter = () => {
        setIsGnbHovered(true);
    };

    const handleGnbMouseLeave = () => {
        setIsGnbHovered(false);
    };

    const handleGnbFocus = () => {
        setIsGnbHovered(true);
    };

    const handleGnbBlur = () => {
        setIsGnbHovered(false);
    };

    return {
        isGnbHovered,
        handleGnbMouseEnter,
        handleGnbMouseLeave,
        handleGnbFocus,
        handleGnbBlur,
    };
}
