import { Navbar } from "../../shared/components/navbar/navbar.tsx"
import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx"
import { TabelaServicos } from "../../shared/components/tabelaServicos/tabelaServicos.tsx"
import "./home.css"


export const Home= () => {
    return (
        <>
            <Navbar/>
            <div className="container-fluid fundo-home">
                <div className="fundo-principal">
                    <h1>Área verde é a parte utilizável</h1>
                    <ListaServicos/>
                    <TabelaServicos/>
                </div>
            </div>
        </>
    );
}