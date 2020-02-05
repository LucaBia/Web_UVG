

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
                    filaVisual.appendChild(renderCasilla(indexFila, indexCasilla, casilla, estado));
                }
            )
            tableroVisual.appendChild(filaVisual);
        }
    )
    return tableroVisual;
}

const renderCasilla = (filaIndex, casillaIndex, casilla, estado) => {
    const casillaVisual = document.createElement('div');
    casillaVisual.style.display = "flex";
    casillaVisual.style.background = "green";
	casillaVisual.style.height = "100px";
    casillaVisual.style.width = "100px";
    casillaVisual.style.border = "1px solid";
    casillaVisual.style.alignItems = "center";
    casillaVisual.style.justifyContent = "center";
    casillaVisual.appendChild(renderPieza(casilla));

    casillaVisual.onclick = () => agregarPieza(filaIndex, casillaIndex, estado);

    return casillaVisual;
}

const renderPieza = (valor) => {
    const pieza = document.createElement('div');
    pieza.style.height = "90px";
    pieza.style.width = "90px";
    pieza.style.borderRadius = "50px";
    if (valor === 1){
        pieza.style.background = "black";
    }else if(valor === 2){
        pieza.style.background = "white";
    }

    return pieza;
}

const agregarPieza = (fila, casilla, estado) => {
    if (estado.tableroInicial[fila][casilla] === 0){
        estado.tableroInicial[fila][casilla] = estado.turnoJugador;
        console.log(estado);
        estado.turnoJugador = estado.turnoJugador == 1 ? 2 : 1;
    }
    render(root, estado);
    
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