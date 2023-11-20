package models

type Habit struct {
	Id             string
	Name           string
	Description    string
	AntiHabit      bool     // if the habit is not to do something e.g. smoking
	CompletedDates []string // in ISO-8601 format
	CreatedAt      string   // in ISO-8601 format
	Goal           string   // as _id
}

func IsCompletedToday(model Habit) bool {
	return false
}
