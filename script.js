class Game {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext("2d")
        document.addEventListener("keydown", this.OnKeyPress.bind(this))
        document.getElementById("top").addEventListener("click", this.playerTop.bind(this, 1))
        document.getElementById("left").addEventListener("click", this.playerLeft.bind(this, 1))
        document.getElementById("ulti").addEventListener("click", this.playerUlti.bind(this, 1))
        document.getElementById("right").addEventListener("click", this.playerRight.bind(this, 1))
        document.getElementById("bottom").addEventListener("click", this.playerBottom.bind(this, 1))
    }

    init() {
        this.playerX = 20
        this.playerY = 20
        this.playerW = 20
        this.playerH = 20
        this.palyerDirection = "bottom"

        this.ultiCount = 2
        this.ultiRight = true
        this.ultiDirection = 5

        this.mapFloor = 10
        this.pieceW = 20
        this.pieceH = 20

        this.map = []
        this.createMap()
        this.map[1][1] = 0

        this.fps = 50

        self.timer = setInterval(this.loop.bind(this), 1000 / this.fps)
        self.ultiTimer = setInterval(this.updateUltiRight.bind(this), 1000 * this.ultiDirection)
    }

    updateUltiRight() {
        this.ultiRight = true
        document.getElementById("ulti").style.background = "yellow"
    }

    createMap() {
        for (var i = 0; i < this.canvas.height / this.pieceH; i++) {
            this.map[i] = []
            for (var j = 0; j < this.canvas.width / this.pieceW; j++) {
                let rdn = Math.floor(Math.random() * this.mapFloor)
                if (rdn == 0) {
                    this.map[i][j] = 1
                } else {
                    this.map[i][j] = 0
                }
            }
        }
    }

    reset() {
        clearInterval(self.timer)
        clearInterval(self.ultiTimer)
        this.init()
    }

    update() {
        this.limitCheck()
    }

    limitCheck() {
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
                    this.context.fillRect(j * this.pieceW, i * this.pieceH, this.pieceW, this.pieceH)
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
        if (e.keyCode == 37 || e.keyCode == 65) { // left
            this.playerLeft()
        } else if (e.keyCode == 38 || e.keyCode == 87) { // top
            this.playerTop()
        } else if (e.keyCode == 39 || e.keyCode == 68) { // right
            this.playerRight()
        } else if (e.keyCode == 40 || e.keyCode == 83) { // bottom
            this.playerBottom()
        } else if (e.keyCode == 75) {
            this.playerUlti()
        }
    }

    playerLeft(blockCount = 1) {
        let piece = 0

        if (this.playerX / this.pieceW - blockCount < 0) {
            piece = this.map[this.playerY / this.pieceH][this.canvas.width / this.pieceW - 1]
        } else {
            piece = this.map[this.playerY / this.pieceH][this.playerX / this.pieceW - blockCount]
        }
        if (piece != 1) {
            this.playerX -= this.playerW * blockCount
        }

        this.palyerDirection = "left"
    }

    playerTop(blockCount = 1) {
        let piece = 0

        if (this.playerY / this.pieceH - blockCount < 0) {
            piece = this.map[this.canvas.height / this.pieceH - 1][this.playerX / this.pieceW]
        } else {
            piece = this.map[this.playerY / this.pieceH - blockCount][this.playerX / this.pieceW]
        }
        if (piece != 1) {
            this.playerY -= this.playerH * blockCount
        }

        this.palyerDirection = "top"
    }

    playerRight(blockCount = 1) {
        let piece = 0

        if (this.playerX / this.pieceW + blockCount >= this.canvas.width / this.pieceW) {
            piece = this.map[this.playerY / this.pieceH][0]
        } else {
            piece = this.map[this.playerY / this.pieceH][this.playerX / this.pieceW + blockCount]
        }
        if (piece != 1) {
            this.playerX += this.playerW * blockCount
        }

        this.palyerDirection = "right"
    }

    playerBottom(blockCount = 1) {
        let piece = 0

        if (this.playerY / this.pieceH + blockCount >= this.canvas.height / this.pieceH) {
            piece = this.map[0][this.playerX / this.pieceW]
        } else {
            piece = this.map[this.playerY / this.pieceH + blockCount][this.playerX / this.pieceW]
        }
        if (piece != 1) {
            this.playerY += this.playerH * blockCount
        }

        this.palyerDirection = "bottom"
    }

    playerUlti() {
        if (this.ultiRight) {
            switch (this.palyerDirection) {
                case "left":
                    this.playerLeft(this.ultiCount)
                    break
                case "top":
                    this.playerTop(this.ultiCount)
                    break
                case "right":
                    this.playerRight(this.ultiCount)
                    break
                case "bottom":
                    this.playerBottom(this.ultiCount)
                    break
            }
            this.ultiRight = false
            document.getElementById("ulti").style.background = "white"
        }
    }
}

const game = new Game()
game.init()