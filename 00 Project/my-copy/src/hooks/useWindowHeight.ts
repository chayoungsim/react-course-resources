'use client';

import { useState, useEffect } from 'react';

export const useLayoutHeight = (headerId: string, footerId: string) => {
    const [minHeight, setMinHeight] = useState('100vh');

    useEffect(() => {
        const updateHeight = () => {
            const header = document.getElementById(headerId);
            const footer = document.getElementById(footerId);

            if (header && footer) {
                const headerHeight = 0;
                const footerHeight = footer.offsetHeight;
                setMinHeight(`calc(100vh - ${headerHeight + footerHeight}px)`); 
            }
        }

        //초기 로드 시 실행
        updateHeight();

        //창 크기 변경시 대응
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        }


    },[headerId,footerId]);

    return minHeight;
}
