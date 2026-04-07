"use client";

import HeroSectio from "./HeroSection";
import ArrowSection from "./ArrowSection";
import ContactSection from "./ContactSection";

export default function HomeIndex() {
    return (
        <main>
            <HeroSectio />
            <div style={{ minHeight: '100vh' }}></div>
            <div className="img-attach">
                <p>WE’RE LOOKING FORWARD TO GETTING AN INTERESTING BUSINESS DIALOGUE WITH YOU!</p>
            </div>
            <HeroSectio />
            <ArrowSection />
            <ContactSection />
        </main>
    )
}