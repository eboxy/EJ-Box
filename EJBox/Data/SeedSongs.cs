using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using EJBox.Data;
using EJBox.Data.Models;

namespace EJ_Box
{
    public class SeedSongs
    {

        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new EJBoxContext(
                serviceProvider.GetRequiredService<DbContextOptions<EJBoxContext>>()))
            {
                // Leta efter vilken låt som helst (any song).
                if (context.Songs.Any())
                {
                    return;   // DB har seed:ats
                }

                context.Songs.AddRange(
                    new Song
                    {
                        _artist = "Basic Artist A",
                        AlbumTitle = "Basic Album A",
                        SongTitle = "Basic Title A",
                        SongFile = "Basic File A",
                        PlaylistName = "BASIC LIST",
                        SongFreq = 0
                    },
                    new Song
                    {
                        _artist = "Basic Artist B",
                        AlbumTitle = "Basic Album B",
                        SongTitle = "Basic Title B",
                        SongFile = "Basic File B",
                        PlaylistName = "BASIC LIST",
                        SongFreq = 0
                    },
                    new Song
                    {
                        _artist = "Basic Artist C",
                        AlbumTitle = "Basic Album C",
                        SongTitle = "Basic Title C",
                        SongFile = "Basic File C",
                        PlaylistName = "BASIC LIST",
                        SongFreq = 0
                    }
                    
                   

                  );
                    context.SaveChanges();



            }  
        }



    }  //klass slutar här
}
