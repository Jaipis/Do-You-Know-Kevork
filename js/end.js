const PlayBtn = document.getElementById('replay'); 
const HomeBtn = document.getElementById('home');

let SuccessQuote = [
    'Bravo Shaklo Btaarefne Mnih',
]

let FailedQuote = [
    'Ensa Ma Tjarrib Tsamme Halak Btaarefne',
]

let NosNos = [
    'Yaane Shaklo Btaarefne Shwy Zghire',
]




HomeBtn.addEventListener('click', GoHome = () =>{
    window.location.assign('../html/chapitres.html')
} )



// Score Section 
const FinalScore = localStorage.getItem("FinalScore");
const FinalScoreH2 = document.getElementById('score');

FinalScoreH2.innerText = FinalScore;

// QUOTE SECTION 

const Quote = document.getElementById('funny');
const RandomFailed = Math.floor(Math.random() * FailedQuote.length);
const Failed = FailedQuote[RandomFailed];
const RandomSuccess = Math.floor(Math.random() * SuccessQuote.length);
const Success = SuccessQuote[RandomSuccess];
const RandomNosNos = Math.floor(Math.random() * NosNos.length);
const Nos = NosNos[RandomNosNos];

const Max = localStorage.getItem('Max-questions');
const MaxScore = 455; 

if(FinalScore < MaxScore * 0.6){
    Quote.innerText = Failed;
}
    else if(FinalScore < MaxScore * 0.9){
        Quote.innerText = Nos;
    }
    else{
        Quote.innerText = Success;;
    };

// Play Again
const PlayAgainBtn = document.getElementById('replay');

PlayAgainBtn.addEventListener('click', ()=>{
    window.location.assign('../html/game.html')
})