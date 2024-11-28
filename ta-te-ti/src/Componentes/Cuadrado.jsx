export const Cuadrado = ({ children, isSelected, updateTablero, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
  
    const handleClick = () => {
      updateTablero(index); // paso el índice de donde se hizo click
    };
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
};