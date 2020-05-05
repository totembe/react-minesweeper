import React from 'react'
import {marks} from '../minesweeper'

export default function Field({mineField, onClick, onMark}) {
    if (!mineField) {
        return null
    }    
    return (
        <table className="field">
            <tbody>
                {
                    mineField.fieldData.map((row,rowIdx) => {
                        return (<tr key={'r' + rowIdx}>
                            {
                                row.map((col, colIdx) => {
                                    if (col.revealed) {
                                        let tileClass = "tile revealed"
                                        let tileContent = col.value
                                        if (col.exploded) tileClass += " exploded"
                                        if (col.mark === marks.FLAGGED) tileClass += " wrong"
                                        if (col.mark !== marks.FLAGGED && col.value > 0)  tileClass += (" tile"+col.value)
                                        if (col.value === 0) tileContent = ""
                                        if (col.value < 0) tileContent = "\uD83D\uDCA3"
                                        if (col.mark === marks.FLAGGED && col.value >= 0) tileContent = "\uD83D\uDCA3"
                                        return (
                                            <td className={tileClass} key={'cr' + colIdx}>{tileContent}</td>
                                        )
                                    } else {
                                    return (<td className={"tile unrevealed"}
                                                key={'cu' + colIdx} 
                                                onClick={(e) => {onClick && onClick(rowIdx,colIdx)}}
                                                onContextMenu={(e) => {e.preventDefault(); onMark && onMark(rowIdx,colIdx)}}
                                                >
                                                {col.mark === marks.FLAGGED ? "\uD83D\uDEA9" : ""}
                                                {col.mark === marks.QUESTION ? "?" : ""}
                                    </td>)
                                    }
                                }) 
                            }
                        </tr>)
                    })
                }
            </tbody>
        </table>

    )
}