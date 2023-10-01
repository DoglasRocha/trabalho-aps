import "./listaServicos.css"

export const ListaServicos= () => {
    return(
        <>
            <div className="container teste-1">
                <div className="row">
                    <div className="col-12">
                        <strong>Serviço Disponíveis</strong>
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </div>
                <div className="row">
                    <div className="container teste-2">
                        <div className="row">
                            <div className="col-9 servico">
                                <strong>Servico</strong>
                                <span> Ricardo Lanches</span>
                            </div>
                            <div className="col-3 text-center data" >
                                <strong>18/09</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}