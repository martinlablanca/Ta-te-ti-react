import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import { Cuadrado } from './Componentes/Cuadrado';
import { turnos, Opciones} from './Constantes';

function App() {
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(turnos.X);
  const [ganador, setGanador] = useState(null);

  const verGanador = (tableroCheck) => {
    for (const combo of Opciones) {
      const [a, b, c] = combo;
      if (
        tableroCheck[a] && // Verifica si en la posición a hay algo
        tableroCheck[a] === tableroCheck[b] && // Verifica si a es igual a b
        tableroCheck[a] === tableroCheck[c] // Verifica si a es igual a c
      ) {
        return tableroCheck[a];
      }
    }
    return null;
  };

  const verificarEmpate = (tableroCheck) => {
    return tableroCheck.every((cuadrado) => cuadrado !== null);
  };

  const reiniciarJuego = () => {
    setTablero(Array(9).fill(null));
    setTurno(turnos.X);
    setGanador(null);
  };

  const updateTablero = (index) => {
    if (tablero[index] || ganador) return;

    const newTablero = [...tablero]; 
    newTablero[index] = turno; 
    setTablero(newTablero); 

    const siguienteTurno = turno === turnos.X ? turnos.O : turnos.X; 
    setTurno(siguienteTurno);

    const newGanador = verGanador(newTablero);
    if (newGanador) {
      confetti()
      confetti()
      confetti()
      setGanador(newGanador);
    } else if (verificarEmpate(newTablero)) {
      setGanador('empate');
    }
  };



  return (
    <div className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={reiniciarJuego}>Empezar de nuevo</button>
      <br />
      <section className="game">
        {tablero.map((cuadrado, index) => {
          return (
            <Cuadrado
              key={index}
              index={index}
              updateTablero={updateTablero}
            >
              {cuadrado}
            </Cuadrado>
          );
        })}
      </section>

      <section className="turn">
        <Cuadrado isSelected={turno === turnos.X}>{turnos.X}</Cuadrado>
        <Cuadrado isSelected={turno === turnos.O}>{turnos.O}</Cuadrado>
      </section>

      {ganador && (
        <section className="winner">
          <div className="text">
            <h2>{ganador === 'empate' ? '¡Empate!' : `¡El ganador es: ${ganador.toUpperCase()}!`}</h2>
            <header className="win">
              {ganador && <Cuadrado>{ganador}</Cuadrado>}
            </header>
            <footer>
              <button onClick={reiniciarJuego}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;