package routes

import (
	"server/helpers"

	"github.com/gin-gonic/gin"
)

// POST /ping
func PingRoute(context *gin.Context) {
	helpers.Success(context, "pong")
}
