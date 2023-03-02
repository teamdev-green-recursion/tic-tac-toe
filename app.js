let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
const cpu = 'O';
// 勝利パターン
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
let hashmap = {};
let count = 0;

const btns = document.querySelectorAll('.square-btn');
const turn = document.querySelector('#turn');
const restart_btn = document.getElementById('restart');
const main = document.getElementById('main');
const result = document.getElementById('result');

/*
  -------------------------------------------------------
  Functions
  -------------------------------------------------------
*/

// プレイヤーがボタンをクリックした時に呼び出される
function handleButtonClick(button, index) {
  if (board[index] === '') {
    board[index] = player;
    button.textContent = player;
    player = player === 'X' ? 'O' : 'X';

    // プレイヤーのターン表示切り替え
    turn.textContent = `${player}'s turn`;

    // 勝利/引き分け判定
    drawCheck();
    winCheck();

    // プレイヤーとCPUが同じ手を打った場合に、次の手を計算する
    if (player === cpu) {
      const availableMoves = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          availableMoves.push(i);
        }
      }
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const cpuMove = availableMoves[randomIndex];
      const cpuButton = btns[cpuMove];
      handleButtonClick(cpuButton, cpuMove);
    }
  }
}

// プレイヤーがRestartボタンを押した時に呼び出される
// 全てのボタンのテキスト、ボードを表す配列 board、ターンを示すplayerを初期化
function handleRestart() {
  btns.forEach(function (ele) {
    ele.textContent = '';
    ele.disabled = false;
  });

  board = ['', '', '', '', '', '', '', '', ''];
  player = 'X';
  turn.textContent = `${player}'s turn`;
  hideResult();
}

function disableButtons() {
  btns.forEach(function (ele) {
    ele.disabled = true;
  });
}

function winCheck() {
  for (let i of winningPattern) {
    let [ele1, ele2, ele3] = [btns[i[0]].innerText, btns[i[1]].innerText, btns[i[2]].innerText];

    if (ele1 != '' && ele2 != '' && ele3 != '') {
      if (ele1 == ele2 && ele2 == ele3) {
        message = `${ele1} win!`;
        turn.textContent = message;
        insertPage(message);
        disableButtons();
      }
    }
  }
}

function drawCheck() {
  count = 0;
  for (let i of winningPattern) {
    hashmap = { X: 0, O: 0 };
    for (let j = 0; j < 3; j++) {
      if (btns[i[j]].innerText == 'X') hashmap['X'] += 1;
      if (btns[i[j]].innerText == 'O') hashmap['O'] += 1;
    }

    if (hashmap['X'] > 0 && hashmap['O'] > 0) {
      count += 1;
      if (count == 8) {
        message = 'Draw!';
        turn.textContent = message;
        insertPage(message);
      }
    }
  }
}

function insertPage(message) {
  result.innerHTML = `
    <h1 class = "title text-center fw-bold mb-4">${message}</h1>
    <div class="d-flex justify-content-center">
        <button id="restart" class="btn btn-success btn-lg text-light" onclick = "handleRestart()">Restart</button>
    </div>
  `;

  showResult();
}

function showResult() {
  result.classList.remove('d-none');
  main.classList.add('d-none');
}

function hideResult() {
  result.classList.add('d-none');
  main.classList.remove('d-none');
}

/*
  --------------------------------------------------------
  イベントの追加
  --------------------------------------------------------
*/

btns.forEach((button, index) => {
  button.addEventListener('click', () => {
    handleButtonClick(button, index);
  });
});

restart_btn.addEventListener('click', handleRestart);
