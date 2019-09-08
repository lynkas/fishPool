package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var global struct{
	DB *gorm.DB
	Rec map[string]int64
	Total int
	V int
}

func main() {
	Init()
	go Checker()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	router(r)

	r.Run("127.0.0.1:8081")
}