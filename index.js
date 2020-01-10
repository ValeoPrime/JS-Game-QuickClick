var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var score = 0

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)

function startGame () {
    console.log('шалом, епта');
    $start.classList.add('hide')
    $game.style.backgroundColor = '#fff'

    renderBox()
}

function handleBoxClick(event) {
    if (event.target.dataset.catch) {
        renderBox ()
        score++
    }
                
}

function renderBox () {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom (20, 80)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    console.log(gameSize.height);
    
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop)  + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-catch', 'true') // добавили дата атрибут для отслеживания кликов
    
    $game.insertAdjacentElement('afterbegin', box)  //вставляем box  внутрь $game
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min) 

}