import axios from 'axios'
const localStorage = window.localStorage

const Comment = {
  create: comment => axios.post('/api/comments', comment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export default Comment
