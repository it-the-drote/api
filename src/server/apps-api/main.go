package main

import (
        "github.com/go-martini/martini"
)

func main() {
    m := martini.Classic()
    m.Get("/duolingo/:name", func(params martini.Params) string {
        duolingoLangs := getDuolingoStats(params["name"])
        return "alert(\"" + duolingoLangs[0].Language + "\");"
    })

    m.RunOnAddr("localhost:8353")
}
