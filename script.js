document.addEventListener('DOMContentLoaded', function() {
    const singlePlayerButton = document.getElementById('single-player');
    const multiPlayerButton = document.getElementById('multi-player');
    const startButtons = document.getElementById('buttons');
    const gameTable = document.getElementById('gametable');
    const statusHeader = document.getElementById('status-header');
    const title = document.getElementById('title');
    const buttons = gameTable.getElementsByTagName('button');

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    let currentPlayer = 'X'; 
    let isSinglePlayerMode = false;
    let isActive = false;

    singlePlayerButton.addEventListener('click', function() {
        title.style.fontSize = '50px';
        statusHeader.style.fontSize = '40px';
        
        isSinglePlayerMode = true;
        isActive = true;
        startGame();
    });

    multiPlayerButton.addEventListener('click', function() {
        title.style.fontSize = '50px';
        statusHeader.style.fontSize = '40px';

        isSinglePlayerMode = false;
        isActive = true;
        startGame();
    });

    function startGame() {
        startButtons.style.display = 'none';
        gameTable.style.display = 'block';
        updateStatusHeader(); 

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                if (this.textContent === '') { 
                    this.textContent = currentPlayer; 
                    checkWinCondition();
                    switchPlayer(); 
                    updateStatusHeader(); 
                    if (isSinglePlayerMode && currentPlayer === 'O') { 
                        setTimeout(function(){
                            computerMove();
                        }, 1000);
                    }
                }
            });
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        setTimeout(function(){}, 1000)
    }

    function updateStatusHeader() {
        if(isActive)
        {   
            statusHeader.textContent = `${currentPlayer}'s Turn`;
            statusHeader.style.color = currentPlayer === 'X' ? 'darkorange' : 'darkmagenta';
        }
    }

    function computerMove() {
        if(isActive)
        {
            const emptyButtons = [];
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].textContent === '') {
                    emptyButtons.push(buttons[i]);
                }
            }
            const randomIndex = Math.floor(Math.random() * emptyButtons.length);
            emptyButtons[randomIndex].innerHTML = 'O';
            checkWinCondition(); 
            switchPlayer(); 
            updateStatusHeader();
        }
    }

function checkWinCondition() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (buttons[a].textContent !== '' && 
            buttons[a].textContent === buttons[b].textContent && 
            buttons[a].textContent === buttons[c].textContent) {
            endGame(`${currentPlayer} Wins!`);
            const flickerInterval = setInterval(function(){
                buttons[a].style.color = buttons[a].style.color === 'crimson' ? 'white' : 'crimson';
                buttons[b].style.color = buttons[b].style.color === 'crimson' ? 'white' : 'crimson';
                buttons[c].style.color = buttons[c].style.color === 'crimson' ? 'white' : 'crimson';
            }, 70); 

            setTimeout(function() {
                clearInterval(flickerInterval);
            }, 100000);
            return;
        }
    }
    let isTie = true;
    for (const button of buttons) {
        if (button.textContent === '') {
            isTie = false;
            break;
        }
    }
    if (isTie) {
        endGame("It's a Tie!");
    }
}

    
    function endGame(message) {
        isActive = false;
        console.log("Game ended with message: " + message);
        statusHeader.textContent = message;
        statusHeader.style.color = 'crimson';
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }   
    
});
