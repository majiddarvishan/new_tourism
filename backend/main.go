package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	// "gorm.io/gorm/logger"
	// "gorm.io/driver/sqlite"
	// _ "modernc.org/sqlite" // <-- CGO-free driver

    "tourism/database"
    "tourism/routes"
)


func main() {
    db := database.ConnectDB()

	// ایجاد سرور Gin
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // اجازه از مبدا فرن‌ت‌اند
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

    routes.RegisterUserRoutes(router, db)
    routes.RegisterCommentRoutes(router, db)

	// اجرای سرور روی پورت 5000
	if err := router.Run(":5000"); err != nil {
		log.Fatal("خطا در اجرای سرور:", err)
	}
}
