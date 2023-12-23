import React from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'
import Post from '../post/Post'
import { Grid } from './Style'
// import { GET_ALL_POSTS } from '../graphql/mutations'
import { GET_ALL_SUBS_POSTS } from '../graphql/subscriptions'

const Posts = ()=> {
  // const {data, loading, error} = useQuery(GET_ALL_POSTS)
  const {data, loading, error} = useSubscription(GET_ALL_SUBS_POSTS)

  if(error) {
    console.error(error)
    return <h3>Oh!, Something Went Wrong.....</h3>
  }
  if(loading) {
    return <h3>Loading...</h3>
  }
    return (
        <Grid>
            {
              data.posts.map((post, index) => (
                <Post index = {index} key={post.id} {...post} />
              ))
            }
        </Grid>
    )
}
export default Posts