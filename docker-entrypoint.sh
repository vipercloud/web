#!/bin/bash
set -e

if [ "$1" = 'web' ]; then
    exec node /var/service/index.js "$@"
fi

exec "$@"
