import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductView from './views/ProductView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import UserListView from './views/UserListView'
import UserEditView from './views/UserEditView'
import ProductEditView from './views/ProductEditView'
import ProductListView from './views/ProductListView'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className={'py-3'}>
        <Container>
          <Route path={'/login'} component={LoginView} />
          <Route path={'/register'} component={RegisterView} />
          <Route path={'/profile'} component={ProfileView} />
          <Route path={'/product/:id'} component={ProductView} />
          <Route path={'/admin/userlist'} component={UserListView} />
          <Route path={'/admin/user/:id/edit'} component={UserEditView} />
          <Route path={'/admin/product/:id/edit'} component={ProductEditView} />
          <Route path={'/admin/productlist'} component={ProductListView} exact />
          <Route path={'/admin/productlist/:pageNumber'} component={ProductListView} exact />
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
