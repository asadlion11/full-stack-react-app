import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query MyQuery {
        posts (order_by: {date: desc}, limit: 5) {
            id
            title
            body
            thumbnail
            date
        }
}
`
export const GET_POST = gql`
    query getPost($id: Int) {
        posts(where: {id: {_eq: $id}}) {
        id
        title
        body
        thumbnail
        date
        }
    }
`

