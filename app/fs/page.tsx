import config from "@/config"
import utilities from "@/utilities"
import fs from "fs"

interface IFileSystemEntries{
    [folders: string]: string[], 
    files: string[], 
    left: string[]
}

export default async function FileSystemRootPage(){

    const fullPath = "/"

    const entries = await readFileSystemEntries(fullPath)

    return (
        <>
            <h1>{fullPath}</h1>
            <pre>
                folders: {parseStringArrayIntoString("files")}
            </pre>
            <pre>
                files: {entries.files}
            </pre>
            <pre>
                left: {entries.left}
            </pre>
        </>
    )
    
    function parseStringArrayIntoString(field: string){
        let fullString: string = ""
        entries[field].forEach((value: string) => {
            fullString += value + "\n"
        })
        return fullString
    }
}

function readFileSystemEntries(fullPath: string){
    return new Promise<IFileSystemEntries>(async cb => {
        try{        
            const mainPath = config.devDirectory + fullPath.substring(1)

            console.log(fullPath, "readFileSystemEntries: mainPath", mainPath)
        
            if(!utilities.exists(mainPath)) await utilities.createDirectory(mainPath)
        
            if(utilities.exists(mainPath)){
                const entries = await utilities.readDirectory(mainPath)
        
                const fullEntries: string[] = []
        
                entries.forEach((element: string) => {
                    fullEntries.push(mainPath + element)
                })
        
                const folders = fullEntries.filter(currentPath => fs.statSync(currentPath).isDirectory())
                const files = fullEntries.filter(currentPath => fs.statSync(currentPath).isFile())
                const left = fullEntries.filter(currentPath => !fs.statSync(currentPath).isDirectory()).filter(currentPath => !fs.statSync(currentPath).isFile())

                console.log(fullPath, "readFileSystemEntries: fullEntries", fullEntries)

                cb({
                    folders,
                    files,
                    left
                })
            }
        }
        catch(err){
            console.error(err)
        }
    })
}