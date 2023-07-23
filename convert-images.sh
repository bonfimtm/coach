#!/bin/sh
for file in src/assets/images/*
do
    cwebp -q 50 "$file" -o "${file%.*}.webp"
done
