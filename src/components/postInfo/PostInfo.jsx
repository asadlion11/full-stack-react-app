import { Cache, gql, useMutation, useQuery } from "@apollo/client"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Category, Info, InfoContent, InfoThumbnail, InfoTitle, PostInfoCard, PostInfoMisc, Title } from "../post/Style"
import { DELETE_POST, GET_POST_INFO } from "../graphql/mutations"
import { GET_ALL_SUBS_POSTS } from "../graphql/subscriptions"
import { GET_ALL_POSTS } from "../graphql/queries"

const PostInfo = () => {
const {id} = useParams()

const {data, loading, error} = useQuery(GET_POST_INFO, {variables: {id: id}})
const [deletePost] = useMutation(DELETE_POST)

const navigate = useNavigate()
if(error) {
    console.error(error)
    return <h1>Oh!, Something Went Wrong.....</h1>
  }
  if(loading) {
    return <h1>Loading...</h1>
  }
  const {title, body, thumbnail, date} = data.posts[0]
  const handleDelete = ()=> {
    if(!confirm('Are you sure you want to delete this post?')) return
    const {data, loading, err} = deletePost({variables: {id: id}, 
      update(cache, {data: {deletePost}}) {
        const {posts} = cache.readQuery({
          query: GET_ALL_POSTS
        })
        cache.writeQuery({
          query: GET_ALL_POSTS,
          data: {
            posts: posts.filter((currentPost)=> currentPost.id != id)
          }
        })
      }
    })
    if(!err) {
      alert('Succefully deleted')
      navigate('/')
    }
  }
  return (
    <PostInfoCard>
        <InfoThumbnail src = {thumbnail} />
        <InfoTitle>{title}</InfoTitle>
        <PostInfoMisc>
            <Category>
                <span>Post</span>
            </Category>
            <Info>
                <p>By Asad at {new Date(date).toDateString()}</p>
            </Info>
        </PostInfoMisc>
        <InfoContent dangerouslySetInnerHTML={{__html:body}}></InfoContent>
        <Link to = {`/new-post/${id}`}>
            <Button>Update</Button>
        </Link>
        <Button style= {{background: 'red'}} onClick={handleDelete}>Delete</Button>
    </PostInfoCard>
  )
}

export default PostInfo  