import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}
  
class Board extends React.Component {

  // shared state let two child components communicate with each other
  // the parent component(Board) pass state to the children throught props
  // in order to sync the state between each other(children and parent)
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, // it is a boolean to record whos' turn now
    };
  }

  // Add handleClick function to handle the event and prevent the 
  // undefined/missing function error
  handleClick(i) {
    /*
      Here we use .slice() to build a copy of squares array and modify it instead of 
      updating it directly.

      Q: In other programming language, type `const` means constant which is irrevocable.
          Why the following code the string 'X' can be assigned in the squares array?

      A: The `const` declaration creates "block-scopted" constants, much like variables
          declared using the let keyword. The value of constant in JaveScript which is the 
          same to others programming language can't be changed through reasignment, and 
          can't be redeclared.
          BUT if a constant is an object or array, its properties or items can be updated 
          or removed.
    */
    /*
      Here is the discussion about immutability and why it is important through .slice().

      Frankly, There are two ways to modify data. One is change the value of the variable 
      directly. The other is change the replica one, and replace the original one with it.

      Here is the example of changing data through Mutation:
      var player = {score: 1, name: 'Jeff'};
      player.score = 2; // now player is {score: 2, name: 'Jeff'}

      Here is the example of changing data without Mutation:
      var player = {score: 1, name: 'Jeff'};
      var newPlayer = Object.assign({}, player, {score: 2});
      // Now player doesn't changed, but newPlayer is {score: 2, name: 'Jeff'}
      // If you want to use object spread semantic:
      // var newPlayer = {...player, score: 2};

      The results of the two examples above are the same, but here are the advantages of 
      changing data indirectly:
      1. Simplize the complicate funciton
      2. Detect the move/change
      3. Decide when to re-render in React: Help you build pure component in React make 
          React decide some component should re-render right now
    */
    const squares = this.state.squares.slice();

    // If the winner exists or the Square is filled, the function is to dismiss the click
    // to return result earlier.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderSquare(i) {
    // pass prop value to Square
    // Replaced passing index of square with state('X', 'O', null)
    /*
      Because the state is private for its component, it can't be directly update.
      Which means we are disable to update the state in Board from Square.
      The solution is pass a function from Board to Square, and the function will be called
      by Square when Square is clicked.
    */
    return <Square 
              value={this.state.squares[i]}
              onClick={() => this.handleClick(i)}
            />; 
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
  
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}