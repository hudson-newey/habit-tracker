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

// POST /logbooks
func CreateLogbook(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var requestBody models.Logbook

		if err := context.BindJSON(&requestBody); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		if requestBody.ClientId == "" || reflect.TypeOf(requestBody.ClientId).Kind() != reflect.String {
			clientId := helpers.NextClientId(database, "logbooks")
			requestBody.ClientId = clientId
		}

		result, err := databaseService.InsertOne(database.Client, database.Ctx, "habits", "logbooks", requestBody)

		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		var responseBody models.Logbook
		id := result.InsertedID.(primitive.ObjectID).Hex()

		responseBody = requestBody
		responseBody.Id = id

		helpers.Success(context, responseBody)
	}
}

// GET /logbooks
func ListLogbooks(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var responseBody []models.Logbook

		// Retrieve all documents from the logbooks collection
		cursor, err := database.Client.Database("habits").Collection("logbooks").Find(database.Ctx, bson.D{})
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}
		defer cursor.Close(database.Ctx)

		// Iterate through the cursor and append each document to the response body
		for cursor.Next(database.Ctx) {
			var Logbook models.Logbook

			err := cursor.Decode(&Logbook)

			Logbook.Id = cursor.Current.Lookup("_id").ObjectID().Hex()

			if err != nil {
				log.Println(err)
				helpers.InternalServerError(context)
				return
			}

			responseBody = append(responseBody, Logbook)
		}

		// Check if there was an error during iteration
		if err := cursor.Err(); err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		if responseBody == nil {
			responseBody = []models.Logbook{}
		}

		// Return the response body as a JSON response
		helpers.Success(context, responseBody)
	}
}

// GET /logbooks/:id
func GetLogbook(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id
		filter := bson.M{"clientid": id}
		var Logbook models.Logbook
		err := database.Client.Database("habits").Collection("logbooks").FindOne(database.Ctx, filter).Decode(&Logbook)
		if err != nil {
			log.Println(err)
			helpers.NotFoundError(context)
			return
		}

		helpers.Success(context, Logbook)
	}
}

// PUT /logbooks/:id
func UpdateLogbook(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Get the Logbook model from the request body
		var Logbook models.Logbook
		if err := context.ShouldBindJSON(&Logbook); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		// Update the document with the given _id
		filter := bson.M{"clientid": id}
		update := bson.M{"$set": Logbook}
		_, err := database.Client.Database("habits").Collection("logbooks").UpdateOne(database.Ctx, filter, update)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		helpers.Success(context, Logbook)
	}
}

// DELETE /logbooks/:id
func DeleteLogbook(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id and delete it
		filter := bson.M{"clientid": id}
		result, err := database.Client.Database("habits").Collection("logbooks").DeleteOne(database.Ctx, filter)
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
