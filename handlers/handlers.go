package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/sameterkanboz/hotelManagement/database"
	"github.com/sameterkanboz/hotelManagement/models"
)

var rooms = []models.Room{
	{ID: 1, RoomType: "Suite", Capacity: 4, Image: "https://s7d2.scene7.com/is/image/ritzcarlton/pnqrz-executive-50665061?$XlargeViewport100pct$", Description: "At most hotels a suite includes a room separate from the bedroom. One room is usually a living area with a couch that converts to a bed, a separate TV, and sometimes a kitchen or kitchenette. Sometimes you also get a bigger dinning area."},
	{ID: 2, RoomType: "Family", Capacity: 5, Image: "https://www.regalhotel.com/uploads/roh/accommodations/20190923/RegalOriental_QuadrupleRoom_RW02.jpg", Description: "Generally a family room means the room is larger than the standard room and will accommodate 4- 6 people, usually with an extra twin bed or sleeper sofa."},
	{ID: 3, RoomType: "King", Capacity: 2, Image: "https://www.theplazany.com/wp-content/uploads/2016/02/RoomsSuites_GuestRooms_Deluxe_Slideshow_Feature1.jpg", Description: "Fitted with modern furnishings, this king room comes equipped with a flat-screen TV and free WiFi access. The private bathroom has a shower with hydromassage jets, a Philips hairdryer and free toiletries."},
	{ID: 4, RoomType: "Normal", Capacity: 4, Image: "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568", Description: "Most standard hotel rooms, such as the types you would encounter at motels or many brand hotels, offer a room and separate bathroom area for travelers to book nightly. These rooms are usually marketed by the type of sleeping arrangements available: King room, queen room, or double room."},
	{ID: 5, RoomType: "Honeymoon", Capacity: 2, Image: "https://www.lehimalaya.com/images/subpackage/Jcuy0-untitled-2.jpg", Description: "The Honeymoon Rooms with us are always special as they give you the feel of sleeping in a cloud and waking up to the sky. These rooms are designed keeping in the mind the newly married couple. With a classic circular bed and many other facilities, this suite brings both the sweetness of honey and the pleasantness of the moon. The room’s ambiance is made romantic along with all the modern amenities to make the stay of the couple a comfortable one."},
}

func SayHi(c *fiber.Ctx) error {
	return c.SendString("Hello ")
}

func GetRooms(c *fiber.Ctx) error {
	return c.Status(200).JSON(rooms)
}

func GetUsers(c *fiber.Ctx) error {
	users := []models.Customer{}
	database.DB.Db.Find(&users)
	responseUsers := []models.Customer{}
	for _, user := range users {

		responseUsers = append(responseUsers, user)
	}

	return c.Status(200).JSON(responseUsers)
}

func CreateCustomer(c *fiber.Ctx) error {
	customer := new(models.Customer)
	if err := c.BodyParser(customer); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	database.DB.Db.Create(&customer)

	return c.Status(200).JSON(customer)
}

func findUser(id int, user *models.Customer) error {
	database.DB.Db.Find(&user, "id = ?", id)
	if user.ID == 0 {
		return errors.New("user does not exist")
	}
	return nil
}

func GetUser(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var customer models.Customer

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	if err := findUser(id, &models.Customer{}); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	return c.Status(200).JSON(customer)
}

func DeleteUser(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var customer models.Customer

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
