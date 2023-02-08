class TicTacToe{
    constructor(selector) {
        this.parentElement = document.querySelector(selector);
        this.playerList = ['x', 'o'];
        this.gameBoard = Array(9).fill('');
        this.currentPlayer = 0;
        this.init();
    }

    init() {
        this.buildGameUI();
    }

    getPlayerLabel() {
        return this.playerList[this.currentPlayer];
    }
    
    buildCardPlayer(playerName, PlayerNumber) {
        return `<div class="box-player">
        <p class="player-label ${playerName}">
            ${playerName}
        </p>
        <p class="player-name">
            Player ${PlayerNumber}
        </p>
        <p class="turn">Giliran Mu!</p>
    </div>`
    }

    buildGameUI() {
        //gameinfo
        const gameInfoEl = document.createElement('div');
        gameInfoEl.className = 'game-info';

        let playerCard = '';
        this.playerList.forEach((player, i) => {
            playerCard += this.buildCardPlayer(player, i+1);
        })

        gameInfoEl.innerHTML = playerCard;

        //button reset
        const gameControl = document.createElement('div');
        gameControl.className = 'game-control';

        const btnReset = document.createElement('button');
        btnReset.className = 'btn btn-reset';
        btnReset.innerText = 'Reset Game';
        btnReset.addEventListener('click', () => this.gameReset())

        gameControl.appendChild(btnReset);
        gameInfoEl.appendChild(gameControl);

        //gameplay
        const gamePlayEl = document.createElement('div');
        gamePlayEl.className = 'game-play';
        
        for (let i = 0; i < 9; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn-tic-tac-toe';
            btn.addEventListener('click', (e) => this.onCellClick(e, i))
            gamePlayEl.appendChild(btn);
        }
        
        // append to parent element
        this.parentElement.append(gameInfoEl, gamePlayEl);
        this.gamePlayEl = gamePlayEl;
    }

    onCellClick(e, i) {
        const btn = e.target;
        btn.innerText = this.getPlayerLabel();
        btn.classList.add(btn.innerText);
        btn.disabled = true;
        this.gameBoard[i] = btn.innerText;

        this.checkWinner();
        this.switchPlayer();
    }

    switchPlayer(currentPlayer = undefined) {
        if (currentPlayer != undefined) {
            this.currentPlayer = currentPlayer;
        } else {
            this.currentPlayer = this.currentPlayer == 1 ? 0 : 1;
        }

        const boxPlayer = document.querySelectorAll('.box-player');
    
        boxPlayer.forEach((box, i) => {
            if (this.currentPlayer == i) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }

    gameReset() {
        this.gameBoard = Array(9).fill('');
        this.switchPlayer(0);

        for (const btn of this.gamePlayEl.children) {
            btn.innerHTML = '';
            btn.classList.remove(...this.playerList);
            btn.disabled = false;
        }
        
    }

    checkWinner() {
        const winCondition = [
            //horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            //vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            //diagonal
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winCondition.length; i++) {
            const [a, b, c] = winCondition[i];

            if (
                this.getPlayerLabel() == this.gameBoard[a] &&
                this.getPlayerLabel() == this.gameBoard[b] &&
                this.getPlayerLabel() == this.gameBoard[c]
            ) {
                Swal.fire({
                    title: 'Good Job!',
                    text: `Selamat Player ${this.currentPlayer + 1} kamu memenangkan game ini!`,
                    showDenyButton: true,
                    confirmButtonText: 'Mantap!',
                    denyButtonText: `Ulangi Dong!`,
                    icon: 'success',
                  }).then((result) => {
                    //disable other button
                    for (const btn of this.gamePlayEl.children) {
                        btn.disabled = true;
                    }

                    if (result.isDenied) {
                        this.gameReset();
                        Swal.fire('Permainan sudah direset, Ayo main lagi!', '', 'info')
                    }
                  })
            }
        }  
    }
}