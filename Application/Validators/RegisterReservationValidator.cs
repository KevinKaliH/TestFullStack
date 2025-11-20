using Application.Contracts;
using Application.Models.Request;
using FluentValidation;

namespace Application.Validators
{
    public class RegisterReservationValidator : AbstractValidator<RegisterReservationRequest>
    {
        public RegisterReservationValidator(IClientRepository clientRepo, IEventTypeRepository eventTypeRepo)
        {
            RuleFor(x => x.ClientId)
                .MustAsync(async (clientId, cancellation) =>
                {
                    return await clientRepo.Exist(clientId);
                })
                .WithMessage("El ClientId no existe.");

            RuleFor(x => x.EventTypeId)
                .MustAsync(async (eventTypeId, cancellation) =>
                {
                    return await eventTypeRepo.Exist(eventTypeId);
                })
                .WithMessage("El EventTypeId no existe.");

            RuleFor(x => x.ReservationDate)
                .GreaterThanOrEqualTo(DateTime.Today)
                .WithMessage("La fecha de reservación es obligatoria.");

            RuleFor(x => x.ReservationCode)
                .NotEmpty()
                .WithMessage("El código de reservación es obligatorio.")
                .MaximumLength(50);
        }
    }
}
