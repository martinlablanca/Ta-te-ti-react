import { useState } from 'react'
import './App.css'

const turnos = {
  X: 'x',
  O: 'o',
}


const Cuadrado = ({ children, isSelected, updateTablero, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () =>{
    updateTablero(index) //paso el indice de donde se hizo click
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};


function App() {
  const [tablero, setTablero] = useState(Array(9).fill(null))
  const [turno, setTurno] = useState(turnos.X)

  const updateTablero = (index) => {
    const newTablero = [...tablero] //Crea un nuevo tablero
    newTablero[index] = turno; //donde se hizo click pone el turno (X o O)
    setTablero(newTablero) //Actualiza el tablero


    const siguienteTurno = turno === turnos.X ? turnos.O : turnos.X //if para cambiar al siguiente turno
    setTurno(siguienteTurno)
  }

  return (
    <div className='board'> 
      <h1>Ta Te Ti</h1>
      <br />
      <section className='game'> {/* Muestra el tablero*/}
        {
          tablero.map((_, index) => {
            return (
              <Cuadrado
              key={index}
              index={index}
              updateTablero={updateTablero} //se ejecuta solo cuando se hace click por eso se pasa la funcion y no se la ejecuta
              >
                {tablero[index]}
              </Cuadrado>
            )
          })
        }
      </section>

     <section className='turn'>  {/* Muestra de quien es el turno */}
        <Cuadrado isSelected={turno===turnos.X}>
          {turnos.X}
        </Cuadrado>
        <Cuadrado isSelected={turno===turnos.O}>
          {turnos.O}
        </Cuadrado>
      </section>
    </div>
  )
}

export default App
