import * as React from 'react';
import { RouteComponentProps, Redirect, Route } from 'react-router';
import 'isomorphic-fetch';
import { AddPlaylist } from './AddPlaylist';
import { EditPlaylist } from './EditPlaylist';



interface AdminPlaylistsProps {

}





interface AdminPlaylistsState {
    loading: boolean;
    songs: Song[];
    stepCounter: number;
    choosenSongId: number;
    replyText: string;
    isRadioBtnDisabled: boolean;
    replyClassName: string;
    isMainAreaVisible: boolean;
    //scoreState: number;
    isAddSongAreaVisible: boolean;
    isToAddSongButtonVisible: boolean;
    isEntryBtnHidden: boolean;
    isNextBtnHidden: boolean;
    isPrevBtnHidden: boolean;
    isEditSongAreaVisible: boolean;
    isToEditSongButtonVisible: boolean;
    choosenPlaylist: string;
    uniquePlaylistNames: string[];
    playlists: Song[];
    collapsePlaylists: boolean;


}




export interface Song {
    id: number;
    _artist: string;
    albumTitle: string;
    songTitle: string;
    songFile: string;
    playlistName: string;
    songFreq: number;
 }



    


export class AdminPlaylists extends React.Component<RouteComponentProps<{}>, AdminPlaylistsState> {
    constructor() {
        super();
        this.state = {
            loading: false,
            songs: [],
            stepCounter: 0,
            choosenSongId: 0,
            replyText: '',
            isRadioBtnDisabled: false,
            replyClassName: '',
            isMainAreaVisible: true,
            //scoreState: 0,
            isAddSongAreaVisible: false,
            isToAddSongButtonVisible: true,
            isEntryBtnHidden: true,
            isNextBtnHidden: true,
            isPrevBtnHidden: false,
            isEditSongAreaVisible: false,
            isToEditSongButtonVisible: true,
            choosenPlaylist: 'BASIC LIST',
            uniquePlaylistNames: [''],
            playlists: [],
            collapsePlaylists: true


        };


        this.nextSong = this.nextSong.bind(this);
        this.addSongArea = this.addSongArea.bind(this);
        this.returnToMainArea = this.returnToMainArea.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.EditSongArea = this.EditSongArea.bind(this);
        this.deletePlaylist = this.deletePlaylist.bind(this);
       
        this.checkIfLastSongOfList = this.checkIfLastSongOfList.bind(this);
        this.checkIfFirstSongOfList = this.checkIfFirstSongOfList.bind(this);
       

        this.loadSpecificPlaylist = this.loadSpecificPlaylist.bind(this);

        this.loadUniquePlaylists = this.loadUniquePlaylists.bind(this);

        this.loadChoosenPlaylist = this.loadChoosenPlaylist.bind(this);

        this.generateUniqePlaylist = this.generateUniqePlaylist.bind(this);



        //laddar in unik lista av befintliga spellistor
        this.loadUniquePlaylists();
        

        //laddar in default spellista
        this.loadSpecificPlaylist();

        
        


    } //konstruktorn slutar här









    public render() {


        let stepCounter = this.state.stepCounter;    //steg-räknare samt anger index på aktuell sång 

        let songStepCount = this.state.stepCounter;  //steg-räknare som anger position för sång i aktuell sånglista


        //renderar unik spellista med html-tags 
        let ulplaylists: JSX.Element[];
        ulplaylists = [];

        for (let i = 0; i <= this.state.uniquePlaylistNames.length - 1; i++) {
            ulplaylists[i] = <button key={i} value={this.state.uniquePlaylistNames[i]} onClick={this.loadChoosenPlaylist}
                className="list-group-item list-group-item-action"  > {this.state.uniquePlaylistNames[i]}</button >;

        }



        let contents = this.state.loading
            ? this.renderPlaylistTable(this.state.songs, stepCounter, songStepCount, ulplaylists)
            : <p><em>Loading...</em></p>;


        return <div> {contents}


        </div>;


    }







    public renderPlaylistTable(songs: Song[], stepCounter1: number, questionStepCount1: number, ulplaylists: JSX.Element[]) {


        return <div>


            <ul className="list-group" hidden={!this.state.isMainAreaVisible}>



                <div className="list-group-item" id="songheadercoloradmin">Song {questionStepCount1 + 1}/{this.state.songs.length}: Playlist {songs[stepCounter1].playlistName}
                </div>



                 <label className="list-group-item">
                    Artist: {songs[stepCounter1]._artist}
                </label>


                <label className="list-group-item">
                   Album Title:  {songs[stepCounter1].albumTitle}
                </label>

                <label className="list-group-item">
                    Song Title: {songs[stepCounter1].songTitle}
                </label>

                <label className="list-group-item">
                    Song File: {songs[stepCounter1].songFile}
                </label>


                <label className="list-group-item">
                    Playlist Name: {songs[stepCounter1].playlistName}
                </label>





                <button hidden={!this.state.isPrevBtnHidden} className="btn-pill btn-danger btn-lg"
                    type="button" onClick={this.prevSong} id="prevbutton">&#65308; Previous</button>



                <button hidden={!this.state.isNextBtnHidden} className="btn-pill btn-sucess btn-lg"
                    type="button" onClick={this.nextSong} id="nextbutton" >Next &#65310;</button>



                <h3 className='messageText'>{this.state.replyText}</h3>



                <button hidden={!this.state.isToAddSongButtonVisible}
                    className="btn-pill btn-sucess btn-lg" type="button"
                    onClick={this.addSongArea} id="toaddsongbutton">To: Add Song</button>

                <button hidden={!this.state.isToEditSongButtonVisible}
                    className="btn-pill btn-sucess btn-lg" type="button"
                    onClick={this.EditSongArea} id="toeditsongbutton">To: Edit Song</button>


                <button hidden={!this.state.isToEditSongButtonVisible}
                    className="btn-pill btn-sucess btn-lg" type="button"
                    onClick={this.deletePlaylist} id="deletesongbutton">Delete Song</button>

            


            {/*  unik lista över spellistor   */}


                <button id="buttonCollapsePlaylistsAdmin" className="btn-pill btn-sucess btn-lg" type="button"
                    onClick={this.onCollapsePlaylists}>Playlists On/Off</button>

            <div  id="adminlistofplaylists"  hidden={this.state.collapsePlaylists}>   

                  

                     <div className="row">

                        <div className="list-group list-group-tf" id="playlistadminprops">
                            {ulplaylists}
                        </div>
                    </div>

           </div>



            </ul>



           

            <div hidden={!this.state.isAddSongAreaVisible}>

                
                <AddPlaylist

                    loadSpecificPlaylist={this.loadSpecificPlaylist.bind(this)}
                    choosenPlaylist={this.state.choosenPlaylist}
                />

              

                <button className="btn btn-danger btn-lg"
                    onClick={this.returnToMainArea} id="backToMainAreaButton"> Back </button>

            </div>





            <div hidden={!this.state.isEditSongAreaVisible}>

                
                <EditPlaylist

                    id={this.state.songs[this.state.stepCounter].id}
                    _artist={this.state.songs[this.state.stepCounter]._artist}
                    albumTitle={this.state.songs[this.state.stepCounter].albumTitle}
                    songTitle={this.state.songs[this.state.stepCounter].songTitle}
                    songFile={this.state.songs[this.state.stepCounter].songFile}
                    playlistName={this.state.songs[this.state.stepCounter].playlistName}
                    songFreq={this.state.songs[this.state.stepCounter].songFreq}
                    
                    loadSpecificPlaylist={this.loadSpecificPlaylist.bind(this)}

                    choosenPlaylist={this.state.choosenPlaylist}
                         
                 />
                


                <button className="btn btn-danger btn-lg"
                    onClick={this.returnToMainArea} id="backToMainAreaButton2"
                    target="_self">Back
                </button>


            </div>




            




        </div>;   //return slutar här



    }   //klass slutar här






    checkIfLastSongOfList() {

        if (this.state.stepCounter + 1 == this.state.songs.length - 1) {  //spellistans längd
            this.setState({ replyText: "Last song in playlist" })

            this.setState({ isNextBtnHidden: false });
            this.setState({ isPrevBtnHidden: true });


        }
    }




    checkIfFirstSongOfList() {

        if (this.state.stepCounter - 1 == 0) {  //början av spellistan
            this.setState({ replyText: "First song in playlist" })

            this.setState({ isNextBtnHidden: true });
            this.setState({ isPrevBtnHidden: false });


        }
    }







    nextSong(event: any) {


        if (this.state.stepCounter == this.state.songs.length - 1) {  //så man inte hamnar utanför arrayen/spellistan
            this.setState({ replyText: "Ooops, outside the playlist, back up a bit :)" })
        }
        else {


            let count = this.state.stepCounter + 1;
            this.setState({ stepCounter: count });


            this.setState({ choosenSongId: 0 });
            this.setState({ replyText: '' });
            this.setState({ isNextBtnHidden: true });
            this.setState({ isPrevBtnHidden: true });
            this.setState({ isEntryBtnHidden: true });

            this.setState({ isRadioBtnDisabled: false });

            this.checkIfLastSongOfList();

        }



    }





    prevSong(event: any) {
        let count = this.state.stepCounter - 1;
        this.setState({ stepCounter: count });


        this.setState({ choosenSongId: 0 });
        this.setState({ replyText: '' });
        this.setState({ isNextBtnHidden: true });
        this.setState({ isPrevBtnHidden: true });
        this.setState({ isEntryBtnHidden: true });

        this.setState({ isRadioBtnDisabled: false });

        this.checkIfFirstSongOfList();

    }



    //används för att ta fram area där man skall lägga till en låt
    addSongArea(event: any) {
        this.setState({ isToAddSongButtonVisible: false });
        this.setState({ isToEditSongButtonVisible: false });
        this.setState({ isNextBtnHidden: false });
        this.setState({ isPrevBtnHidden: false });
        this.setState({ isEntryBtnHidden: false });
        this.setState({ isRadioBtnDisabled: true });
        this.setState({ isMainAreaVisible: false });
        this.setState({ isAddSongAreaVisible: true })
        this.setState({ isEditSongAreaVisible: false })
    }




    // samma som ovan fast för att ändra en låt
    EditSongArea(event: any) {
        this.setState({ isToAddSongButtonVisible: false });
        this.setState({ isToEditSongButtonVisible: true });
        this.setState({ isNextBtnHidden: false });
        this.setState({ isPrevBtnHidden: false });
        this.setState({ isEntryBtnHidden: false });
        this.setState({ isRadioBtnDisabled: true });
        this.setState({ isMainAreaVisible: false });
        this.setState({ isAddSongAreaVisible: false })
        this.setState({ isEditSongAreaVisible: true })

        
        this.state.songs.length + 1;

    }




    //används för att komma tillbaka till arean med låtarna/spellistorna
    returnToMainArea(event: any) {
        let count = this.state.stepCounter;

        let questionUpdate = this.state.songs;
        this.setState({ songs: questionUpdate });

        this.setState({ isAddSongAreaVisible: false });
        this.setState({ isEditSongAreaVisible: false });
        this.setState({ isMainAreaVisible: true });

        this.setState({ replyText: '' });
        this.setState({ isRadioBtnDisabled: false });
        this.setState({ isEntryBtnHidden: true });
        this.setState({ isNextBtnHidden: true });
        this.setState({ isPrevBtnHidden: true });
        this.setState({ isToAddSongButtonVisible: true });
        this.setState({ isToEditSongButtonVisible: true });

        console.log('Return to main area');
    }





    public deletePlaylist() {

        if (this.state.stepCounter == this.state.songs.length - 1) {  //så man inte hamnar utanför arrayen/spellistan
            this.setState({ replyText: "OBS, You deleted the LAST song in the playlist!" })
        }


        try {
            fetch('api/Playlists/' + this.state.songs[this.state.stepCounter].id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        songs: this.state.songs.filter((q) => {
                            return (q.id != this.state.songs[this.state.stepCounter].id);
                        })
                    });

                });
        } catch (e) {
            console.log("Error", e)
        }


    }




      loadSpecificPlaylist() {

        fetch('api/Playlists/GetPlaylists?playlistName=' + this.state.choosenPlaylist)
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                console.log("refreshed database from parent")
                this.setState({ songs: data, loading: true });

            })

            .catch(message => {
                console.log('Error' + message);

            });
       
    }




    

    loadUniquePlaylists() {

        fetch('api/Playlists/Unique')
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                this.setState({
                    playlists: data, loading: true
                });

                this.generateUniqePlaylist();   

                console.log("datadump from unique playlists: ", data)
            })

            .catch(message => {
                console.log('Error' + message);

            });

    }





    //sorterar ut unika spelliste-namn för array med dessa
    generateUniqePlaylist() {
        var Plist = [''];
        var filteredArray = [''];

        // 1. sorterar ut alla spelliste-namn
        for (var i = 0; i < this.state.playlists.length; i++) {

            Plist[i] = this.state.playlists[i].playlistName;

        }

        
        // 2. filtrerar fram unika spellistenamn
        filteredArray = Plist.filter(function (item, pos) {
            return Plist.indexOf(item) == pos;
        });
        this.setState({ uniquePlaylistNames: filteredArray })

        console.log("uniquePlaylistNames-lista: ", this.state.uniquePlaylistNames)

    }





    //laddar den valda spellistan från listan över spellistor
    loadChoosenPlaylist = (event: any) => {
        this.setState({ choosenPlaylist: event.target.value })
        this.loadSpecificPlaylist();
        this.setState({ stepCounter: 0 })

        this.setState({ isNextBtnHidden: true, isPrevBtnHidden: false, replyText: ''})
     }



    //togglar kollaps(collapse)-tabellerna
    onCollapsePlaylists = () => {

        this.setState({ collapsePlaylists: !this.state.collapsePlaylists })

        this.loadUniquePlaylists();
         
        this.setState({ stepCounter: 0 })
        this.setState({ isNextBtnHidden: true, isPrevBtnHidden: false, replyText: ''  })
    }







}  //klass slutar här


