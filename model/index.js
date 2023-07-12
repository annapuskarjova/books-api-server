const bookValidationSchema = {
    name: {
        exists: {
            errorMessage: "Book title is required",
            options: { checkFalsy: true },
        },
        notEmpty: true,
        isString: { errorMessage: "Book title should be string" },
    },
    author: {
        exists: {
            errorMessage: "Book author is required",
            options: { checkFalsy: true },
        },
        notEmpty: true,
        isString: { errorMessage: "Book author should be string" },
    },
    year: {
        exists: {
            errorMessage: "Publish year is required",
            options: { checkFalsy: true },
        },
        notEmpty: true,
        isString: { errorMessage: "Publish year should be string" },
    },
    available: {
        exists: {
            errorMessage: "Publish year is required",
            options: { checkFalsy: true },
        },
        notEmpty: true,
        isInt: {
            errorMessage: "Quantity should be in range 0..999",
            options: (value) => value >= 0 && value <= 999,
        },
    },
}

const books = {}

const nextId = () => {
    return Math.floor(Date.now() * Math.random());
}

const bookRepository = {
    create: (book) => {
        var id = nextId()
        book["id"] = id
        books[id] = book
        return book 
    },

    findById: (id) => {
        return books[id]
    },

    findAll: () => {
        return Object.values(books)
    },

    update: (id, book) => {
        book["id"] = id
        books[id] = book
        return book
    },

    remove: (id) => {
        const book = books[id]
        delete books[id]
        return book
    }
}

module.exports = {
    bookRepository,
    bookValidationSchema
}