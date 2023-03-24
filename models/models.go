package models

import "gorm.io/gorm"

type dene []string

type User struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password []byte `json:"-"`
}

type Room struct {
	ID          int    `json:"id" `
	RoomType    string `json:"room_type" `
	Capacity    int    `json:"capacity" `
	Image       string `json:"image" `
	Description string `json:"description" `
}

type Reservation struct {
	gorm.Model
	RoomOwnerId    int    `json:"roomOwnerID" `
	ID             int    `json:"id" `
	RoomName       string `json:"roomName" `
	RoomType       string `json:"roomType" `
	CheckInDate    string `json:"checkin" `
	CheckOutDate   string `json:"checkout" `
	NumberOfPeople int    `json:"numberOfPeople" `
	PeopleInfo     string `json:"peopleInfo" `
	UserID         int    `json:"userID" `
}

type Person struct {
	gorm.Model
	ID     int    `json:"id" `
	Name   string `json:"name" `
	Gender string `json:"gender" `
	Age    string `json:"age" `
}

type Customer struct {
	Person
	RoomNumber string `json:"roomNumber" `
	Privileges bool   `json:"privileges"`
}

type Employee struct {
	Person
	Role       string `json:"role" `
	Experience int    `json:"exp" `
}
