package database

import (
	"log"
	"time"

	"tourism/models"

	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
	_ "modernc.org/sqlite" // <-- CGO-free driver
)

func ConnectDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Dialector{
		DriverName: "sqlite",
		DSN:        "file:test.db",
	}, &gorm.Config{
		NowFunc: func() time.Time {
			return time.Now().UTC()
		},
	})
	if err != nil {
		log.Fatal("خطا در اتصال به پایگاه داده:", err)
	}

	// Configure SQLite to handle time fields properly
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("خطا در دسترسی به پایگاه داده:", err)
	}

	// Set connection pool settings
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	autoMigrate(db)

	return db
}

func autoMigrate(db *gorm.DB) {
	if err := db.AutoMigrate(&models.User{}, &models.Comment{}); err != nil {
		log.Fatal("خطا در اجرای AutoMigrate:", err)
	}
}
