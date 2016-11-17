import React from 'react'
import Workbook from './workbook'
import xlsx from 'xlsx'

const sheetFromData = (data, opts) => {
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } }
  let ws = {}

  for (var R = 0; R !== data.length; ++R) {
    for (var C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C

      let cell = { v: data[R][C] }

      if (cell.v == null) {
        continue
      }

      const cellRef = xlsx.utils.encode_cell({ c: C, r: R })

      if (typeof cell.v === 'number') {
        cell.t = 'n'
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b'
      } else {
        cell.t = 's'
      }

      ws[cellRef] = cell
    }
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = xlsx.utils.encode_range(range)
  }

  return ws
}

export default ({ data }) => {
  const startExport = (event) => {
    const wb = new Workbook()
    const ws = sheetFromData(data)
  }

  return (
    <a className='export-button' onClick={startExport}>
      Export data to Excel
    </a>
  )
}
