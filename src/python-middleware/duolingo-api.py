#!/usr/bin/env python

import duolingo, sys, json
langstats = []
lingo = duolingo.Duolingo(sys.argv[1])
for i in lingo.get_languages():
    langstats.append(lingo.get_language_details(i))

print json.dumps(langstats)

