import * as React from 'react';
import { render } from 'react-dom';
import { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Song } from './AdminPlaylists';



interface IAddPlaylistSongProps {

    loadSpecificPlaylist: Function;
    choosenPlaylist: string;
    }




interface IAddPlaylistSongState {
    id: Number;
    _artist: string;
    albumTitle: string;
    songTitle: string;
    songFile: string;
    playlistName: string;
    hasFetchedData: boolean;
    loading: boolean;
    isPropUsed: boolean;
}






export class AddPlaylist extends React.Component<IAddPlaylistSongProps, IAddPlaylistSongState> {
    public constructor(props: IAddPlaylistSongProps) {
        super(props);
        this.state = {
            id: 0,
            _artist:'',
            albumTitle: '',
            songTitle: '',
            songFile:'',
            playlistName: '',
            hasFetchedData: false,
            loading: false,
            isPropUsed: false




        };
        this.changeArtist = this.changeArtist.bind(this);
        this.changeAlbumTitle = this.changeAlbumTitle.bind(this);
        this.changeSongTitle = this.changeSongTitle.bind(this);
        this.changeSongFile = this.changeSongFile.bind(this);
        this.changePlaylistName = this.changePlaylistName.bind(this);
        

        this.addPlaylist = this.addPlaylist.bind(this);
        
        this.runAsyncMethods = this.runAsyncMethods.bind(this);

        this.runOtherMethod = this.runOtherMethod.bind(this);

    }



    runOtherMethod() {

        this.runAsyncMethods(Function);
    }


    //köra funktionera i rätt ordning så att allt uppdateras som det skall
    runAsyncMethods(callback: any) {

        setTimeout(() => callback(this.addPlaylist()), 0);

        setTimeout(() => callback(this.props.loadSpecificPlaylist()), 500);

    }







    public render() {
        return (
            <div className="list-group">
                <h1 className="artistLabel"><span className="songheadercolor">Add playlist/song</span></h1>

                <div className="AddSong">
                    <label id="artistlabel"><h3><span className="songitemcolor">Artist</span></h3></label>
                
                    <input
                        id="artisttextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state._artist}
                        onChange={this.changeArtist} />
                </div>

                <div className="Song">
                    <label id="albumlabel"><h3><span className="songitemcolor">Album</span></h3></label>

                    <input
                        id="albumtextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.albumTitle}
                        onChange={this.changeAlbumTitle} />
                </div>

                <div className="Song">
                    <label id="titlelabel"><h3><span className="songitemcolor">Title</span></h3></label>

                    <input
                        id="titletextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.songTitle}
                        onChange={this.changeSongTitle} />
                </div>


                <div className="Song">
                    <label id="filelabel"><h3><span className="songitemcolor">File</span></h3></label>

                    <input
                        id="filetextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.songFile}
                        onChange={this.changeSongFile} />
                </div>



               

                <div className="Song">
                    <label id="playlistlabel"><h3><span className="songitemcolor">Playlist</span></h3></label>
                    <label id="playlistlabel2"><h5><span className="songitemcolor">To add current playlist, press 'p'</span></h5></label>

                    <input
                        id="playlisttextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.playlistName}
                        onChange={this.changePlaylistName} /> 
                                        
                </div>


               


                <button id="btnAddSong" className="btm btn-sucess btn-lg" onClick={this.runOtherMethod}>Add song to playlist</button>


            </div>
        )
    }









    //redundant kod ja, men kom inte på ett sätt att kunna använda properties (_question et.al) som metod-argument

    changeArtist(event: any) {

        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9?.()-[]_ ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({  _artist: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ _artist: event.target.value })
        }

    }



    changeAlbumTitle(event: any) {

        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9?.()-[]_ ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ albumTitle: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ albumTitle: event.target.value })

        }

    }


    

    changeSongTitle(event: any) {
        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9?.()-[]_ ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ songTitle: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ songTitle: event.target.value })
        }

    }



    changeSongFile(event: any) {
        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9?.()-[]_ ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ songFile: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ songFile: event.target.value })
        }

    }




   

    changePlaylistName(event: any) {
        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9?.()-[]_ ]/g;
        if (event.target.value == 'p') {  //skriv 'p' för att få fram vald spellista
            this.setState({ playlistName: this.props.choosenPlaylist })
            
        }
        else if (event.target.value == regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ playlistName: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ playlistName: event.target.value })
            
        }

    }






    addPlaylist() {


        fetch('api/Playlists/CreatePlaylist?_artist=' + this.state._artist + '&albumTitle=' + this.state.albumTitle + '&songTitle=' + this.state.songTitle + '&songFile=' + this.state.songFile + '&playlistName=' + this.state.playlistName)
            .then(response => response.json() as Promise<Song[]>)


            .then(data => {
                console.log("add song fired: ", data);
                this.setState({
                    hasFetchedData: false,
                    _artist: "",
                    albumTitle: "",
                    songTitle: "",
                    songFile: "",
                    playlistName: ""
                })
            })

            .catch(message => { console.log('Error' + message); });


    }









} //class ends here

