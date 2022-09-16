import * as monaco from 'monaco-editor'
import { $ } from './dom.js'

export const initEditorHotKeys = ({ htmlEditor, jsEditor, cssEditor }) => {
  const editors = [htmlEditor, jsEditor, cssEditor]

  editors.forEach(editor => {
    editor.addAction({
      id: 'open-settings',
      label: 'Open settings',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_COMMA
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: function (editor) {
        $('#settings').removeAttribute('hidden')
        $('#editor').setAttribute('hidden', '')
      }
    })
  })
}
