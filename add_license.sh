#!/bin/bash

# License text (without comment syntax)
LICENSE_TEXT="TDD-JSON-Workbench
Copyright (C) 2023 Prashant Tiwari

This program is a personal project and free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>."

# License headers for different file types
LICENSE_HEADER_JS_JAVA="/*
$LICENSE_TEXT
*/"

LICENSE_HEADER_PY="# $LICENSE_TEXT"

LICENSE_HEADER_HTML="<!--
$LICENSE_TEXT
-->"


# Function to add the license header to a file
add_license() {
  local file=$1
  local extension="${file##*.}"

  if ! grep -q "GNU General Public License" "$file"; then
    echo "Adding license to $file"

    case "$extension" in
      js|java)
        { echo "$LICENSE_HEADER_JS_JAVA"; cat "$file"; } > temp_file && mv temp_file "$file"
        ;;
      py)
        { echo "$LICENSE_HEADER_PY"; cat "$file"; } > temp_file && mv temp_file "$file"
        ;;
      html)
        { echo "$LICENSE_HEADER_HTML"; cat "$file"; } > temp_file && mv temp_file "$file"
        ;;
      *)
        echo "Skipping $file - unsupported file extension"
        ;;
    esac
  else
    echo "License already present in $file"
  fi
}

# Find all files with specific extensions but exclude certain directories
find . \
  -type f \( -name "*.js" -o -name "*.java" -o -name "*.py" -o -name "*.html" \) \
  -not -path "./node_modules/*" \
  -not -path "./dist/*" \
  -not -path "./build/*" \
  -not -path "./out/*" \
  -not -path "./.git/*" |
while read -r file; do
  add_license "$file"
done