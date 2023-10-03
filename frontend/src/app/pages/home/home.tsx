import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx"
import { TabelaServicos } from "../../shared/components/tabelaServicos/tabelaServicos.tsx"
import { useNavigate } from "react-router-dom"
import "./home.css"


export const Home= () => {
    const navegacao = useNavigate();
    return (
        <>
            <div className="container-fluid fundo-home">
                <div className="fundo-principal">
                    <h1>Área verde é a parte utilizável</h1>
                    <ListaServicos/>
                    <div className="d-flex justify-content-end pb-2">
                        <button className="button-agenda" onClick={() => navegacao("agendar")}>Agendar serviço</button>
                    </div>
                    <TabelaServicos/>
                </div>
            </div>
        </>
    );
}