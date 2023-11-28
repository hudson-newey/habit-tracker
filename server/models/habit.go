package models

type Habit struct {
	Id             string
	Name           string
	Description    string
	CompletedDates []string // in ISO-8601 format
	CreatedAt      string   // in ISO-8601 format
	Goal           string   // as _id
	AntiHabit      bool     // if the habit is not to do something e.g. smoking
	IsQuantifiable bool     // if the habit is quantifiable e.g. running 5km
	DependsOn      []string // as _id
}
