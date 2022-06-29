#!/bin/sh
echo "Installing Node Packages"
npm install
echo "Creating MySQL Database and Tables"
echo "Enter MySQL passsowrd (cab230)"
sudo mysql -u root -p < database/dump.sql
echo "Setting up SSL Certificate"
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/node-selfsigned.key -out /etc/ssl/certs/node-selfsigned.crt
echo "Changes privilidges for SLL Certificates"
sudo chmod +rx /etc/ssl/private/
sudo chmod +r /etc/ssl/private/node-selfsigned.key
sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node
