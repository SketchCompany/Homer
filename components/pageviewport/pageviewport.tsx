import SideNavbar from "@/sidenavbar/sidenavbar"
import SideInfobar from "@/sideinfobar/sideinfobar"
import "./pageviewport.css"

export default function PageViewport({ children }: { children: React.ReactNode}){
    return (
        <>
            <main>
                <div className="pageviewport">
                    <SideNavbar></SideNavbar>
                    <div className="pageContent">{children}</div>
                    <SideInfobar></SideInfobar>
                </div>
            </main>
        </>
    )
}