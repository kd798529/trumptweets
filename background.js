

const lastTrumpTweet = async function() {
  try {
    const request = await axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json',{
      params: {
        screen_name: 'realDonaldTrump',
        count: '1'
      },
      headers: {
        Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAE6HDwEAAAAALNsIg0nkJfY9B2%2BW9py7Xj%2BOf6Q%3D98pVPSRafSdE34Th9l0hdzVBF4VQJ18t0Liape7qQwAjsAoMl3"
      }
    })
    const tweets = request.data

    if(tweets.length < 1) {
      throw "insufficient number of tweets"
    }

    if(tweets[0].text == null) {
      throw "Invalid tweet"
    }

    return tweets
  } catch (error) {
    console.log(error)
    return false
  }
  
}


chrome.runtime.onInstalled.addListener(function() {
  
  chrome.webNavigation.onCompleted.addListener(async function() {

    const tweets = await lastTrumpTweet()

    if(!tweets) {
      return false
    }

    console.log(tweets)

    const tweet = tweets[0]
    const id = tweet.id_str
    const notificationId = `${tweet.id_str}-${Date.now()}`

    if(typeof id != 'string') {
      return false
    }

    if(localStorage.getItem('id') == id) {
      return false
    }

    localStorage.setItem('id', id)

    const options = {
      title : 'trump tweeted', 
      message: tweet.text,
      type: 'basic', 
      iconUrl: './download.jpeg',
      buttons: [
        {
          title: "View tweet"
        }
      ]
    }
    chrome.notifications.create(notificationId, options, function() {
      
    })

    chrome.notifications.onClicked.addListener(function(notId) {
      if(notId == notificationId) {
        const url = `https://twitter.com/realDonaldTrump/status/${id}`
        chrome.tabs.create({url}, function(tab) {

        })
      }
    })

    
  })
});




