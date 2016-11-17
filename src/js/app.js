import $ from 'jquery'
import pkg from '../../package.json'
import table from './table'

const EXT_NAME = pkg.name
const URL_PREFIX = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + `public=only&name=Extensions/${EXT_NAME}/`

$(() => {
  Qva.LoadCSS(`${URL_PREFIX}asset/css/app.css`)

  Qv.AddExtension(EXT_NAME, function () {
    table(this.Element)
  })
})
