"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import "./sidenavbar.css"

export default function SideNavbar(){
    const pathname = usePathname()

    return (
        <div className="sidenavbar">
            <h2>Navigation</h2>
            <div className="navigations">
                <Link href={"/"} className={pathname === "/" ? "active" : "" }><span className="bi bi-house-door-fill"></span> Überblick</Link>
                <Link href={"/files"} className={pathname === "/files" ? "active" : "" }><span className="bi bi-file-earmark-text-fill"></span> Dateien</Link>
                <Link href={"/folders"} className={pathname === "/folders" ? "active" : "" }><span className="bi bi-folder-fill"></span> Ordner</Link>
                <Link href={"/access"} className={pathname === "/access" ? "active" : "" }><span className="bi bi-person-lines-fill"></span> Zugriff verwalten</Link>
                <Link href={"/settings"} className={pathname === "/settings" ? "active" : "" }><span className="bi bi-gear-fill"></span> Einstellungen</Link>
            </div>
        </div>
    )
}