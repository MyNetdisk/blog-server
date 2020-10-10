#!/bin/bash
set -e

sed -i 's/123456/'$MYSQL_ROOT_PASSWORD'/' /var/www/service/config/config.default.js

cat /var/www/service/config/config.default.js

npm run start

tail -f /dev/null