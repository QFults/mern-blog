import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import User from '../../utils/UserAPI'
import { useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const LoginForm = props => {
  const history = useHistory()
  const location = useLocation()
  const [loginState, setLoginState] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleLoginUser = event => {
    event.preventDefault()
    User.login(loginState)
      .then(({ data: token }) => {
        localStorage.setItem('token', token)
        console.log(location.state)
        const { from } = location.state || { from: { pathname: '/' } }
        history.push('/')
        // props.updateMe()
      })
  }
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='username'>Username</InputLabel>
        <OutlinedInput
          id='username'
          labelWidth={75}
          name='username'
          value={loginState.username}
          onChange={handleInputChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <OutlinedInput
          type='password'
          id='password'
          labelWidth={75}
          name='password'
          value={loginState.password}
          onChange={handleInputChange}
        />
      </FormControl>
      <br />
      <Button onClick={handleLoginUser} variant='outlined' color='primary'>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
