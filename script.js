// Referenciando as imagens
const baseImages = [
  { name: 'pikachu', file: 'pikachu.jpg' },
  { name: 'charmander', file: 'charmander.jpg' },
  { name: 'squirtle', file: 'squirtle.jpg' },
  { name: 'bulbassaur', file: 'bulbassaur.jpg' }
];

// Constrói os pares
let cardsArray = [];
baseImages.forEach(img => {

  cardsArray.push({ name: img.name, img: `imagens/${img.file}` });
  cardsArray.push({ name: img.name, img: `imagens/${img.file}` });
});

cardsArray.sort(() => 0.5 - Math.random());

// Referencias
const gameBoard = document.querySelector('#gameboard');
const scoreSpan = document.querySelector('#score');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

// Cria os elementos
cardsArray.forEach(cardData => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = cardData.name;

  // Parte de traz das cartas
  const backFace = document.createElement('div');
  backFace.classList.add('card-face', 'back');


  // Parte da frente das cartas
  const frontFace = document.createElement('div');
  frontFace.classList.add('card-face', 'front');
  const frontImg = document.createElement('img');
  frontImg.src = cardData.img;
  frontImg.alt = cardData.name;
  frontFace.appendChild(frontImg);


  card.appendChild(backFace);
  card.appendChild(frontFace);

  // adiciona o evento de click
  card.addEventListener('click', onCardClick);

  gameBoard.appendChild(card);
});


function onCardClick(e) {
  const clicked = e.currentTarget;
  if (lockBoard) return;
  if (clicked === firstCard) return;
  if (clicked.classList.contains('matched')) return;


  clicked.classList.add('flipped');

  if (!firstCard) {
    firstCard = clicked;
    return;
  }

  secondCard = clicked;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  if (!firstCard || !secondCard) return;

  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  // remove eventos de clique
  firstCard.removeEventListener('click', onCardClick);
  secondCard.removeEventListener('click', onCardClick);

  // pontuação
  score += 10;
  scoreSpan.textContent = score;

  resetTurn();
}


function handleMismatch() {
  //aguarda e vira as cartas novamente
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetTurn();
  }, 900);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
