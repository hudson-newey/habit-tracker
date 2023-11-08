package models

type GptMessage struct {
	Role         string
	Content      string
	FunctionCall string
}

type FunctionCall struct {
	Name      string
	Arguments string
}
