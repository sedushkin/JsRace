const MAX_ENEMY =2;

const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');

const audio = document.createElement('embed');
audio.src = 'audio.mp3';
audio.type = 'audio/mp3';
audio.style.cssText = 'position:absolute; top:-1000;';

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
    speed: 3,
    traffic:3
    
};
function getQuantityElementElements(heightElement){
   return document.documentElement.clientHeight / heightElement +1;
}

function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    
    for(let i=0; i< getQuantityElementElements(50); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100)+'px';
        line.y = i*100;
        gameArea.append(line);
    }

    for (let i=0; i< getQuantityElementElements(100 * setting.traffic); i++){
        const enemy = document.createElement('div');
        const randomEnemy = Math.floor(Math.random()* MAX_ENEMY)+1;
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) +'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./image/enemy${randomEnemy}.png) center / cover no-repeat`;
        gameArea.append(enemy);
    }
    
    setting.score = 0;
    setting.start = true;
    gameArea.append(car);
    gameArea.append(audio);
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){
    
    if (setting.start) {
        audio.play();
        setting.score += setting.speed;
        score.innerHTML = 'SCORE<br>' + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x>0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x<(gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y<(gameArea.offsetHight - car.offsetHeight)) {
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

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
       line.y += setting.speed;
       line.style.top = line.y + 'px';
       if (line.y >= document.documentElement.clientHeight) {
           line.y = -100;
       }
    })
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top<= enemyRect.bottom &&
             carRect.right >=enemyRect.left &&
             carRect.left<=enemyRect.right &&
             carRect.bottom >=enemyRect.top) {
            audio.stop();
            setting.start=false;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
        }

        item.y +=setting.speed/2;
        item.style.top = item.y +'px';
    
        if (item.y >=document.documentElement.clientHeight) {
        item.y = -100 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) +'px';
    }
    });

    
}