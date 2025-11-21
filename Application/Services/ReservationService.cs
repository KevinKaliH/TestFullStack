using Application.Contracts;
using Application.Models.DTOs;
using Application.Models.Request;
using Application.Models.Response;
using Application.Utils;
using Domain.Entities;

namespace Application.Services
{
    public class ReservationService(IReservationRepository reservationRepository)
    {
        public async Task<ReservationDataTableListResponse> GetAll(ReservationQueryParams queryParams)
        {
            (int total, IEnumerable<ReservationDataTableDto> data) = await reservationRepository.GetAllWithQuery(queryParams);

            return new ReservationDataTableListResponse
            {
                Data = data,
                TotalCount = total
            };
        }

        public async Task<ReservationCreatedResponse> Create(RegisterReservationRequest dto)
        {
            var newReservation = ToEntityRegisterReservation(dto);
            newReservation.ReservationCode = GenerateCode();
            await reservationRepository.Create(newReservation);
            var reservationDto = ToDtoReservation(newReservation);

            return new ReservationCreatedResponse
            {
                Data = reservationDto
            };
        }
        private static string GenerateCode() => Guid.NewGuid().ToString("N")[..8];

        public async Task<BaseEmptyResult> Update(int id, RegisterReservationRequest dto)
        {
            var reservation = await reservationRepository.GetById(id)
                ?? throw new BusinessException("Not found reservation id", StatusCodeEnum.NotFound);

            ToUpdateEntity(reservation, dto);
            await reservationRepository.Update(reservation);
            return new BaseEmptyResult();
        }

        public async Task<BaseEmptyResult> Delete(int id)
        {
            var result = await reservationRepository.Delete(id);
            if (!result)
                throw new BusinessException("Not found reservation id", StatusCodeEnum.NotFound);

            return new BaseEmptyResult();
        }

        private static Reservation ToEntityRegisterReservation(RegisterReservationRequest request)
        {
            return new Reservation
            {
                ClientId = request.ClientId,
                EventTypeId = request.EventTypeId,
                ReservationDate = request.ReservationDate,
                Notes = request.Notes
            };
        }

        private static ReservationDto ToDtoReservation(Reservation request)
        {
            return new ReservationDto
            {
                Id = request.Id,
                ClientId = request.ClientId,
                EventTypeId = request.EventTypeId,
                ReservationDate = request.ReservationDate,
                ReservationCode = request.ReservationCode,
                Notes = request.Notes
            };
        }

        private static void ToUpdateEntity(Reservation entity, RegisterReservationRequest dto)
        {
            entity.ClientId = dto.ClientId;
            entity.EventTypeId = dto.EventTypeId;
            entity.ReservationDate = dto.ReservationDate;
            entity.Notes = dto.Notes;
        }
    }
}
