package main

import (
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"io/ioutil"
	"os"
	"time"
)

type dbConfig struct{
	DBAddress string `json:"db_address"`
	Port string `json:"port"`
	DBName string `json:"db_name"`
	Username string `json:"username"`
	Password string `json:"password"`
	SSLMode bool `json:"ssl_mode"`
}

//type User struct {
//	gorm.Model
//	Token string
//	LastUsed  time.Time
//}

type Pic struct {
	gorm.Model
	FileName string `json:"file_name"`
	Token string `json:"-"`
	Key string `gorm:"unique_index" json:"key"`
	CreatedTime time.Time `json:"created_time"`
	Creator string `json:"creator"`
	Topic string `json:"topic"`
}



var config struct{
	DB dbConfig `json:"db"`
}

func Init(){
	readConfig()
	dBinit()
	dbChange()
}

func dbChange()  {
	global.DB.AutoMigrate(&Pic{})

}

func readConfig()  {
	configFile, err := os.Open("conf.json")
	if err != nil {
		panic(err)
	}
	defer configFile.Close()
	configByte, err := ioutil.ReadAll(configFile)
	if err != nil {
		panic(err)
	}
	err=json.Unmarshal([]byte(configByte), &config)
	if err != nil {
		panic(err)
	}
}

func dBinit(){
	ssl :="disable"
	if config.DB.SSLMode {
		ssl= "enable"
	}

	db, err := gorm.Open("postgres", fmt.Sprintf("sslmode=%s host=%s port=%s user=%s dbname=%s password=%s",
		ssl,
		config.DB.DBAddress,
		config.DB.Port,
		config.DB.Username,
		config.DB.DBName,
		config.DB.Password,
		))
	fmt.Print(config.DB.Password)
	if err != nil {
		fmt.Println("Failed to connect database")
		panic(unmess(err.Error()))
	}
	global.DB=db
}