using Application.Models.Request;
using FluentValidation;

namespace Application.Validators
{
    public class RegisterClientValidator : AbstractValidator<ClientRegisterRequest>
    {
        public RegisterClientValidator()
        {
            RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MinimumLength(2)
            .MaximumLength(100);

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.")
                .MaximumLength(150);

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone number is required.")
                .Matches(@"^[0-9]+$").WithMessage("Phone must contain only numbers.")
                .MinimumLength(8)
                .MaximumLength(15);
        }
    }
}
