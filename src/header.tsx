import styles from "./header.module.css"

export default function Header(){
    const header = 
    <header className="header">
        <div className="left">
            <img src="/test.jpg" alt="" />
            <h3>Homer - Homesystem Server</h3>
        </div>
        <div className="right">
            <a href="/test"></a>  
            <a href="/test"></a>  
            <a href="/test"></a>  
        </div>
    </header>
    return header
}