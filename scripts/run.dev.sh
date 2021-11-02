#!/bin/bash
/snap/bin/docker build -t habit-web-dev .
/snap/bin/docker run --name habit-web-dev --rm --detach habit-web-dev
rm -rf /home/habitdev/www/web/build
/snap/bin/docker cp habit-web-dev:/usr/local/app/build /home/habitdev/www/web
/snap/bin/docker stop habit-web-dev