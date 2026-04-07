"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "@/lib/gsap-setup";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import Link from "next/link";
import classes from "./Header.module.scss";
import skSignetLogo from "@/assets/images/sk-signet.svg";
import { useGnbHover } from "@/hooks/useGnbHover";
import { useHamburger } from "@/hooks/useHamburger";

export default function Header(props: React.HTMLAttributes<HTMLElement>) {
    const headerRef = useRef<HTMLElement>(null);
    const gnbRef = useRef<HTMLUListElement>(null);
    const pathname = usePathname();
    const { isGnbHovered, handleGnbMouseEnter, handleGnbMouseLeave, handleGnbFocus, handleGnbBlur } = useGnbHover();
    const { isHamburgerOpen, handleHamburgerClick } = useHamburger();

    const isActiveMenu = (href: string) => {
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const gnbElement = gnbRef.current;
        if (!gnbElement) return;

        gnbElement.addEventListener("focusin", handleGnbFocus);
        gnbElement.addEventListener("focusout", handleGnbBlur);

        return () => {
            gnbElement.removeEventListener("focusin", handleGnbFocus);
            gnbElement.removeEventListener("focusout", handleGnbBlur);
        };
    }, [handleGnbFocus, handleGnbBlur]);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isHamburgerOpen) {
            htmlElement.classList.add("notScroll");
        } else {
            htmlElement.classList.remove("notScroll");
        }

        return () => {
            htmlElement.classList.remove("notScroll");
        };
    }, [isHamburgerOpen]);

    useGSAP(
        () => {
            if (!headerRef.current) return;

            const showAnim = gsap
                .from(headerRef.current, {
                    yPercent: -100, // 헤더 높이만큼 위로 숨김
                    paused: true, // 처음에는 정지 상태
                    duration: 0.3,
                    ease: "power2.out",
                })
                .progress(1); // 시작 시점에는 헤더가 보이도록 설정

            ScrollTrigger.create({
                trigger: document.body,
                start: "top top", // 최상단에서 시작
                end: "max", // 페이지 끝까지 감시
                onUpdate: (self) => {
                    // self.direction: 1 (내려갈 때), -1 (올라올 때)
                    const scrollY = window.scrollY;
                    console.log('scroll Y:', scrollY, 'direction:', self.direction);

                    if (self.direction === 1) {                        
                        showAnim.reverse();
                        headerRef.current?.classList.remove('up');
                    } else if (self.direction === -1) {                      
                        showAnim.play();
                        if (scrollY > 0) {
                            // 최상단이 아니면 up 클래스 추가
                            headerRef.current?.classList.add('up');
                            console.log('올릴 때 - up 클래스 추가 (scrollY:', scrollY, ')');
                        } else {
                            // 최상단이면 up 클래스 제거
                            headerRef.current?.classList.remove('up');
                            console.log('올릴 때 - up 클래스 제거 (최상단, scrollY:', scrollY, ')');
                        }
                    }
                },
            });
        },
        { scope: headerRef },
    );

    // props에서 data 속성들만 필터링 (커스텀 속성 제거)
    const { className, ...restProps } = props;

    return (
        <header
            className={`${classes.header} ${isGnbHovered ? "showGnb" : ""} ${className || ''}`}
            ref={headerRef}
            {...Object.fromEntries(
                Object.entries(restProps).filter(([key]) =>
                    key.startsWith('data-') || key.startsWith('aria-')
                )
            )}
        >
            <div className={classes.siteHeader}>
                <div className={classes.static}>
                    <h1 className={classes.logo}>
                        <Link href="/">
                            <Image src={skSignetLogo} alt="SK Signet" fill />
                        </Link>
                    </h1>
                    <nav className={classes.gnbGroup}>
                        <ul className={classes.gnbList}                            
                            ref={gnbRef}                        
                            onMouseEnter={handleGnbMouseEnter}
                            onMouseLeave={handleGnbMouseLeave}
                        >
                            <li>
                                <Link
                                    href="/products"
                                    className={`${classes.gnbLink} ${isActiveMenu('/products') ? classes.activeMenu : ''}`}
                                >
                                    <span>Products</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link href="/">Intro</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Collaborative Robot</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Mobile Robot</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Customized robot</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    href="/company"
                                    className={`${classes.gnbLink} ${isActiveMenu('/company') ? classes.activeMenu : ''}`}
                                >
                                    <span>Company</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link href="/">Introduction</Link>
                                    </li>
                                    <li>
                                        <Link href="/">History</Link>
                                    </li>
                                    <li>
                                        <Link href="/">CI</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Location</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    href="/newsroom"
                                    className={`${classes.gnbLink} ${isActiveMenu('/newsroom') ? classes.activeMenu : ''}`}
                                >
                                    Newsroom
                                </Link>
                                <ul>
                                    <li>
                                        <Link href="/posts">Press</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Notice</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Download</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    href="/support"
                                    className={`${classes.gnbLink} ${isActiveMenu('/support') ? classes.activeMenu : ''}`}
                                >
                                    <span>Support</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link href="/">Inquiry</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Service</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <div className={classes.utils}>
                        <button
                            type="button"
                            className={`hamburger ${isHamburgerOpen ? 'active' : ''}`}
                            onClick={handleHamburgerClick}
                            aria-label="메뉴 열기"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <aside className={`${classes.aside} ${isHamburgerOpen ? classes.open : ''}`}>
                <div>사이트맵 & 모바일 메뉴</div>
            </aside>
        </header>
    );
}
