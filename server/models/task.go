package models

type Task struct {
	Id          string
	Name        string
	Description string
	Completed   bool
	Goal        string
	Importance  int
	CompleteBy  string
	DependsOn   []string
}
