import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PostForm from '../../components/PostForm'
import CommentForm from '../../components/CommentForm'
import User from '../../utils/UserAPI'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

const Profile = () => {
  const classes = useStyles()
  const { username } = useParams()

  const [userState, setUserState] = useState({
    user: {}
  })

  useEffect(() => {
    User.profile(username)
      .then(({ data: user }) => {
        console.log(user)
        setUserState({ ...userState, user })
      })
  }, [])

  return (
    <Container maxWidth='xl'>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
        <Paper
          elevation={3}
          style={{ padding: '20px', marginBottom: '20px' }}
        >
          <Typography variant='h4'>
            {userState.user.name}
          </Typography>
          <Typography variant='p'>
            {userState.user.email}
          </Typography>
          <hr />
          <Typography variant='h6'>
            {userState.user.username}
          </Typography>
        </Paper>
        {
          userState.user.posts
            ? (
                userState.user.posts.map(post => (
                  <Paper
                    key={post._id}
                    elevation={3}
                    style={{ padding: '20px', marginBottom: '20px' }}
                  >
                    <Typography variant='h4'>
                      {post.title}
                    </Typography>
                    <Typography variant='p'>
                      Created by {post.author.username}
                    </Typography>
                    <hr />
                    <Typography variant='h6'>
                      {post.body}
                    </Typography>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography className={classes.heading}>Comments</Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ display: 'block' }}>
                        {
                          post.comments
                            ? (
                                post.comments.map(comment => (
                                  <div key={comment._id}>
                                    <Typography variant='p' style={{ marginBottom: '20px' }}>
                                      {comment.author.username}: {comment.text}
                                    </Typography>
                                    <br />
                                    <br />
                                  </div>
                                ))
                              )
                            : null
                        }
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                  ))
                )
              : null
        }
      </Paper>
    </Container>
  )
}

export default Profile
