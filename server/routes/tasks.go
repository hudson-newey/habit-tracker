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

// POST /tasks
func CreateTask(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var requestBody models.Task

		if err := context.BindJSON(&requestBody); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		if requestBody.ClientId == "" || reflect.TypeOf(requestBody.ClientId).Kind() != reflect.String {
			clientId := helpers.NextClientId(database, "tasks")
			requestBody.ClientId = clientId
		}

		result, err := databaseService.InsertOne(database.Client, database.Ctx, "habits", "tasks", requestBody)

		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		var responseBody models.Task
		id := result.InsertedID.(primitive.ObjectID).Hex()

		responseBody = requestBody
		responseBody.Id = id

		helpers.Success(context, responseBody)
	}
}

// GET /tasks
func ListTasks(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var responseBody []models.Task

		// Retrieve all documents from the tasks collection
		cursor, err := database.Client.Database("habits").Collection("tasks").Find(database.Ctx, bson.D{})
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

// GET /tasks/:id
func GetTask(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id
		filter := bson.M{"clientid": id}
		var task models.Task
		err := database.Client.Database("habits").Collection("tasks").FindOne(database.Ctx, filter).Decode(&task)
		if err != nil {
			log.Println(err)
			helpers.NotFoundError(context)
			return
		}

		helpers.Success(context, task)
	}
}

// PUT /tasks/:id
func UpdateTask(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Get the task model from the request body
		var task models.Task
		if err := context.ShouldBindJSON(&task); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		// Update the document with the given _id
		filter := bson.M{"clientid": id}
		update := bson.M{"$set": task}
		_, err := database.Client.Database("habits").Collection("tasks").UpdateOne(database.Ctx, filter, update)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		helpers.Success(context, task)
	}
}

// DELETE /tasks/:id
func DeleteTask(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id and delete it
		filter := bson.M{"_id": id}
		result, err := database.Client.Database("habits").Collection("tasks").DeleteOne(database.Ctx, filter)
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
