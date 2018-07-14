const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);


/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);


/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  tds.forEach( td => {
    const { row, col } = td.dataset;
    if(gol.board[row][col]){
      td.classList.add('alive');
    }
    else {
      td.classList.remove('alive');
    }
  })
}


/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  // TODO: Toggle clicked cell (event.target) and paint
});

document.getElementById("step_btn").addEventListener("click", event => {
  gol.tick();
  paint();
});

let interval;
document.getElementById("play_btn").addEventListener("click", event => {
  if(!interval){
    interval = setInterval(()=> {
      gol.tick();
      paint();
    }, 100);
  }
  else {
    clearInterval(interval);
    interval = 0;
  }
});

document.getElementById("random_btn").addEventListener("click", event => {
  gol.randomize();
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  gol.clear();
  paint();
});
