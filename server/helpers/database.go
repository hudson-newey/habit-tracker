package helpers

import (
	"server/models"
	"strconv"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
)

func NextClientId(database models.Database, table string) string {
	var largestId int64 = 0

	cursor, err := database.Client.Database("habits").Collection(table).Find(database.Ctx, bson.D{})

	if err != nil {
		return "1"
	}

	defer cursor.Close(database.Ctx)

	// if the database is empty, return a string "1"
	if cursor.RemainingBatchLength() == 0 {
		return "1"
	}

	// iterate over all the documents in the Collection
	for cursor.Next(database.Ctx) {
		var result bson.M
		err := cursor.Decode(&result)
		if err != nil {
			fmt.Println(err)
		}

		// convert the _id field to an int64
		id, err := strconv.ParseInt(result["clientid"].(string), 10, 64)
		if err != nil {
			fmt.Println(err)
		}

		// if the id is larger than the largestId, set the largestId to the NextClientId
		if id > largestId {
			largestId = id
		}
	}

	// return the largestId + 1 converted to a string
	return strconv.FormatInt(largestId + 1, 10)
}
