import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import OauthRedirect from './components/OauthRedirect'
import EmoteView from './views/EmoteView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import UserListView from './views/UserListView'
import UserEditView from './views/UserEditView'
import EmoteEditView from './views/EmoteEditView'
import EmoteCreateView from './views/EmoteCreateView'
import EmoteListView from './views/EmoteListView'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className={'py-3'}>
        <Container>
          <Route path={'/login'} component={LoginView} />
          <Route path={'/register'} component={RegisterView} />
          <Route path={'/profile'} component={ProfileView} exact />
          <Route path={'/oauth/:name'} component={OauthRedirect} />
          <Route path={'/emote/:id'} component={EmoteView} />
          <Route path={'/admin/userlist'} component={UserListView} />
          <Route path={'/admin/user/:id/edit'} component={UserEditView} />
          <Route path={'/admin/emote/:id/edit'} component={EmoteEditView} />
          <Route path={'/admin/emote/create'} component={EmoteCreateView} />
          <Route path={'/admin/emotelist'} component={EmoteListView} exact />
          <Route path={'/admin/emotelist/:pageNumber'} component={EmoteListView} exact />
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
