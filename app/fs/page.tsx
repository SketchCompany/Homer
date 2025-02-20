import utilities from "@/utilities"

export default async function FileSystemRootPage(){

const fullPath = "/"

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