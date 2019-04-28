import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';
import { Song } from './AdminPlaylists'


interface Top10Props {
}

interface Top10State {
    loading: boolean;
    songs: Song[];
    
}





export class Top10 extends React.Component<RouteComponentProps<{}>,  Top10State> {
    constructor() {
        super();
        this.state = {
            loading: false,
            songs: [],
            
        };


        fetch('api/Playlists/GetSongsFreq')
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                this.setState({ songs: data, loading: true });
            });
        
    }

    public render() {


        let contents = this.state.loading
            ? this.renderSongFreqTable(this.state.songs)
            : <p><em>Loading...</em></p>;


        return <div> {contents} </div>;
    }

    public renderSongFreqTable(songs: Song[]) {

        return <table className="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th className="top10headers" scope="col">Freq</th> 
                    <th className="top10headers" scope="col">Title</th>
                    <th className="top10headers" scope="col">Artist</th>
                    <th className="top10headers" scope="col">Album</th>
                    <th className="top10headers" scope="col">Playlist</th>

                </tr>
            </thead>

            <tbody>
                {songs.map(item =>
                    <tr key={item.id}>
                        <td></td>
                        <td>{item.songFreq}</td>  
                        <td>{item.songTitle}</td>
                        <td>{item._artist}</td>
                        <td>{item.albumTitle}</td>
                        <td>{item.playlistName}</td>
                   </tr>
                )}
            </tbody>
        </table>
    }







}


