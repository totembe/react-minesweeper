export const levels = {
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'INTERMEDIATE',
    EXPERT: 'EXPERT'
}

export const marks = {
    NOT_MARKED: 0,
    FLAGGED: 1,
    QUESTION: 2,
}

export const levelConfig = {
    [levels.BEGINNER]: {key: levels.BEGINNER, level: 'Beginner', width: 9, height: 9,  mines: 10},
    [levels.INTERMEDIATE]: {key: levels.INTERMEDIATE, level: 'Intermediate', width: 16, height: 16,  mines: 40},
    [levels.EXPERT]: {key: levels.EXPERT, level: 'Expert', width: 30, height: 16,  mines: 99},
  }

  
function generateMines (level){
    const mines = []
    const numberOfCells = levelConfig[level].width * levelConfig[level].height
    for (let i=0; i < levelConfig[level].mines; i++) {
        let randomPosition = Math.floor(Math.random() * (numberOfCells - mines.length))
        randomPosition += mines.filter((v) => v <= randomPosition).length
        while(mines.includes(randomPosition)) {
          randomPosition += 1
        }
        mines.push(randomPosition)      
    }
    mines.sort((a,b)=>{return a-b})
    return mines
}
  
export function generateField(level) {
    const fieldData = Array.from(Array(levelConfig[level].height), () => new Array(levelConfig[level].width).fill({}))
    fieldData.forEach((row, rowIndex)=>{
        row.forEach((_,ColIndex) => {
            fieldData[rowIndex][ColIndex] = {
                value:0, 
                revealed: false, 
                mark: marks.NOT_MARKED,
                exploded: false,
            }
        })
    })
    const effectingCells = [
        [-1,-1],[-1, 0],[-1,+1],
        [ 0,-1],        [ 0,+1],
        [+1,-1],[+1, 0],[+1,+1],
    ]
    const mines = generateMines(level)
    mines.forEach(minePosition => {
        const minePositionRow = Math.floor(minePosition / levelConfig[level].width)
        const minePositionCol = minePosition % levelConfig[level].width
        fieldData[minePositionRow][minePositionCol].value -= 9
        effectingCells.forEach(offset => {
            if (typeof fieldData[minePositionRow + offset[0]] !== 'undefined' &&
                typeof fieldData[minePositionRow + offset[0]][minePositionCol + offset[1]] !== 'undefined') {
                fieldData[minePositionRow + offset[0]][minePositionCol + offset[1]].value += 1
            }
        })
    })
    return {level: levelConfig[level], flagCount: 0, fieldData: fieldData}
}

export function reveal(field, row, col) {
    const neighbours = [
        {row:-1,col:-1},
        {row:-1,col: 0},
        {row:-1,col:+1},
        {row: 0,col:-1},
        {row: 0,col:+1},
        {row:+1,col:-1},
        {row:+1,col: 0},
        {row:+1,col:+1},
    ]
    if (field.fieldData[row][col].mark === marks.FLAGGED) return field
    let revealList = [{row, col}]
    while (revealList.length > 0) {

        const operation = revealList.shift()

        field.fieldData[operation.row][operation.col].revealed = true
        if (field.fieldData[operation.row][operation.col].value < 0) {
            field.fieldData[operation.row][operation.col].exploded = true
            field.fieldData.forEach((row,rowIndex) => {
                row.forEach((col,colIndex)=> {
                    if (col.value < 0 && !col.revealed && col.mark !== marks.FLAGGED) 
                    {
                        field.fieldData[rowIndex][colIndex].revealed = true
                    }
                    if (col.mark === marks.FLAGGED && col.value >= 0) {
                        field.fieldData[rowIndex][colIndex].revealed = true
                    }
                })
            })
        }

        if (field.fieldData[operation.row][operation.col].value === 0) {
            neighbours.forEach(n=>{
                const targetRow = operation.row + n.row
                const targetCol = operation.col + n.col
                if (typeof field.fieldData[targetRow] !== 'undefined' &&
                    typeof field.fieldData[targetRow][targetCol] !== 'undefined' &&
                    !field.fieldData[targetRow][targetCol].revealed) {
                        revealList.push({row: targetRow, col: targetCol})
                   }                        
            })
        }

    }

    return field
}

export function mark(field, row, col) {
    field.fieldData[row][col].mark++
    field.fieldData[row][col].mark %= 3

    if (field.fieldData[row][col].mark === marks.FLAGGED) field.flagCount++
    if (field.fieldData[row][col].mark === marks.QUESTION) field.flagCount--

    return field
}
