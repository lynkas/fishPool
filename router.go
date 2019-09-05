package main

import "github.com/gin-gonic/gin"

func router(r *gin.Engine)  {
	api:=r.Group("/api")

	pic:=api.Group("/pic")
	pic.GET("/")
	pic.GET("/:key",GetPic)
	pic.POST("/")
	pic.DELETE("/")

	tag:=api.Group("/tag")
	tag.GET("/")

	_=api.Group("/auth")

}