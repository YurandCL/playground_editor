import create from 'zustand/vanilla'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

const appInitialState = getLocalStorage('appInitialState') || {
  fontSize: 18,
  lineNumbers: 'off',
  minimap: false,
  theme: 'vs-dark',
  wordWrap: 'on'
}

const store = create((set, get) => ({
  ...appInitialState,
  updateSettings: ({ key, value }) => {
    set(state => {
      setLocalStorage('appInitialState', {
        ...state, [key]: value
      })
      return { [key]: value }
    })
  }
}))

const { getState: testGetState } = store
console.log({ getState: testGetState() })

export const {
  getState,
  setState,
  subscribe,
  destroy
} = store
