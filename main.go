package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var global struct{
	DB *gorm.DB
}

func main() {
	Init()
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run("127.0.0.1:8081") // listen and serve on 0.0.0.0:8080
}