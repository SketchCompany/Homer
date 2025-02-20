import fs from "fs"
import crypto from "crypto"
import NodeCache from "node-cache"
import env from "dotenv"
import config from "./config"
env.config()

const sessionCache = new NodeCache({stdTTL: 10, checkperiod: 30})

/**
 * used to check a JSON object for integrity by comparing it with the JSON ```objectToCompare```
 * @param {JSON} objectToCheck the JSON object to compare the keys from with the ```objectToCompare```
 * @param {JSON} objectToCompare the JSON object with the only keys in the ```objectToCheck```
 * @returns true or false wether the JSON objects are equal or not
 */
export function checkForIntegrity(objectToCheck: JSON, objectToCompare: JSON){
    const keys = Object.keys(objectToCheck)
    const neededKeys = Object.keys(objectToCompare)
    console.log("checkForIntegrity: given keys", keys, "needed keys", neededKeys)
    if(arraysEqual(keys, neededKeys)) return true
    else return false
}
export function arraysEqual(a: Array<string>, b: Array<string>){
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    const aSorted = Array.from(a)
    const bSorted = Array.from(b)

    for (let i = 0; i < aSorted.length; ++i) {
        if (aSorted[i] !== bSorted[i]) return false
    }
    return true
}
/**
 * checks if the file or directory exists at the goven ```path```
 * @param {string} path ```path``` to file or directory to check
 * @returns {boolean} returns true or false, wether the file or directory exists or not
 */
export function exists(path: string){
    return fs.existsSync(path)
}
/**
 * copys a file at the given ```path```
 * @param {string} path ```path``` to file to copy
 * @param {string} dest ```path``` to new file
 * @returns {null} returns nothing
 */
export function copy(path: string, destination: string){
    return new Promise(cb => {
        fs.copyFile(path, destination, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(null)
        })
    })
}
/**
 * removes a file or directory at the given ```path```
 * @param {string} path ```path``` to file or directory to remove
 * @returns {Promise} returns nothing
 */
export function remove(path: string){
    return new Promise(cb => {
        fs.rm(path, {recursive: true}, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(null)
        })
    })
}
/** 
 * move a directory or file to the given ```path```
 * @param {string} path the directory or file to move to the ```dest```
 * @param {string} dest the new directory or file to move to.
 * @returns {Promise}
 */
export function move(path: string, dest: string){
    return new Promise(cb => {
        fs.rename(path, dest, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(null)
        })
    })
}
/**
 * reads a directory at the given ```path```
 * @param {string} path the directory to read the files from
 * @returns {Promise<Array<string>>} returns every file in the given directory
 */
export function readDirectory(path: string, args?: {recursive: boolean} | undefined){
    return new Promise<string[]>(cb => {
        fs.readdir(path, args, (err, files) => {
            if(err){
                console.error(err)
                // cb(null)
            }
            else cb(files as string[])
        })
    })
}
/**
 * reads a file at the given ```path```
 * @param {string} path the file to read
 * @returns {Promise<string>} returns the content of the file in string format
 */
export function read(path: string){
    return new Promise<string | null>(cb => {
        fs.readFile(path, (err, data) => {
            if(err){
                console.error(err)
                // cb(null)
            }
            else cb(data.toString())
        })
    })
}
/**
 * writes ```data``` into a file at the given ```path```
 * @param {string} path the path where the file should be created
 * @param {string} data the data in string format to write in the file
 * @returns {Promise}
 */
export function write(path: string, data: string){
    return new Promise(cb => {
        fs.writeFile(path, data, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(null)
        })
    })
}
/**
 * creates a directory at the given ```path```
 * @param {string} path the path to create the directory
 * @returns {Promise}
 */
export function createDirectory(path: string){
    return new Promise(cb => {
        fs.mkdir(path, {recursive: true}, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(null)
        })
    })
}
/**
 * fetches a specific ```url``` with the ```GET``` method and returns the data of the response
 * @param {string} url the url to be fetched
 * @returns {Promise} the data of the response from the fetched url
 */
export function get(url: string){
    return new Promise<string>(async cb => {
        fetch(url).then((response) => response.json()).then((result) => {
            console.log("get:", url, "response:", result)
            cb(result.data)
        }).catch((err) => {
            console.error("get:", url, "error:", err)
            cb(err)
        })
    })
}
/**
 * fetches a specific ```url``` with the ```GET``` method and returns the data of the response and caches it
 * @param {string} url the url to be fetched
 * @param {number} ttl the ttl for data in the cache
 * @returns {Promise} the data of the response from the fetched url
 */
export function getAndCache(url: string, ttl: number | null = null){
    return new Promise<string | undefined>(async cb => {
        if(sessionCache.has(url)){
            console.log("getAndCache: got data from cache for:", url)
            cb(sessionCache.get(url))
        }
        else{
            fetch(url).then((response) => response.json()).then((result) => {
                console.log("get:", url, "response:", result)
                if(ttl) sessionCache.set(url, result.data, ttl)
                else sessionCache.set(url, result.data, 30)
                console.log("getAndCache: cached data from url:", url)
                cb(result.data)
            }).catch((err) => {
                console.error("get:", url, "error:", err)
                cb(err)
            })
        }
    })
}
/**
 * fetches a specific ```url``` with the ```POST``` method with the preferred ```data``` as ```JSON``` and returns the data of the response
 * @param {string} url the url to be fetched
 * @param {JSON} data the data that needs to be send to the url
 * @returns {Promise} the data of the response from the fetched url
 */
export function send(url: string, data: JSON){
    return new Promise<string>(async cb => {
        fetch(url, {method: "post", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}}).then((response) => response.json()).then((result) => {
            console.log("send:", url, "response:")
            console.dir(result, {depth: null})
            cb(result.data)
        }).catch((err) => {
            console.error("send:", url, "error:", err)
            cb(err)
        })
    })
}
const algorithm = "aes-256-ctr"
const key = crypto.createHash('sha256').update(process.env.DATA_ENCRYPTION_KEY || "").digest("hex")
/**
 * used to encrypt ```data``` and return the result
 * @param {string | number | boolean | JSON} data the data that should be encrypted
 * @returns {string} the encrypted data
 */
export function encrypt(data: string){
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv)
    let encrypted = cipher.update(data)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString("hex") + "$" + encrypted.toString("hex")
}
/**
 * used to decrypt ```data``` and return the result
 * @param {string} data the data that should be decrypted
 * @returns {string} the decrypted data
 */
export function decrypt(data: string){
    const dataParts = data.split("$")
    const iv = Buffer.from(dataParts.shift() as string, "hex")
    const encryptedData = Buffer.from(dataParts.join("$"), "hex")
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv)
    let decrypted = decipher.update(encryptedData)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

export interface IFileSystemEntries{
    [folders: string]: string[], 
    files: string[], 
    left: string[]
}
function readFileSystemEntries(fullPath: string){
    return new Promise<IFileSystemEntries>(async cb => {
        try{        
            const mainPath = config.devDirectory + fullPath.substring(1)

            console.log(fullPath, "readFileSystemEntries: mainPath", mainPath)
        
            if(!exists(mainPath)) await createDirectory(mainPath)
        
            if(exists(mainPath)){
                const entries = await readDirectory(mainPath)
        
                const fullEntries: string[] = []
        
                entries.forEach((element: string) => {
                    fullEntries.push(mainPath + "/" + element)
                })
        
                const folders = fullEntries.filter(currentPath => fs.statSync(currentPath).isDirectory())
                const files = fullEntries.filter(currentPath => fs.statSync(currentPath).isFile())
                const left = fullEntries.filter(currentPath => !fs.statSync(currentPath).isDirectory()).filter(currentPath => !fs.statSync(currentPath).isFile())

                console.log(fullPath, "readFileSystemEntries: mainPath", fullEntries)

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

const utilities = {
    checkForIntegrity,
    arraysEqual,
    exists,
    write,
    read,
    readDirectory,
    readFileSystemEntries,
    createDirectory,
    remove,
    move,
    copy,
    get,
    getAndCache,
    send,
    encrypt,
    decrypt
}
export default utilities