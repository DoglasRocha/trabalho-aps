import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx"
import "./agendar.css"


export const Agendar = () => {
    return(
        <>
            <div className="container-fluid fundo-home">
                <div className="fundo-agenda">
                    <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <div className="p-2 lado-agendamento">
                        <h1 className="titulo-agendamento">Agendamento</h1>
                        
                        <div className="p-2">
                            <ListaServicos />
                        </div>
                        </div>    

                    <div className="p-2 lado-direito-agendamento">
                        
                            <h1 className="algo-aqui">Algo aqui</h1>
                        <div className="box-conteudo-agendamento"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}