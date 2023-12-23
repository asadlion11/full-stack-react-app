import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Posts from './components/posts/Posts.jsx'
import NewPost from './components/newPost/NewPost.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyle.js'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo.js'
import PostInfo from './components/postInfo/PostInfo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2>Error 404 </h2>,
    children: [
      {
        path: '/',
        element: <Posts />,
        index: true
      },
      {
        path: '/posts',
        element: <Posts />
      },
      {
        path: '/new-post',
        element: <NewPost />
      },
      {
        path: '/new-post/:id',
        element: <NewPost />
      },
      {
        path: '/post/:id',
        element: <PostInfo />
      }
    
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client} > 
    <RouterProvider router = {router}/>
    <GlobalStyle />
    </ApolloProvider>
  </React.StrictMode>
)
