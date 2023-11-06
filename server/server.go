package main

import (
	"server/databaseService"
	"server/models"
	"server/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	dbClient, ctx, cancel, err := databaseService.Connect("mongodb://localhost:27017")

	var database models.Database

	database.Client = dbClient
	database.Ctx = ctx
	database.Cancel = cancel

	if err != nil {
		panic(err)
	}

	router.POST("/habits", routes.CreateHabit(database))
	router.GET("/habits", routes.ListHabits(database))
	router.GET("/habits/:id", routes.GetHabit(database))
	router.PUT("/habits/:id", routes.UpdateHabit(database))
	router.DELETE("/habits/:id", routes.DeleteHabit(database))

	router.Run(":8081")
}
