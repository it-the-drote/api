package main

import (
        "fmt"
        "github.com/go-martini/martini"
)

func main() {
    m := martini.Classic()
    fmt.Println("bullshit")

    m.Get("/duolingo/:name", func(params martini.Params) string {
        return "alert(\"" + params["name"] + "\");"
    })

    m.RunOnAddr("localhost:8353")
}
