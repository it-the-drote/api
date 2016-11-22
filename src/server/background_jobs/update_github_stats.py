#!/usr/bin/env python2

import json
import requests
import time
import os
from pymongo import MongoClient

additions = 0
deletions = 0

headers = {}
raw_data = {}
while raw_data == {}:
    raw_data = requests.get('https://api.github.com/users/like-all/repos', headers=headers)
    if raw_data.status_code == 403:
        print "Entering long sleep"
        time.sleep(3600)

repositories = json.loads(raw_data.content)

for repo in repositories:
    repo_data = {}
    while repo_data == {}:
        raw_repo_data = requests.get('https://api.github.com/repos/like-all/' + repo['name'] + '/stats/contributors', headers=headers)
        if raw_repo_data.status_code == 403:
            print "Entering long sleep"
            time.sleep(3600)
        else:
            repo_data = json.loads(raw_repo_data.content)
            time.sleep(5)

    if repo_data != []:
        additions = additions + repo_data[0]['weeks'][len(repo_data[0]['weeks']) - 1]['a']
        deletions = deletions + repo_data[0]['weeks'][len(repo_data[0]['weeks']) - 1]['d']

client = MongoClient('localhost', 27018)
db = client.api
github = db.github
stats = {"user": "like-all", "additions": additions, "deletions": deletions}

result = github.update({"user": "like-all"}, {"$set": stats}, upsert=True)
print result
