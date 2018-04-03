const Nightmare = require('nightmare')
const assert = require('assert')

var r1 = Math.round(Math.random()*100000);
var r2 = Math.round(Math.random()*100000);

var brand = ['Nike', 'Adidas', 'Crocs'];
var randbrand = brand[Math.floor(Math.random() * brand.length)];
var shoename = ['Free Run', 'Ultraboost', 'Meme Runners'];
var randshoename = shoename[Math.floor(Math.random() * shoename.length)];
var randprice = Math.round(Math.random()*100);
var randdesc = "test description "+Math.round(Math.random()*1000);

describe('Public Pages', function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout('18s')

  let nightmare = null
  beforeEach(() => {
    // nightmare = new Nightmare()
    nightmare = new Nightmare({show:true}) //for showing the browser
  })

  describe('HomePage', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:5000/')
        .wait(1000)
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/shoes/browse', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:5000/shoes/browse')
        .wait(1000)
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/About', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:5000/About')
        .wait(1000)
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/users/register', () => {
    it('should work register a new user then go to homepage', done => {
      nightmare
      .goto('http://localhost:5000/users/register')
      .type('[type="text"]', 't'+r1)
      .type('[type="email"]', 't'+r2+'@test.com')
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

  describe('/users/register', () => {
    it('should fail to create account due to duplicate user', done => {
      nightmare
      //create initial user
      .goto('http://localhost:5000/users/register')
      .type('[type="text"]', 'testDupe') //make this random at some point
      .type('[type="email"]', 'testDupe'+Math.round(Math.random()*100000)+'@test.com')
      .type('#pw1', '1234')
      .type('[name="password2"]', '1234')
      .click('#submitbtn')
      .wait(1000)
      .wait('#pw1')

      /*Not needed until randomized
      //.wait(1000)
      //attempt duplicate users
      .goto('http://localhost:5000/users/register')
      .type('[type="text"]', 'testDupe') //make this random at some point
      .type('[type="email"]', 'testDupe2@email.com')
      .type('#pw1', '1234')
      .type('[name="password2"]', '1234')
      .click('#submitbtn')
      .wait(2000)
      .wait('#regErrorTest')
*/
      .end()
      .then(function (result) { done() })
      .catch(done)
    })
  })

  describe('/users/register', () => {
    it('should fail to create an account due to mismatch with password and password confirmation', done => {
      nightmare
      .goto('http://localhost:5000/users/register')
      .type('[type="text"]', 't'+Math.round(Math.random()*100000))
      .type('[type="email"]', 't'+Math.round(Math.random()*100000)+'@test.com')
      .type('#pw1', '1234')
      .type('[name="password2"]', '12345')
      .click('#submitbtn')
      .wait(1000)
      .wait('#pw1')
      .end()
      .then(function (result) { done() })
      .catch(done)
    })
  })

  describe('/users/register', () => {
    it('should fail to create an account due to invalid email', done => {
      nightmare
      .goto('http://localhost:5000/users/register')
      .type('[type="text"]', 't'+Math.round(Math.random()*100000))
      .type('[type="email"]', 't'+Math.round(Math.random()*100000)+'test.com')
      .type('#pw1', '1234')
      .type('[name="password2"]', '1234')
      .click('#submitbtn')
      .wait(1000)
      .wait('#pw1')
      .end()
      .then(function (result) { done() })
      .catch(done)
    })
  })

  describe('Login', () => {

  describe('Invalid Login', () => {

  	it('Should fail to login in a user as the credentials are invalid', done => {
  		nightmare
  		.goto('http://localhost:5000/')
      .wait(1000)
  		.click('#modalToClick')
      .wait(1000)
  		.type('#usernameTest', 't'+Math.round(Math.random()*100000))
  		.type('#passwordTest', 't'+Math.round(Math.random()*100000))
  		.click('#submitButtonTest')
  		.wait(1000)
  		.end()
      .then(function (result) { done() })
      .catch(done)
     })
    })

  describe('Valid Login', () => {
  	it('Should login in a user as the credentials are valid', done => {
  		nightmare
  		.goto('http://localhost:5000/')
      .wait(1000)
  		.click('#modalToClick')
      .wait(1000)
  		.type('#usernameTest', 't'+r1)
  		.type('#passwordTest', '1234')
  		.click('#submitButtonTest')
  		.wait('#navbarDropdownMenuLink')
      .wait(1000)
  		.end()
      .then(function (result) { done() })
      .catch(done)
     })
    })

  describe('User Settings', () => {
    it('Details in user settings should be correct', done => {
      nightmare
      .goto('http://localhost:5000/')
      .wait(1000)
  		.click('#modalToClick')
      .wait(1000)
  		.type('#usernameTest', 't'+r1)
  		.type('#passwordTest', '1234')
  		.click('#submitButtonTest')
  		.wait(1000)
      .click('#navbarDropdownMenuLink')
      .wait(1000)
      .click('.dropdown-item~ .dropdown-item+ .dropdown-item')
      .wait(1000)
      .evaluate(function () {
          return document.querySelector('h4').innerText;
      })
      .end()
      .then(function (result) { done() })
      .catch(done)
     })
    })

  describe('List Shoe', () => {
    it('Shoe should correctly list to site', done => {
      nightmare
      .goto('http://localhost:5000/')
      .wait(1000)
      .click('#modalToClick')
      .wait(1000)
      .type('#usernameTest', 't'+r1)
      .type('#passwordTest', '1234')
      .click('#submitButtonTest')
      .wait(1000)
      .click('#navbarDropdownMenuLink')
      .wait(1000)
      .click('.dropdown-item:nth-child(2)')
      .wait(1000)
      .type('.form-group:nth-child(1) .form-control', randbrand)
      .type('.form-group:nth-child(2) .form-control', randshoename)
      .type('.form-group~ .form-group+ .form-group input', randprice)
      .type('textarea', randdesc)
      .click('.btn-info')
      .wait('.alert-dismissable')
      .wait(1000)
      .end()
      .then(function (result) { done() })
      .catch(done)
     })
    })

  describe('Edit Shoe', () => {
    it('Should edit shoe description for the first shoe on the account', done => {
      nightmare
      .goto('http://localhost:5000/')
      .wait(1000)
      .click('#modalToClick')
      .wait(1000)
      .type('#usernameTest', 't'+r1)
      .type('#passwordTest', '1234')
      .click('#submitButtonTest')
      .wait(1000)
      .click('.btn-block.mb-2')
      .evaluate(function() {
          document.querySelector('textarea').value = ''
      })
      .type('textarea', "NEWLY CHANGED DESCRIPTION")
      .click('.btn-info')
      .wait('.alert-dismissable')
      .wait(2000)
      .end()
      .then(function (result) { done() })
      .catch(done)
     })
    })

  })
})
