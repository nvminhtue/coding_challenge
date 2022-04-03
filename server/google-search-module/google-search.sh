ID=$1
KEYWORD=$2
RANDOM_IP=$3

curl \
  -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'  \
  -H 'Accept-Language: en-US,en;q=0.9,it;q=0.8' \
  -H 'X-Forwarded-For: $RANDOM_IP' \
  -o "./google-search-module/$ID.html" \
  -L "https://www.google.com.vn/search?q=$KEYWORD"
