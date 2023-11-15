package routes

import (
	"server/models"

	"github.com/gin-gonic/gin"
)

// GET /schedule/daily-remaining
func DailyRemainingRoute(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
	}
}

// GET /schedule/calendar
func CalendarRoute(database models.Database) func(context *gin.Context) {
	return func(context *gin.Context) {
	}
}
