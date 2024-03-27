package routes

// POST /tags
func CreateTag(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var requestBody models.Tag

		if err := context.BindJSON(&requestBody); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		result, err := databaseService.InsertOne(database.Client, database.Ctx, "habits", "tags", requestBody)

		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		var responseBody models.Tag
		id := result.InsertedID.(primitive.ObjectID).Hex()

		responseBody = requestBody
		responseBody.Id = id

		helpers.Success(context, responseBody)
	}
}

func ListTags(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		var responseBody []models.Tag

		cursor, err := database.Client.Database("habits").Collection("tags").Find(database.Ctx, bson.D{})
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}
		defer cursor.Close(database.Ctx)

		for cursor.Next(database.Ctx) {
			var tag models.Tag

			err := cursor.Decode(&tag)

			tag.Id = cursor.Current.Lookup("_id").ObjectID().Hex()

			if err != nil {
				log.Println(err)
				helpers.InternalServerError(context)
				return
			}

			responseBody = append(responseBody, tag)
		}

		helpers.Success(context, responseBody)
	}
}

// GET /tags/:id
func GetTag(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		id := context.Param("id")

		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		var tag models.Tag
		err = database.Client.Database("habits").Collection("tags").FindOne(database.Ctx, bson.D{{"_id", objectId}}).Decode(&tag)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		tag.Id = objectId.Hex()

		helpers.Success(context, tag)
	}
}

// PUT /tags/:id
func UpdateTag(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		// get the id parameter from the URL
		id := context.Param("id")

		// convert the id string to an ObjectID
		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		// get the request request body
		var tag models.Tag
		if err := context.BindJSON(&requestBody); err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		tag.Id = id

		// update the document with the given _id
		filter := bson.M{"_id": objectId}
		update := bson.M{"$set": tag}
		_, err = database.Client.Database("habits").Collection("tags").UpdateOne(database.Ctx, filter, update)
		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		helpers.Success(context, tag)
	}
}

// DELETE /tags/:id
func DeleteTag(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
		id := context.Param("id")

		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			log.Println(err)
			helpers.BadRequestError(context)
			return
		}

		filter := bson.M{"_id": objectId}
		result, err = database.Client.Database("habits").Collection("tags").DeleteOne(database.Ctx, filter)

		if err != nil {
			log.Println(err)
			helpers.InternalServerError(context)
			return
		}

		if result.DeletedCount == 0 {
			helpers.NotFoundError(context)
			return
		}

		helpers.Success(context, nil)
	}
}
