import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import User from './utils/UserAPI'

const App = () => {
  const [meState, setMeState] = useState({
    me: {},
    isLoggedIn: false
  })

  useEffect(() => {
    User.me()
      .then(({ data: me }) => setMeState({ me, isLoggedIn: true }))
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }, [])

  return (
    <Router>
      <div>
        <Navbar
          me={meState.me}
          isLoggedIn={meState.isLoggedIn}
        />
        <Switch>
          <Route exact path='/'>
            {meState.isLoggedIn ? <h1>This is the home page</h1> : <Redirect to='/login' />}
          </Route>
          <Route path='/profile/:username'>
            {meState.isLoggedIn ? <h1>This is the profile page</h1> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
