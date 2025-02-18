"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AutomaticLoginPage(){
    const searchParams = useSearchParams()
    useEffect(() => {
        const token = searchParams.get("t")
        let redirect = searchParams.get("r")

        if(token){
            localStorage.setItem("token", token)
            if(redirect) open(redirect, "_self")
            else open("/", "_self")
        }
        else{
            if(!redirect) redirect = "/"
            open("https://api.sketch-company.de/login?redirect=" + location.origin + "/login?r=" + redirect, "_self")
        }
    })

    return <></>
}