"use client"

import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function MainPage(){

    return (
    <>
        <h1>Überblick</h1>
        <div className="fs-elements">
            <Link href={"/files"} className="folder">
                <Image src={"/folder.png"} width={128} height={108} alt=""></Image>
                <p>test name for folder</p>
            </Link>
            <div className="folder">
                <Image src={"/folder.png"} width={128} height={108} alt=""></Image>
                <p>test name for folder</p>
            </div>
            <div className="folder" onDoubleClick={() => redirect("/files")}>
                <Image src={"/folder.png"} width={128} height={108} alt=""></Image>
                <p>test name for folder</p>
            </div>
        </div>
    </>
    )
}