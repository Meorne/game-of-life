import cloneDeep from 'lodash/cloneDeep'

const updateNeighbor = (prevMatrix, nextMatrix, target) => {
  const listPotentialNeighbor = [
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

  const listOfNeighbor = listPotentialNeighbor
    .map(e => (e?.y < 0 || e?.x < 0 || prevMatrix?.[e.y]?.[e.x] === undefined ? null : e))
    .filter(e => e)

  let nbrNbhAlive = 0
  listOfNeighbor.forEach(e => {
    if (prevMatrix[e.y][e.x] === 1) nbrNbhAlive += 1
  })

  if (nbrNbhAlive === 3) {
    nextMatrix[target.y][target.x] = 1
  } if (nbrNbhAlive < 2 || nbrNbhAlive > 3) {
    nextMatrix[target.y][target.x] = 0
  }
}

export const updateLife = currentMatrix => {
  const newMatrix = cloneDeep(currentMatrix)
  currentMatrix.forEach((e, i) => e.forEach((f, j) => {
    updateNeighbor(currentMatrix, newMatrix, {
      x: j,
      y: i,
    })
  }))

  return newMatrix
}

let timeout
export const lifeCycle = (matrix, state, timer = 1000, callBack) => {
  clearTimeout(timeout)
  if (state === `started`) {
    timeout = setTimeout(() => {
      if (typeof callBack === `function`) callBack(updateLife(matrix))
    }, timer)
  }
}
