package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func InternalServerError(context *gin.Context) {
	context.JSON(http.StatusInternalServerError, gin.H{
		"message": "Internal server error",
	})
}

func NotFoundError(context *gin.Context) {
	context.JSON(http.StatusNotFound, gin.H{
		"message": "Not found",
	})
}

func UnauthorizedError(context *gin.Context) {
	context.JSON(http.StatusUnauthorized, gin.H{
		"message": "Unauthorized",
	})
}

func ForbiddenError(context *gin.Context) {
	context.JSON(http.StatusForbidden, gin.H{
		"message": "Forbidden",
	})
}

func BadRequestError(context *gin.Context) {
	context.JSON(http.StatusBadRequest, gin.H{
		"message": "Bad request",
	})
}

func Success(context *gin.Context, data interface{}) {
	context.JSON(http.StatusOK, gin.H{
		"message": "Success",
		"data":    data,
	})
}
