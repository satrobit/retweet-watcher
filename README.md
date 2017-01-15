# retweet-watcher
===
It watches a given tweet and sends direct messages to users who retweet it (if they already follow you).

## Install
### Install dependecies:
```bash
npm install -g pm2
npm install lowdb
npm install twitter
```

### Modify Config
Modify configuration variables in `app.js`.

### Run
Replace TWEET_ID with your tweet id.
```bash
pm2 start app -- TWEET_ID
```