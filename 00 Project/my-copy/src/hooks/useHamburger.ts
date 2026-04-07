import { useState } from "react";

interface UseHamburgerReturn {
    isHamburgerOpen: boolean;
    handleHamburgerClick: () => void;
    closeHamburger: () => void;
}

export function useHamburger(): UseHamburgerReturn {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsHamburgerOpen((prev) => !prev);
    };

    const closeHamburger = () => {
        setIsHamburgerOpen(false);
    };

    return {
        isHamburgerOpen,
        handleHamburgerClick,
        closeHamburger,
    };
}
