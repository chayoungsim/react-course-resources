export default function HeroSection () {
    return (
        <div className="hero-section">
            <div className="video-frame">
                <video preload="metadata" muted loop playsinline>
                    <source type="video/mp4" src="/assets/images/home-teaser.mp4" />
                </video>
            </div>
        </div>
    )
}