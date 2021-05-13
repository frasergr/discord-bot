import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Discord from '../components/Discord'
import { getUserDetails, updateUserProfile, getUserOauth } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileView = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null) 

  const userDetails = useSelector(state => state.userDetails)
  const { loading, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success, error } = userUpdateProfile

  const userOauthList = useSelector(state => state.userOauthList)
  const { oauth } = userOauthList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name || user.name)
        setEmail(user.email || user.email)
        if (!oauth) {
          dispatch(getUserOauth())
        }
      }
    }
  }, [dispatch, history, userInfo, user, userLogin, oauth])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      {userInfo && <>
        <Col md={6}>
          <h2>User Profile</h2>

          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          {success && <Message variant={'success'} hideAfter={5}>Profile Updated</Message>}
          {loading && <Loader/>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId={'name'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={'name'}
                placeholder={'Enter name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId={'email'}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type={'email'}
                placeholder={'Enter email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId={'password'}>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type={'password'}
                placeholder={'Enter password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId={'confirmPassword'}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type={'password'}
                placeholder={'Confirm password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type={'submit'} variant={'primary'}>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Linked Accounts</h2>
          <Discord/>
        </Col>
      </>}
    </Row>
  )
}

export default ProfileView