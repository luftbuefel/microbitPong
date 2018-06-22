let ballMovementTime = 0
let lastTimeCheckedBall = 0
let item: game.LedSprite = null
let player: game.LedSprite = null
let ball: game.LedSprite = null
let IStartTheGame = false
function createBall()  {
    if (!(player)) {
        createPlayer()
    }
    if (ball) {
        ball.set(LedSpriteProperty.X, 2)
        ball.set(LedSpriteProperty.X, 2)
    } else {
        ball = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y) + 1)
    }
    lastTimeCheckedBall = input.runningTime()
}
function createPlayer()  {
    if (player) {
        player.set(LedSpriteProperty.X, 2)
        player.set(LedSpriteProperty.Y, 4)
    } else {
        player = game.createSprite(2, 4)
    }
}
function moveBall()  {
    item.change(LedSpriteProperty.Y, -1)
}
input.onButtonPressed(Button.B, () => {
    if (player) {
        player.change(LedSpriteProperty.X, 1)
    }
})
input.onButtonPressed(Button.AB, () => {
    startGame()
})
input.onButtonPressed(Button.A, () => {
    if (player) {
        player.change(LedSpriteProperty.X, -1)
    }
})
radio.onDataPacketReceived( ({ receivedString }) =>  {
    if (receivedString == "start") {
    	
    } else if (receivedString == "play") {
    	
    }
})
function startGame()  {
    IStartTheGame = Math.randomBoolean()
    if (IStartTheGame) {
        radio.sendString("play")
    } else {
        radio.sendString("start")
    }
}
radio.setGroup(1)
basic.forever(() => {
    if (ball) {
        if (input.runningTime() - lastTimeCheckedBall >= ballMovementTime) {
            lastTimeCheckedBall = input.runningTime()
            moveBall()
        }
    }
})
