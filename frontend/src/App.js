import React from 'react';
import {Route, Switch} from "react-router-dom";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import Layout from "./components/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistoriesPage from "./containers/TrackHistoriesPage/TrackHistoriesPage";
import AddArtistPage from "./containers/AddArtistPage/AddArtistPage";
import AddAlbumPage from "./containers/AddAlbumPage/AddAlbumPage";
import AddTrackPage from "./containers/AddTrackPage/AddTrackPage";
import AdminPage from "./containers/AdminPage/AdminPage";

const App = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path='/' exact component={ArtistsPage}/>
          <Route path='/admin/list' exact component={AdminPage}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/login' exact component={Login} />
          <Route path='/artists/add' exact component={AddArtistPage} />
          <Route path='/albums/add' exact component={AddAlbumPage} />
          <Route path='/albums/:id' component={AlbumsPage}/>
          <Route path='/tracks/add' component={AddTrackPage}/>
          <Route path='/tracks/:id' component={TracksPage}/>
          <Route path='/trackHistories' exact component={TrackHistoriesPage} />
        </Switch>
      </Layout>
    </>
  );
};

export default App;