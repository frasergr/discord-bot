import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createEmote, uploadImageEmote } from '../actions/emoteActions'

const EmoteCreateView = ({ match, history }) => {
  const emoteId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const emoteCreate = useSelector(state => state.emoteCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate } = emoteCreate

  const emoteUploadImage = useSelector(state => state.emoteUploadImage)
  const { loading:loadingUpload, error:errorUpload, success:successUpload, image:uploadedImage } = emoteUploadImage

  useEffect(() => {
    if (successCreate) {
      history.push('/admin/emotelist')
    }
    if (successUpload && uploadedImage) {
      setImage(uploadedImage)
    }
  }, [emoteId, dispatch, history, successCreate, uploadedImage, successUpload])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadImageEmote(formData))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createEmote({
      name,
      image
    }))
  }
  return (
    <>
      <Link to={'/admin/emotelist'} className={'btn btn-light my-3'}>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Emote</h1>
        {loadingCreate && <Loader/>}
        {errorCreate && <Message>{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId={'name'}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type={'text'}
              placeholder={'Enter name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId={'image'}>
            <Form.File 
              id={'image-file'} 
              label={'Upload Image'} 
              onChange={uploadFileHandler}
              required
            />
            {loadingUpload && <Loader/>}
            {errorUpload && <Message>{errorUpload}</Message>}
          </Form.Group>

          <Button type={'submit'} variant={'success'}>Save</Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default EmoteCreateView
