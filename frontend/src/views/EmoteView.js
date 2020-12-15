import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { listEmoteDetails, createEmoteReview } from '../actions/emoteActions'
import { EMOTE_REVIEW_CREATE_RESET } from '../constants/emoteConstants'

const EmoteView = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  
  const dispatch = useDispatch()

  const emoteDetails = useSelector(state => state.emoteDetails)
  const { loading, error, emote } = emoteDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const emoteReviewCreate = useSelector(state => state.emoteReviewCreate)
  const { loading:loadingEmoteReview, success:successEmoteReview, error:errorEmoteReview } = emoteReviewCreate

  useEffect(() => {
    if (successEmoteReview) {
      setRating(0)
      setComment('')
    }
    if (!emote._id || emote._id !== match.params.id) {
      dispatch(listEmoteDetails(match.params.id))
      dispatch({ type: EMOTE_REVIEW_CREATE_RESET })
    }
  }, [dispatch, match, successEmoteReview, emote])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createEmoteReview(match.params.id, {
      rating: rating,
      comment: comment
    }))
  }

  return (
    <>
      <Link className={'btn btn-light my-3'} to='/'>
        Go Back
      </Link>
      {loading ? <Loader/> : error ? <Message>{error}</Message> :
        <>
          <Meta title={emote.name} />
          <Row>
            <Col md={6}>
              <Image src={emote.image} alt={emote.name} fluid/>
            </Col>
            <Col md={3}>
              <ListGroup variant={'flush'}>
                <ListGroup.Item>
                  <h3>{emote.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${emote.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: ${emote.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant={'flush'}>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>${emote.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {emote.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {emote.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control 
                            as={'select'} 
                            value={qty} 
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(emote.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button 
                      className={'btn-block'} 
                      type={'button'} 
                      disabled={emote.countInStock === 0}
                      onClick={null}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {emote.reviews.length === 0 && <Message dismissible={false} variant={'secondary'}>No Reviews</Message>}
              <ListGroup variant={'flush'}>
                {emote.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {userInfo && (
                  <ListGroup.Item>
                    <h2>Write a Review</h2>
                    {successEmoteReview && (
                      <Message variant='success'>
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingEmoteReview && <Loader/>}
                    {errorEmoteReview && <Message>{errorEmoteReview}</Message>}
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId={'rating'}>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as={'select'}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value={''}>Select...</option>
                          <option value={'1'}>1 - Poor</option>
                          <option value={'2'}>2 - Fair</option>
                          <option value={'3'}>3 - Good</option>
                          <option value={'4'}>4 - Very Good</option>
                          <option value={'5'}>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId={'comment'}>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as={'textarea'}
                          row={'3'}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button disabled={loadingEmoteReview} type={'submit'} variant={'primary'}>Submit</Button>
                    </Form>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      }      
    </>
  )
}
        
export default EmoteView