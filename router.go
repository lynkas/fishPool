package main

import (
	"github.com/gin-contrib/location"
	"github.com/gin-gonic/gin"
	"html/template"
)

func router(r *gin.Engine)  {

	r.SetFuncMap(template.FuncMap{
		"TimeReadable": TimeReadable,
	})
	r.Use(location.Default())
	r.Static("/js", "./web/js")
	r.Static("/css", "./web/css")
	r.Static("/media", "./web/media")
	r.Static("/src", "./web/src")

	r.LoadHTMLGlob("web/templates/**/*")

	r.GET("/",TMainPage)
	r.GET("/pic/:key",TPic)
	r.GET("/my",TMy)


	api:=r.Group("/api")

	pic:=api.Group("/pic")
	//pic.GET("/time/:start",GetPicsTime)
	pic.GET("/",GetPicsRandom)
	pic.GET("/:key",GetPic)
	pic.POST("/",AddPic)
	pic.DELETE("/:key",DelPic)

	tag:=api.Group("/tag")
	tag.GET("/")
	tag.GET("/random",GetRandomTopic)

	//_=api.Group("/auth")

}