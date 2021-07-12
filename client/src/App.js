import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import User from './utils/UserAPI'

const App = () => {
  // const history = useHistory()
  const [meState, setMeState] = useState({
    me: {},
    isLoggedIn: true
  })

  const getMe = () => {
    User.me()
      .then(({ data: me }) => {
        if (me) {
          setMeState({ me, isLoggedIn: true })
        } else {
          getMe()
        }
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }

  useEffect(() => {
    getMe()
  }, [])

  const updateMe = () => {
    User.me()
      .then(({ data: me }) => {
        console.log(me)
        setMeState({ me, isLoggedIn: true })
        // history.push('/')
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => meState.isLoggedIn
          ? (
              children
            )
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }}
            />
            )}
      />
    )
  }

  return (
    <Router>
      <div>
        <Navbar
          me={meState.me}
          isLoggedIn={meState.isLoggedIn}
        />
        <Switch>
          <PrivateRoute exact path='/'>
            <h1>The Home Page</h1>
          </PrivateRoute>
          <PrivateRoute path='/profile/:username'>
            <h1>The Profile Page</h1>
          </PrivateRoute>
          <Route path='/login'>
            <Login updateMe={updateMe} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
