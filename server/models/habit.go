package models

type Habit struct {
	// optional on create request
	Id          string
	Name        string
	Description string
}
