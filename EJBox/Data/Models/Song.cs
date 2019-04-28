using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EJBox.Data.Models
{
    public class Song
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string _artist { get; set; }

        public string AlbumTitle { get; set; }

        [Required]
        public string SongTitle { get; set; }

        [Required]
        public string SongFile { get; set; }

        [Required]
        public string PlaylistName { get; set; }

        [DefaultValue(0)]
        public int SongFreq { get; set; }
    }
}

