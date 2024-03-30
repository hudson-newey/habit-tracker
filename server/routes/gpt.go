package routes

import (
	"context"
	"fmt"
	"server/helpers"
	"server/models"
	"strings"

	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
)

const listItemPrefix string = "-"
const messagePrepend string = " List your responses out with a new line and dash (" + listItemPrefix + ") before each one. Do not include any additional information apart from the name"

func sendGptRequest(message string) string {
	fmt.Println("Sending GPT request")

	apiToken := helpers.EnvVariable("OPENAI_API_KEY")

	if apiToken == "" || apiToken == "<your_api_key>" {
		fmt.Println("OPENAI_API_KEY is not set in .env")
		fmt.Println("Set OPENAI_API_KEY it to your OpenAI API key to use AI functionality")
		return ""
	}

	client := openai.NewClient(apiToken)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: message,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}

	return resp.Choices[0].Message.Content
}

func parseItemsFromResponse(response string) []string {
	lines := strings.Split(response, "\n")
	items := []string{}

	for _, line := range lines {
		if strings.HasPrefix(line, listItemPrefix) {
			var newItem string = strings.TrimSpace(strings.TrimPrefix(line, listItemPrefix))

			if newItem != "" {
				items = append(items, newItem)
			}
		}
	}

	return items
}

func getTasksForGoal(goal models.Goal) []models.Task {
	message := fmt.Sprintf("What are some tasks that I can do to achieve my goal of %s? %s. Tasks should not be things that I should do every day, but things I should do once", goal.Name, messagePrepend)
	response := sendGptRequest(message)

	items := parseItemsFromResponse(response)
	tasks := []models.Task{}

	for _, item := range items {
		task := models.Task{
			Name:      item,
			Completed: false,
		}

		tasks = append(tasks, task)
	}

	return tasks
}

func getHabitsForGoal(goal models.Goal) []models.Habit {
	message := fmt.Sprintf("What are some habits that I can form to achieve my goal of %s? %s. Habits should be things that I should do every day, not things that I only do once", goal.Name, messagePrepend)
	response := sendGptRequest(message)

	items := parseItemsFromResponse(response)
	habits := []models.Habit{}

	for _, item := range items {
		habit := models.Habit{
			Name: item,
		}

		habits = append(habits, habit)
	}

	return habits
}

// POST /ai/tasks
func ListTasksForGoal(context *gin.Context) {
	var requestBody models.Goal

	if err := context.BindJSON(&requestBody); err != nil {
		helpers.BadRequestError(context)
		return
	}

	tasks := getTasksForGoal(requestBody)

	helpers.Success(context, tasks)
}

// POST /ai/habits
func ListHabitsForGoal(context *gin.Context) {
	var requestBody models.Goal

	if err := context.BindJSON(&requestBody); err != nil {
		helpers.BadRequestError(context)
		return
	}

	habits := getHabitsForGoal(requestBody)

	helpers.Success(context, habits)
}
