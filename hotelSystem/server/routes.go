package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sameterkanboz/hotelManagement/handlers"
)

func setupRoutes(app *fiber.App) {

	app.Get("/customer", handlers.GetUsers)
	app.Post("/customer", handlers.CreateCustomer)
	app.Get("/customer/:id", handlers.GetUser)
	app.Delete("/customer/:id", handlers.DeleteUser)
}
