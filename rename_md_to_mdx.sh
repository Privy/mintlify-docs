#!/bin/bash

# Check if at least one directory is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory1> [directory2] ..."
    exit 1
fi

# Loop through all provided directories
for dir in "$@"; do
    # Check if the directory exists
    if [ ! -d "$dir" ]; then
        echo "Directory $dir does not exist. Skipping."
        continue
    fi

    # Find all .md files in the directory and its subdirectories, then rename them
    find "$dir" -type f -name "*.md" | while read file; do
        mv "$file" "${file%.md}.mdx"
        echo "Renamed: $file -> ${file%.md}.mdx"
    done
done

echo "Renaming complete."