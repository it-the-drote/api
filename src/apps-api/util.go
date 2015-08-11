package main

import (
        "fmt"
        "os/exec"
        "encoding/json"
        "io/ioutil"
        "log"
)

type LangStats struct {
    Streak                  int
    Language_string         string
    Language                string
    Level                   int
    To_next_level           int
    Points                  int
    Learning                bool
    Current_learning        bool
    Sentences_translated    int
}

type Config struct {
    Pisun_jabber_token      string
}

func loadConfig() (c *Config, err error) {
    var bfile []byte
    if bfile, err = ioutil.ReadFile("/etc/datasources/apps-api.cfg"); err != nil {
        log.Fatal(err)
    }
    c = new(Config)
    err=json.Unmarshal(bfile, &c)
    return
}

func getDuolingoStats(name string) []LangStats {
    cmd := exec.Command("/usr/bin/duolingo-api.py", name)
    stdout, err := cmd.Output()
    if err != nil {
        println(err.Error())
    }
    var languages []LangStats
    err = json.Unmarshal([]byte(stdout), &languages)

    fmt.Println(string(stdout))
    fmt.Println(languages)

    return languages
}
