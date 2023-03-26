package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sameterkanboz/hotelManagement/handlers"
)

func setupRoutes(app *fiber.App) {

	app.Get("/", handlers.SayHi)
	app.Get("/customer", handlers.GetUsers)
	app.Get("/rooms", handlers.GetRooms)
	app.Post("/customer", handlers.CreateCustomer)
	app.Get("/customer/:id", handlers.GetUser)
	app.Delete("/customer/:id", handlers.DeleteUser)

	//auth
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)
	app.Get("/user", handlers.User)
	app.Post("/logout", handlers.Logout)

	//reservation
	app.Post("/reservation", handlers.CreateReservation)
	app.Get("/reservation", handlers.GetReservation)
	app.Get("/reservation/:id", handlers.GetReservationId)
	app.Delete("/reservation/:id", handlers.DeleteReservation)
}
