import './App.css'

import TriggerList from './components/TriggerList'
import ActionList from './components/ActionList'
import RecipeList from './components/RecipeList'

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>DIFTTT</h1>

      <TriggerList />

      <ActionList />

      <RecipeList />
    </div>
  )
}

export default App
