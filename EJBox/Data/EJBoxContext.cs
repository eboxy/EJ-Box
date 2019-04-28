using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EJBox.Data.Models;

namespace EJBox.Data
{
    public class EJBoxContext: DbContext
    {
        public EJBoxContext(DbContextOptions<EJBoxContext> options) : base(options) { }

        public DbSet<Song> Songs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var questionsModel = modelBuilder.Entity<Song>();

            questionsModel.ToTable("Songs");

            base.OnModelCreating(modelBuilder);
        

        }
   }

}
