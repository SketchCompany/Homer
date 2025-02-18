import "bootstrap-icons/font/bootstrap-icons.css"
import "@/global.css"
import { Open_Sans } from "next/font/google"
import Header from "@/header/header"
import PageViewport from "@/pageviewport/pageviewport"
const openSans = Open_Sans({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode}) {

    return (
        <html lang="de">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>Homer - Homesystem Server</title>
            </head>
            <body className={openSans.className}>
                <Header></Header>
                <PageViewport>
                    {children}
                </PageViewport>
            </body>
        </html>
    )
}