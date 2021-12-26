class Game {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext("2d")
        document.addEventListener("keydown", this.OnKeyPress.bind(this))
    }

    init() {
        this.playerX = 20
        this.playerY = 20
        this.playerW = 20
        this.playerH = 20
        this.mapFloor = 10

        this.map = []

        for (var i = 0; i < 25; i++) {
            this.map[i] = []
            for (var j = 0; j < 25; j++) {
                let rdn = Math.floor(Math.random() * this.mapFloor)
                if (rdn == 0) {
                    this.map[i][j] = 1
                } else {
                    this.map[i][j] = 0
                }
            }
        }

        this.map[1][1] = 0

        self.timer = setInterval(this.loop.bind(this), 1000 / 30)
    }

    reset() {
        clearInterval(self.timer)
        this.init()
    }

    update() {
        if (this.playerX >= this.canvas.width) {
            this.playerX = 0
        } else if (this.playerX <= -this.playerW) {
            this.playerX = this.canvas.width - this.playerW
        } else if (this.playerY >= this.canvas.height) {
            this.playerY = 0
        } else if (this.playerY <= -this.playerH) {
            this.playerY = this.canvas.height - this.playerH
        }
    }

    draw() {
        this.context.beginPath()

        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        for (var i = 0; i < 25; i++) {
            for (var j = 0; j < 25; j++) {
                let piece = this.map[i][j]
                if (piece == 1) {
                    this.context.fillStyle = "white"
                    this.context.fillRect(j * 20, i * 20, 20, 20)
                }
            }
        }

        this.context.fillStyle = "green"
        this.context.fillRect(this.playerX, this.playerY, this.playerW, this.playerH)
    }

    loop() {
        this.draw()
        this.update()
    }

    OnKeyPress(e) {
        let piece = 0
        if (e.keyCode == 37) { // left
            if (this.playerX / 20 - 1 == -1) {
                piece = this.map[this.playerY / 20][24]
            } else {
                piece = this.map[this.playerY / 20][this.playerX / 20 - 1]
            }
            if (piece != 1) {
                this.playerX -= this.playerW
            }
        } else if (e.keyCode == 38) { // top
            if (this.playerY / 20 - 1 == -1) {
                piece = this.map[24][this.playerX / 20]
            } else {
                piece = this.map[this.playerY / 20 - 1][this.playerX / 20]
            }
            if (piece != 1) {
                this.playerY -= this.playerH
            }
        } else if (e.keyCode == 39) { // right
            if (this.playerX / 20 + 1 == 25) {
                piece = this.map[this.playerY / 20][0]
            } else {
                piece = this.map[this.playerY / 20][this.playerX / 20 + 1]
            }
            if (piece != 1) {
                this.playerX += this.playerW
            }
        } else if (e.keyCode == 40) { // bottom
            if (this.playerY / 20 + 1 == 25) {
                piece = this.map[0][this.playerX / 20]
            } else {
                piece = this.map[this.playerY / 20 + 1][this.playerX / 20]
            }
            if (piece != 1) {
                this.playerY += this.playerH
            }
        }
    }
}

const game = new Game()
game.init()