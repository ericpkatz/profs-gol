class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    const rows = [];
    for(let i = 0; i < this.height; i++){
      const row = [];
      rows.push(row);
      for(let j = 0; j < this.width; j++){
        row.push(0);
      }
    }
    return rows;
  }


  /**
   * Return the amount of living neighbors around a given coordinate.
   */
  clear(){
    this.board = this.makeBoard(); 
  }

  getCell(row, col){
    if(!this.board[row]){
      return;
    }
    return this.board[row][col];
  }

  livingNeighbors(row, col) {
    const neighbors = [
      [ row -1 , col - 1],
      [ row -1 , col ],
      [ row -1 , col + 1],
      [ row, col - 1],
      [ row, col + 1],
      [ row + 1, col - 1],
      [ row + 1, col ],
      [ row + 1, col + 1]
    ];
    return neighbors.reduce((memo, neighbor)=> {
      if(this.getCell(neighbor[0], neighbor[1])*1 === 1){
        memo++;
      }
      return memo;
    }, 0);
  }


  /**
   * Given the present board, apply the rules to generate a new board
   */

  forEachCell(fn){
    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width; j++){
        fn(i, j);
      }
    }
  }
  randomize(){
    this.forEachCell((row, col)=> {
      this.board[row][col] = Math.round(Math.random());
    });
  }
  
  tick() {
    const newBoard = this.makeBoard();
    this.forEachCell((row, col)=> {
      const alive = this.board[row][col] === 1;
      const dead = !alive;
      if(dead && this.livingNeighbors(row, col) === 3){
        newBoard[row][col] = 1;
      }
      if(alive && (this.livingNeighbors(row, col) === 2 || this.livingNeighbors(row, col) === 3)){
        newBoard[row][col] = 1;
      }
    });
    this.board = newBoard;
  }
}

if(typeof module !== 'undefined'){
  module.exports = GameOfLife;
}
