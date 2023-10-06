import "./listaServicos.css"

export const ListaServicos= () => {
    return(
        <>
            <div className="container-servico">
                <div className="row">
                    <div className="col-12 m-2">
                        <strong>Serviço Disponíveis</strong>
                        <i className="fa-regular fa-bell ms-2"></i>
                    </div>
                </div>
                <div className="modulo-servico">
                    <div className="row m-2">
                        <div className="topicos-servico p-3">
                            <div className="row">
                                    <div className="col-9">
                                        <div>
                                            <strong>Servico</strong>
                                            <span className="ms-auto w-100">Ricardo Lanches</span>
                                        </div>
                                    </div>
                                    <div className="col-3 text-center data" >
                                        <strong>18/09</strong>
                                    </div>
                            </div>
                        </div>
                        <div className="container topicos-servico p-3">
                            <div className="row">
                                <div className="col-9 servico">
                                    <strong>Servico</strong>
                                    <span className="text-end">Ricardo Lanches</span>
                                </div>
                                <div className="col-3 text-center data" >
                                    <strong>18/09</strong>
                                </div>
                            </div>
                        </div>
                        <div className="container teste-3 p-3">
                            <div className="row">
                                <div className="col-9 servico">
                                    <strong>Servico</strong>
                                    <span className="text-end">Ricardo Lanches</span>
                                </div>
                                <div className="col-3 text-center data" >
                                    <strong>18/09</strong>
                                </div>
                            </div>
                        </div>
                        <div className="container teste-3 p-3">
                            <div className="row">
                                <div className="col-9 servico">
                                    <strong>Servico</strong>
                                    <span className="text-end">Ricardo Lanches</span>
                                </div>
                                <div className="col-3 text-center data" >
                                    <strong>18/09</strong>
                                </div>
                            </div>
                        </div>
                        <div className="container teste-3 p-3">
                            <div className="row">
                                <div className="col-9 servico">
                                    <strong>Servico</strong>
                                    <span className="text-end">Ricardo Lanches</span>
                                </div>
                                <div className="col-3 text-center data" >
                                    <strong>18/09</strong>
                                </div>
                            </div>
                        </div>
                        <div className="container teste-3 p-3">
                            <div className="row">
                                <div className="col-9 servico">
                                    <strong>Servico</strong>
                                    <span className="text-end">Ricardo Lanches</span>
                                </div>
                                <div className="col-3 text-center data" >
                                    <strong>18/09</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}