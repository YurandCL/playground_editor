import Split from 'split-grid'
import { $ } from './utils/dom.js'

Split({
  columnGutters: [{
    track: 1,
    element: $('.gutter-col-1')
  }],
  rowGutters: [{
    track: 1,
    element: $('.gutter-row-1')
  }]
})
