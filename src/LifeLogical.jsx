const updateNeighbor = (matrix, target) => {
  const listOfPotentialNeighbor = [
    {
      x: target.x - 1,
      y: target.y - 1,
    }, {
      x: target.x,
      y: target.y - 1,
    }, {
      x: target.x + 1,
      y: target.y - 1,
    },
    {
      x: target.x - 1,
      y: target.y,
    }, {
      x: target.x,
      y: target.y,
    }, {
      x: target.x + 1,
      y: target.y,
    },
    {
      x: target.x - 1,
      y: target.y + 1,
    }, {
      x: target.x,
      y: target.y + 1,
    }, {
      x: target.x + 1,
      y: target.y + 1,
    },
  ]

  const listOfNeighbor = listOfPotentialNeighbor
    .map(e => (matrix[e.y][e.x] === undefined ? null : e))
    .filter(e => e)

  listOfNeighbor.forEach(e => {
    matrix[e.y][e.x] = matrix[e.y][e.x] ? 0 : 1
  })
}

export const updateLife = prevMatrix => {
  const newMatrix = [...prevMatrix]
  const listSelectedCells = []
  newMatrix.forEach((e, i) => {
    e.forEach((f, j) => {
      if (f) {
        listSelectedCells.push({
          x: j,
          y: i,
        })
      }
    })
  })

  listSelectedCells.forEach(e => {
    updateNeighbor(newMatrix, e)
  })

  console.log(listSelectedCells)
  return newMatrix
}

let cycleTimer = null
export const lifeCycle = (matrix, state, callBack) => {
  console.log(`lifeCycle`, state)
  if (state === `started`) {
    cycleTimer = setInterval(() => {
      callBack(updateLife(matrix))
    }, 1000)
  } else {
    clearInterval(cycleTimer)
  }
}
