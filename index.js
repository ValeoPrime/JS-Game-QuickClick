const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')
const $gameSize = document.querySelector('#game-size')
const $targetSize = document.querySelector('#target-size')

//добавить кликов всего, кликов мимо квадрата цели

let score = 0
let isGameStarted = false


const show = $el => {
    $el.classList.remove('hide')
}

const hide = $el => {
    $el.classList.add('hide')
}

const startGame = () => {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    $gameSize.setAttribute('disabled', 'true')
    $targetSize.setAttribute('disabled', 'true')
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#fff'

    const interval = setInterval(function(){
        const time = parseFloat($time.textContent)

        if(time <= 0){
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1) //пока вермя не кончилось отнимаем по 100 мили секунд, фиксед обрезает отображение на первой цифре после запятой
        }
    }, 100)

    renderBox()
}

const endGame = () => {
    isGameStarted = false
    gameResult()
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    $gameTime.removeAttribute('disabled')
    $gameSize.removeAttribute('disabled')
    $targetSize.removeAttribute('disabled')
    // $resultHeader.innerHTML = 'Ваш результат:' + score
}

const setGameTime = () =>{
    let gameDuration = +$gameTime.value //+ впереди приводит значение к числу, либо метод parseInt
    $time.textContent = gameDuration.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

const setGameSize = () =>{
    if($gameSize.checked){
        $game.classList.add('bigGame')
    } else {
        $game.classList.remove('bigGame')
    }
}

const gameResult = () => {
    $result.textContent = score.toString()
}

const handleBoxClick = (event) => {
    if(!isGameStarted){
        return
    }
    if (event.target.dataset.catch) {
        score++
        renderBox ()
    }
}

const getRandom =  (min, max) => {
    return Math.floor(Math.random() * (max - min) + min) 
}

let randomSize = getRandom (30, 60)
const setTargetSize = () => {
    if($targetSize.checked){
        randomSize = getRandom (20, 20)
        console.log('Размер целей изменен');
    } else {
        randomSize = getRandom (30, 60)
        console.log('Размер целей по умолчанию');
    }
}

const generateColor = () => {
    return '#' + Math.floor(Math.random()*15625000).toString(16)
}

const renderBox =  () => {

    $game.innerHTML = ''
    const box = document.createElement('div')
    let boxSize = randomSize 
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = generateColor()
    if(box.style.backgroundColor == 'rgb(255, 255, 255)' || !box.style.backgroundColor){
        box.style.backgroundColor =  'rgb(0, 83, 138)'
    }
    box.style.top = getRandom(0, maxTop)  + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-catch', 'true') // добавили дата атрибут для отслеживания кликов
    
    $game.insertAdjacentElement('afterbegin', box)  //вставляем box  внутрь $game
}

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)
$gameSize.addEventListener('input', setGameSize)
$targetSize.addEventListener('input', setTargetSize)