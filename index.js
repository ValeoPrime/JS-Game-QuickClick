var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show ($el){
    $el.classList.remove('hide')
}

function hide ($el){
    $el.classList.add('hide')
}

function startGame () {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#fff'

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent)

        if(time <= 0){
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1) //пока вермя не кончилось отнимаем по 100 мили секунд, фиксед обрезает отображение на первой цифре после запятой
        }
    }, 100)

    renderBox()
}

function endGame(){
    isGameStarted = false
    gameResult()
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    $gameTime.removeAttribute('disabled')
    // $resultHeader.innerHTML = 'Ваш результат:' + score
}

function setGameTime(){
    var gameDuration = +$gameTime.value //+ впереди приводит значение к числу, либо метод parseInt
    $time.textContent = gameDuration.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}


function gameResult() {
    $result.textContent = score.toString()
}


function handleBoxClick(event) {
    if(!isGameStarted){
        return
    }
    if (event.target.dataset.catch) {
        score++
        renderBox ()
    }
                
}

function renderBox () {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom (20, 80)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = generateColor()
    box.style.top = getRandom(0, maxTop)  + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-catch', 'true') // добавили дата атрибут для отслеживания кликов
    
    $game.insertAdjacentElement('afterbegin', box)  //вставляем box  внутрь $game
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min) 
}

function generateColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
  }