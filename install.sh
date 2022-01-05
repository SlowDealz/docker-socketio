#!/bin/sh

set -ex

apk add --update supervisor
rm -rf /var/cache/apk/*

mkdir -p /srv/logs

npm install socket.io
npm dedupe
