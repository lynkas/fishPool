package main

import (
	"github.com/gin-gonic/gin"
	"os"
)

func GetPic(c *gin.Context)  {
	key:=c.Param("key")
	pic:=Pic{}
	global.DB.Where("key=?", key).First(&pic)
		//cookie,err:=c.Cookie("pgass4_session")
		//fmt.Println(cookie)
		//fmt.Println(err)

	if pic.Key=="" {
		c.JSON(404,gin.H{"message":"no this pic"})
		c.Abort()
		return
	}
	//auth:=c.Request.Header.Get("Authentication")
	//fmt.Println(auth)
	c.JSON(200,pic)
}

func AddPic(c *gin.Context){
	form, _ := c.MultipartForm()
	pics := form.File["pic"]
	for _, pic:= range pics{

		err:=c.SaveUploadedFile(pic,"web/media/"+)
	}
}