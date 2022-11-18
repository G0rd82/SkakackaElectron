export class Background{
    constructor(game) {
        this.game = game
        this.width = this.game.width
        this.height = this.game.height
        this.image = document.querySelector("#bg")
        this.x = 0
        this.y = 0

    }
    update(){
        if (this.y > this.height){
            this.y = 0
            this.game.add_platforms(-this.height, -15)
        }else {
            this.y += 3
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width,this.height)
        context.drawImage(this.image, this.x, this.y - this.height,this.width, this.height)
    }
}