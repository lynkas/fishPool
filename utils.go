package main

import (
	"fmt"
	"github.com/axgle/mahonia"
	"github.com/gin-gonic/gin"
	"math/rand"
	"net/http"
	"os"
	"time"
)

func unmess(string2 string) string{
	srcCoder := mahonia.NewDecoder("GBK")
	srcResult := srcCoder.ConvertString(string2)
	tagCoder := mahonia.NewDecoder("utf-8")
	_, cdata, _ := tagCoder.Translate([]byte(srcResult), true)
	result := string(cdata)
	return result
}
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
)

const charset = "abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func StringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func RandStringBytesMask(length int) string {
	return StringWithCharset(length, charset)
}

func getCookies(c *gin.Context) string {
	//url := location.Get(c)
	cookie, err := c.Cookie("fishpool")
	if err != nil {
		nc:=RandStringBytesMask(256)
		http.SetCookie(c.Writer,&http.Cookie{
			Name:"fishpool",Value:nc,Expires: time.Now().Add(2147483647 * time.Second),
		})
		cookie=nc
	}
	return cookie
}

func Init(){
	readConfig()
	dBinit()
	dbChange()
	picPath()
}

var PIC_PATH = "web/media/"

func picPath(){
	if _, err := os.Stat(PIC_PATH); os.IsNotExist(err) {
		err:=os.Mkdir(PIC_PATH,0755)
		if err!=nil {
			fmt.Println(err)
		}
	}
}

func TimeReadable(t time.Time) string {

	return t.Format("2006.01.02 1504")
}