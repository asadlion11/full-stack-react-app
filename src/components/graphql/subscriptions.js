import { gql } from "@apollo/client";

export const GET_ALL_SUBS_POSTS = gql`
    subscription MyQuery {
        posts (order_by: {date: desc}, limit: 5) {
            id
            title
            body
            thumbnail
            date
        }
}
`