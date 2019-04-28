using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EJBox.Data;
using EJBox.Data.Models;
using Microsoft.EntityFrameworkCore.Internal;


namespace EJBox.Controllers
{
    [Produces("application/json")]
    [Route("api/Playlists")]
    public class PlaylistsController : Controller
    {

        private readonly EJBoxContext _context;

        public PlaylistsController(EJBoxContext context)
        {
            _context = context;
        }




        // Läs (Read) allt
        // GET: api/Playlists
        [HttpGet]
        public IEnumerable<Song> GetSongs()
        {
            return _context.Songs;
        }





        //Läs (Read) data från specific spellista
        //GET: /GetPlaylist/playlistName
        [Route("GetPlaylists")]
        [HttpGet("{playlistName}")]
        public IEnumerable<Song> GetPlaylists(string playlistName)
        {

            var a =_context.Songs.Where(p => p.PlaylistName == playlistName);

            return a;
        }




        //Läs (Read)  UNIK playlistnames
        //GET: /GetPlaylistsUnique
        [Route("Unique")]
        [HttpGet]
        public IEnumerable<Song> Unique()
        {

            return _context.Songs;
            
        }




        // Läs (Read) allt + filtrera efter låtens spel-frekvens (hur många ggr den har spelats)
        // GET: /GetSongsFreq
        [Route("GetSongsFreq")]
        [HttpGet]
        public IEnumerable<Song> GetSongsFreq()
        {
            return _context.Songs.OrderBy( s => s.SongTitle).OrderByDescending(s => s.SongFreq).Take(10);

        }



        
        
        //Resterande CRUD:


        //SKapa ny (Add)
        // GET: /CreatePlaylist
        [Route("CreatePlaylist")]
        [HttpGet]
        public string CreatePlaylist(string _artist, string albumTitle, string songTitle, string songFile, string playlistName)
        {

           Song CreatePlaylist = new Song
           {
               _artist = _artist,
               AlbumTitle = albumTitle,
               SongTitle = songTitle,
               SongFile = songFile,
               PlaylistName = playlistName
               
            };

        _context.Songs.Add(CreatePlaylist);
        _context.SaveChanges();


           return "Song added";
       }



        

        //Uppdatera (Update)
        [HttpGet("UpdatePlaylist")]
        public async Task<IActionResult> UpdatePlaylist(int id, string _artist, string albumTitle, string songTitle, string songFile, string playlistName, int songFreq)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var song = await _context.Songs.SingleOrDefaultAsync(p => p.Id == id);
            if (song == null)
                return BadRequest();

            song.Id = id;
            song._artist = _artist;
            song.AlbumTitle = albumTitle;
            song.SongTitle = songTitle;
            song.SongFile = songFile;
            song.PlaylistName = playlistName;
            song.SongFreq = songFreq;

            _context.Songs.Update(song);
            await _context.SaveChangesAsync();

            return Ok(song);
        }




        //Ta bort (Delete)
        // Delete: api/Playlists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylist([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var song = await _context.Songs.SingleOrDefaultAsync(s => s.Id == id);
            if (song == null)
            {
                return NotFound();
            }

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return Ok(song);
        }




        //Tom spellista??
        private bool PlaylistExists(int id)
        {
            return _context.Songs.Any(s => s.Id == id);
        }





    }

}

