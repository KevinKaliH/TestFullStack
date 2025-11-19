using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ReservationDBContext : DbContext
    {
        public ReservationDBContext(DbContextOptions<ReservationDBContext> opt) : base(opt) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<EventType> EventTypes { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EventType>()
                .Property(u => u.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Client>()
                .Property(u => u.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Reservation>()
                .Property(u => u.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Reservation>()
                .HasIndex(e => e.ReservationCode)
                .IsUnique();
        }
    }
}
