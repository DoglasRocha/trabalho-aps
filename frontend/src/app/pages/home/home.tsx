import { Navbar } from "../../shared/components/navbar/navbar.tsx"
import "./home.css"


export const Home= () => {
    return (
        <>
            <Navbar/>
            <div className="container-fluid fundo-home">
                <h1>Início</h1>
            </div>
        </>
    );
}