import './style.css'

import { encode, decode } from 'js-base64'
import { createEditor } from './editor.js'
import { initEditorHotKeys } from './utils/editor-hotkeys'
import debounce from './utils/debounce'
import { $ } from './utils/dom.js'
import './aside.js'
import { events } from './events.js'
import { subscribe } from './state.js'
import './grid.js'
import './settings'

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

const { pathname } = window.location

const [rawHtml = '', rawCss = '', rawJs = ''] = pathname.slice(1).split('%7C')

const html = decode(rawHtml)
const css = decode(rawCss)
const js = decode(rawJs)

const htmlEditor = createEditor({ domElement: $html, language: 'html', value: html })
const cssEditor = createEditor({ domElement: $css, language: 'css', value: css })
const jsEditor = createEditor({ domElement: $js, language: 'js', value: js })

subscribe(state => {
  console.log({ state })
  const EDITORS = [htmlEditor, cssEditor, jsEditor]
  EDITORS.forEach(editor => {
    const { minimap, ...restOfOptions } = state
    const newOptions = {
      ...restOfOptions,
      minimap: {
        enabled: minimap
      }
    }
    editor.updateOptions({
      ...editor.getRawOptions(),
      ...newOptions
    })
  })
})

const MS_UPDATE_DEBOUNCED_TIME = 200
const debouncedUpdate = debounce(update, MS_UPDATE_DEBOUNCED_TIME)

htmlEditor.focus()
htmlEditor.onDidChangeModelContent(debouncedUpdate)
jsEditor.onDidChangeModelContent(debouncedUpdate)
cssEditor.onDidChangeModelContent(debouncedUpdate)

initEditorHotKeys({ htmlEditor, cssEditor, jsEditor })

const htmlForPreview = createHtml({ html, css, js })
$('iframe').setAttribute('srcdoc', htmlForPreview)

function createHtml ({ html, css, js }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `
}

function update () {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`

  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}
