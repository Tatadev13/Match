const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

playerLives.textContent = playerLives;

const getData = () => [
{
imgSrc :'./Pictures/Tennis.jpg',    
name : 'tennis'
},
{
 name : 'football',
imgSrc:'./Pictures/football.jpg'
},
{
name : 'soccer',
imgSrc:'./Pictures/soccer.jpg'
},
{
name : 'softball',
imgSrc:'./Pictures/Softball.jpg'
},
{
name : 'tennis',
imgSrc:'./Pictures/Tennis.jpg'
},
{
name : 'baseball',
imgSrc:'./Pictures/baseball.webp'
},
{
name : 'baseball',
imgSrc:'./Pictures/baseball.webp'
},
{
name : 'football',
imgSrc:'./Pictures/football.jpg'
},
{
name : 'soccer',
imgSrc:'./Pictures/soccer.jpg'
},
{
name : 'softball',
imgSrc:'./Pictures/Softball.jpg'
},      
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    console.log(cardData);
    return cardData;
};

const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';   
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
     
};
//Check cards
const checkCards = (e) => {
    console.log(e);
    const clickCard = e.target;
    clickCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    //logic
    if(flippedCards.length===2) {
        if(
        flippedCards[0].getAttribute('name') === 
        flippedCards[1].getAttribute('name')
    ) {
        console.log('match');
        flippedCards.forEach(card =>{
            card.classList.remove('flipped');
            card.style.pointerEvents = 'none';
        });
    }else{
        console.log('wrong');
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
           setTimeout(() => card.classList.remove('toggleCard'),1000);
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if(playerLives === 0) {
            restart('Try again!');
        }
    }
}
if(toggleCard.length === 10){
    restart('You Win!');
}
};

const restart = (text) =>{
    let cardData = randomize();
    let faces = document.querySelectorAll('face');
    let cards = document.querySelectorAll('.card');
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        setTimeout(() => {
        cards[index].style.pointerEvents = 'all';
        faces[index].src =item.imgSrc;
        cards[index].setAttribute('name', item.name);
        section.style.pointerEvents = 'all';
    }, 1000);

    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text),100);

};

cardGenerator();