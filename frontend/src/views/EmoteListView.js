import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Modal, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listEmotes, deleteEmote as deleteEmoteAction } from '../actions/emoteActions'
import { EMOTE_CREATE_RESET } from '../constants/emoteConstants'

const EmoteListView = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const [showEmoteDeleteModal, setShowEmoteDeleteModal] = useState(false)
  const [deleteEmote, setDeleteEmote] = useState(null)

  const dispatch = useDispatch()

  const emoteList = useSelector(state => state.emoteList)
  const { loading, error, emotes, page, pages } = emoteList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const emoteDelete = useSelector(state => state.emoteDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = emoteDelete

  const emoteCreate = useSelector(state => state.emoteCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, emote:createdEmote } = emoteCreate

  useEffect(() => {
    dispatch({ type: EMOTE_CREATE_RESET })
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/emote/${createdEmote._id}/edit`)
    } else {
      dispatch(listEmotes('', pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, createdEmote, successCreate, pageNumber])

  const deleteHandler = (emote) => {
    setDeleteEmote(emote)
    setShowEmoteDeleteModal(true)
  }
  const handleCloseEmoteDeleteModal = () => setShowEmoteDeleteModal(false)

  const handleAcceptEmoteDeleteModal = () => {
    dispatch(deleteEmoteAction(deleteEmote._id))
    setShowEmoteDeleteModal(false)
  }

  return (
    <>
      <Row className={'align-items-center'}>
        <Col>
          <h1>Emotes</h1>
        </Col>
        <Col className={'text-right'}>
          <LinkContainer to={`/admin/emote/create`}>
            <Button className={'my-3'}>
              <i className={'fas fa-plus'}></i> Create Emote
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          {loadingDelete && <Loader/>}
          {errorDelete && <Message>{errorDelete}</Message>}
          {loadingCreate && <Loader/>}
          {errorCreate && <Message>{errorCreate}</Message>}
          {loading ? <Loader/> : error ? <Message>{error}</Message> : (
            <>
              <Table striped bordered hover responsive className={'table-sm'}>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {emotes.map(emote => (
                    <tr key={emote._id}>
                      <td>{emote.name}</td>
                      <td width='10%'>
                        <a target='_blank' rel="noopener noreferrer" href={`${emote.image}`}>
                          <Button variant={'light'} className={'btn-sm'}>
                            <i className={'fas fa-eye'}></i>
                          </Button>
                        </a>
                        <LinkContainer to={`/admin/emote/${emote._id}/edit`}>
                          <Button variant={'light'} className={'btn-sm'}>
                            <i className={'fas fa-edit'}></i>
                          </Button>
                        </LinkContainer>
                        <Button variant={'danger'} className={'btn-sm'} onClick={() => deleteHandler(emote)}>
                          <i className={'fas fa-trash'}></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate page={page} pages={pages} isAdmin={userInfo.isAdmin} />
            </>
          )}
        </Col>
      </Row>
      <Modal show={showEmoteDeleteModal} onHide={handleCloseEmoteDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete emote</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the emote {deleteEmote?.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmoteDeleteModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleAcceptEmoteDeleteModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EmoteListView
