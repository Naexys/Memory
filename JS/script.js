const dimension = 150;
const imgStart = Math.floor(Math.random() * 100 + 1);
const board = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;

images = [];
for (let i = 0; i < 8; i++) {
    images.push(`https://picsum.photos/seed/memory${imgStart + i}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(array) {
    for (let i = 0; i < array.length - 2; i++) {
        let j = Math.floor(Math.random() * array.length);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkMatch() {
    if (firstCard.dataset.value == secondCard.dataset.value) {
        firstCard.classList.add("matched")
        secondCard.classList.add("matched")
        matchedCount++;
        firstCard = null;
        secondCard = null;
        lockBoard = false;
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
        firstCard = card;
        firstCard.innerHTML = `<img src=${firstCard.dataset.value} />`;
        moves++;
    }

    else if (secondCard == null) {
        secondCard = card;
        secondCard.innerHTML = `<img src=${secondCard.dataset.value} />`;
        moves++;
        lockBoard = true;
        checkMatch();
    }


}

function initGame() {
    shuffle(cards);
    cards.forEach(imgUrl => {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.value = imgUrl;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.addEventListener('click', () => handleCardClick(card));
        board.appendChild(card);
    })
}

initGame();