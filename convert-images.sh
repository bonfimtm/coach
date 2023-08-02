#!/bin/sh
for file in $1
do
    cwebp -q 50 "$file" -o "${file%.*}.webp"
done
