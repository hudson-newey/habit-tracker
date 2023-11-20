package main

import (
	"server/cors"
	"server/databaseService"
	"server/helpers"
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

	router.GET("/goals/search", routes.SearchGoals(database))
	router.GET("/goals/:id/tasks", routes.ListTasksByGoal(database))
	router.GET("/goals/:id/habits", routes.ListHabitsByGoal(database))

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
	router.POST("/logbooks", routes.CreateLogbook(database))
	router.GET("/logbooks", routes.ListLogbooks(database))
	router.GET("/logbooks/:id", routes.GetLogbook(database))
	router.PUT("/logbooks/:id", routes.UpdateLogbook(database))
	router.DELETE("/logbooks/:id", routes.DeleteLogbook(database))

	// schedule
	// e.g. calendar, daily todo tasks left
	router.GET("/schedule/daily-remaining", routes.DailyRemainingRoute(database))
	router.GET("/schedule/calendar", routes.CalendarRoute(database))

	// ai routes

	// generic app routes
	router.GET("/", routes.RedirectRoute)

	serverPort := helpers.EnvVariable("PORT")
	router.Run(":" + serverPort)
}
