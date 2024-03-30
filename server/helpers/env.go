package helpers

import (
	"os"

	"github.com/joho/godotenv"
)

func EnvVariable(key string) string {
	if err := godotenv.Load(".env"); err != nil {
		panic(err)
	}

	return os.Getenv(key)
}
