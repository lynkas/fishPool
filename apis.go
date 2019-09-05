package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"net/http"
	"time"
)

func GetPic(c *gin.Context)  {
	key:=c.Param("key")
	pic:=Pic{}
	global.DB.Where("key=?", key).First(&pic)

	if pic.Key=="" {
		c.JSON(404,gin.H{"message":"no this pic"})
		c.Abort()
		return
	}

	c.JSON(200,pic)
	c.Abort()

}

func AddPic(c *gin.Context){
	pic,err := c.FormFile("pic")
	if err!=nil{
		c.JSON(401,gin.H{"message":"no pic"})
		c.Abort()
		return
	}


	id, _ := uuid.NewUUID()
	err=c.SaveUploadedFile(pic,"web/media/"+id.String()+".png")
	if err!=nil {
		c.JSON(500,gin.H{"message":"internal error"})
		c.Abort()
		return
	}
	token:=getCookies(c)
	creator:= c.PostForm("creator")
	if creator=="" {
		creator="Someone"
	}
	key:=RandStringBytesMask(10)
	topic:= c.PostForm("topic")
	picObject := Pic{
		Key:key,
		FileName: "/media/"+id.String()+".png",
		Token:token,
		CreatedTime:time.Now(),
		Creator:creator,
		Topic:topic,
	}
	picObject.Own=token==picObject.Token
	global.DB.Create(&picObject)
	c.JSON(200,picObject)
	c.Abort()
	return
}

func DelPic(c *gin.Context)  {
	key:=c.Param("key")
	pic:=Pic{}
	global.DB.Where("key=?", key).First(&pic)

	if pic.Key=="" {
		c.JSON(404,gin.H{"message":"no this pic"})
		c.Abort()
		return
	}

	token:=getCookies(c)
	if token==pic.Token {
		global.DB.Delete(&pic)
		c.JSON(200,gin.H{"message":"done"})
	}else {
		c.JSON(http.StatusForbidden,gin.H{"message":"might not belongs to you"})
	}
	c.Abort()
	return
	
}

func GetPicsRandom(c *gin.Context)  {
	var pics Pics
	global.DB.Order(gorm.Expr("random()")).Limit(15).Find(&(pics.Pic))
	c.JSON(http.StatusOK,pics)
	c.Abort()
	return
}