const cards = document.querySelectorAll('.memory-card')
const title = document.querySelector('.game-title');

let hasFliped = false;
let firstCard, secondCard;
let lockBoard = false;
let count = 0;
let wins = 0;

cards.forEach(card => card.addEventListener('click', flipCard,))


function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if (!hasFliped) {
        firstCard = this;
        hasFliped = true;

        return
    }

    secondCard = this;

    checkPairs();
    ResetAll()
}

function checkPairs() {
    let pair = firstCard.dataset.framework === secondCard.dataset.framework
    pair ? SimilarCards() : noSimilarCards()
}

function SimilarCards() {

    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    count = count + 1;
    console.log(wins)

    clearAll()
}

function noSimilarCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        clearAll()
    }, 1000);
}

function clearAll() {
    [firstCard, secondCard] = [null, null];
    [hasFliped, lockBoard] = [false, false];
}

function RandomOrders() {
    cards.forEach(item => {
        let random = Math.floor(Math.random() * 12);
        item.style.order = random;
    })
}

function ResetAll() {

    if (count === 6) {
        wins++
        title.textContent = `Wins: ${wins}`
        count = 0;
        cards.forEach(card => {
            card.addEventListener('click', flipCard)
            card.classList.remove('flip')



        })
    } else return

}






