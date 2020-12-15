import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Emote = ({ emote }) => {
  return (
    <Card className={'my-3 p-3 rounded'}>
      <Link to={`/emote/${emote._id}`}>
        <Card.Img src={emote.image} variant='top'/>
      </Link>

      <Card.Body>
        <Link to={`/emote/${emote._id}`}>
          <Card.Title as='div'>
            <strong>{emote.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>${emote.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
  
export default Emote
  