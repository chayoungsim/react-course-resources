'use client';

import { usePathname } from "next/navigation";
import { useEffect } from 'react';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MainContainer from "@/components/layout/MainContainer";

interface LayoutClientProps {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
    const pathname = usePathname();

    useEffect(() => {
        const isHome = pathname === '/';
        const body = document.body;

        if (isHome) {
            body.classList.add('home');
        } else {
            body.classList.remove('home');
        }

        body.classList.add('load');

        return () => {
            body.classList.remove('home', 'load');
        };
    }, [pathname]);

    return (
        <>
            <div id="wrap">
                <Header id="main-header" />
                <MainContainer>
                    {children}
                </MainContainer>
                <Footer id="main-footer" />
            </div>
        </>
    );
}
