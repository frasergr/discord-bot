import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listEmoteDetails, updateEmote, uploadImageEmote } from '../actions/emoteActions'
import { EMOTE_UPDATE_RESET } from '../constants/emoteConstants'

const EmoteEditView = ({ match, history }) => {
  const emoteId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const emoteDetails = useSelector(state => state.emoteDetails)
  const { loading, error, emote } = emoteDetails

  const emoteUpdate = useSelector(state => state.emoteUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = emoteUpdate

  const emoteUploadImage = useSelector(state => state.emoteUploadImage)
  const { loading:loadingUpload, error:errorUpload, success:successUpload, image:uploadedImage } = emoteUploadImage

  useEffect(() => {
    dispatch({ type: EMOTE_UPDATE_RESET })
    if (successUpdate) {
      history.push('/admin/emotelist')
    } else {
      if (!emote.name || emote._id !== emoteId) {
        dispatch(listEmoteDetails(emoteId))
      } else {
        setName(emote.name)
        setImage(emote.image)
      }
    }
    if (successUpload && uploadedImage) {
      setImage(uploadedImage)
    }
  }, [emote, emoteId, dispatch, history, successUpdate, uploadedImage, successUpload])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadImageEmote(formData))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateEmote({ 
      _id: emoteId, 
      name,
      image,
    }))
  }
  return (
    <>
      <Link to={'/admin/emotelist'} className={'btn btn-light my-3'}>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Emote</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId={'name'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={'text'}
                placeholder={'Enter name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={'image'}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type={'text'}
                placeholder={'Add image'}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File id={'image-file'} label={'Choose File'} custom onChange={uploadFileHandler}/>
              {loadingUpload && <Loader/>}
              {errorUpload && <Message>{errorUpload}</Message>}
            </Form.Group>

            <Button type={'submit'} variant={'primary'}>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EmoteEditView
