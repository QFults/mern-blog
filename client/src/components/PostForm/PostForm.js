import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const PostForm = props => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='title'>Title</InputLabel>
        <OutlinedInput
          id='title'
          labelWidth={75}
          name='title'
          value={props.title}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='body'>Body</InputLabel>
        <OutlinedInput
          id='body'
          labelWidth={75}
          multiline
          rows={4}
          name='body'
          value={props.body}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <br />
      <Button onClick={props.handleCreatePost} variant='outlined' color='primary'>
        Create Post
      </Button>
      <br />
    </form>
  )
}

export default PostForm
