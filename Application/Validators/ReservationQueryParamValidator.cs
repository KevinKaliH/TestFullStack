using Application.Models.Request;
using FluentValidation;

namespace Application.Validators
{
    public class ReservationQueryParamValidator: AbstractValidator<ReservationQueryParams>
    {
        public ReservationQueryParamValidator()
        {
            RuleFor(x => x.PageNumber)
                .GreaterThanOrEqualTo(1)
                .WithMessage("PageNumber debe ser 1 o mayor.");

            RuleFor(x => x.PageSize)
                .GreaterThanOrEqualTo(1)
                .WithMessage("PageSize debe ser 1 o mayor.");

            RuleFor(x => x.PageSize)
                .LessThanOrEqualTo(200)
                .WithMessage("PageSize no puede ser mayor a 200.");

            RuleFor(x => x.ReservationCode)
                .MaximumLength(50)
                .WithMessage("ReservationCode no puede exceder los 50 caracteres.");

            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.InitialDate)
                .When(x => x.InitialDate.HasValue && x.EndDate.HasValue)
                .WithMessage("EndDate debe ser mayor o igual a InitialDate.");
        }
    }
}
