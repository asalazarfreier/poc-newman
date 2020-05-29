#!/bin/sh
for collection in ./postman/tests/*; do newman run "$collection"; done
