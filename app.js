let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';

const btns = document.querySelectorAll('.square-btn');
const turn = document.querySelector('#turn');
const restart_btn = document.getElementById('restart');

// プレイヤーがボタンをクリックした場合呼び出される
function handleButtonClick(button, index) {
  if (board[index] === '') {
    board[index] = player;
    button.textContent = player;
    player = player === 'X' ? 'O' : 'X';

    // プレイヤーのターン表示切り替え
    turn.textContent = `${player}'s turn`;
  }
}

// プレイヤーがRestartボタンを押した時に呼び出される
// 全てのボタンのテキスト、ボードを表す配列 board、ターンを示すplayerを初期化
function handleRestart() {
  btns.forEach(function (ele) {
    ele.textContent = '';
  });

  board = ['', '', '', '', '', '', '', '', ''];
  player = 'X';
  turn.textContent = `${player}'s turn`;
}

btns.forEach((button, index) => {
  button.addEventListener('click', () => {
    handleButtonClick(button, index);
  });
});

restart_btn.addEventListener('click', handleRestart);
