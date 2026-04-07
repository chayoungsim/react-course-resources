"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SubVisualProps {
    type: 'video' | 'image';
    src: string;
    title?: string;
}

export default function SubVisual({ type, src, title = "" }: SubVisualProps) {
    const subVsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: subVsRef.current,
            start: "top top",
            end: "bottom top",
            onEnter: () => subVsRef.current?.classList.add("fullScreen"),
            onLeaveBack: () => subVsRef.current?.classList.remove("fullScreen"),
            markers: false,
        });
    }, { scope: subVsRef });

    return (
        <div className="sub-visual" ref={subVsRef}>
            <div className="sub-visual-vs">

                {type === 'video' ? (
                    <div className="video-frame">
                        <video id="main-video" preload="metadata" autoPlay muted loop playsInline>
                            <source src={src} type="video/mp4" />
                        </video>
                    </div>    
                ) : (
                    <div className="image-frame">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}                
            </div>
        </div>
    );
}