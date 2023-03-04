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
  solo_btn: document.getElementById('solo'),
  cpu_play_btn: document.getElementById('cpu-play'),
};

/*
  -------------------------------------------------------
  Functions
  -------------------------------------------------------
*/

function handleCPUMove() {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableMoves.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const cpuMove = availableMoves[randomIndex];
  const cpuButton = config.btns[cpuMove];

  setTimeout(function () {
    handleButtonClick(cpuButton, cpuMove);
  }, 600);
}

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

    button.removeEventListener('mouseover', function() {
      button.textContent = player;
      button.style.color = 'gray';
    });

    button.removeEventListener('mouseleave', function() {
      button.textContent = '';
      button.style.color = 'white';
    });

    button.disabled = true;

    // CPUのターン
    if (player === cpu && !isSoloPlay) {
      handleCPUMove();
    }
  }
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
    return;
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
    <h1 class = "monaco-green text-center fw-bold mb-4">${message}</h1>
    <div class="d-flex justify-content-center">
        <button class="btn btn-success btn-lg text-light mx-3" onclick = "resetGame()">Restart</button>
        <button class = "btn btn-success btn-lg text-light mx-3" onclick = "goMenuPage(config.result)">Menu Page</button>
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

  button.addEventListener('mouseover', function() {
    button.textContent = player;
    button.style.color = 'gray';
  });

  button.addEventListener('mouseleave', function() {
    button.textContent = '';
    button.style.color = 'white';
  });
});

config.restart.addEventListener('click', resetGame);
config.goMenu.addEventListener('click', function() {
  goMenuPage(config.main);
});

// Solo Playボタンにイベントリスナーを追加
config.solo_btn.addEventListener('click', function () {
  isSoloPlay = true;
  switchPage(config.menu, config.main);
});

// CPU Playボタンにイベントリスナーを追加
config.cpu_play_btn.addEventListener('click', function () {
  isSoloPlay = false;
  switchPage(config.menu, config.main);
});
