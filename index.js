var n = null;

// sample problem if needed for dev purposes
var problem = [
	[n, n, n, n, n, 8, 9, 1, n],
	[n, n, 1, n, n, n, n, n, 3],
	[9, n, n, n, 2, 7, n, n, 5],
	[3, n, 2, 5, 6, n, n, n, n],
	[5, n, n, n, n, n, n, n, 8],
	[n, n, n, n, 8, 3, 5, n, 4],
	[8, n, n, 7, 4, n, n, n, 2],
	[6, n, n, n, n, n, 1, n, n],
	[n, 5, 7, 3, n, n, n, n, n],
];

// impossible to solve noard if needed for dev purposes
var impossibleBoard = [
	[1, 2, 3, 4, 5, 6, 7, 8, n],
	[n, n, n, n, n, n, n, n, 2],
	[n, n, n, n, n, n, n, n, 3],
	[n, n, n, n, n, n, n, n, 4],
	[n, n, n, n, n, n, n, n, 5],
	[n, n, n, n, n, n, n, n, 6],
	[n, n, n, n, n, n, n, n, 7],
	[n, n, n, n, n, n, n, n, 8],
	[n, n, n, n, n, n, n, n, 9],
];

function solve(board) {
	// solves the given sudoku board
	// assumes the given sudoku board is valid
	// returns false if board is impossible to solve
	if (solved(board)) {
		return board;
	} else {
		const possibilities = nextBoards(board);
		const validBoards = keepOnlyValid(possibilities);
		return searchForSolution(validBoards);
	}
}

function searchForSolution(boards) {
	// finds a valid solution to the sudoku problem given a set of boards
	if (boards.length < 1) {
		return false;
	} else {
		// backtracking search for solution
		var first = boards.shift();
		const tryPath = solve(first);
		if (tryPath != false) {
			return tryPath;
		} else {
			return searchForSolution(boards);
		}
	}
}

function solved(board) {
	// returns if board is empty or not
	// run thru each row and column
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			// check if it is empty
			if (board[i][j] == null) {
				return false;
			}
		}
	}
	return true;
}

function nextBoards(board) {
	// finds the first emply square and generates 9 different boards filling in that square with numbers 1-9
	var res = [];
	const firstEmpty = findEmptySquare(board);
	if (firstEmpty != undefined) {
		const y = firstEmpty[0];
		const x = firstEmpty[1];
		for (var i = 1; i <= 9; i++) {
			var newBoard = [...board];
			var row = [...newBoard[y]];
			row[x] = i;
			newBoard[y] = row;
			res.push(newBoard);
		}
	}
	return res;
}

function findEmptySquare(board) {
	// (get the i j coordinates for the first empty square)
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] == null) {
				return [i, j];
			}
		}
	}
}

function keepOnlyValid(boards) {
	// filters out all of the invalid boards from the list
	var res = [];
	for (var i = 0; i < boards.length; i++) {
		if (validBoard(boards[i])) {
			res.push(boards[i]);
		}
	}
	return res;
}

function validBoard(board) {
	// checks to see if given board is valid
	return rowsGood(board) && columnsGood(board) && boxesGood(board);
}

function rowsGood(board) {
	// makes sure there are no repeating numbers for each row
	for (var i = 0; i < 9; i++) {
		var cur = [];
		for (var j = 0; j < 9; j++) {
			if (cur.includes(board[i][j])) {
				return false;
			} else if (board[i][j] != null) {
				cur.push(board[i][j]);
			}
		}
	}
	return true;
}

function columnsGood(board) {
	// makes sure there are no repeating numbers for each column
	for (var i = 0; i < 9; i++) {
		var cur = [];
		for (var j = 0; j < 9; j++) {
			if (cur.includes(board[j][i])) {
				return false;
			} else if (board[j][i] != null) {
				cur.push(board[j][i]);
			}
		}
	}
	return true;
}

function boxesGood(board) {
	// transform this everywhere to update res
	const boxCoordinates = [
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
		[2, 2],
	];

	// makes sure there are no repeating numbers for each box
	for (var y = 0; y < 9; y += 3) {
		for (var x = 0; x < 9; x += 3) {
			// each traversal should examine each box
			var cur = [];
			for (var i = 0; i < 9; i++) {
				var coordinates = [...boxCoordinates[i]];
				coordinates[0] += y;
				coordinates[1] += x;
				if (cur.includes(board[coordinates[0]][coordinates[1]])) {
					return false;
				} else if (board[coordinates[0]][coordinates[1]] != null) {
					cur.push(board[coordinates[0]][coordinates[1]]);
				}
			}
		}
	}
	return true;
}

$("#solve").click(function (e) {
	var enteredBoard = [
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
		[n, n, n, n, n, n, n, n, n],
	];
	var filledSpots = [];
	for (var i = 0; i < 81; i++) {
		$(`#${i + 1}`).prop("disabled", true);
		if ($(`#${i + 1}`).val() != "") {
			filledSpots.push(i + 1);
		}
		$(`#${i + 1}`).prop("disabled", false);
	}

	filledSpots.forEach(function (item, i) {
		var row = Math.floor(item / 9);
		var column = Math.floor(item % 9) - 1;
		if (item % 9 == 0) {
			column = 8;
			row = item / 9 - 1;
		}
		enteredBoard[row][column] = Number($(`#${item}`).val());
	});

	var solved = solve(enteredBoard);

	if (!solved) {
		alert("hey i can't solve that! there is a limit you know?");
	} else {
		for (var i = 1; i <= 81; i++) {
			var row = Math.floor(i / 9);
			var column = Math.floor(i % 9) - 1;
			if (i % 9 == 0) {
				column = 8;
				row = i / 9 - 1;
			}
			$(`#solution-${i}`).val(solved[row][column]);
		}
	}
});
