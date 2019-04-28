import * as React from 'react';
import ReactPlayer from 'react-player';
import { Song } from './AdminPlaylists';



interface playerMachineProps {

}


interface playerMachineState {
    url: string[];
    urlIP: string;
    fileExtension: string;
    playing: boolean;
    volume: number;
    muted: boolean;
    played: number;
    loaded: number;
    duration: number;
    playbackRate: number;
    loop: boolean;
    seeking: boolean;
    playListIndex: number;
    messageText: string;
    maxLengthSongNo: number;
    collapseStateArea: boolean;
    collapsePlaylists: boolean;
    collapsePlaylistSongs: boolean;
    songs: Song[];
    playlists: Song[];
    loading: boolean;
    isNextButtonHidden: boolean;
    isPrevButtonHidden: boolean;
    maxLengthSongTextbox: number;
    playedSongFreq: number;
    hasFetchedData: boolean;
    choosenPlaylist: string;
    uniquePlaylistNames: string[];
    collapsTable1: string;
    collapsTable2: string;
    collapsTable3: string;
    discogsApiResult: string;
    
    
    
};









export class PlayerMachine extends React.Component<playerMachineProps, playerMachineState> {

    player: any
    instance: any;


    constructor(props: playerMachineProps) {
        super(props);
        this.state = {
            url: [],
            urlIP: 'http://127.0.0.1:8887/',
            fileExtension: '.mp3',
            playing: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            seeking: false,
            playListIndex: 0,
            messageText: '',
            maxLengthSongNo: 3,
            collapseStateArea: true,
            collapsePlaylists: true,
            collapsePlaylistSongs: true,
            songs: [],
            playlists: [],
            loading: false,
            isNextButtonHidden: false,
            isPrevButtonHidden: true,
            maxLengthSongTextbox: 50,
            playedSongFreq: 0,
            hasFetchedData: false,
            choosenPlaylist: 'BASIC LIST',
            uniquePlaylistNames: [''],
            collapsTable1: 'collapsTable1',
            collapsTable2: 'collapsTable3',
            collapsTable3: 'collapsTable5',
            discogsApiResult: ''
            
            
        }


        this.msToTime = this.msToTime.bind(this);
        this.addPlayedSongFreqToDb = this.addPlayedSongFreqToDb.bind(this);
        
        this.loadSpecificPlaylist = this.loadSpecificPlaylist.bind(this);
        this.loadUniquePlaylists = this.loadUniquePlaylists.bind(this);

        this.loadChoosenPlaylist = this.loadChoosenPlaylist.bind(this);

        this.generateUniqePlaylist = this.generateUniqePlaylist.bind(this);

        //metod som anropar discogs-API
        this.getGenreFromDiscogsAPI = this.getGenreFromDiscogsAPI.bind(this);
       

        //laddar in unik lista av befintliga spellistor
        this.loadUniquePlaylists();


        //laddar in default spellista
        this.loadSpecificPlaylist();        
        
        
    }  //konstruktor slutar här






    public render() {

        const { url, urlIP, fileExtension, playing, volume, muted, played, loaded, duration, playbackRate, loop, playListIndex, messageText, maxLengthSongNo, songs, playlists, collapseStateArea, isNextButtonHidden, isPrevButtonHidden, maxLengthSongTextbox, discogsApiResult } = this.state


        let playlist = [''];
        let count = 0;
        let count2 = 0;
        let count3 = 0;
        

        let tuneNumber = [1];
        let tuneArtist = [''];
        let tuneAlbum = [''];
        let tuneTitle = [''];
        let tunePlaylist = [''];
        let listOfPlaylists = [''];

        let playlistSongs: JSX.Element[];
        playlistSongs = []; 

        let result = discogsApiResult.toString();

            //discogsApiResult;
       


        //renderar unik spellista med html-tags
        let ulplaylists: JSX.Element[];
        ulplaylists = [];
        
        for (count2 = 0; count2 <= this.state.uniquePlaylistNames.length - 1; count2++) {
            ulplaylists[count2] = <button key={count2} value={this.state.uniquePlaylistNames[count2]} onClick={this.loadChoosenPlaylist}
                className="list-group-item list-group-item-action"  > {this.state.uniquePlaylistNames[count2]}</button >;
            
        }




        //vald spellistas låtar i en egen lista   
        for (count = 0; count <= songs.length - 1; count++) {
            playlistSongs[count] = < button key={count} value={count}  onClick = { this.loadChoosenPlaylistSong }  className="list-group-item list-group-item-action" > {songs[count]._artist} - {songs[count].songTitle} </button >;
        }
        



        //upplägg av spellistorna
        let contents = this.state.loading
            ? this.renderPlaylistTable(ulplaylists, playlistSongs)
            : <p><em>Loading...</em></p>;



        //hämtad data laddas in
        for (count3 = 0; count3 <= songs.length - 1; count3++) {
            playlist[count3] = urlIP + songs[count3].songFile + fileExtension;

            tuneNumber.push(count3 + 2);
            tuneArtist[count3] = songs[count3]._artist;
            tuneAlbum[count3] = songs[count3].albumTitle;
            tuneTitle[count3] = songs[count3].songTitle;
            tunePlaylist[count3] = songs[count3].playlistName;


        }



        this.playlistProp = playlist;



        //rendering av bla child-komponenter!!
        return <div>


           
        <ReactPlayer
                ref={this.ref}
                playing={playing}
                url={playlist[playListIndex]}
                onPlay={this.onPlay}
                onPause={this.onPause}
                volume={volume}
                // controls={true}   inhemska mp3-kontroller för test å jämförelse   
                onBuffer={() => console.log('onBuffer')}
                onDuration={this.onDuration}
                onProgress={this.onProgress}
                muted={muted}
                className='react-player'  //styling     
                width='100%'
                height='100%'
                onEnded={this.onEnded}  
                onStart={() => console.log('onStart')}     
                onReady={() => console.log('onReady')}     
                loop={loop}

            />





            <table>

                {/* ..................Textrutor .......................................    */}


                <tbody id="psGrp1">

                        <tr>
                            <th>
                                <label id="playlistNmbSonglabel" className="headercolor_textboxes" htmlFor='playlistNmbSong'>#Song</label>
                            </th>
                            <th>
                                <label id="playlistArtistlabel" className="headercolor_textboxes" htmlFor='playlistArtist'>Artist</label>
                            </th>
                            <th>
                                <label id="playlistAlbumlabel" className="headercolor_textboxes" htmlFor='playlistAlbum'>Album</label>
                            </th>
                            <th>
                                <label id="playlistSongTitlelabel" className="headercolor_textboxes" htmlFor='playlistSongTitle'>Title</label>
                            </th>
                            <th>
                                <label id="playlistNamelabel" className="headercolor_textboxes" htmlFor='playlistName'>Playlist</label>
                            </th>
                        </tr>


                        <tr>
                            <td>
                                <input id="playlistNmbSong" type="text" value={tuneNumber[playListIndex]} maxLength={maxLengthSongNo} readOnly />

                                <span id="fatBackSlash" className="headercolor_textboxes">  /  </span>

                                <input id="playlistNmbSongLength" type="text" value={tuneNumber.length -1 } maxLength={maxLengthSongNo} readOnly />

                            </td>
                            <td>
                                <input id="playlistArtist" className="playlistTextboxes" type="text" value={tuneArtist[playListIndex]} maxLength={maxLengthSongTextbox} readOnly />
                            </td>
                            <td>
                                <input id="playlistAlbum" className="playlistTextboxes" type="text" value={tuneAlbum[playListIndex]} maxLength={maxLengthSongTextbox} readOnly />
                            </td>
                            <td>
                                <input id="playlistSongTitle" type="text" value={tuneTitle[playListIndex]} maxLength={maxLengthSongTextbox} readOnly />
                            </td>
                            <td>
                                <input id="playlistName" className="playlistTextboxes" type="text" value={tunePlaylist[playListIndex]} maxLength={maxLengthSongTextbox} readOnly />
                            </td>
                        </tr>


                </tbody>







                {/* .................. Kontroll-knappar .......................................    */}



                <tbody id="psGrp2">
                        <tr>
                            <th className="headercolor_textboxes">Controls</th>
                            <td>

                                <button id="mutebutton" className="btn-pill btn-sucess btn" type="button"  onClick={this.toggleMuted}> Mute </button>
                                <button id="backbutton" className="btn-pill btn-sucess btn" type="button" hidden={isPrevButtonHidden} onClick={this.onBackward}> &#65308;&#65308; </button>
                                <button id="stopbutton" className="btn-pill btn-sucess btn" type="button" onClick={this.stop}> Stop </button>
                                <button id="playpausebutton" className="btn-pill btn-sucess btn" type="button" onClick={this.playPause}>{playing ? ' Pause ' : ' Play '}</button>
                                <button id="nexxtbutton" className="btn-pill btn-sucess btn" type="button" hidden={isNextButtonHidden} onClick={this.onForward}>  &#65310;&#65310; </button>

                            </td>

                        </tr>
                </tbody>









                <tbody id="psGrp3">

                        <tr>
                       
                            <th className="headercolor_textboxes">API-Data</th>

                        <td className="headercolor_textboxes ctrlpos2">
                            <input id="apiData" type="text" value={result} maxLength={maxLengthSongTextbox} readOnly />
                            </td>

                        </tr> 


                        <tr>
                            <th className="headercolor_textboxes">Elapsed</th>

                           <td className="headercolor_textboxes ctrlpos2">

                                {/*  visar hur länge låten har spelats */}

                                {this.msToTime((duration * played * 1000).toFixed(0))}

                            </td>
                        </tr>



                        <tr>
                            <th className="headercolor_textboxes">Duration</th>
                        <td className="headercolor_textboxes ctrlpos2">

                                {/*  visar låtens längd */}

                                {this.msToTime((duration * 1000).toFixed(0))}

                            </td>

                        </tr>



                        <tr>
                        <th className="headercolor_textboxes">Seek</th>
                        <td>
                               <input id="seek" className="ctrlpos"
                                    type='range' min={0} max={1} step='any'
                                    value={played}
                                    onMouseDown={this.onSeekMouseDown}
                                    onChange={this.onSeekChange}
                                    onMouseUp={this.onSeekMouseUp}
                                />
                            </td>
                        </tr>






                        <tr>
                        <th className="headercolor_textboxes">Volume</th>
                        <td>
                            <input id="volume" className="ctrlpos" type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
                            </td>
                        </tr>


                
                        <tr>
                            <th className="headercolor_textboxes">
                                <label htmlFor='loop'>Loop</label>
                            </th>
                            <td>
                            <input id='loop' className="ctrlpos" type='checkbox' checked={loop} onChange={this.toggleLoop} />
                            </td>
                        </tr>
               



                        <tr>
                            <th className="headercolor_textboxes">
                                <label htmlFor='messageText'>Message</label>
                            </th>
                            <td>

                            <h4 className='messageText ctrlpos3'>{messageText}</h4>
                            </td>
                        </tr>



                        <tr>
                            <th className="headercolor_textboxes">Played</th>
                            <td className="ctrlpos"><progress max={1} value={played} /></td>
                        </tr>



                        <tr>
                            <th className="headercolor_textboxes">Loaded</th>
                            <td className="ctrlpos"><progress max={1} value={loaded} /></td>
                        </tr>

                </tbody>



            </table >






            {/*  placering av spellistorna     */}
            {contents}



        </div>;


    }




       //spellistor, dess låtar, states, allt i dragspelsstuk :-P
       public renderPlaylistTable(ulplaylists: JSX.Element[], playlistSongs: JSX.Element[]) {

            
        return <div>


           <table>


                <tbody id="psGrp4">

                        <tr>


                            {/*   Dragspel. del 1: spelliste-listan   */}


                             <td>
                                <button className={this.state.collapsTable1} onClick={this.onCollapsePlaylists}><b>Playlists</b></button>
                         


                        
                                <div hidden={this.state.collapsePlaylists}>   


                                    <div className="panel panel-default">

                  

                                            <div className="panel-body">

                                                <div className="row">

                                                    <div className="list-group list-group-tf">
                                                        {ulplaylists}
                                                    </div>
                                                </div>
                                            </div>



                  
                                    </div>
                                </div>
                           </td>

                      </tr>



                <tr> 
                            {/*   Dragspel. del 2:  den ovan valda spellistans låtar   */}

                        <td>

                                <button className={this.state.collapsTable2} onClick={this.onCollapsePlaylistSongs}><b>Playlist Songs</b></button>
                        

                            <div hidden={this.state.collapsePlaylistSongs}>


                                <div className="panel panel-default">



                                    <div className="panel-body">

                                        <div className="row">

                                            <div className="list-group list-group-tf2">
                                                {playlistSongs}
                                            </div>
                                        </div>
                                    </div>




                                </div>
                            </div>
            
                    </td>

               </tr>



                 <tr>


                            {/*   Dragspel. del 3: xtra fakta om vissa av elementens data aka states */}


                            <td>
                                    <button className={this.state.collapsTable3} onClick={this.onCollapseStateArea}><b>State</b></button>
                            

                                    <div hidden={this.state.collapseStateArea}>


                                    <div className="panel panel-default">



                                        <div className="panel-body">

                                            <div className="row">

                                                <div className="list-group list-group-tf">

                                                    <table><tbody>


                                                        <tr>
                                                            <th>Volume</th>
                                                            <td>{this.state.volume.toFixed(3)}</td>
                                                        </tr>


                                                        <tr>
                                                            <th>Played</th>
                                                            <td>{this.state.played.toFixed(3)}</td>
                                                        </tr>


                                                        <tr>
                                                            <th>Loaded</th>
                                                            <td>{this.state.loaded.toFixed(3)}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Remaining</th>
                                                            <td> {this.msToTime((this.state.duration * ((1 - this.state.played) * 1000)).toFixed(0))} </td>

                                                        </tr>


                                                    </tbody></table>


                                                </div>
                                            </div>
                                        </div>




                                   </div>
                               </div>

                      
                            
                        </td>        
                            
                    </tr>



                </tbody>


            </table>






        </div>;  //renderPlaylistTable - return slutar här  
        
}





    //eventhandlers(properties) och metoder

    load = (url: any) => {
        this.setState({
            url,
            played: 0,
            loaded: 0,

        })
    }


    onSeekChange = (e: any) => {
        this.setState({ played: parseFloat(e.target.value) })
    }


    onSeekMouseDown = (e: any) => {
        this.setState({ seeking: true })
    }


    onSeekMouseUp = (e: any) => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }


    onProgress = (state: any) => {
        console.log('onProgress', state)
        
        if (!this.state.seeking) {
            this.setState(state)
        }
    }





    onDuration = (duration: any) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    setVolume = (e: any) => {
        console.log('setVolume')
        this.setState({ volume: parseFloat(e.target.value) })
        console.log(parseFloat(e.target.value))
    }

    onPlay = () => {
        console.log('onPlay')
        this.setState({ playing: true, playedSongFreq: this.state.songs[this.state.playListIndex].songFreq + 1 });
        

        //anropar metods som skall hämta aktuell låts genfre från discogs-API:et
        this.getGenreFromDiscogsAPI(this.state.songs[this.state.playListIndex]._artist + " " + this.state.songs[this.state.playListIndex].songTitle);


        //ökar aktuell låts antal spelade gånger med ett
        this.addPlayedSongFreqToDb(this.state.playedSongFreq);
        
        console.log('PlayState:', this.state.playing);
    }


    stop = () => {
        console.log('stop')
        this.setState({ url: [], playing: false })
        console.log('PlayState:', this.state.playing)

        this.setState({ messageText: '' })
    }

    playPause = () => {
        console.log('playPause')
        this.setState({ playing: !this.state.playing })
    }


    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
        console.log('PlayState:', this.state.playing)
    }


    toggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    ref = (player: any) => {
        this.player = player

    }


        msToTime(milliseconds: any) {

        //Erhåll timmar från ms
        let hours = milliseconds / (1000 * 60 * 60);
        let absoluteHours = Math.floor(hours);
        let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

        //Erhåll resten från timmar och konvertera till min
        let minutes = (hours - absoluteHours) * 60;
        let absoluteMinutes = Math.floor(minutes);
        let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

        //Erhåll resten från minuter och konvertera till sek
        let seconds = (minutes - absoluteMinutes) * 60;
        let absoluteSeconds = Math.floor(seconds);
        let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


        return h + ':' + m + ':' + s;

    }
     


    onEnded = () => {

        (this.state.playListIndex == this.playlistProp.length - 1 ? this.setState({
            playing: false, isNextButtonHidden: true, isPrevButtonHidden: false
        }) :
            [
                this.setState({
                    playListIndex: this.state.playListIndex + 1, playing: this.state.loop, 
                    isNextButtonHidden: false, isPrevButtonHidden: false }),
                this.setState({ playing: true })
            ]
        );
        console.log('onEnded: ', this.state.playListIndex)
    }




   
    toggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }





    onForward = () => {

        (this.state.playListIndex == this.playlistProp.length - 1 ? [console.log('WARNING: THE END OF THE PLAYLIST!!'),
        this.setState({ messageText: 'END OF PLAYLIST!!', isNextButtonHidden: true, isPrevButtonHidden: false })]
            :
            [this.setState({ playListIndex: this.state.playListIndex + 1 }),
            this.setState({ messageText: '', isNextButtonHidden: false, isPrevButtonHidden: false }),
            console.log('+1 song')
            ]
        );
    }





    onBackward = () => {

        (this.state.playListIndex == 0 ? [console.log('WARNING: THE BEGINNING OF THE PLAYLIST!!'),
        this.setState({ messageText: 'BEGINNING OF PLAYLIST!!', isNextButtonHidden: false, isPrevButtonHidden: true })]
            :
            [this.setState({ playListIndex: this.state.playListIndex - 1 }),
            this.setState({ messageText: '', isNextButtonHidden: false, isPrevButtonHidden: false }),
            console.log('-1 song')

            ]
        );

    }

    //props för playlists
    playlistProp = [''];




    onCollapseStateArea = () => {

        this.setState({ collapseStateArea: !this.state.collapseStateArea })


        //fixar togglingen mellan tecknen uppåtpil å nedåtpil
        if (this.state.collapsTable3 == 'collapsTable5') {
            this.setState({
                collapsTable3: 'collapsTable6'
            });
        } else {
            this.setState({
                collapsTable3: 'collapsTable5'
            });
        }


        
        console.log("toggled States")


    }


    onCollapsePlaylists = () => {

        this.setState({ collapsePlaylists: !this.state.collapsePlaylists })

        this.loadUniquePlaylists();


        //fixar togglingen mellan tecknen uppåtpil å nedåtpil
        if (this.state.collapsTable1 == 'collapsTable1') {
            this.setState({
                collapsTable1: 'collapsTable2'
            });
        } else {
            this.setState({
                collapsTable1: 'collapsTable1'
            });
        }

        

        console.log("toggled playlist")
    }




    onCollapsePlaylistSongs = () => {

        this.setState({ collapsePlaylistSongs: !this.state.collapsePlaylistSongs })


        //fixar togglingen mellan tecknen uppåtpil å nedåtpil
        if (this.state.collapsTable2 == 'collapsTable3') {
            this.setState({
                collapsTable2: 'collapsTable4'
            });
        } else {
            this.setState({
                collapsTable2: 'collapsTable3'
            });
        }

       
        console.log("toggled playlistsongs")
       
    }



    





    addPlayedSongFreqToDb(songFreq: number) {


        fetch('api/Playlists/UpdatePlaylist?id=' + this.state.songs[this.state.playListIndex].id + '&_artist=' + this.state.songs[this.state.playListIndex]._artist + '&albumTitle=' + this.state.songs[this.state.playListIndex].albumTitle + '&songTitle=' + this.state.songs[this.state.playListIndex].songTitle + '&songFile=' + this.state.songs[this.state.playListIndex].songFile + '&playlistName=' + this.state.songs[this.state.playListIndex].playlistName + '&songFreq=' + songFreq)

            .then(Response => Response.json() as Promise<Song>)

            .then(data => {
                console.log("addPlayedSongFreqToDb has fired: ", data);
                console.log("songFreq: ", songFreq )
              
                this.setState({
                    hasFetchedData: false,
                    playedSongFreq: 0

                })


                this.loadSpecificPlaylist();

            })


            .catch(message => { console.log('Error' + message); });
      }






    

    loadSpecificPlaylist() {


        fetch('api/Playlists/GetPlaylists?playlistName=' + this.state.choosenPlaylist)
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                this.setState({ songs: data, loading: true });
                console.log("load specified: ", data)

            })

            .catch(message => {
                console.log('Error' + message);

            });
       
    }




    loadUniquePlaylists() {

        fetch('api/Playlists/Unique')
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                this.setState({ playlists: data, loading: true });

                this.generateUniqePlaylist();   

                console.log("datadump from unique playlists: ", data)
            })

            .catch(message => {
                console.log('Error' + message);

            });

    }







    getGenreFromDiscogsAPI(artistandsong: string) {

        fetch('https://api.discogs.com/database/search?q=' + artistandsong + '&page=1&per_page=5&token=bfocOKYafOHcCoPEalDRKoJiOEeZoPwtZwqpCxsI')
            .then(response => response.json() as Promise<any>)    
            .then(data => {
                let genre = data.results[0].style[0];

                let country = data.results[0].country;

                let year = data.results[0].year;

               let apidata = genre + ", " + country + ", " + year;

                this.setState({ discogsApiResult: apidata,  loading: true });

                console.log("datadump from discogs API: ", this.state.discogsApiResult)

            })

            .catch(message => {
                console.log('Error' + message);

            });

    }




   

   
    //sorterar ut unika spelliste-namnn för array med dessa
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
        this.setState({ playListIndex: 0 });
        this.setState({ isNextButtonHidden: false, isPrevButtonHidden: true })

    }






    //laddar vald sång i aktuell spellista
    loadChoosenPlaylistSong = (event: any) => {
        
        this.setState({ playListIndex: parseInt(event.target.value) });

        this.onPlay();
       

    }





}   //klass slutar här


