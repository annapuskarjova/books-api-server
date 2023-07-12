const { app } = require('./server');
const { bookRepository, bookValidationSchema } = require('./model')
const { checkSchema, validationResult } = require('express-validator')

app.get('/books', (req, res) => {
  res.status(200).send(bookRepository.findAll())
});

app.get("/books/:id", (req, res) => {
  var book = bookRepository.findById(req.params.id)
  if (book !== undefined) {
    res.status(200).send(book);
  } else {
    res.status(404).send(`404: Book with id ${req.params.id} not found`);
  }
});

app.post('/books', checkSchema(bookValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const book = bookRepository.create(req.body)
  res.status(201).send(book);
})

app.put("/books/:id", checkSchema(bookValidationSchema), (req, res) => {
  if (bookRepository.findById(req.params.id) !== undefined) {
    const book = bookRepository.update(req.params.id, req.body)
    res.status(200).send(book);
  } else {
    res.status(404).send(`404: Book with id ${req.params.id} not found`);
  }
});

app.delete("/books/:id", function (req, res) {
  if (bookRepository.findById(req.params.id) !== undefined) {
    const book = bookRepository.remove(req.params.id)
    res.status(200).send(book);
  } else {
    res.status(404).send(`404: Book with id ${req.params.id} not found`);
  }
});