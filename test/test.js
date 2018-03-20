const Nightmare = require('nightmare')
const assert = require('assert')

describe('Public Pages', function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout('12s')

  let nightmare = null
  beforeEach(() => {
    // nightmare = new Nightmare()
    nightmare = new Nightmare({show:true}) //for showing the browser
  })

  describe('HomePage', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:5000/')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/Barter', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:5000/Barter')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/About', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:5000/About')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/users/register', () => {
    it('should work register a new user then go to homepage', done => {
      nightmare
      .goto('http://localhost:5000/users/register')
      .type('[type="text"]', 't'+Math.round(Math.random()*100000))
      .type('[type="email"]', 't'+Math.round(Math.random()*100000)+'@test.com')
      .type('#pw1', '1234')
      .type('[name="password2"]', '1234')
      .click('#submitbtn')
      .wait(2000)
      .wait('#bigbutton')
      .end()
      .then(function (result) { done() })
      .catch(done)
    })
  })

// ^^^^ADD CASE LIKE THIS FOR DUP USER AND MISMATCH PASS
// ADD CASES FOR INVALID EMAIL -> submit shouldnt work in this case

})
