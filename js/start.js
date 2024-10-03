const MeBtn = document.getElementById('me-btn');
const Container = document.getElementById('rules');
const BackBtn = document.getElementById('back-btn');
const NextBtn = document.getElementById('next');
const H1 = document.getElementById('H1');
const CHAP = document.getElementById('chap');

MeBtn.onclick = () =>{
    Container.classList.add('active');
    H1.classList.add('active')
    CHAP.classList.add('active')
}

BackBtn.onclick = () =>{
    Container.classList.remove('active')
    H1.classList.remove('active')
    CHAP.classList.remove('active')
}

NextBtn.onclick = () =>{
    window.location.href = 'game.html'
}