class Piece {
  #shape = [[0]]  // This will be the actual shape.
  #shapes = [
    [[1, 0], [1, 0], [1, 1]],  // L-shape
    [[1, 1], [1, 0], [1, 0]],
    [[0, 1, 0], [1, 1, 1]],  // T-shape
    [[1, 0], [1, 1]], // 
    [[1, 1], [1, 1]],  // cube
    [[1, 0], [1, 1], [0, 1]],
    [[0, 1], [1, 1], [1, 0]],

  ]

  #getRandomColour() {
    const colours = Array(3).fill(0).map(() => 80 + Math.floor(Math.random() * 160))
    return `rgb(${colours})`
  }

  // Calculate grid positions from shape and offset.
  #getPositions(shape, offsetX, offsetY = 0) {
    return shape.flatMap((row, i) => {
      return row.map((col, j) => {
        if (!col) return null
        return [j + offsetX + 1, i + 1 + offsetY]
      })
    }).filter(pos => pos)
  }

  #createBlocks(positions, colour) {
    return positions.map((pos) => {
      const block = document.createElement('div')
      block.className = 'block'
      block.style.backgroundColor = colour
      block.style.gridColumnStart = pos[0]
      block.style.gridRowStart = pos[1]
      return block
    })
  }

  // Rotate right.
  #rotateShape(shape) {
    const temp = []
    shape[0].forEach(
      (col, i) => {
        temp.push(shape.map(row => row[i]).reverse())
      }
    )
    return temp
  }

  constructor() {
    let shape = this.#shapes[Math.floor(Math.random() * this.#shapes.length)]
    const colour = this.#getRandomColour()
    const rotate = Math.floor(Math.random() * 4)
    for (let i = 0; i < rotate; i++) {
      shape = this.#rotateShape(shape)
    }
    const offset = Math.floor(Math.random() * (10 - shape[0].length))
    this.positions = this.#getPositions(shape, offset)
    this.blocks = this.#createBlocks(this.positions, colour)
    this.#shape = shape
  }

  moveBlocks() {
    this.blocks.forEach((block, i) => {
      block.style.gridColumnStart = this.positions[i][0]
      block.style.gridRowStart = this.positions[i][1]
    })
  }

  moveLeft() {
    if (this.positions.some(pos => pos[0] < 2)) return; // Don't move out of the game area.
    this.positions.forEach(pos => pos[0] -= 1)
  }
  moveRight() {
    if (this.positions.some(pos => pos[0] > 9)) return;
    this.positions.forEach(pos => pos[0] += 1)
  }
  moveDown() {
    this.positions.forEach(pos => pos[1] += 1)
  }
  moveUp() {
    this.positions.forEach(pos => pos[1] -= 1)
  }
  turnRight() {
    this.#shape = this.#rotateShape(this.#shape)
    this.actuallyTurn()
  }

  turnLeft() {
    this.#shape = this.#rotateShape(this.#rotateShape(this.#rotateShape(this.#shape)))
    this.actuallyTurn()
  }

  actuallyTurn() {
    const cornerX = Math.min(...this.positions.map(pos => pos[0]))
    const cornerY = Math.min(...this.positions.map(pos => pos[1]))
    const corner = [cornerX, cornerY]
    this.positions = this.#getPositions(this.#shape, corner[0] - 1, corner[1] - 1)
    if (this.positions.some(pos => pos[0] > 10)) {
      this.moveLeft()
    }
  }
}


class Tetris {
  constructor() {
    this.gameOver = false
    this.points = 0
    points.textContent = '0'
    this.piece = new Piece()
    this.piece.blocks.forEach(block => gameArea.appendChild(block))

    this.cols = 10
    this.rows = window.getComputedStyle(gameArea).gridTemplateRows.split(' ').length
    this.speed = 1200
    this.matrix = Array(this.rows).fill(0).map(() => [])
    this.falling()
    controls.forEach(btn => btn.disabled = false)
  }

  isCollision() {
    if (this.piece.positions.some(pos => pos[1] > this.rows)) return true
    if (this.piece.positions.some(pos => {
      return this.matrix.map((row, y) => {
        if (row.some(x => pos[0] === x && pos[1] === y + 1)) return true
      }).indexOf(true) !== -1
    })) return true
    return false
  }

  falling() {
    if (this.gameOver) return
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      if (this.moveDown()) return // returns true if there is a full row
      this.falling()
    }, this.speed)
  }

  createNewPiece() {
    this.piece = new Piece()
    this.piece.blocks.forEach(block => gameArea.appendChild(block))
    if (this.isCollision()) {
      this.endGame()
    }
  }

  moveDown() {
    this.piece.moveDown()
    if (!this.isCollision()) {
      this.piece.moveBlocks()
    } else {
      this.piece.moveUp()
      this.piece.blocks.forEach(block => block.classList.add('settled'))
      this.piece.positions.forEach(pos => {
        this.matrix[pos[1] - 1].push(pos[0])
      })
      if (this.checkRows()) {
        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          this.createNewPiece()
          this.falling()
        }, 2500)
        return true
      }
      this.createNewPiece()
    }
  }

  moveRight() {
    this.piece.moveRight()
    if (!this.isCollision()) {
      this.piece.moveBlocks()
    } else {
      this.piece.moveLeft()
    }
  }

  moveLeft() {
    this.piece.moveLeft()
    if (!this.isCollision()) {
      this.piece.moveBlocks()
    } else {
      this.piece.moveRight()
    }
  }

  turnLeft() {
    this.piece.turnLeft()
    if (!this.isCollision()) {
      this.piece.moveBlocks()
    } else {
      this.piece.turnRight()
    }
  }

  turnRight() {
    this.piece.turnRight()
    if (!this.isCollision()) {
      this.piece.moveBlocks()
    } else {
      this.piece.turnLeft()
    }
  }

  checkRows() {
    let isMatch = false
    this.matrix.forEach((row, i) => {
      if (row.length >= 10) {
        isMatch = true
        this.points += 10
        this.matrix.splice(i, 1)
        this.matrix.unshift([])
        this.collapseRow(i + 1)
      }
    })
    return isMatch
  }

  collapseRow(row) {
    const blocks = Array.from(document.querySelectorAll('.block'))
    const matched = blocks.filter(block =>
      window.getComputedStyle(block).gridRowStart == row
    )
    const above = blocks.filter(block =>
      window.getComputedStyle(block).gridRowStart < row
    )
    matched.forEach(block => block.classList.add('matched'))
    above.forEach(block => block.classList.add('collapse'))
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      matched.forEach(block => gameArea.removeChild(block))
      above.forEach(block => {
        block.classList.remove('collapse')
        block.style.gridRowStart = parseInt(block.style.gridRowStart) + 1
      })
    }, 2000)

    this.speed *= 0.9
    points.textContent = this.points
  }

  endGame() {
    this.gameOver = true
    controls.forEach(btn => btn.disabled = true)
    gameOver.style.display = 'flex'
  }

  cleanUp() {
    document.querySelectorAll('.block').forEach(block => gameArea.removeChild(block))
    this.gameOver = true
  }
}

const gameArea = document.querySelector('.game')
const startBtn = document.querySelector('.start-game')
const turnLeftBtn = document.querySelector('.turn-left')
const turnRightBtn = document.querySelector('.turn-right')
const moveLeftBtn = document.querySelector('.move-left')
const moveRightBtn = document.querySelector('.move-right')
const controls = [turnLeftBtn, turnRightBtn, moveLeftBtn, moveRightBtn]
const gameOver = document.querySelector('.game-over')
const points = document.querySelector('#points')

const style = window.getComputedStyle(gameArea)
const width = style.gridTemplateColumns.split(' ')[0]

gameArea.style.gridTemplateRows = `repeat(auto-fill, ${width})`

let tetris

startBtn.onclick = () => {
  tetris = new Tetris()
  startBtn.textContent = 'New Game'
  startBtn.onclick = newGame
}

function newGame() {
  tetris.cleanUp()
  tetris = new Tetris()
  gameOver.style.display = 'none'
}

moveLeftBtn.addEventListener('click', () => tetris.moveLeft())
moveRightBtn.addEventListener('click', () => tetris.moveRight())
turnLeftBtn.addEventListener('click', () => tetris.turnLeft())
turnRightBtn.addEventListener('click', () => tetris.turnRight())

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft': moveLeftBtn.click(); break;
    case 'ArrowRight': moveRightBtn.click(); break;
    case 'x': turnLeftBtn.click(); break;
    case 'c': turnRightBtn.click(); break;
    case ' ': startBtn.click(); break;
  }
})

document.querySelector('.ok').addEventListener('click', (ev) => {
  ev.target.parentNode.remove()
})