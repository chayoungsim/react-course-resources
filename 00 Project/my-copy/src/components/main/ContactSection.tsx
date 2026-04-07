"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap-setup";
import { useGSAP } from "@gsap/react";

import contactBg from "@/assets/images/abb-e-mobility-contact-us.webp";
import contactBgMo from "@/assets/images/abb-e-mobility-contact-us-mo.webp";

export default function ContactSection() {
    const contactSectionRef = useRef<HTMLElement>(null);
    const contactBgRef = useRef<HTMLDivElement>(null);
    const contactTextRef = useRef<HTMLDivElement>(null);


    useGSAP(
        () => {
            // 배경 parallax 효과
            gsap.to(contactBgRef.current, {
                yPercent: -20,
                scrollTrigger: {
                    trigger: contactSectionRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                    markers: false,
                },
            });

            // 텍스트 parallax 효과 (반대 방향)
            // gsap.to(contactTextRef.current, {
            //     yPercent: 20,
            //     scrollTrigger: {
            //         trigger: contactSectionRef.current,
            //         start: "top center",
            //         end: "bottom center",
            //         scrub: 1,
            //         markers: false,
            //     },
            // });
        },
        { scope: contactSectionRef },
    );

    return (
        <section ref={contactSectionRef} className="contact-us">
            <div ref={contactBgRef} className="contact-us-bg">
                <div className="parallax">
                    <picture>
                        <source media="(min-width: 1024px)" srcSet={contactBg.src} />
                        <img src={contactBgMo.src} alt="Contact us" />
                    </picture>
                </div>
            </div>
            <div ref={contactTextRef} className="contact-us-text">
                <p>Learn more about our charging solutions</p>
                <button
                    type="button"
                    className="btn--outline btn--lg btn--hover"
                >
                    <span>ContactUs</span>
                </button>

                <button type="button" className="btn--primary btn--lg btn--hover2">
                    <span>ContactUs ContactUs</span>
                </button>
            </div>
        </section>
    );
}
