package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/sameterkanboz/hotelManagement/database"
	"github.com/sameterkanboz/hotelManagement/models"
)

func GetReservation(c *fiber.Ctx) error {
	reservations := []models.Reservation{}
	database.DB.Db.Find(&reservations)
	responseRes := []models.Reservation{}
	for _, reservation := range reservations {

		responseRes = append(responseRes, reservation)
	}

	return c.Status(200).JSON(responseRes)

}
func CreateReservation(c *fiber.Ctx) error {
	reservation := new(models.Reservation)
	if err := c.BodyParser(reservation); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	database.DB.Db.Create(&reservation)

	return c.Status(200).JSON(reservation)
}

func findReservation(id int, reservation *models.Reservation) error {
	database.DB.Db.Find(&reservation, "id = ?", id)
	if reservation.ID == 0 {
		return errors.New("reservation does not exist")
	}
	return nil
}

func GetReservationId(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var reservation models.Reservation

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	if err := findReservation(id, &models.Reservation{}); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	return c.Status(200).JSON(reservation)
}

func DeleteReservation(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var reservation models.Reservation

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	err = findReservation(id, &reservation)

	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	if err = database.DB.Db.Delete(&reservation).Error; err != nil {
		return c.Status(404).JSON(err.Error())
	}
	return c.Status(200).JSON("Successfully deleted Reservation")
}
