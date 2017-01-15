/**
 * @author Amir Keshavarz <amirkekh@gmail.com>
 * @date 15/1/17.
 */
(function() {
    "use strict";

    /* Dependencies */
    const low = require('lowdb'),
    db = low('db.json'),
    Twitter = require('twitter');

    db.defaults({ retweets: [] })
    .value();

    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });

    var tweets_id = process.argv[2],
    message_text = 'MESSAGE TEXT';

    client.get('statuses/retweeters/ids', {id: tweets_id}, function(error, retweeters, response) {
        if (!error) {
            var retweeters = retweeters.ids;
            if (retweeters.length !== 0)
            {
                var retweeters_str = retweeters.join();
                client.get('friendships/lookup', {user_id: retweeters_str}, function(error, friendships, response) {

                    if (!error) {
                        friendships.forEach(function(friendship) {
                            var res = db.get('retweets').find({retweeter: friendship.id, tweet: tweets_id}).value();
                            if (typeof res === 'undefined')
                            {
                                if (friendship.connections.indexOf('followed_by') !== -1)
                                {
                                    client.post('direct_messages/new', {user_id: friendship.id, text: message_text},  function(error, direct_message, response)
                                    {
                                        db.get('retweets').push({retweeter: friendship.id, tweet: tweets_id}).value();
                                    });
                                }
                            }
                        });
                    }
                });

            }
            
        }
    });

})();
