import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }

    render() {
      return (

        // <button className="square" onClick={function() { 
        //   console.log('click');}}>

        <button 
          className="square" 
          // replace onClick action from setState to the funciton passed from Board component
          /*
            When a Square component(object) is clicked, the function onClick whom offers by
            Board would be called. Here is the description how it works:
            1. The onClick prop in the built DOM component <button> tells React to set a 
               click event listener
            2. When the button is clicked, React calls the defined event handler onClick in the 
               method Square render()
            3. The event handeler calls this.props.onClick(). onClick prop in Square would be 
               assigned throught Board.
            4. Because Board pass onClick{() => this.handleClick(i)} to Square, Square calls 
               handleClick(i) when it is clicked.
            5. Due to undefined handleClick(), the program will crash. If you click one of the 
               squares, the RED ERROR MESSAGE will show up "this.handleClick is not a function".
          */
          onClick={() => this.props.onClick()}
        >
          {/* get the prop value from Board */}
          {/* replace the state value from the passing prop(value) from Board */}
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {

    // shared state let two child components communicate with each other
    // the parent component(Board) pass state to the children throught props
    // in order to sync the state between each other(children and parent)
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
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
      const squares = this.state.squares.slice;
      squares[i] = 'X';
      this.setState({squares: squares})
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
      const status = 'Next player: X';
  
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
  