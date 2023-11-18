package models

type Goal struct {
	Id          string
	Name        string
	Description string
	Completed   bool
  Habits      []string // as _id[]
  Tasks       []string // as_id[]
}
