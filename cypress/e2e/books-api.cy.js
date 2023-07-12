describe('Books API Server E2E Tests', () => {
  before(cy.bookLibraryInit)
  after(cy.bookLibraryClear)

  describe('E2E-001: Test that book api can return items', () => {
    it('Get a list of 100 books', () => {
      cy.request('GET', '/books').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.eq(100)
      })
    })
  })

  describe('E2E-002: Test that book could be added', () => {
    it('Add a new book to the list', () => {
      const book = {
        name: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: '1813',
        available: 2
      }

      cy.request('POST', '/books', book).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("id")
        expect(response.body.author).to.be.eq('Jane Austen')
      })
    })

    it('Check that wrong data cannot be saved', () => {
      const wrongData = [
        {}, {"author": ""}
      ]

      wrongData.forEach(book => {
        cy.request({method: 'POST', url: '/books', body: book, failOnStatusCode: false}).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body).to.have.property("errors")
        })
      })
    })
  })

  describe('E2E-003: Test that book could be deleted', () => {
    it('Delete book from the list', () => {
      const book = {
        name: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: '1813',
        available: 3
      }

      cy.request('POST', '/books', book).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("id")
        expect(response.body.author).to.be.eq('Jane Austen')
        const body = response.body
        const bookId = body.id

        cy.request('DELETE', `/books/${bookId}`).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.id).to.be.eq(bookId)
        })

      })
    })
  })
  describe('E2E-004: Test that book could be updated', () => {
    it('Update a newly added book', () => {
      const book = {
        name: 'Pasakas par ziediem',
        author: 'Anna Sakse',
        year: '1966',
        available: 1
      }
  
      cy.request('POST', '/books', book).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("id")
        expect(response.body.author).to.be.eq('Anna Sakse')
        const body = response.body
        const bookId = body.id
  
        const updatedBook = {
          name: 'Pasakas par ziediem',
          author: 'Anna Sakse',
          year: '1974',
          available: 1
        }
  
        cy.request('PUT', `/books/${bookId}`, updatedBook).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.year).to.be.eq('1974')
        })
      })
    })
})


})