// const axiosScript = function() {
//   const script =  document.createElement('script')

//   script.src = 'https://unpkg.com/axios/dist/axios.min.js'

//   document.body.appendChild(script)

// }


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

    console.log(request)

    return request.data
  } catch (error) {
    console.log(error)
    return false
  }
  
}


chrome.runtime.onInstalled.addListener(function() {
  
  chrome.webNavigation.onCompleted.addListener(async function() {

    const tweet = await lastTrumpTweet()
    console.log(tweet)

    if(!tweet) {
      return false
    }

    if(tweet.length < 1) {
      return false
    }

    if(tweet[0].text == null) {
      return false
    }

    

    const id = tweet[0].id.toFixed()

    if(typeof id != 'string') {
      return false
    }

    if(localStorage.getItem('id') == id) {
      return false
    }

    localStorage.setItem('id', id)


    const options = {
      title : 'trump tweeted', 
      message: tweet[0].text,
      type: 'basic', 
      iconUrl: './download.jpeg'
    }
    chrome.notifications.create(id, options, function() {

    })
  })
});




