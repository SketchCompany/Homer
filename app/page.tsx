"use client"

import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react";

export default function MainPage(){
    const [activeFolder, setActiveFolder] = useState<number | null>(null)

    const handleFolderClick = (folderId: number) => {
        setActiveFolder(folderId)
    }

    const folders = [
        { id: 0, name: "test", href: null},
        { id: 0, name: "test", href: null},
        { id: 0, name: "test", href: null},
        { id: 0, name: "test", href: null},
    ]

    return (
    <>
        <h1>Überblick</h1>
        <div className="fs-elements">
            {folders.map((folder, index) => (
                folder.href ? (
                    <Link key={index} href={folder.href} className={`folder ${activeFolder === index ? "active" : ""}`} onClick={() => handleFolderClick(index)}>
                        <Image src={"/folder.png"} width={128} height={108} alt="" />
                        <p>{folder.name}</p>
                    </Link>
                ) : (
                    <div key={index} className={`folder ${activeFolder === index ? "active" : ""}`} onClick={() => handleFolderClick(index)} onDoubleClick={() => redirect("/fs/" + folder.name)}>
                        <Image src={"/folder.png"} width={128} height={108} alt="" />
                        <p>{folder.name}</p>
                    </div>
                )
            ))}
        </div>
    </>
    )
}