import { Counter } from '../lib/main'

import './App.css'

function App() {
  return (
    <>
      <h1>React Component Library</h1>
      <div className="card">
        <p>
          <code>Counter.tsx</code>
          {' '}
          is imported below:
        </p>
        <Counter />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
