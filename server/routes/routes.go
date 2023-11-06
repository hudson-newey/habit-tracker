package routes

import (
	"log"

	"server/databaseService"
	"server/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// POST /habits
func CreateHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var requestBody models.Habit

		if err := context.BindJSON(&requestBody); err != nil {
			log.Println(err)
			BadRequestError(context)
			return
		}

		result, err := databaseService.InsertOne(database.Client, database.Ctx, "habits", "habits", requestBody)

		if err != nil {
			log.Println(err)
			InternalServerError(context)
			return
		}

		var responseBody models.Habit
		id := result.InsertedID.(primitive.ObjectID).Hex()

		responseBody = requestBody
		responseBody.Id = id

		Success(context, responseBody)
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
			InternalServerError(context)
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
				InternalServerError(context)
				return
			}

			responseBody = append(responseBody, habit)
		}

		// Check if there was an error during iteration
		if err := cursor.Err(); err != nil {
			log.Println(err)
			InternalServerError(context)
			return
		}

		// Return the response body as a JSON response
		Success(context, responseBody)
	}
}

// GET /habits/:id
func GetHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Convert the id string to an ObjectID
		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			log.Println(err)
			BadRequestError(context)
			return
		}

		// Find the document with the given _id
		filter := bson.M{"_id": objectId}
		var habit models.Habit
		err = database.Client.Database("habits").Collection("habits").FindOne(database.Ctx, filter).Decode(&habit)
		if err != nil {
			log.Println(err)
			NotFoundError(context)
			return
		}

		habit.Id = id

		Success(context, habit)
	}
}

// PUT /habits/:id
func UpdateHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Convert the id string to an ObjectID
		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			log.Println(err)
			BadRequestError(context)
			return
		}

		// Get the habit model from the request body
		var habit models.Habit
		if err := context.ShouldBindJSON(&habit); err != nil {
			log.Println(err)
			BadRequestError(context)
			return
		}

		// Set the habit's ID to the given _id
		habit.Id = id

		// Update the document with the given _id
		filter := bson.M{"_id": objectId}
		update := bson.M{"$set": habit}
		_, err = database.Client.Database("habits").Collection("habits").UpdateOne(database.Ctx, filter, update)
		if err != nil {
			log.Println(err)
			InternalServerError(context)
			return
		}

		Success(context, habit)
	}
}

// DELETE /habits/:id
func DeleteHabit(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Convert the id string to an ObjectID
		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			log.Println(err)
			BadRequestError(context)
			return
		}

		// Find the document with the given _id and delete it
		filter := bson.M{"_id": objectId}
		result, err := database.Client.Database("habits").Collection("habits").DeleteOne(database.Ctx, filter)
		if err != nil {
			log.Println(err)
			InternalServerError(context)
			return
		}

		// Check if any document was deleted
		if result.DeletedCount == 0 {
			NotFoundError(context)
			return
		}

		// Return a success message
		Success(context, nil)
	}
}
