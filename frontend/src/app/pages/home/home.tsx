import { Navbar } from "../../shared/components/navbar/navbar.tsx"
import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx"
import "./home.css"


export const Home= () => {
    return (
        <>
            <Navbar/>
            <div className="container-fluid fundo-home">
                <div className="container-fluid fundo-principal">
                    <h1>Início</h1>
                    <ListaServicos/>
                </div>
            </div>
        </>
    );
}