import cloneDeep from 'lodash/cloneDeep'

const updateNeighbor = (prevMatrix, target) => {
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

  const nbrNbhAlive = listPotentialNeighbor
    .map(e => ((e?.y > 0 && e?.x > 0 && prevMatrix?.[e.y]?.[e.x] === 1) ? 1 : null))
    .filter(e => e).length

  if (nbrNbhAlive === 3) {
    return 1
  } if (nbrNbhAlive < 2 || nbrNbhAlive > 3) {
    return 0
  }
  return prevMatrix[target.y][target.x]
}

const perimeterToRender = matrix => {
  let startX = null
  let startY = null
  let endX = null
  let endY = null

  matrix.forEach((e, j) => e.forEach((f, i) => {
    if (f === 1) {
      if (!startX || startX > i)startX = i
      if (!startY || startY > j)startY = j
      if (!endX || endX < i)endX = i
      if (!endY || endY < j)endY = j
    }
  }))

  return {
    startX,
    startY,
    endX,
    endY,
  }
}

export const updateLife = currentMatrix => {
  const newMatrix = cloneDeep(currentMatrix)
  const {
    startX, startY,
    endX, endY,
  } = perimeterToRender(currentMatrix)

  return newMatrix.map((e, j) => e.map((f, i) => {
    if (i >= startX - 1 && i <= endX + 1
      && j >= startY - 1 && j <= endY + 1) {
      return updateNeighbor(currentMatrix, {
        x: i,
        y: j,
      })
    }
    return 0
  }))
}

let timeout
export const lifeCycle = (matrix, state, timer = 2000, callBack) => {
  if (state === `started`) {
    timeout = setTimeout(() => {
      if (typeof callBack === `function`) callBack(updateLife(matrix))
    }, timer)
  } else {
    clearTimeout(timeout)
  }
}
