package routes

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"

    "tourism/models"
)

// RegisterUserRoutes مسیرهای مربوط به کاربر را ثبت می‌کند.
func RegisterUserRoutes(router *gin.Engine, db *gorm.DB) {
    userGroup := router.Group("/api/users")
    {
        userGroup.POST("/signup", func(c *gin.Context) {
            var user models.User
            if err := c.ShouldBindJSON(&user); err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
                return
            }

            if err := db.Create(&user).Error; err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
                return
            }

            c.JSON(http.StatusCreated, gin.H{
                "message": "ثبت‌نام موفق!",
                "user":    user,
            })
        })

        userGroup.POST("/login", func(c *gin.Context) {
            var credentials struct {
                Email    string `json:"email"`
                Password string `json:"password"`
            }
            if err := c.ShouldBindJSON(&credentials); err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
                return
            }

            var user models.User
            if err := db.Where("email = ? AND password = ?", credentials.Email, credentials.Password).First(&user).Error; err != nil {
                c.JSON(http.StatusUnauthorized, gin.H{
                    "error": "ایمیل یا رمز عبور نادرست است",
                })
                return
            }

            c.JSON(http.StatusOK, gin.H{"message": "ورود موفق!", "user": user})
        })
    }
}
