package main

import (
	"crypto/sha1"
	"time"
)

func PostedRecently(pic *string) bool{
	h:=sha1.New()
	h.Write([]byte(*pic))
	s:=h.Sum(nil)
	_,ok:=global.Rec[string(s)]
	global.Rec[string(s)]=time.Now().Unix()
	return ok
}

func Checker()  {
	for true{
		for k,v:=range global.Rec{
			if time.Now().Unix()-v>=10{
				delete(global.Rec, k)
			}
		}
		time.Sleep(time.Second*5)
	}

}