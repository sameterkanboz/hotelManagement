package models

import "gorm.io/gorm"

type Fact struct {
	gorm.Model
	Question string `json:"question"`
	Answer   string `json:"answer" `
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
