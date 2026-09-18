const dimension = 150
const imgStart = Math.floor((Math.random() + 1 )* 100)

images = []
for (let i  = 0; i < 8; i++) {
    images.push('https://picsum.photos/${dimension}?random=${imgStart+i}')
}

let cards = [...images, ...images]

function shuffle(array) {
    for (let i = 0; i < array.length - 2; i++){
        let j = Math.floor(Math.random() * array.length)
        [array[i], array[j] = array[j], array[i]]
    }
}