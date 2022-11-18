import {Background} from "./background.js";
import {InputHandler} from "./input.js";
import {Platform} from "./platform.js";

window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas1")
    const ctx = canvas.getContext("2d")
    canvas.width = 532
    canvas.height = 850

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.gameStart = false
            this.platforms = []
            this.platform_gap = 85
            this.blue_white_platform_chance = 50
            this.object_vx = 3
            this.add_platforms(0,this.height-15)
            this.add_platforms(-this.height,-15)
            this.background = new Background(this)
            this.inputHandler = new InputHandler(this)
        }
        update() {
            this.background.update()

            this.platforms.forEach(platform =>{
                platform.update()
            })

            this.platforms = this.platforms.filter(platform => !platform.markedForDeletion)
        }
        draw(context){
            this.background.draw(context)

            if (!this.gameStart){
                context.font = "bold 25px Helvetica"
                context.fillStyle = "black"
                context.textAlign = "center"
                context.fillText("PRESS ENTER TO START", this.width*0.5, this.height*0.5)
            }
            else {
                this.platforms.forEach(platform =>{
                    platform.draw(context)
                })
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

