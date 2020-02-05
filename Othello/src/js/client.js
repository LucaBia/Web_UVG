

const render = (posicion, estado) => {
    posicion.innerHTML = '';
    posicion.appendChild(renderTablero(estado));
}

const renderTablero = (estado) => {
    const tableroVisual = document.createElement('div');
    estado.tableroInicial.map(
        (fila, indexFila) => {
            const filaVisual = document.createElement('div');
            filaVisual.style.display = 'flex'
            fila.map(
                (casilla, indexCasilla) => {
                    filaVisual.appendChild(renderCasilla(fila, casilla));
                }
            )
            tableroVisual.appendChild(filaVisual);
        }
    )
    return tableroVisual;
}

const renderCasilla = (fila, casilla) => {
    const casillaVisual = document.createElement('div');
    casillaVisual.style.background = "green";
	casillaVisual.style.height = "100px";
    casillaVisual.style.width = "100px";
    casillaVisual.style.border = "1px solid";
    return casillaVisual;
}

const tableroInicial = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

const EstadoJuego = {
    turnoJugador: 1,
    tableroInicial
};

const root = document.getElementById('root');

render(root, EstadoJuego);