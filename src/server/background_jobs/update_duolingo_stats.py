#!/usr/bin/env python2

import json
import requests
import time
import os
from pymongo import MongoClient

language = ''
level = 0
streak = 0

headers = {}
raw_data = {}
raw_data = requests.get('https://www.duolingo.com/users/likeall', headers=headers)

info = json.loads(raw_data.content)

language = info['learning_language']
for item in info['languages']:
    if item['language'] == language:
        level = item['level']
        streak = item['streak']

client = MongoClient('localhost', 27018)
db = client.api
duolingo = db.duolingo
stats = {"user": "likeall", "language": language, "level": level, "streak": streak}

result = duolingo.update({"user": "likeall"}, {"$set": stats}, upsert=True)
print result
