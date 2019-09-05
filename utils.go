package main

import "github.com/axgle/mahonia"

func unmess(string2 string) string{
	srcCoder := mahonia.NewDecoder("GBK")
	srcResult := srcCoder.ConvertString(string2)
	tagCoder := mahonia.NewDecoder("utf-8")
	_, cdata, _ := tagCoder.Translate([]byte(srcResult), true)
	result := string(cdata)
	return result
}
