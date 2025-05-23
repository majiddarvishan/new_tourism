package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"tourism/models"
)

// RegisterCommentRoutes مسیرهای مرتبط با نظرات را ثبت می‌کند.
func RegisterCommentRoutes(router *gin.Engine, db *gorm.DB) {
	commentGroup := router.Group("/api/comments")
	{
		// Create a new comment
		commentGroup.POST("", func(c *gin.Context) {
			var comment models.Comment
			if err := c.ShouldBindJSON(&comment); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			if err := db.Create(&comment).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusCreated, gin.H{
				"message": "Comment created successfully",
				"comment": comment,
			})
		})

		// Get comments for a photo
		commentGroup.GET("", func(c *gin.Context) {
			photoID := c.Query("photo_id")
			if photoID == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "photo_id is required"})
				return
			}

			var comments []models.Comment
			if err := db.Where("photo_id = ?", photoID).Find(&comments).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"comments": comments})
		})
	}
}
