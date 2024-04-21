package routes

import (
	"log"
	"reflect"

	"server/databaseService"
	"server/helpers"
	"server/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// POST /habits
func CreateHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var requestBody models.Habit

		err := context.BindJSON(&requestBody)

		if err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		if requestBody.ClientId == "" || reflect.TypeOf(requestBody.ClientId).Kind() != reflect.String {
			clientId := helpers.NextClientId(database, "habits")
			requestBody.ClientId = clientId
		}

		result, err := databaseService.InsertOne(database.Client, database.Ctx, "habits", "habits", requestBody)

		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		var responseBody models.Habit
		id := result.InsertedID.(primitive.ObjectID).Hex()

		responseBody = requestBody
		responseBody.Id = id

		helpers.Success(context, responseBody)
	}
}

// GET /habits
func ListHabits(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var responseBody []models.Habit

		// Retrieve all documents from the habits collection
		cursor, err := database.Client.Database("habits").Collection("habits").Find(database.Ctx, bson.D{})
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}
		defer cursor.Close(database.Ctx)

		// Iterate through the cursor and append each document to the response body
		for cursor.Next(database.Ctx) {
			var habit models.Habit

			err := cursor.Decode(&habit)

			habit.Id = cursor.Current.Lookup("_id").ObjectID().Hex()

			if err != nil {
				log.Println(err)
				helpers.InternalServerError(context)
				return
			}

			responseBody = append(responseBody, habit)
		}

		// Check if there was an error during iteration
		if err := cursor.Err(); err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		if responseBody == nil {
			responseBody = []models.Habit{}
		}

		// Return the response body as a JSON response
		helpers.Success(context, responseBody)
	}
}

// GET /habits/:id
func GetHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id
		filter := bson.M{"clientid": id}
		var habit models.Habit
		err := database.Client.Database("habits").Collection("habits").FindOne(database.Ctx, filter).Decode(&habit)
		if err != nil {
			log.Println(err)
			helpers.NotFoundError(context)
			return
		}

		helpers.Success(context, habit)
	}
}

// PUT /habits/:id
func UpdateHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Get the habit model from the request body
		var habit models.Habit
		if err := context.ShouldBindJSON(&habit); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		// Update the document with the given _id
		filter := bson.M{"clientid": id}
		update := bson.M{"$set": habit}
		_, err := database.Client.Database("habits").Collection("habits").UpdateOne(database.Ctx, filter, update)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		helpers.Success(context, habit)
	}
}

// DELETE /habits/:id
func DeleteHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id and delete it
		filter := bson.M{"clientid": id}
		result, err := database.Client.Database("habits").Collection("habits").DeleteOne(database.Ctx, filter)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		// Check if any document was deleted
		if result.DeletedCount == 0 {
			helpers.NotFoundError(context)
			return
		}

		// Return a success message
		helpers.Success(context, nil)
	}
}
