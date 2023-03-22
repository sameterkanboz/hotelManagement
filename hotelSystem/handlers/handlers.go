package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/sameterkanboz/hotelManagement/database"
	"github.com/sameterkanboz/hotelManagement/models"
)

func GetUsers(c *fiber.Ctx) error {
	users := []models.Person{}
	database.DB.Db.Find(&users)
	responseUsers := []models.Person{}
	for _, user := range users {

		responseUsers = append(responseUsers, user)
	}

	return c.Status(200).JSON(responseUsers)
}

func CreateCustomer(c *fiber.Ctx) error {
	customer := new(models.Person)
	if err := c.BodyParser(customer); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	database.DB.Db.Create(&customer)

	return c.Status(200).JSON(customer)
}

func findUser(id int, user *models.Person) error {
	database.DB.Db.Find(&user, "id = ?", id)
	if user.ID == 0 {
		return errors.New("user does not exist")
	}
	return nil
}

func GetUser(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var customer models.Person

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	if err := findUser(id, &customer); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	return c.Status(200).JSON(customer)
}

func DeleteUser(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var customer models.Person

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	err = findUser(id, &customer)

	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	if err = database.DB.Db.Delete(&customer).Error; err != nil {
		return c.Status(404).JSON(err.Error())
	}
	return c.Status(200).JSON("Successfully deleted User")
}
