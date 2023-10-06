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
                    <div className="row">
                        <div className="col-6">
                            <ListaServicos/>
                        </div>
                        <div className="col-6 pb-2">
                            <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                                <button className="button-agenda" onClick={() => navegacao("agendar")}>Agendar/Desmarcar serviço</button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <h2>Horários</h2>
                    </div>
                    <div className="container">
                        <TabelaServicos/>
                    </div>
                </div>
            </div>
        </>
    );
}