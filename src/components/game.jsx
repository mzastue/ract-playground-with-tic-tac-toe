import React from 'react';
import Board from './board';

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      isXNext: true
    }
  }

  handleOnSquareClick (index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (checkWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat(
        [{ squares: squares }]
      ),
      stepNumber: history.length,
      isXNext: !this.state.isXNext,
    });
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      isXNext: (step % 2) === 0,
    });
  }

  render = () => {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start.';
      return (
       <li key={move}>
         <button onClick={() => this.jumpTo(move)}>{desc}</button>
       </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
          <Board
            squares={current.squares}
            onClick={(index) => this.handleOnSquareClick(index)}
          />
        </div>
      </div>
    );
  }
}

function checkWinner (squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < winningLines.length; index++) {
    const [a, b, c] = winningLines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

export default Game;