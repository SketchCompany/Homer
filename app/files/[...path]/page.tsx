

export default async function FileDirectoryPage({params}: { params: Promise<{ path: string[] }> }){

    const path = (await params).path
    let fullPath = ""
    path.forEach((element) => {
        fullPath += "/" + decodeURI(element)
    })

    return (
        <>
            <h1>{fullPath}</h1>
        </>
    )
}