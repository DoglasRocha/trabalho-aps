import "./listaServicos.css";

export const ListaServicos = () => {
  return (
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
            <div className="container topicos-servico">
              <div className="row">
                <div
                  className="col-9 p-3"
                  style={{ borderRight: "1px solid green" }}
                >
                  <div className="d-flex">
                    <strong>Servico</strong>
                    <div className="row ms-auto">
                      <span>Ricardo Lanches</span>
                    </div>
                  </div>
                </div>
                <div className="col-3 text-center p-3">
                  <strong>18/09</strong>
                </div>
              </div>
            </div>
            <div className="container topicos-servico">
              <div className="row">
                <div
                  className="col-9 p-3"
                  style={{ borderRight: "1px solid green" }}
                >
                  <div className="d-flex">
                    <strong>Servico</strong>
                    <div className="row ms-auto">
                      <span>Ricardo Lanches</span>
                    </div>
                  </div>
                </div>
                <div className="col-3 text-center p-3">
                  <strong>18/09</strong>
                </div>
              </div>
            </div>
            <div className="container topicos-servico">
              <div className="row">
                <div
                  className="col-9 p-3"
                  style={{ borderRight: "1px solid green" }}
                >
                  <div className="d-flex">
                    <strong>Servico</strong>
                    <div className="row ms-auto">
                      <span>Ricardo Lanches</span>
                    </div>
                  </div>
                </div>
                <div className="col-3 text-center p-3">
                  <strong>18/09</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
