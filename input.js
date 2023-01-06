export class InputHandler{
    constructor(game) {
        this.keys = []
        this.game = game

        window.addEventListener("keydown", (e)=>{
            if ((e.key=="ArrowLeft" || e.key == "ArrowRight") && !this.keys.includes(e.key)){
                this.keys.push(e.key)
            }
            if (e.key=="Enter"){
                this.game.gameStart = true
            }
            if (e.key=="r"){
                this.game.gameRestart = true
                console.log(this.game.gameOver)
            }

        })
        window.addEventListener("keyup", (e)=> {
            if ((e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key),1)
            }
        })
    }
}