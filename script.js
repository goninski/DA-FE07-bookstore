let bookTitleLiked = '';
let bookTitlesLiked = [];
let storageStr = '';

function renderBody() {
    renderBooks();
}

function renderBooks() {
    setLikedBooksFromStorage();
    let booksListingRef = '';
    let bookCommentsListingRef = '';
    booksListingRef = document.getElementById('booksListing');
    for (bookIndex = 0; bookIndex < books.length; bookIndex++) {
        bookLikeStatus = books[bookIndex].liked;
        saveLikedBookToStorage(bookIndex, bookLikeStatus);
        booksListingRef.innerHTML += getBookItemTemplate(bookIndex);
        bookComments = books[bookIndex].comments;
        bookCommentsListingRef = document.getElementById('bookCommentsListing-' + bookIndex);
            for (let commentIndex = 0; commentIndex < bookComments.length; commentIndex++) {
                bookCommentsListingRef.innerHTML += getBookCommentsTemplate(bookIndex, bookComments, commentIndex);
            }
    }
}

function setLikedBooksFromStorage() {
    bookTitlesLiked = getLikedBooksFromStorage();;
    if(bookTitlesLiked && bookTitlesLiked.length > 0) {
        for (let index = 0; index < bookTitlesLiked.length; index++) {
            bookIndex = books.findIndex(element => {return element.name == bookTitlesLiked});
            if(bookIndex >= 0) {
                books[bookIndex].liked = true;
            }
        }
    } else {
        bookTitlesLiked = [];
    }
}

function getLikedBooksFromStorage() {
    storageStr = localStorage.getItem("bookTitlesLiked");
    bookTitlesLiked = JSON.parse(storageStr);
    if(! bookTitlesLiked) {
        bookTitlesLiked = [];
    }
    return bookTitlesLiked;
}

function toggleLikeStatus(bookIndex) {
    bookLikeStatus = books[bookIndex].liked;
    if(bookLikeStatus) {
        bookLikeStatus = false;
    } else {
        bookLikeStatus = true;
    }
    books[bookIndex].liked = bookLikeStatus;
    saveLikedBookToStorage(bookIndex, bookLikeStatus);
    let imgSource = 'assets/icons/favorite-' + bookLikeStatus + '.svg';
    document.getElementById('bookLikeIcon-' + bookIndex).src = imgSource;
}

function saveLikedBookToStorage(bookIndex, bookLikeStatus) {
    bookTitleLiked = books[bookIndex].name;
    bookTitlesLiked = getLikedBooksFromStorage();
    let index = -1;
    if(bookTitlesLiked.length > 0) {
        index = bookTitlesLiked.indexOf(bookTitleLiked);
    }

    console.log(bookTitlesLiked);
    console.log('name: ' + bookTitleLiked);
    console.log('index: ' + index + ' / book-index: ' + bookIndex);
    
    if(bookLikeStatus) {
        if (index < 0) {
            bookTitlesLiked.push(bookTitleLiked);
        }
    } else {
        if (index >= 0) {
            bookTitlesLiked.splice(index);
        }
    }
    localStorage.setItem("bookTitlesLiked", JSON.stringify(bookTitlesLiked));
}

