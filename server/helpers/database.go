package helpers

import (
	"server/models"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
)

func NextClientId(database models.Database, table string) string {
	largestId := 0

	cursor, err := database.Client.Database("habits").Collection(table).Find(database.Ctx, bson.D{})

	if err != nil {
		return "1"
	}

	defer cursor.Close(database.Ctx)

	// if the database is empty, return a string "1"
	if cursor.RemainingBatchLength() == 0 {
		return "1"
	}

	for cursor.Next(database.Ctx) {
		var result map[string]interface{}
		err := cursor.Decode(&result)

		if err != nil {
			return "1"
		}

		// if the result does not have a ClientId field, skip it
		if _, ok := result["clientid"]; !ok {
			continue
		}

		id := result["clientid"].(int)

		if id > largestId {
			largestId = id
		}
	}

	// return the largestId + 1 converted to a string
	return strconv.Itoa(largestId + 1)
}
