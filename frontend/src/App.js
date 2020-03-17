import React from 'react';
import {Route, Switch} from "react-router-dom";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import Layout from "./components/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const App = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path='/' exact component={ArtistsPage}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/login' exact component={Login} />
          <Route path='/albums/:id' exact component={AlbumsPage}/>
          <Route path='/tracks/:id' exact component={TracksPage}/>
        </Switch>
      </Layout>
    </>
  );
};

export default App;