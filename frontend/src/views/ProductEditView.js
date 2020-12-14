import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct, uploadImageProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditView = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate

  const productUploadImage = useSelector(state => state.productUploadImage)
  const { loading:loadingUpload, error:errorUpload, success:successUpload, image:uploadedImage } = productUploadImage

  useEffect(() => {
    dispatch({ type: PRODUCT_UPDATE_RESET })
    if (successUpdate) {
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
      }
    }
    if (successUpload && uploadedImage) {
      setImage(uploadedImage)
    }
  }, [product, productId, dispatch, history, successUpdate, uploadedImage, successUpload])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadImageProduct(formData))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ 
      _id: productId, 
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock
    }))
  }
  return (
    <>
      <Link to={'/admin/productlist'} className={'btn btn-light my-3'}>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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

            <Form.Group controlId={'price'}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type={'number'}
                placeholder={'Enter price'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={'description'}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type={'description'}
                placeholder={'Enter description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            <Form.Group controlId={'brand'}>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type={'text'}
                placeholder={'Enter brand'}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={'category'}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type={'text'}
                placeholder={'Enter category'}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={'countinstock'}>
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type={'number'}
                placeholder={'Count in stock'}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Button type={'submit'} variant={'primary'}>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditView
