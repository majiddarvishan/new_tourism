package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	// "gorm.io/gorm/logger"
	"gorm.io/driver/sqlite"
	_ "modernc.org/sqlite" // <-- CGO-free driver
)

// تعریف مدل کاربر
type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"password"`
}

// مدل Comment
type Comment struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	UserID  uint   `json:"user_id"`
	PhotoID uint   `json:"photo_id"`
	Text    string `json:"text"`
}

func main() {
	// اتصال به پایگاه داده SQLite
	// db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
	//     Logger: logger.Default.LogMode(logger.Info),
	// })
	// if err != nil {
	//     log.Fatal("خطا در اتصال به پایگاه داده:", err)
	// }

	db, err := gorm.Open(sqlite.Dialector{
		DriverName: "sqlite", // <- this is important
		DSN:        "file:test.db",
	}, &gorm.Config{})
	if err != nil {
		log.Fatal("خطا در اتصال به پایگاه داده:", err)
	}

	// ایجاد جدول کاربر اگر وجود ندارد
	if err := db.AutoMigrate(&User{}, &Comment{}); err != nil {
		log.Fatal("خطا در مایگریشن پایگاه داده:", err)
	}

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

	// مسیر ثبت‌نام (Signup)
	router.POST("/api/users/signup", func(c *gin.Context) {
		var user User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// ایجاد کاربر جدید در پایگاه داده
		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "ثبت‌نام موفق!",
			"user":    user,
		})
	})

	// مسیر ورود (Login)
	router.POST("/api/users/login", func(c *gin.Context) {
		var credentials struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := c.ShouldBindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user User
		// جستجوی کاربر با ایمیل و رمز عبور
		result := db.Where("email = ? AND password = ?", credentials.Email, credentials.Password).First(&user)
		if result.Error != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "ایمیل یا رمز عبور نادرست است",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "ورود موفق!",
			"user":    user,
		})
	})

	// مسیر ثبت‌نظرات (POST)
	router.POST("/api/comments", func(c *gin.Context) {
		var comment Comment
		if err := c.ShouldBindJSON(&comment); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// ایجاد کامنت جدید در پایگاه داده
		if err := db.Create(&comment).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "نظر با موفقیت ثبت شد!",
			"comment": comment,
		})
	})

	// مسیر دریافت نظرات برای یک عکس خاص (GET)
	router.GET("/api/comments", func(c *gin.Context) {
		photoID := c.Query("photo_id")
		var comments []Comment

		if err := db.Where("photo_id = ?", photoID).Find(&comments).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"comments": comments,
		})
	})

	// اجرای سرور روی پورت 5000
	if err := router.Run(":5000"); err != nil {
		log.Fatal("خطا در اجرای سرور:", err)
	}
}
