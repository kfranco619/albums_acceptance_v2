'use strict'
const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })


describe('Given a Album site', ()=> {
    describe('When the user goes to the homepage/ index', () => {
        it('Then they should see a Welcome to Albums header', ()=> {
            browser.get('/')
            expect(element(by.tagName('h1')).getText()).toEqual('OMG Albums!')
           })
        it('Then I should see a link', () =>{
            browser.get('/')
            expect(element(by.tagName('a')).getText()).toEqual('Let me see the RIGHT NOW!')
         })
        it('the link will redirect to /albums',() => {
            expect(element(by.tagName('a')).getAttribute('href')).toContain('/albums') 
         })
     })

     describe('When the user goes to the albums', () => {
        it('Then they should see album header', ()=> {
            browser.get('/albums')
            expect(element(by.tagName('h1')).getText()).toEqual('Albums')
           })
        it('Then they should see New album link', ()=> {
            browser.get('/albums')
            expect(element(by.tagName('a')).getAttribute('href')).toContain('albums/new') 
           })
     })

describe('When the user clicks on the new album', () => {
        it('Then they should see create album header', ()=> {
            browser.get('/albums/new')
            expect(element(by.tagName('h1')).getText()).toEqual('Create album')
           })
        it('Then they should see a textbox for artist', ()=> {
            browser.get('/albums/new')
            expect(element(by.id('artistTextID')).getAttribute('type')).toBe('text')
            expect(element(by.id('albumTextID')).getAttribute('type')).toBe('text')
            expect(element(by.id('genreTextID')).getAttribute('type')).toBe('text')
        
           })
     })

    })
})