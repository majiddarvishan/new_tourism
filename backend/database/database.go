// database/database.go
package database

import (
	"log"

    "tourism/models"

	"gorm.io/gorm"

    "gorm.io/driver/sqlite"
	_ "modernc.org/sqlite" // <-- CGO-free driver

)

func ConnectDB() *gorm.DB {
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

    autoMigrate(db)

	return db
}


// autoMigrate مدل‌های User و Comment را به پایگاه داده انتقال می‌دهد.
func autoMigrate(db *gorm.DB) {
    if err := db.AutoMigrate(&models.User{}, &models.Comment{}); err != nil {
        log.Fatal("خطا در اجرای AutoMigrate:", err)
    }
}