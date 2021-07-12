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
import Post from '../../utils/PostAPI'
import Comment from '../../utils/CommentAPI'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

const Home = () => {
  const classes = useStyles()

  const [postState, setPostState] = useState({
    title: '',
    body: '',
    comment: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  const handleCreateComment = post_id => {
    Comment.create({
      text: postState.comment,
      post_id
    })
      .then(({ data: comment }) => {
        const posts = [...postState.posts]
        posts.forEach(post => {
          if (post._id === post_id) {
            post.comments.push(comment)
          }
        })
        setPostState({ ...postState, posts, comment: '' })
      })
  }

  const handleCreatePost = event => {
    event.preventDefault()
    Post.create({
      title: postState.title,
      body: postState.body
    })
      .then(({ data: post }) => {
        const posts = [...postState.posts]
        posts.push(post)
        setPostState({ ...postState, posts, title: '', body: '' })
      })
  }
  useEffect(() => {
    Post.getAll()
      .then(({ data: posts }) => {
        console.log(posts)
        setPostState({ ...postState, posts })
      })
  }, [])

  return (
    <Container maxWidth='xl'>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
        <PostForm
          title={postState.title}
          body={postState.body}
          handleInputChange={handleInputChange}
          handleCreatePost={handleCreatePost}
        />
        {
          postState.posts.map(post => (
            <Paper
              key={post._id}
              elevation={3}
              style={{ padding: '20px', marginBottom: '20px' }}
            >
              <Typography variant='h4'>
                {post.title}
              </Typography>
              <Typography variant='p'>
                {'Created by '}
                <Link to={`/profile/${post.author.username}`}>
                  {post.author.username}
                </Link>
              </Typography>
              <hr />
              <Typography variant='h6'>
                {post.body}
              </Typography>
              <Accordion onClick={() => setPostState({ ...postState, comment: '' })}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography className={classes.heading}>Comments</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'block' }}>
                  {
                    post.comments.map(comment => (
                      <div key={comment._id}>
                        <Typography variant='p' style={{ marginBottom: '20px' }}>
                          {comment.author.username}: {comment.text}
                        </Typography>
                        <br />
                        <br />
                      </div>
                    ))
                  }
                  <CommentForm
                    comment={postState.comment}
                    post_id={post._id}
                    handleInputChange={handleInputChange}
                    handleCreateComment={handleCreateComment}
                  />
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))
        }
      </Paper>
    </Container>
  )
}

export default Home
