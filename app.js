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

    // 勝利判定
    winCheck();
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
}

btns.forEach((button, index) => {
  button.addEventListener('click', () => {
    handleButtonClick(button, index);
  });
});

restart_btn.addEventListener('click', handleRestart);

// 勝利判定
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

function winCheck(){
  for (let i of winningPattern){
    let [ele1, ele2, ele3] = [
      btns[i[0]].innerText,
      btns[i[1]].innerText,
      btns[i[2]].innerText,
    ];

    if (ele1 != "" && ele2 != "" && ele3 != ""){
      if (ele1 == ele2 && ele2 == ele3){
        return ele1;
      }
    }
  }

}
