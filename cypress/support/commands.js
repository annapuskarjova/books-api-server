Cypress.Commands.add('bookLibraryInit', () => { 
  const books = require('../fixtures/books-test-data.json')
  expect(books.length).to.be.greaterThan(0)

  books.forEach(book => {
    cy.request('POST', '/books', book).then(response => {
      expect(response.status).to.be.eq(201)
    })
  })
})

Cypress.Commands.add('bookLibraryClear', () => { 
  cy.request('GET', '/books').then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.length).to.be.at.least(0)
    response.body
      .map(it => it.id)
      .forEach(id => {
        cy.request('DELETE', `/books/${id}`)
          .then((r) => expect(r.status).to.eq(200))
      })
  })
})
