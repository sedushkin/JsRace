const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');

car.classList.add('car');

console.dir('start');

start.addEventListener('click', startGame);
document.addEventListener('keydown',startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3
    
};

function startGame(){
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){
    console.log('Play Game!')
    if (setting.start) {
        if (keys.ArrowLeft && setting.x>0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x<(gameArea.offsetWidth - 50)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y<(gameArea.offsetHight - 50)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y>0) {
            setting.y -= setting.speed;
        }



        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
         requestAnimationFrame(playGame);
    } 
}

function startRun(event){
    if (event.key !== 'F5' && event.key !== 'F12') {
        event.preventDefault();
        keys[event.key] = true;
    }
    
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}
