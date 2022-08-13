const buttonColors = ["red", "green", "blue", "yellow"]
let gamePattern = []
const userClickedPattern = [] 
let level = 0
let started = false
let wait = false

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed")
    setTimeout(() => {
        $(currentColor).removeClass("pressed")
    }, 100)
}
function nextSequence() {
    userClickedPattern.splice(0, userClickedPattern.length)
    level++;

    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    const button = $(`#${randomChosenColor}`)
    button.fadeIn(100).fadeOut(100).fadeIn(100)
    
    playSound(randomChosenColor)

    $("#level-title").html(`Level ${level}`)
}

$("[type='button']").click(function() {
    if (wait)
        return;

    const userChosenColor = this.id
    userClickedPattern.push(userChosenColor)

    animatePress(`#${userChosenColor}`)
    playSound(userChosenColor)


    if (userClickedPattern.length === gamePattern.length)
        checkAnswer()
})

$(function() {
    $(this).keypress(function(e) {
        if (started) return;
        const code = e.keyCode
        if (code === 97 || code === 65) {
            nextSequence()
            started = true
        }
    })
})

function checkAnswer() {
    for (let i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            playSound("wrong")
            $("body").addClass("game-over")
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 200)
            $("#level-title").html("Game Over, press any key to restart.")
            currentLevel = 0
            startOver()
            return;
        }         
    }

    wait = true
    setTimeout(() => {
        nextSequence()
        wait = false;
    }, 1000)

}

function startOver() {
    started = false
    gamePattern = []
    level = 0
}
