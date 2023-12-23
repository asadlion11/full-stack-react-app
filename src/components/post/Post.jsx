import React from 'react'
import { Card, CardInfo, Category, Title } from './Style'

const Post = ({index, id, title, body, thumbnail, date}) => {
  return (
    <Card to={`/post/${id}`} thumbnail = {thumbnail} index = {index}>
      <CardInfo >
        <Category> <span>Post</span></Category>
        <Title>{title}</Title>
        {
          index == 0 && <div>
          <span>Asad </span>
          <span>{new Date(date).toDateString()}</span>
          </div>
        }
      </CardInfo>
    </Card>
  )
}

export default Post