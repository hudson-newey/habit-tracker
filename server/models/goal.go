package models

type Goal struct {
	Id          string
	Name        string
	Description string
	Completed   bool
	CompleteBy  string
	Tags        []string // as _id
}
