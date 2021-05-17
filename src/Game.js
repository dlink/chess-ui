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
	    for (let y = 1; y <= BOARD_HEIGHT; y++) {
		let key = x + ':' + y;
		const pieceInfo = getPiece(x, y)
		board[board.length-1].push(
		    {key: key,
		     x: x,
		     y: y,
		     name: pieceInfo.name,
		     value: pieceInfo.piece,
		     isIndicated: false
		    });
	    }
	}
	this.state = {
	    history: [{board: board}],
	    pieceSelected: null
	}
    }

    handleClick(x, y) {
	//alert(x + ":" + y);
	const history = this.state.history;
	const current = history[history.length - 1];
	const board = current.board.splice(0);
	//board[x-1][y-1].value = '♛';

	for (let x = 1; x <= BOARD_WIDTH; x++) {
	    for (let y = 1; y <= BOARD_HEIGHT; y++) {
		board[x-1][y-1].isIndicated = false;
	    }
	}
	let square = board[x-1][y-1];
	// alert(x + ':' + y + ', ' + square.name);

	/* messing around with showing possible moves
	if (square.name == 'pawn') {
	    if (y == 2) {
		board[x-1][y].isIndicated = true;
		board[x-1][y+1].isIndicated = true;
	    } else {
		board[x-1][y-2].isIndicated = true;
		board[x-1][y-3].isIndicated = true;
	    }
	} else if (square.name == 'knight') {
	    if (y == 1) {
		board[x-2][y+1].isIndicated = true
		board[x][y+1].isIndicated = true
	    } else {
		board[x-2][y-3].isIndicated = true
		board[x][y-3].isIndicated = true
	    }
	}
	*/


	if (square.value && !this.state.pieceSelected) {
	    square.isIndicated = true;
	    this.setState({pieceSelected: square});
	} else if (this.state.pieceSelected) {
	    square.value = this.state.pieceSelected.value;
	    this.state.pieceSelected.value = null;
	    this.setState({pieceSelected: null});
	    // To Do. adjust board config
	}

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
	    isIndicated={square_rec.isIndicated}
	    onClick={() => this.handleClick(x, y)}
		/>)
    }

    render() {
	let rows = []
	let value = null;
	let isIndicated = null;

	const history = this.state.history;
	const current = history[history.length-1];
	for (let y = BOARD_HEIGHT; y > 0; y--) {
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
	const dotClassName = this.props.isIndicated ? 'dot active' : 'dot'
	// const key = this.props.x + ':' + this.props.y;
	return (
		<div
		   className='square' // square-indicator'
		   onClick={this.props.onClick}
		>
		   {this.props.value}
		   <span className={dotClassName} />
		</div>);
    }
}

function getPiece(x, y) {

    let name = null;
    let piece = null;
    if ([1, 8].includes(y)) {
	if      ([1,8].includes(x)) { piece = (y == 1) ? '♖' : '♜';
				      name = 'rook' }
	else if ([2,7].includes(x)) { piece = (y == 1) ? '♘' : '♞';
				      name = 'knight' }
	else if ([3,6].includes(x)) { piece = (y == 1) ? '♗' : '♝';
				      name = 'bishop' }
	else if (x == 4)            { piece = (y == 1) ? '♕' : '♛';
				      name = 'queen' }
	else if (x == 5)            { piece = (y == 1) ? '♔' : '♚';
				      name = 'king' }
    } else if ([2, 7].includes(y))  { piece = (y == 2) ? '♙' : '♟';
				      name='pawn' }

    return {name: name, piece: piece}
}

export default Game;
