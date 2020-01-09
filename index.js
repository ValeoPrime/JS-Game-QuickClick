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

    box.style.height = box.style.width = '50px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = '20%'
    box.style.left = '45%'
    box.style.cursor = 'pointer'
    box.setAttribute('data-catch', 'true') // добавили дата атрибут для отслеживания кликов
    


    $game.insertAdjacentElement('afterbegin', box)  //вставляем box  внутрь $game
}