"use client"

import Image from "next/image"
import Link from "next/link"
import "./header.css"
import { useEffect, useState } from "react";

export default function Header(){  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
      
    return (
        <header>
            <div className="left">
                <Image className="icon" src="/icon.png" width={200} height={104} alt=""/>
                <h3>Homer - Homesystem Server</h3>
            </div>
            <div className="right">
                <Link href={"/"}><span className="bi bi-house-door-fill"></span> Überblick</Link>
                <Link href={"/help"}><span className="bi bi-question-lg"></span> Hilfe</Link>
                {!isLoggedIn && (
                    <Link className="marked" href={"/login?r=/"}><span className="bi bi-person-fill"></span> Anmelden</Link>
                )}
            </div>
        </header>
    )
}