import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Modal } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser as deleteUserAction } from '../actions/userActions'

const UserListView = ({ history }) => {
  const [showUserDeleteModal, setShowUserDeleteModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState(null)

  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success:successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (user) => {
    setDeleteUser(user)
    setShowUserDeleteModal(true)
  }
  const handleCloseUserDeleteModal = () => setShowUserDeleteModal(false)

  const handleAcceptUserDeleteModal = () => {
    dispatch(deleteUserAction(deleteUser._id))
    setShowUserDeleteModal(false)
  }
  return (
    <>
      <h1>Users</h1>
      {loading ? <Loader/> : error ? <Message>{error}</Message> : (
        <Table striped bordered hover responsive className={'table-sm'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? 
                    <i className={'fas fa-check'} style={{ color: 'green' }}></i> : 
                    <i className={'fas fa-times'} style={{ color: 'red' }}></i> }
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant={'light'} className={'btn-sm'}>
                      <i className={'fas fa-edit'}></i>
                    </Button>
                  </LinkContainer>
                  <Button variant={'danger'} className={'btn-sm'} onClick={() => deleteHandler(user)}>
                    <i className={'fas fa-trash'}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showUserDeleteModal} onHide={handleCloseUserDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the user {deleteUser?.email}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserDeleteModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleAcceptUserDeleteModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserListView
