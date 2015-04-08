package main

import (
        "strconv"
        "github.com/go-martini/martini"
)

func main() {
    m := martini.Classic()
    m.Get("/duolingo/:name", func(params martini.Params) string {
        resultScript := `var style = document.createElement('style');
                            document.head.appendChild(style);
                            var sheet = document.styleSheets[0];
                            sheet.insertRule(".duolingo { text-align: center; }", sheet.cssRules.length);
                            sheet.insertRule(".duolingo-counter { -moz-transform: rotate(7deg); -webkit-transform: rotate(7deg); position: relative; bottom: 140px; left: 44px; text-align: center; }", sheet.cssRules.length);
                            var langContent = document.createElement('div');
                            langContent.innerHTML = '<div class="duolingo"><h1>Duolingo: ` +
                            params["name"] +
                            `</h1></div>`
        duolingoLangs := getDuolingoStats(params["name"])
        for _, language := range duolingoLangs {
            resultScript = resultScript + `<div class="duolingo"><img src="http://api.it-the-drote.tk/static/img/countryballs/` + language.Language + `.png"></img><div class="duolingo-counter">Level ` + strconv.Itoa(language.Level) + `</div></div>';`
        }
        resultScript = resultScript + `var langBlock = document.getElementById('duolingoBlock');
                                        langBlock.appendChild(langContent);`
        return resultScript
    })

    m.RunOnAddr("localhost:8353")
}
