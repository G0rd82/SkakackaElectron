export class InputHandler{
    constructor(game) {
        this.keys = []
        this.game = game
        this.skinHandler = 0

        window.addEventListener("keydown", (e)=>{
            if ((e.key == "ArrowRight") && !this.keys.includes(e.key)){
                this.keys.push(e.key)
                if (!this.game.gameStart) {
                    this.skinHandler = (this.skinHandler - 1)%this.game.player.skins.length
                    if (this.skinHandler < 0 || this.skinHandler > this.game.player.skins.length) {
                        this.skinHandler = this.game.player.skins.length - 1
                    }
                    this.game.player.changeSkin(game.player.skins[this.skinHandler])
                }
            }
            if ((e.key=="ArrowLeft") && !this.keys.includes(e.key)){
                this.keys.push(e.key)
                if (!this.game.gameStart) {
                    this.skinHandler = (this.skinHandler + 1)%this.game.player.skins.length
                    if (this.skinHandler < 0 || this.skinHandler > this.game.player.skins.length) {
                        this.skinHandler = this.game.player.skins.length - 1
                    }
                    this.game.player.changeSkin(game.player.skins[this.skinHandler])
                }
            }
            if (e.key=="Enter"){
                this.game.gameStart = true
            }
            if (e.key=="r"){
                this.game.gameRestart = true
            }

        })
        window.addEventListener("keyup", (e)=> {
            if ((e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key),1)
            }
        })
    }
}