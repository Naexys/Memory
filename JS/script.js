const dimension = 150;
const imgStart = Math.floor(Math.random()* 100 + 1);

const board = document.getElementById("game-board");

images = [];
for (let i  = 0; i < 8; i++) {
    images.push(`https://picsum.photos/seed/${dimension}?random=${imgStart+i}`);
}

let cards = [...images, ...images];

function shuffle(array) {
    for (let i = 0; i < array.length - 2; i++){
        let j = Math.floor(Math.random() * array.length);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame(){
    shuffle(cards);
    cards.forEach(imgUrl => {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.value = imgUrl;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        board.appendChild(card);
    })
}

initGame();