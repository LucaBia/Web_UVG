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

const agregarPieza = (filaIndex, casillaIndex, estado) => {
    const otroTurno = estado.turnoJugador == 1 ? 2 : 1;
    if (estado.tableroInicial[filaIndex][casillaIndex] === 0){
        if (chequeoAlrededor(filaIndex, casillaIndex, estado).includes(otroTurno)){
            estado.tableroInicial[filaIndex][casillaIndex] = estado.turnoJugador;
            console.log(estado);
            cambiar_fichas(filaIndex, casillaIndex, estado);
            estado.turnoJugador = estado.turnoJugador === 1 ? 2 : 1;
        }else{
            console.log("No se puede colocar pieza");
        }
    }
    render(root, estado);
    
}

const chequeoAlrededor = (fIndex, cIndex, estado) => {
    const listaCardinal = [];
    const norte = estado.tableroInicial[fIndex-1] == undefined ? false : estado.tableroInicial[fIndex-1][cIndex];
    const sur = estado.tableroInicial[fIndex+1] == undefined ? false : estado.tableroInicial[fIndex+1][cIndex];
    const este = estado.tableroInicial[fIndex] == undefined ? false : estado.tableroInicial[fIndex][cIndex+1];
    const oeste = estado.tableroInicial[fIndex] == undefined ? false : estado.tableroInicial[fIndex][cIndex-1];
    const noreste = estado.tableroInicial[fIndex-1] == undefined ? false : estado.tableroInicial[fIndex-1][cIndex+1];
    const noroeste = estado.tableroInicial[fIndex-1] == undefined ? false : estado.tableroInicial[fIndex-1][cIndex-1];
    const sureste = estado.tableroInicial[fIndex+1] == undefined ? false : estado.tableroInicial[fIndex+1][cIndex+1];
    const suroeste = estado.tableroInicial[fIndex+1] == undefined ? false : estado.tableroInicial[fIndex+1][cIndex-1];
    listaCardinal.push(norte, sur, este, oeste, noreste, noroeste, sureste, suroeste);
    return listaCardinal;
} 








//--------------------------------------------------------------------------------
//La lógica siguiente de Othello la obtuve de Francisco Rosal (18676)
// Levemente modificada para adaptarla a mi codigo

const check_jugada_arr_positivo = (pos_i, arr, state) => {
    const value = state.turnoJugador == 2 ? 2 : 1;
    const opuesto = state.turnoJugador == 1 ? 2 : 1;
    const pos_init = pos_i;
    let pos = pos_i;
    while (true) {
        if (arr[pos + 1] == value) {
            if (pos_init == pos) { return false; }
            return true;
        } else if (arr[pos + 1] == opuesto) {
            pos += 1;
        } else { return false; }
    }
};

const check_jugada_arr_negativo = (pos_i, arr, state) => {
    const value = state.turnoJugador == 2 ? 2 : 1;
    //const opuesto = state.turnoJugador == 2 ? 1 : 2;
    const opuesto = state.turnoJugador == 1 ? 2 : 1;
    const pos_init = pos_i;
    let pos = pos_i;

    while (true) {
        if (arr[pos - 1] == value) {
            if (pos_init == pos) { return false; }
            return true;
        } else if (arr[pos - 1] == opuesto) {
            pos -= 1;
        } else { return false; }
    }
};

const cambiar_fichas = (x, y, state) => {
    actualizar_jugada(x, y, state.tableroInicial[x], true, state);
    const tablero_traspuesta = crear_traspuesta(state.tableroInicial);
    actualizar_jugada(y, x, tablero_traspuesta[y], false, state);
    const diagonal = get_diagonal(x, y, true, state);
    const diagonal_inversa = get_diagonal(x, y, false, state);
    const value = state.turnoJugador === 1 ? 2 : 1;
    actualizar_jugada_diagonal(x, y, diagonal, true, state);
    actualizar_jugada_diagonal(x, y, diagonal_inversa, false, state);
};

const actualizar_jugada = (fila, pos, arr, ort, state) => {
    const value = state.turnoJugador == 2 ? 2 : 1;
    //const opuesto = state.turnoJugador == 2 ? 1 : 2;
    const opuesto = state.turnoJugador == 1 ? 2 : 1;


    if (check_jugada_arr_positivo(pos, arr, state)) {
        while (true) {
            if (arr[pos + 1] == value) {
                break;
            } else if (arr[pos + 1] == opuesto) {
                pos += 1;
                ort ? change_value(fila, pos, value, state) : change_value(pos, fila, value, state);
            } else { break; }
        }
    }

    if (check_jugada_arr_negativo(pos, arr, state)) {
        while (true) {
            if (arr[pos - 1] == value) {
                break;
            } else if (arr[pos - 1] == opuesto) {
                pos -= 1;
                ort ? change_value(fila, pos, value, state) : change_value(pos, fila, value, state);
            } else { break; }
        }
    }
};

const actualizar_jugada_diagonal = (fila, pos_i, arr, ort, state) => {
    const value = state.turnoJugador == 2 ? 2 : 1;
    //const opuesto = state.turnoJugador == 2 ? 1 : 2;
    const opuesto = state.turnoJugador == 1 ? 2 : 1;
    let pos = pos_i;


    if (check_jugada_arr_positivo(pos, arr, state)) {
        let cont = 0;
        while (true) {
            if (arr[pos + 1] == value) {
                break;
            } else if (arr[pos + 1] == opuesto) {
                pos += 1;
                cont += 1;
                ort ? change_value(fila-cont, pos, value, state) : change_value(pos, fila+cont, value, state);
            } else { break; }
        }
    }

    pos = pos_i;

    if (check_jugada_arr_negativo(pos, arr, state)) {
        let cont = 0;
        while (true) {
            if (arr[pos - 1] == value) {
                break;
            } else if (arr[pos - 1] == opuesto) {
                pos -= 1;
                cont += 1;
                ort ? change_value(fila+cont, pos, value, state) : change_value(pos, fila-cont, value, state);
            } else { break; }
        }
    }
};

const change_value = (x, y, value, state) => { state.tableroInicial[x][y] = value; }

const get_diagonal = (x, y, no_inversa, state) => {
    const y_length = state.tableroInicial.length;
    const x_length = state.tableroInicial[0].length;
    const maxLength = Math.max(x_length, y_length);
    let temp;
    let cont = 0;
    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (let y = y_length - 1; y >= 0; --y) {
            let x = no_inversa ? k - y : k - (y_length - y);
            if (x >= 0 && x < x_length) { temp.push(state.tableroInicial[y][x]); }
        }

        const cond = no_inversa ? x + y : state.tableroInicial.length - x + y;	
        if (cond == cont) { return no_inversa ? temp : temp.reverse(); }
        cont += 1;
    }
};

const crear_traspuesta = (matriz) => {
	const cantFilas = matriz.length;
	const cantColumnas = matriz[0].length;
	const traspuesta = crearMatrizVacia(cantColumnas, cantFilas);
	
	for (let f = 0; f < cantFilas; f++) {
		for (let c = 0; c < cantColumnas; c++) {
			traspuesta[c][f] = matriz[f][c];
		}
	}
	return traspuesta;
};

const crearMatrizVacia = (m, n) => {
	const matriz = [];
	for (let i = 0; i < m; i++) {
		const fila = [];
		for (let j = 0; j < n; j++) {
			fila.push(0);
		}
		matriz.push(fila);
	}
	return matriz;
};
//--------------------------------------------------------------------------------------


const root = document.getElementById('root');

render(root, EstadoJuego);