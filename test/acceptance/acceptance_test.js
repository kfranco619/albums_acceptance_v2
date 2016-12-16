'use strict'
const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const database = require(path.resolve('config/database'))
const albumsCollection = database.get('albums')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
  beforeAll((done) => {
    console.log('Im in before');
    albumsCollection.remove(done)
    var albums = {
        artist: 'Nombre',
        album: 'Senor',
        genre: 'folk lore'
    }
    albumsCollection.insert(albums, (err, data) => {
        if(err){
          done(err)
        }
        done()
    })

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
        it('then the user should see the list of albums', ()=>{
          //  console.log(albumsCollection.find({}));
            expect(element(by.tagName('table')).getAttribute('id')).toEqual('album-list')
            expect(element.all(by.tagName('td')).getAttribute('class').getText()).toContain('Nombre')
            expect(element.all(by.tagName('td')).getAttribute('class').getText()).toContain('Senor')
            expect(element.all(by.tagName('td')).getAttribute('class').getText()).toContain('folk lore')

        })
        it('Then the user shoudl see a link to a specific album', () =>{
          expect(element.all(by.tagName('a')).get(0).getAttribute('href')).toContain('/albums')
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
        it('Then they should see a submit button for the form', () => {
            browser.get('/albums/new')
           expect(element(by.id('btnAlbum')).getAttribute('type')).toBe('submit')
        })
        it('Then the form should insert a new record', ()=> {
        browser.get('/albums/new')
        element(by.id('artistTextID')).sendKeys('Nombre2')
        element(by.id('albumTextID')).sendKeys('Senor2')
        element(by.id('genreTextID')).sendKeys('Flok2')
        element(by.id('btnAlbum')).submit()
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/albums')
        })
     })

     describe('When the user clicks on the edit album', () => {
             it('Then they should see album details in edit mode', (done)=> {
                 var id
                 albumsCollection.find({}, (err, data) => {
                   if(err)
                   {
                     done(err)
                   }
                  id = data[0]._id
                  console.log('this is the collection' , id);
                  browser.get('/albums/'+ id + 'edit')
                  expect(element(by.tagName('h1')).getText()).toEqual('Edit album')
                  done()
                 })
                })
            //  it('Then they should see a textbox for artist', ()=> {
            //      browser.get('/albums/new')
            //      expect(element(by.id('artistTextID')).getAttribute('type')).toBe('text')
            //      expect(element(by.id('albumTextID')).getAttribute('type')).toBe('text')
            //      expect(element(by.id('genreTextID')).getAttribute('type')).toBe('text')
             //
            //     })
            //  it('Then they should see a submit button for the form', () => {
            //      browser.get('/albums/new')
            //     expect(element(by.id('btnAlbum')).getAttribute('type')).toBe('submit')
            //  })
            //  it('Then the form should insert a new record', ()=> {
            //  browser.get('/albums/new')
            //  element(by.id('artistTextID')).sendKeys('Nombre2')
            //  element(by.id('albumTextID')).sendKeys('Senor2')
            //  element(by.id('genreTextID')).sendKeys('Flok2')
            //  element(by.id('btnAlbum')).submit()
            //  expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/albums')
            //  })
          })

    })
})
