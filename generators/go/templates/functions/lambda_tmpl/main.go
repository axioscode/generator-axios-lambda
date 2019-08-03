package main

import (
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

// Request is a Lambda request.
type Request struct {
	ID    float64 `json:"id"`
	Value string  `json:"value"`
}

// Response is a Lambda response.
type Response struct {
	Message string `json:"message"`
	Ok      bool   `json:"ok"`
}

// Handler processes the Lambda request.
func Handler(request Request) (Response, error) {
	return Response{
		Message: fmt.Sprintf("Processed request ID %f", request.ID),
		Ok:      true,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
