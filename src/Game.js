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
	let value = null;
	let isIndicated = null;
	
	for (let y = 1; y <= BOARD_HEIGHT; y++) {
	    value = null;
	    // only put pieces on these rows
	    if ([1,2, 7, 8].includes(y)) {
		value = 'P';
	    }
	    let squares = []
	    for (let x = 1; x <= BOARD_WIDTH; x++) {
		isIndicated = false;
		if (x == 6 && y == 6) {
		    isIndicated = true;
		}
		squares.push(<Square value={value} isIndicated={isIndicated} />)
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
    constructor(props) {
	super(props);
	this.value = props.value;
	this.isIndicated = props.isIndicated
    }
    render() {
	const className = this.isIndicated ? 'dot active' : 'dot'
	
	return (
		<div className='square square-indicator'>
		{this.value}
	        <span className={className} />
	        </div>);
    }
}

export default Game;

