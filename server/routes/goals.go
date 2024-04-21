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

// POST /goals
func CreateGoal(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var requestBody models.Goal

		err := context.BindJSON(&requestBody)

		if err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		// if there is no clientId, this means that the goal was created when connected to the API
		// and is not a part of a sync request
		// if there is a clientId, the goal was created offline and is being updated as part of a sync request
		// therefore, we should maintain the clientId to prevent sync conflicts
		if requestBody.ClientId == "" || reflect.TypeOf(requestBody.ClientId).Kind() != reflect.String {
			clientId := helpers.NextClientId(database, "goals")
			requestBody.ClientId = clientId
		}

		result, err := databaseService.InsertOne(database.Client, database.Ctx, "habits", "goals", requestBody)

		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		var responseBody models.Goal
		id := result.InsertedID.(primitive.ObjectID).Hex()

		responseBody = requestBody
		responseBody.Id = id

		helpers.Success(context, responseBody)
	}
}

// GET /goals
func ListGoals(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var responseBody []models.Goal

		// Retrieve all documents from the goals collection
		cursor, err := database.Client.Database("habits").Collection("goals").Find(database.Ctx, bson.D{})
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}
		defer cursor.Close(database.Ctx)

		// Iterate through the cursor and append each document to the response body
		for cursor.Next(database.Ctx) {
			var goal models.Goal

			err := cursor.Decode(&goal)

			goal.Id = cursor.Current.Lookup("_id").ObjectID().Hex()

			if err != nil {
				log.Println(err)
				helpers.InternalServerError(context)
				return
			}

			responseBody = append(responseBody, goal)
		}

		// Check if there was an error during iteration
		if err := cursor.Err(); err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		if responseBody == nil {
			responseBody = []models.Goal{}
		}

		// Return the response body as a JSON response
		helpers.Success(context, responseBody)
	}
}

// GET /goals/search?name=partial_name
func SearchGoals(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		searchTerm := context.Query("name")

		var responseBody []models.Goal

		// retrieve all documents from the goals collection where the name contains the search term
		cursor, err := database.Client.Database("habits").Collection("goals").Find(database.Ctx, bson.M{"name": bson.M{"$regex": searchTerm}})
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		defer cursor.Close(database.Ctx)

		// Iterate through the cursor and append each document to the response body
		for cursor.Next(database.Ctx) {
			var goal models.Goal

			err := cursor.Decode(&goal)

			goal.Id = cursor.Current.Lookup("_id").ObjectID().Hex()

			if err != nil {
				log.Println(err)
				helpers.InternalServerError(context)
				return
			}

			responseBody = append(responseBody, goal)
		}

		// Check if there was an error during iteration
		if err := cursor.Err(); err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		if responseBody == nil {
			responseBody = []models.Goal{}
		}

		// Return the response body as a JSON response
		helpers.Success(context, responseBody)
	}
}

// GET /goals/:id
func GetGoal(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id
		filter := bson.M{"clientid": id}
		var goal models.Goal
		err := database.Client.Database("habits").Collection("goals").FindOne(database.Ctx, filter).Decode(&goal)
		if err != nil {
			log.Println(err)
			helpers.NotFoundError(context)
			return
		}

		helpers.Success(context, goal)
	}
}

// PUT /goals/:id
func UpdateGoal(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Get the goal model from the request body
		var goal models.Goal
		if err := context.ShouldBindJSON(&goal); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		// Update the document with the given _id
		filter := bson.M{"clientid": id}
		update := bson.M{"$set": goal}
		_, err := database.Client.Database("habits").Collection("goals").UpdateOne(database.Ctx, filter, update)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		helpers.Success(context, goal)
	}
}

// DELETE /goals/:id
func DeleteGoal(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Get the id parameter from the URL
		id := context.Param("id")

		// Find the document with the given _id and delete it
		filter := bson.M{"clientid": id}
		result, err := database.Client.Database("habits").Collection("goals").DeleteOne(database.Ctx, filter)
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

// associations
func ListTasksByGoal(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		id := context.Param("id")

		// find all tasks documents in the tasks collection where the goal field matches the given goal id
		var responseBody []models.Task

		// retrieve all documents from the tasks collection where the goal field matches the given goal id
		cursor, err := database.Client.Database("habits").Collection("tasks").Find(database.Ctx, bson.M{"goal": id})
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

func ListHabitsByGoal(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		id := context.Param("id")

		// find all tasks documents in the tasks collection where the goal field matches the given goal id
		var responseBody []models.Task

		// retrieve all documents from the tasks collection where the goal field matches the given goal id
		cursor, err := database.Client.Database("habits").Collection("habits").Find(database.Ctx, bson.M{"goal": id})
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
