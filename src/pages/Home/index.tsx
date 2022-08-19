import { useState } from 'react'

import TriggerList from '@/components/TriggerList'
import ActionList from '@/components/ActionList'
import RecipeList from '@/components/RecipeList'

// import extension from './substrate/extension'

function Home() {
  // console.log('extension', extension)
  const [triggers, setTriggers] = useState([])

  const [actions, setActions] = useState([])

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'white' }}>
        GET ONCHAIN MESSAGES AND MANAGE YOUR PLANS
      </h1>

      <TriggerList triggers={triggers} setTriggers={setTriggers} />

      <ActionList actions={actions} setActions={setActions} />

      <RecipeList triggers={triggers} actions={actions} />
    </div>
  )
}

export default Home
