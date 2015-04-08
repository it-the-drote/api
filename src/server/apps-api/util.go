package main

import (
        "fmt"
        "os/exec"
        "encoding/json"
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

func getDuolingoStats(name string) []LangStats {
    cmd := exec.Command("/usr/bin/duolingo-api.py", name)
    stdout, err := cmd.Output()
    if err != nil {
        println(err.Error())
    }
    var languages []LangStats
    err = json.Unmarshal([]byte(stdout), languages)

    fmt.Println(languages)

    return languages
}
