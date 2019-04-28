import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import { PlayerMachine } from './components/PlayerMachine';
import { AdminPlaylists } from './components/AdminPlaylists';
import { AddPlaylist } from './components/AddPlaylist';
import { EditPlaylist } from './components/EditPlaylist';
import { Top10 } from './components/Top10';


export const routes = <Layout>
    <Route exact path='/PlayerMachine' component={Home} />
    <Route path='/Top10' component={ Top10 } />
    <Route path='/AdminPlaylists' component={ AdminPlaylists } />
</Layout>;
