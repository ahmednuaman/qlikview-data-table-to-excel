import FileSaver from 'file-saver'
import React from 'react'
import Workbook from './workbook'
import XLSX from 'xlsx'

const sheetFromData = (data, opts) => {
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } }
  let ws = {}

  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C

      let cell = { v: data[R][C] }

      if (cell.v == null) {
        continue
      }

      const cellRef = XLSX.utils.encode_cell({ c: C, r: R })

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
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

const stringToArrayBuffer = (s) => {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)

  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }

  return buf
}

export default ({ data }) => {
  const startExport = (event) => {
    const name = 'Sheet 1'
    const wb = new Workbook()
    const ws = sheetFromData(data)

    wb.SheetNames.push(name)
    wb.Sheets[name] = ws

    const fileData = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'binary'
    })

    FileSaver.saveAs(
      new window.Blob([stringToArrayBuffer(fileData)], {
        type: 'application/octet-stream'
      }),
      'file.xlsx'
    )
  }

  return (
    <a className='export-button' onClick={startExport}>
      Export data to Excel
    </a>
  )
}
