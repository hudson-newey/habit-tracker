package main

import (
	"server/cors"
	"server/databaseService"
	"server/models"
	"server/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// configure CORS
	router.Use(cors.Default())

	// create database connection
	dbClient, ctx, _, err := databaseService.Connect("mongodb://127.0.0.1:27017")

	var database models.Database

	database.Client = dbClient
	database.Ctx = ctx

	if err != nil {
		panic(err)
	}

	// TODO: probably move this to a separate file such as routes/routes.go
	// goals
	router.POST("/goals", routes.CreateGoal(database))
	router.GET("/goals", routes.ListGoals(database))
	router.GET("/goals/:id", routes.GetGoal(database))
	router.PUT("/goals/:id", routes.UpdateGoal(database))
	router.DELETE("/goals/:id", routes.DeleteGoal(database))

	// habits
	router.POST("/habits", routes.CreateHabit(database))
	router.GET("/habits", routes.ListHabits(database))
	router.GET("/habits/:id", routes.GetHabit(database))
	router.PUT("/habits/:id", routes.UpdateHabit(database))
	router.DELETE("/habits/:id", routes.DeleteHabit(database))

	// tasks
	router.POST("/tasks", routes.CreateTask(database))
	router.GET("/tasks", routes.ListTasks(database))
	router.GET("/tasks/:id", routes.GetTask(database))
	router.PUT("/tasks/:id", routes.UpdateTask(database))
	router.DELETE("/tasks/:id", routes.DeleteTask(database))

	// logbook

	// schedule
	// e.g. calendar, daily todo tasks left

	// ai routes

	// generic app routes
	router.GET("/", routes.RedirectRoute)

	router.Run(":8081")
}
