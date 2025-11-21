using Api.Middlewares;
using Application.Contracts;
using Application.Services;
using Application.Validators;
using FluentValidation;
using Infrastructure;
using Infrastructure.Repositories;
using Infrastructure.Seeders;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("default");
builder.Services.AddDbContext<ReservationDBContext>(opt => opt.UseSqlite(connectionString));

builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IEventTypeRepository, EventTypeRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();

builder.Services.AddScoped<EventTypeService>();
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<ReservationService>();

builder.Services.AddValidatorsFromAssemblyContaining<CreateEventTypeValidator>();
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ReservationDBContext>();
    context.Database.EnsureCreated();
    ReservationSeeder.Seed(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseMiddleware<BusinessExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowReactApp");

app.MapControllers();

app.Run();
