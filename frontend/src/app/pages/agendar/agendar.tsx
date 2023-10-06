import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx"
import "./agendar.css"


export const Agendar = () => {
    return(
        <>
            <div className="container-fluid fundo-home">
                <div className="fundo-agenda">
                    <div className="row">
                        <h1>Agendamento</h1>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <ListaServicos />
                        </div>
                        <div className="col-6">
                            <h1>Algo aqui</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}