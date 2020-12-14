import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Modal, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct as deleteProductAction, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListView = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState(null)

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, createdProduct, successCreate, pageNumber])

  const deleteHandler = (product) => {
    setDeleteProduct(product)
    setShowProductDeleteModal(true)
  }
  const handleCloseProductDeleteModal = () => setShowProductDeleteModal(false)

  const handleAcceptProductDeleteModal = () => {
    dispatch(deleteProductAction(deleteProduct._id))
    setShowProductDeleteModal(false)
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      <Row className={'align-items-center'}>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className={'text-right'}>
          <Button className={'my-3'} onClick={createProductHandler}>
            <i className={'fas fa-plus'}></i> Create Product
          </Button>
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
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant={'light'} className={'btn-sm'}>
                            <i className={'fas fa-edit'}></i>
                          </Button>
                        </LinkContainer>
                        <Button variant={'danger'} className={'btn-sm'} onClick={() => deleteHandler(product)}>
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
      <Modal show={showProductDeleteModal} onHide={handleCloseProductDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the product {deleteProduct?.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProductDeleteModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleAcceptProductDeleteModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductListView
