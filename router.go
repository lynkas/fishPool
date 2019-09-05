package main

import "github.com/gin-gonic/gin"

func router(r *gin.Engine)  {
	api:=r.Group("/api")

	pic:=api.Group("/pic")
	//pic.GET("/time/:start",GetPicsTime)
	pic.GET("/",GetPicsRandom)
	pic.GET("/:key",GetPic)
	pic.POST("/",AddPic)
	pic.DELETE("/:key",DelPic)

	//tag:=api.Group("/tag")
	//tag.GET("/")

	//_=api.Group("/auth")

}