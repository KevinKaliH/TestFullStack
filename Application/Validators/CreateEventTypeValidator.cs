using Application.Models.Request;
using FluentValidation;

namespace Application.Validators
{
    public class CreateEventTypeValidator: AbstractValidator<EventTypeRegisterRequest>
    {
        public CreateEventTypeValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");
        }
    }
}
