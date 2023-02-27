const board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';

const btns = document.querySelectorAll('.square-btn');

// プレイヤーがボタンをクリックした場合呼び出される
function handleButtonClick(button, index) {
  if (board[index] === '') {
    board[index] = player;
    button.textContent = player;
    player = player === 'X' ? 'O' : 'X';
  }
}

btns.forEach((button, index) => {
  button.addEventListener('click', () => {
    handleButtonClick(button, index);
  });
});
