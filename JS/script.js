const dimension = 150;
const imgStart = Math.floor(Math.random() * 100 + 1);
const movesCpt = document.getElementById("moves");
const board = document.getElementById("game-board");
const timerDisplay = document.getElementById("timerDisplay");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let secondes = 0;
let timerInterval = null;
let isFirst = true;
let cards = null;

restart.addEventListener('click', () => {
    initGame();
});

function checkMatch() {
    if (firstCard.dataset.value == secondCard.dataset.value) {
        firstCard.classList.add("matched")
        secondCard.classList.add("matched")
        matchedCount += 2;
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        checkVictory();
    }
    else {
        setTimeout(() => {
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, "800");
    }
}

function handleCardClick(card) {
    if ((firstCard == card) || (secondCard == card) || (card.classList.contains("matched")) || (lockBoard == true)) {
        return;
    }

    if (firstCard == null) {
        if (isFirst) {
            startTimer();
            isFirst = false;
        }
        firstCard = card;
        firstCard.innerHTML = `<img src=${firstCard.dataset.value} class="card-img-top" alt="Carte 1"/>`;
        moves++;
        movesCpt.textContent = `${moves}`;
    }

    else if (secondCard == null) {
        secondCard = card;
        secondCard.innerHTML = `<img src=${secondCard.dataset.value} class="card-img-top" alt="Carte 2"/>`;
        moves++;
        movesCpt.textContent = `${moves}`;
        lockBoard = true;
        checkMatch();
    }
}

function initGame() {
    clearInterval(timerInterval);
    board.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedCount = 0;
    secondes = 0;
    isFirst = true;
    movesCpt.textContent = `${moves}`;
    timerDisplay.textContent = `00:00`;
    result.textContent = '';

    images = [];
    for (let i = 0; i < 8; i++) {
        images.push(`https://picsum.photos/seed/memory${imgStart + i}/${dimension}`);
    }

    cards = [...images, ...images];

    function shuffle(array) {
        for (let i = 0; i < array.length - 2; i++) {
            let j = Math.floor(Math.random() * array.length);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(cards);
    let i = 0;
    let row1 = document.createElement("div");
    row1.className = "row"
    let row2 = document.createElement("div");
    row2.className = "row"
    let row3 = document.createElement("div");
    row3.className = "row"
    let row4 = document.createElement("div");
    row4.className = "row"
    cards.forEach(imgUrl => {
        let col = document.createElement("div");
        col.className = "col p-0 m-1"
        let card = document.createElement("div");
        card.className = "card ratio ratio-1x1 border border-primary-subtle border-2 border-md-3";
        card.dataset.value = imgUrl;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.addEventListener('click', () => handleCardClick(card));
        col.appendChild(card);
        if (i < 4) {
            row1.appendChild(col);
        } else if (i < 8){
            row2.appendChild(col);
        } else if (i < 12){
            row3.appendChild(col);
        } else{
            row4.appendChild(col);
        }
        i++;
    })
    board.appendChild(row1);
    board.appendChild(row2);
    board.appendChild(row3);
    board.appendChild(row4);
}

function formatTime(sec) {
    let minutes = String(Math.floor(sec / 60)).padStart(2, '0');
    let secondes = String(sec % 60).padStart(2, '0');
    return `${minutes}:${secondes}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondes++;
        timerDisplay.textContent = `${formatTime(secondes)}`;
    }, 1000)
}

function checkVictory() {
    if (matchedCount == cards.length) {
        clearInterval(timerInterval);
        console.log(secondes);

        result.textContent = `Bravo !\nYou made it in ${moves} moves and ${formatTime(secondes)}`;
    }
}

initGame();