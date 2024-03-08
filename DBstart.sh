#!/bin/bash

# mkdir -p ~/data/db

source .env
echo $SUDO | sudo -S mongod --dbpath ~/data/db
