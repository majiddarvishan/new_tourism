package main

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"tourism/database"
	"tourism/routes"
)

func main() {
	db := database.ConnectDB()

	router := gin.Default()

	// Get allowed origins from environment variable or use default
	allowedOrigins := strings.Split(getEnv("ALLOWED_ORIGINS", "http://localhost:3000"), ",")

	// Log allowed origins for debugging
	log.Printf("Allowed CORS origins: %v", allowedOrigins)

	// Apply CORS middleware first
	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With", "Access-Control-Request-Method", "Access-Control-Request-Headers"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Enhanced debug middleware
	router.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		method := c.Request.Method
		path := c.Request.URL.Path

		log.Printf("[DEBUG] Request: %s %s from %s", method, path, origin)
		log.Printf("[DEBUG] Request Headers: %v", c.Request.Header)

		// Log CORS headers in response
		c.Next()

		log.Printf("[DEBUG] Response Headers: %v", c.Writer.Header())
		log.Printf("[DEBUG] CORS Headers: Access-Control-Allow-Origin: %s", c.Writer.Header().Get("Access-Control-Allow-Origin"))
	})

	routes.RegisterUserRoutes(router, db)
	routes.RegisterCommentRoutes(router, db)

	port := getEnv("PORT", "5000")
	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Server error:", err)
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
