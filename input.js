export class InputHandler{
    constructor(game) {
        this.game = game

        window.addEventListener("keydown", (e)=>{
            if (e.key=="Enter"){
                this.game.gameStart = true
            }
        })
    }
}