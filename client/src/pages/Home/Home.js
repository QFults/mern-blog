import { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import PostForm from '../../components/PostForm'
import Post from '../../utils/PostAPI'

const Home = () => {
  const [postState, setPostState] = useState({
    title: '',
    body: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
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
                Created by {post.author.username}
              </Typography>
              <hr />
              <Typography variant='h6'>
                {post.body}
              </Typography>
            </Paper>
          ))
        }
      </Paper>
    </Container>
  )
}

export default Home
