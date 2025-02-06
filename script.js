function renderBody() {
    renderBooks();
}

function renderBooks() {
    let booksListingRef = '';
    let bookCommentsListingRef = '';
    booksListingRef = document.getElementById('booksListing');
    for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
        booksListingRef.innerHTML += getBookItemTemplate(bookIndex);
        let bookComments = books[bookIndex].comments;
        bookCommentsListingRef = document.getElementById('bookCommentsListing-' + bookIndex);
            for (let commentIndex = 0; commentIndex < bookComments.length; commentIndex++) {
                bookCommentsListingRef.innerHTML += getBookCommentsTemplate(bookIndex, bookComments, commentIndex);
            }
    }
}
