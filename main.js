import {Background} from "./background.js";
import {InputHandler} from "./input.js";
import {Platform} from "./platform.js";
import {Player} from "./player.js";


window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas1")
    const ctx = canvas.getContext("2d")
    canvas.width = 532
    canvas.height = 850

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.vy = 0
            this.gameOver = false
            this.gameStart = false
            this.gameRestart = false;
            this.platforms = []
            this.score = 0
            this.platform_gap = 85
            this.blue_white_platform_chance = 50
            this.object_vx = 3
            this.add_platforms(0,this.height-15)
            this.add_platforms(-this.height,-15)
            this.background = new Background(this)
            this.player = new Player(this)
            this.inputHandler = new InputHandler(this)
        }
        update() {
            this.background.update()

            this.platforms.forEach(platform =>{
                platform.update()
            })

            this.player.update(this.inputHandler)

            this.platforms = this.platforms.filter(platform => !platform.markedForDeletion)
            if (game.gameRestart) {
                game.width = game.width
                game.height = game.height
                game.vy = 0
                game.gameOver = false
                game.gameStart = false
                game.gameRestart = false;
                game.platforms = []
                game.score = 0
                game.platform_gap = 85
                game.blue_white_platform_chance = 50
                game.object_vx = 3
                game.add_platforms(0,this.height-15)
                game.add_platforms(-this.height,-15)
                game.background = new Background(this)
                game.player = new Player(this)
                game.inputHandler = new InputHandler(this)
            }
        }
        draw(context){
            this.background.draw(context)

            if (!this.gameStart){
                context.font = "bold 25px Helvetica"
                context.fillStyle = "red"
                context.textAlign = "center"
                context.fillText("PRESS ENTER TO START", this.width*0.5, this.height*0.5)
                context.font = "bold 18px Helvetica"
                context.fillText("Press ARROWS to change skin", this.width*0.5, this.height*0.5 + 50)
                this.player.draw(context)
            }
            else {
                this.platforms.forEach(platform =>{
                    platform.draw(context)
                })
                this.player.draw(context)
            }
            context.fillStyle = "white"
            context.font = "20px Arial"
            context.textAlign = "start"
            context.fillText(`Score: ${this.score}`, 20, 40)


            if (this.gameOver){
                context.font = "bold 25px Helvetica"
                context.fillStyle = "red"
                context.textAlign = "center"
                context.fillText(`GAME OVER`,this.width*0.5, this.height*0.5)
                context.fillText(`Press r to restart`,this.width*0.5, this.height*0.5 + 50)

            }
        }

        add_platforms(lowerY, upperY){
            do{
                let type = "green"
                if (Math.random() < (this.blue_white_platform_chance/100)){
                    type = (Math.random() < 0.5) ? "blue" : "white"
                }

                this.platforms.unshift(new Platform(this, lowerY, upperY, type))
            }
            while (this.platforms[0].y >=lowerY)
        }
    }
    const game = new Game(canvas.width,canvas.height)

    function animated(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if (game.gameStart) game.update()
        game.draw(ctx)
        requestAnimationFrame(animated)
    }
    animated()
})

