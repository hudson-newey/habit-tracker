package routes

import (
	"log"
	"server/helpers"
	"server/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GET /schedule/daily-remaining
func DailyRemainingRoute(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var responseBody []models.Task

		// Retrieve all documents from the tasks collection
		cursor, err := database.Client.Database("habits").Collection("tasks").Find(database.Ctx, bson.M{"completed": false})
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}
		defer cursor.Close(database.Ctx)

		// Iterate through the cursor and append each document to the response body
		for cursor.Next(database.Ctx) {
			var task models.Task

			err := cursor.Decode(&task)

			task.Id = cursor.Current.Lookup("_id").ObjectID().Hex()

			if err != nil {
				log.Println(err)
				helpers.InternalServerError(context)
				return
			}

			responseBody = append(responseBody, task)
		}

		// Check if there was an error during iteration
		if err := cursor.Err(); err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		if responseBody == nil {
			responseBody = []models.Task{}
		}

		// Return the response body as a JSON response
		helpers.Success(context, responseBody)
	}
}

// GET /schedule/calendar
func CalendarRoute(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
	}
}
