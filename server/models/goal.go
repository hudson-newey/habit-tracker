package models

type Goal struct {
	Id          string
	Name        string
	Description string
	created     int
	completed   int
	completeBy  int
}
