package models

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type Database struct {
	Client *mongo.Client
	Ctx    context.Context
	Cancel context.CancelFunc
}
