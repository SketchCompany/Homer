import utilities from "@/utilities"

export default async function FileSystemChildPage({params}: { params: Promise<{ path: string[] }> }){

    const path = (await params).path
    let fullPath = ""
    path.forEach((element) => {
        fullPath += "/" + decodeURI(element)
    })

    const entries = await utilities.readFileSystemEntries(fullPath)

    return (
        <>
            <h1>{fullPath}</h1>
            <pre>
                folders: {parseStringArrayIntoString("folders")}
            </pre>
            <pre>
                files: {parseStringArrayIntoString("files")}
            </pre>
            <pre>
                left: {parseStringArrayIntoString("left")}
            </pre>
        </>
    )
    
    function parseStringArrayIntoString(field: string){
        let fullString: string = ""
        entries[field].forEach((value: string) => {
            fullString += "\n" + value
        })
        return fullString
    }
}