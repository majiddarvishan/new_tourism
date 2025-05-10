package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
)

// تعریف مدل کاربر
type User struct {
    ID       uint   `gorm:"primaryKey" json:"id"`
    Name     string `json:"name"`
    Email    string `json:"email" gorm:"uniqueIndex"`
    Password string `json:"password"`
}

func main() {
    // اتصال به پایگاه داده SQLite
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Fatal("خطا در اتصال به پایگاه داده:", err)
    }

    // ایجاد جدول کاربر اگر وجود ندارد
    if err := db.AutoMigrate(&User{}); err != nil {
        log.Fatal("خطا در مایگریشن پایگاه داده:", err)
    }

    // ایجاد سرور Gin
    router := gin.Default()

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

    // اجرای سرور روی پورت 5000
    if err := router.Run(":5000"); err != nil {
        log.Fatal("خطا در اجرای سرور:", err)
    }
}
