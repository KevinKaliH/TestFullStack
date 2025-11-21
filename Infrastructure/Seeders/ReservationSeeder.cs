using Domain.Entities;

namespace Infrastructure.Seeders
{
    public static class ReservationSeeder
    {
        public static void Seed(ReservationDBContext context)
        {
            // Solo si no hay EventTypes
            if (!context.EventTypes.Any())
            {
                context.EventTypes.AddRange(
                    new EventType { Name = "Wedding", Description = "Wedding test" },
                    new EventType { Name = "Birthday", Description = "Birthday test" },
                    new EventType { Name = "Conference", Description = "Conference test" }
                );
                context.SaveChanges();
            }

            // Solo si no hay Clients
            if (!context.Clients.Any())
            {
                context.Clients.AddRange(
                    new Client { Name = "Alice Johnson", Email = "alice@example.com", Phone = "1234567890" },
                    new Client { Name = "Bob Smith", Email = "bob@example.com", Phone = "0987654321" }
                );
                context.SaveChanges();
            }

            // Solo si no hay Reservations
            if (!context.Reservations.Any())
            {
                var wedding = context.EventTypes.FirstOrDefault(e => e.Name == "Wedding");
                var birthday = context.EventTypes.FirstOrDefault(e => e.Name == "Birthday");
                var alice = context.Clients.FirstOrDefault(c => c.Name == "Alice Johnson");
                var bob = context.Clients.FirstOrDefault(c => c.Name == "Bob Smith");

                if (wedding != null && birthday != null && alice != null && bob != null)
                {
                    context.Reservations.AddRange(
                        new Reservation
                        {
                            ClientId = alice.Id,
                            EventTypeId = wedding.Id,
                            ReservationDate = DateTime.Today.AddDays(1),
                            ReservationCode = "RES-001",
                            Notes = "Alice Wedding"
                        },
                        new Reservation
                        {
                            ClientId = bob.Id,
                            EventTypeId = birthday.Id,
                            ReservationDate = DateTime.Today.AddDays(2),
                            ReservationCode = "RES-002",
                            Notes = "Bob Birthday"
                        }
                    );
                    context.SaveChanges();
                }
            }
        }
    }
}
