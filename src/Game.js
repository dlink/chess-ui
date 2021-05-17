import React from 'react';
import './Game.css';

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

class Game extends React.Component {
    render() {
	return (
		<div className='game'>
		<Board />
		</div>);
    }
}

class Board extends React.Component {

    constructor(props) {
	super(props);
	this.handleClick.bind(this);

	// inital board
	let board = [];
	let value = null;
	for (let x = 1; x <= BOARD_WIDTH; x++) {
	    board.push([])
	    for (let y = 1; y <= BOARD_HEIGHT; y++) {;
		let key = x + ':' + y;
		board[board.length-1].push(
		    {key: key,
		     x: x,
		     y: y,
		     value: value});
	    }
	}
	this.state = {
	    history: [{board: board}]
	}
    }

    handleClick(x, y) {
	//alert(x + ":" + y);
	const history = this.state.history;
	const current = history[history.length - 1];
	const board = current.board.splice(0);
	board[x-1][y-1].value = 'x';

	this.setState(
	    {
		history: history.concat([{board: board}])
	    }
	);

    }

    renderSquare(square_rec) {
	const x = square_rec.x;
	const y = square_rec.y;
	return (
	    <Square
	    key={square_rec.key}
	    value={square_rec.value}
	    onClick={() => this.handleClick(x, y)}
		/>)
    }

    render() {
	let rows = []
	let value = null;
	let isIndicated = null;

	const history = this.state.history;
	const current = history[history.length-1];
	for (let y = 1; y <= BOARD_HEIGHT; y++) {
	    let squares = []
	    for (let x = 1; x <= BOARD_WIDTH; x++) {
		const square_rec = current.board[x-1][y-1];
		squares.push(
		    this.renderSquare(square_rec)
		)
	    }
	    rows.push(squares)
	}

	return (
	    <div className='board'>
	    {rows.map((value, index) => {
		return <div className='board-row'>{value}</div>
	    })}
	    </div>);
    }
}

class Square extends React.Component {

    render() {
	//const className = this.state.isIndicated ? 'dot active' : 'dot'
	const className = 'dot';
	// const key = this.props.x + ':' + this.props.y;
	return (
		<div
		   className='square' // square-indicator'
		   onClick={this.props.onClick}
		>
		   {this.props.value}
		   <span className={className} />
		</div>);
    }
}

export default Game;
