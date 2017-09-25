#!/usr/bin/env bash

TELEGRAM_TOKEN=`cat /etc/datasources/apps-api.json | jq -r .pisunBotToken`
LOG_FILE='/home/repo/local/reprepro.log'

cd /home/repo/local

for i in `ls incoming/development/*.deb`; do
  if dpkg-deb --contents $i > /dev/null 2>&1; then
    reprepro -Vb . includedeb development $i >> $LOG_FILE
    curl -XPOST --data-urlencode "token=$TELEGRAM_TOKEN" \
                --data-urlencode "message=📦✅ package $i has been successfully added to development repo" \
                https://api.it-the-drote.tk/telegram >> $LOG_FILE
    rm -f $i
  else
    echo "package $i is broken" >> $LOG_FILE
    curl -XPOST --data-urlencode "token=$TELEGRAM_TOKEN" \
                --data-urlencode "message=📦❌ unable to add package $i to development repo" \
                https://api.it-the-drote.tk/telegram >> $LOG_FILE
    exit 1
  fi
done