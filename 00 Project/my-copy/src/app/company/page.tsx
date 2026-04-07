import SubContainer from "@/components/layout/SubContainer"
import SubVisual from "@/components/layout/SubVisual"

export default function CompanyPage() {
    return (
        <SubContainer>
            <SubVisual
                type="video"
                src="/assets/images/home-teaser.mp4"
                title="Company"
            />
            <div className="static">
                <h1>Company Page</h1>
            </div>
            

        </SubContainer>
    )
}   