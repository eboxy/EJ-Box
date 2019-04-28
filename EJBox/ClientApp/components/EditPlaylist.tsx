import * as React from 'react';
import { render } from 'react-dom';
import { Component, EventHandler } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Song } from './AdminPlaylists'



interface EditPlaylistSongProps {

    id: number;
    _artist: string;
    albumTitle: string;
    songTitle: string;
    songFile: string;
    playlistName: string;
    songFreq: number;
    loadSpecificPlaylist: Function;
    choosenPlaylist: string;

}




interface EditPlaylistSongState {


    id: number;
    _artist: string;
    albumTitle: string;
    songTitle: string;
    songFile: string;
    playlistName: string;
    songFreq: number;
    hasFetchedData: boolean;
    loading: boolean

}





export class EditPlaylist extends React.Component<EditPlaylistSongProps, EditPlaylistSongState> {
    public constructor(props: EditPlaylistSongProps) {
        super(props);
        this.state = {
            id: 0,
            _artist: "",
            albumTitle: "",
            songTitle: "",
            songFile: "",
            playlistName: "",
            songFreq: 0,
            hasFetchedData: false,
            loading: false
        };



        this.changeArtist = this.changeArtist.bind(this);
        this.changeAlbumTitle = this.changeAlbumTitle.bind(this);
        this.changeSongTitle = this.changeSongTitle.bind(this);
        this.changeSongFile = this.changeSongFile.bind(this);
        
        this.UpdatePlaylist = this.UpdatePlaylist.bind(this);
        
        this.runAsyncMethods = this.runAsyncMethods.bind(this);
        this.runOtherMethod = this.runOtherMethod.bind(this);

    }






    runOtherMethod() {

        this.runAsyncMethods(Function);
    }

    //köra funktionera i rätt ordning så att allt uppdateras som det skall
    runAsyncMethods(callback: any) {

        setTimeout(() => callback(this.UpdatePlaylist()), 0);

        setTimeout(() => callback(this.props.loadSpecificPlaylist()), 500);
                                             
    }



     componentWillReceiveProps() {


        this.setState({ id: this.props.id });

        this.setState({ _artist: this.props._artist });

        this.setState({ albumTitle: this.props.albumTitle });

        this.setState({ songTitle: this.props.songTitle });

        this.setState({ songFile: this.props.songFile });

        this.setState({ playlistName: this.props.playlistName });

        this.setState({ songFreq: this.props.songFreq });
            

    }








    public render() {
        return (
            <div className="list-group">
                <h1 className="songLabel"><span className="songheadercolor">Change playlist
                    </span></h1>


                <div className="AddSong">
                    <label id="artistlabel"><h3><span className="songitemcolor">Artist</span>
                    </h3></label>

                    <input
                        id="artisttextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state._artist}
                        onChange={this.changeArtist} />
                </div>

                <div className="Song">
                    <label id="albumlabel"><h3><span className="songitemcolor">Album</span></h3>
                    </label>

                    <input
                        id="albumtextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.albumTitle}
                        onChange={this.changeAlbumTitle} />
                </div>

                <div className="Song">
                    <label id="titlelabel"><h3><span className="songitemcolor">Title</span></h3>
                    </label>

                    <input
                        id="titletextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.songTitle}
                        onChange={this.changeSongTitle} />
                </div>


                <div className="Song">
                    <label id="filelabel"><h3><span className="songitemcolor">File</span></h3>
                    </label>

                    <input
                        id="filetextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.songFile}
                        onChange={this.changeSongFile} />
                </div>





                <button id="btnEditSong" className="btm btn-sucess btn-lg" onClick={this.runOtherMethod}>Change song in playlist</button>



            </div>


        )








    }    //render slutar här






    //redundant kod ja, men kom inte på ett sätt att kunna använda properties som metod-argument

    changeArtist(event: any) {

        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9?.()-[]_ ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ _artist: '' })
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






    UpdatePlaylist() {

       fetch('api/Playlists/UpdatePlaylist?id=' + this.state.id + '&_artist=' + this.state._artist + '&albumTitle=' + this.state.albumTitle + '&songTitle=' + this.state.songTitle + '&songFile=' + this.state.songFile + '&playlistName=' + this.props.choosenPlaylist + '&songFreq=' + this.state.songFreq)

            .then(Response => Response.json() as Promise<Song>)

            .then(data => {
                console.log("UpdatePlaylist fired: ", data);

                this.setState({
                    hasFetchedData: false,
                    _artist: "",
                    albumTitle: "",
                    songTitle: "",
                    songFile: "",
                    songFreq: 0

                })
            })


            .catch(message => { console.log('Error' + message); });


    }









}    //klass slutar här






