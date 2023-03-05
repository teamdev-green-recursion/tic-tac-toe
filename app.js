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
let isSoloPlay = false;

const config = {
  btns: document.querySelectorAll('.square-btn'),
  turn: document.querySelector('#turn'),
  restart: document.getElementById('restart'),
  goMenu: document.getElementById('goMenu'),
  menu: document.getElementById('menu'),
  main: document.getElementById('main'),
  result: document.getElementById('result'),
  solo_play_btn: document.getElementById('solo'),
  cpu_play_btn: document.getElementById('cpu-play'),
};

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
    button.style.color = 'white';
    player = player === 'X' ? 'O' : 'X';

    // プレイヤーのターン表示切り替え
    config.turn.textContent = `${player}'s turn`;

    // 勝利/引き分け判定
    drawCheck();
    winCheck();

    button.removeEventListener('mouseover', function () {
      button.textContent = player;
      button.style.color = 'gray';
    });

    button.removeEventListener('mouseleave', function () {
      button.textContent = '';
      button.style.color = 'white';
    });

    // CPUのターン
    if (player === cpu && !isSoloPlay) {
      handleCPUMove();
    }

    button.disabled = true;
  }
}

// player と cpu の値が等しく、かつ isSoloPlay が false の場合に呼び出される
function handleCPUMove() {
  // 最初に、空いているマスを見つけるために、 availableMoves という空の配列を作成
  const availableMoves = [];

  // for ループを使って board の各要素をチェック
  // もし board[i] が空の文字列 '' であれば、インデックス i を availableMoves 配列に追加
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableMoves.push(i);
    }
  }

  // availableMoves 配列の中からランダムなインデックスを選択 CPUがランダムな場所にマークを置く
  const randomIndex = Math.floor(Math.random() * availableMoves.length);

  // 選択された場所 cpuMove の cpuButton というボタン要素を取得
  const cpuMove = availableMoves[randomIndex];
  const cpuButton = config.btns[cpuMove];

  setTimeout(function () {
    handleButtonClick(cpuButton, cpuMove);
  }, 600);
}

// プレイヤーがRestartボタンを押した時に呼び出される
// 全てのボタンのテキスト、ボードを表す配列 board、ターンを示すplayerを初期化
function resetGame() {
  config.btns.forEach(function (ele) {
    ele.textContent = '';
    ele.disabled = false;
  });

  board = ['', '', '', '', '', '', '', '', ''];
  player = 'X';
  config.turn.textContent = `${player}'s turn`;
  switchPage(config.result, config.main);
}

function disableButtons() {
  config.btns.forEach(function (ele) {
    ele.disabled = true;
  });
}

function winCheck() {
  for (let i of winningPattern) {
    let [ele1, ele2, ele3] = [config.btns[i[0]].innerText, config.btns[i[1]].innerText, config.btns[i[2]].innerText];

    if (ele1 != '' && ele2 != '' && ele3 != '') {
      if (ele1 == ele2 && ele2 == ele3) {
        message = `🎉🎉 ${ele1} wins! 🎉🎉`;
        disableButtons();

        setTimeout(function () {
          insertPage(message);
        }, 600);
        return;
      }
    }
  }
}

function drawCheck() {
  count = 0;
  for (let i of winningPattern) {
    hashmap = { X: 0, O: 0 };
    for (let j = 0; j < 3; j++) {
      if (config.btns[i[j]].innerText == 'X') hashmap['X'] += 1;
      if (config.btns[i[j]].innerText == 'O') hashmap['O'] += 1;
    }

    if (hashmap['X'] > 0 && hashmap['O'] > 0) {
      count += 1;
      if (count == 8) {
        message = 'Draw!';
        setTimeout(function () {
          insertPage(message);
        }, 600);
      }
    }
  }
}

function insertPage(message) {
  config.result.innerHTML = `
    <h1 class = "monaco-green result-text text-center fw-bold my-4">${message}</h1>
    <div class="d-flex justify-content-center my-2">
        <button class="mode-btn mx-3 btn-lg monaco-green" onclick = "resetGame()">Restart</button>
        <button class = "mode-btn mx-3 btn-lg monaco-green" onclick = "goMenuPage(config.result)">Menu Page</button>
    </div>
  `;

  switchPage(config.main, config.result);
}

function restartGame() {
  resetGame();
  switchPage(config.result, config.main);
}

function goMenuPage(hide) {
  resetGame();
  switchPage(hide, config.menu);
}

function switchPage(hide, show) {
  hide.classList.add('d-none');
  show.classList.remove('d-none');
}

/*
  --------------------------------------------------------
  イベントの追加
  --------------------------------------------------------
*/

config.btns.forEach(function (button, index) {
  button.addEventListener('click', function () {
    handleButtonClick(button, index);
  });

  button.addEventListener('mouseover', function () {
    button.textContent = player;
    button.style.color = 'gray';
  });

  button.addEventListener('mouseleave', function () {
    button.textContent = '';
    button.style.color = 'white';
  });
});

config.restart.addEventListener('click', resetGame);
config.goMenu.addEventListener('click', function () {
  goMenuPage(config.main);
});

config.solo_play_btn.addEventListener('click', function () {
  isSoloPlay = true;
  switchPage(config.menu, config.main);
});

config.cpu_play_btn.addEventListener('click', function () {
  isSoloPlay = false;
  switchPage(config.menu, config.main);
});
