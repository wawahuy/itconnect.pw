#!/bin/bash
set -x #echo on

# update & install
apt update || apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
apt install nginx -y

# add simple page
rm -rf /etc/nginx/conf.d
cp /root/simple-conf.d /etc/nginx/conf.d
mkdir /var/simple
echo 'Update SSL' > /var/simple/index.html

# SSL with certbot
apt install certbot python3-certbot-nginx -y
certbot --nginx -d zayuh.me -d www.zayuh.me -d api.zayuh.me --agree-tos -m "nguyengiahuy16@gmail.com" -n
mkdir -pv /etc/nginx/ssl/zayuh.me/
openssl dhparam -out /etc/nginx/ssl/zayuh.me/dhparams.pem -dsaparam 4096

# auto renew certbot
apt install cron -y
cronJob = "0 5 * * 6 certbot renew --dry-run >> /root/certbot.log 2>&1" # auto 5:00 ever 6 of week
(crontab -l ; echo ${cronJob}) | crontab -

# apply conf.d ssl
rm -rf /etc/nginx/conf.d
cp /root/conf.d /etc/nginx/conf.d

# start nginx no daemon
service nginx stop
nginx -g "daemon off;"

# docker-compose no shutdown
tail -F anything