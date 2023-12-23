import { gql } from "@apollo/client";

export const GET_POST_INFO = gql`
query MyQuery($id: Int) {
    posts(where: {id: {_eq: $id}}) {
      title
      id
      date
      body
      thumbnail
    }
  }
`
export const REGISTER_POST = gql`
mutation registerPost($title: String, $body: String, $thumbnail: String) {
    insert_posts(objects: {title: $title, body: $body, thumbnail: $thumbnail}) {
      returning {
        id
        title
        body
        thumbnail
      }
    }
  }
`

export const UPDATE_POST = gql`
mutation updatePost( $id : Int $title: String, $body: String, $thumbnail: String) {
    update_posts(where: {id: {_eq: $id}}, _set: {title: $title, body: $body, thumbnail: $thumbnail}) {
      returning {
        id
        title
        body
        thumbnail
      }
    }
  }
  `

  export const DELETE_POST = gql`
  mutation deletePost($id: Int) {
    delete_posts(where: {id: {_eq: $id}}) {
      returning {
        id
        title
        body
        thumbnail
      }
    }
  }
  `