import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}))

const Navbar = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Not Facebook
          </Typography>
          <Link className={classes.link} to='/'>
            <Button color='inherit'>Home</Button>
          </Link>
          <Link className={classes.link} to={`/profile/${props.me.username}`}>
            <Button color='inherit'>Profile</Button>
          </Link>
          {
            !props.isLoggedIn
              ? (
                <Link className={classes.link} to='/login'>
                  <Button color='inherit'>Login</Button>
                </Link>
                )
              : (
                <Button color='inherit' onClick={props.handleLogOut}>Logout</Button>
                )
          }

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
