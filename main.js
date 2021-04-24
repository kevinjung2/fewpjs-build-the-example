// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const err = document.getElementById('modal')
err.className = "hidden"

const hearts = document.getElementsByClassName('like-glyph')

for (let i in hearts) {
  hearts[i].addEventListener('click', function(e){
    mimicServerCall()
    .then(activateHeart(e))
    .catch(error => {
      err.className = ""
      err.children[1].innerText = error.message
      setTimeout(function(){err.className = "hidden"}, 5000)
    })
  })
}


function activateHeart(e) {
  e.target.innerText = FULL_HEART
  e.target.className = 'actived-heart'
  e.target.addEventListener('click', function(e){
    e.preventDefault()
    e.target.className = ''
    e.target.innerText = EMPTY_HEART
    e.target.addEventListener('click', function(e){
      mimicServerCall()
      .then(activateHeart(e))
      .catch(error => {
        err.className = ""
        err.children[1].innerText = error.message
        setTimeout(function(){err.className = "hidden"}, 5000)
      })
    })
  })
}
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
