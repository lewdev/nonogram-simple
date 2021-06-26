/**
 * TODO:
 *   * randomly generate puzzles
 *   * have static puzzles
 *   * save each game and earn points per game
 */

const nonogram = (() => {
  const grid = document.getElementById("grid");
  const playerInfo = document.getElementById("playerInfo");
  const pic =
` 1 1 
  1  
1   1
 111 `;
  let picGrid = [];
  let player = {
    lives: 3,
    blackOrWhite: "Black",
    currentGrid: null,
  };
  const getHints = arr => {
    const selectCounts = [];
    let count = 0;
    arr.forEach((block, i) => {
      if (block === "1") count++;
      else {
        if (count !== 0) {
          selectCounts.push(count);
          count = 0;
        }
      }
      if (i === arr.length - 1 && count !== 0) {
        selectCounts.push(count);
      }
    });
    if (selectCounts.length === 0) return 0;
    return selectCounts;
  };
  const newGame = () => {
    player.currentGrid = [];
    const picArr = pic.split("\n");
    picGrid = picArr.map(a => a.split(""));
    player.currentGrid = picGrid.map(a => a.map(b => ""));
  };
  const init = () => {
    newGame();
    render();
  };
  const render = () => {
    const colHints = [];
    for (let i = 0; i < picGrid[0].length; i++) {
      colHints.push(getHints(picGrid.map(row => row[i])));
    }
    const headerHints = `<tr><td></td>${colHints.map(colHint => `<td class="text-center">${colHint}</td>`).join("")}</tr>`
    grid.innerHTML = headerHints + player.currentGrid.map((row, rowIndex) => {
      const rowHint = getHints(picGrid[rowIndex]);
      return `<tr>
        <td class="text-center">${rowHint}</td>
        ${row.map((a, colIndex) => {
          console.log(a);
          const boxClass = a === "1" ? 'Black' : a === " " ? "White" : 'notSelected';
          return `<td class="${boxClass}" onclick="nonogram.select(${rowIndex}, ${colIndex})"></td>`;
        }).join("")}</tr>`;
    }).join("");
    
    //playerInfo
    playerInfo.innerHTML = `${player.lives} lives`;
  };
  window.onload = init;
  return {
    player,
    newGame,
    select: (row, col) => {
      if (player.blackOrWhite === "Black" && picGrid[row][col] === '1') {
        player.currentGrid[row][col] = "1";
      }
      else if (player.blackOrWhite === "White" && picGrid[row][col] === ' ') {
        player.currentGrid[row][col] = " ";
      }
      else {
        player.lives--;
        if (player.lives <= 0) {
          alert(`Game Over!`);
          newGame();
        }
        else alert(`Wrong! ${row}, ${col} ${player.blackOrWhite}`);
      }
      console.log(player.currentGrid);
      render();
    },
    toggle: elem => {
      player.blackOrWhite = player.blackOrWhite === "Black" ? "White" : "Black";
      elem.innerHTML = player.blackOrWhite;
    },
  };
})();