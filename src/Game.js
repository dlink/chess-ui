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
    
    render() {
	let rows = []
	for (let y = 1; y <= BOARD_HEIGHT; y++) {
	    let squares = []
	    for (let x = 1; x <= BOARD_WIDTH; x++) {
		squares.push(<Square />)
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
	return (<div className='square'>P</div>);
    }
}

export default Game;

