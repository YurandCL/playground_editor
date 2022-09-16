import * as monaco from 'monaco-editor'
import { emmetHTML } from 'emmet-monaco-es'

import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { getState } from './state.js'

const { fontSize, lineNumbers, minimap, theme, wordWrap } = getState()

const COMMON_SETTINGS = {
  automaticLayout: true,
  fixedOverflowWidgets: true,
  fontSize,
  lineNumbers,
  minimap: { enabled: minimap },
  theme,
  wordWrap,
  padding: {
    top: 16
  },
  roundedSelection: false,
  scrollBeyondLastLine: false
}
// console.log({ COMMON_SETTINGS })
emmetHTML(monaco)

window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'js') return new JsWorker()
  }
}

export const createEditor = ({ domElement, language, value }) =>
  monaco.editor.create(domElement, {
    value,
    language,
    ...COMMON_SETTINGS
  })
