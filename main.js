import {Background} from "./background.js";

window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas1")
    const ctx = canvas.getContext("2d")
    canvas.width = 532
    canvas.height = 850

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.background = new Background(this)
        }
        update() {
            this.background.update()
        }
        draw(context){
            this.background.draw(context)
        }
    }
    const game = new Game(canvas.width,canvas.height)

    function animated(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animated)
    }
    animated()
})

