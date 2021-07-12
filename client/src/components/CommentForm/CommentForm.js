import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    },
    width: '100%'
  }
}))

const CommentForm = props => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='comment'>Comment</InputLabel>
        <OutlinedInput
          id='comment'
          labelWidth={75}
          name='comment'
          value={props.comment}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <br />
      <Button
        onClick={event => {
          event.preventDefault()
          props.handleCreateComment(props.post_id)
        }}
        variant='outlined'
        color='primary'
      >
        Comment
      </Button>
      <br />
    </form>
  )
}

export default CommentForm
