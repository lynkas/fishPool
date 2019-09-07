package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"net/http"
)

func TMainPage(c *gin.Context){
	getCookies(c)
	var topic Topic
	global.DB.Order(gorm.Expr("random()")).Limit(1).Find(&topic)
	if topic.Content=="" {
		topic.Content="?"
		topic.Count=0
	}
	var pics Pics
	global.DB.Order(gorm.Expr("random()")).Limit(15).Find(&(pics.Pic))
	c.HTML(http.StatusOK,"cnt/index.html",gin.H{
		"topic":topic,
		"pics":pics,
		"title":"fishPool",
	})
}

func TPic(c *gin.Context)  {
	cookie:=getCookies(c)
	key:=c.Param("key")
	pic:=Pic{}
	global.DB.Where("key=?", key).First(&pic)

	if pic.Key=="" {
		c.Redirect(302,"/")
		c.Abort()
		return
	}
	pic.Own=cookie==pic.Token
	c.HTML(200,"pic.html",pic)
	c.Abort()
	return

}

func TMy(c *gin.Context)  {
	cookie:=getCookies(c)
	var pics Pics
	global.DB.Order("id desc").Where("token = ?",cookie).Find(&(pics.Pic))

	c.HTML(http.StatusOK,"cnt/my.html",gin.H{
		"pics":pics,
		"cookie":cookie,
	})

}