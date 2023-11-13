package routes

import (
	"net/http"
	"server/helpers"

	"github.com/gin-gonic/gin"
)

func RedirectRoute(context *gin.Context) {
	context.Redirect(http.StatusMovedPermanently, helpers.EnvVariable("CLIENT_URL"))
}
