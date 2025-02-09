let bookTitleLiked = '';
let bookTitlesLiked = [];
let storageStr = '';

function renderBody() {
    renderBooks();
}

function renderBooks() {
    getLikedBooksFromStorage();
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

function getLikedBooksFromStorage() {
    storageStr = localStorage.getItem("bookTitlesLiked");
    bookTitlesLiked = JSON.parse(storageStr);
    if(bookTitlesLiked && bookTitlesLiked.length > 0) {
        for (let index = 0; index < bookTitlesLiked.length; index++) {
            bookIndex = books.findIndex(element => {return element.name == bookTitlesLiked});
            books[bookIndex].liked = true;
        }
    }
}

function toggleLikeStatus(bookIndex) {
    bookLikeStatus = books[bookIndex].liked;
    if(bookLikeStatus) {
        bookLikeStatus = false;
    } else {
        bookLikeStatus = true;
    }
    books[bookIndex].liked = bookLikeStatus;
    saveLikedBookToStorage(bookIndex);
    let imgSource = 'assets/icons/favorite-' + bookLikeStatus + '.svg';
    document.getElementById('bookLikeIcon-' + bookIndex).src = imgSource;
}

function saveLikedBookToStorage(bookIndex) {
    bookLikeStatus = books[bookIndex].liked;
    bookTitleLiked = books[bookIndex].name;
    let bookIncluded = false;
    if(bookTitlesLiked) {
        bookIncluded = bookTitlesLiked.includes(bookTitleLiked);
    }
    if(bookLikeStatus && ! bookIncluded) {
        bookTitlesLiked.push(bookTitleLiked);
    } else if (! bookLikeStatus && bookIncluded) {
        bookTitlesLiked = bookTitlesLiked.filter((element) => {return element[bookTitleLiked] == false});
    }
    localStorage.setItem("bookTitlesLiked", JSON.stringify(bookTitlesLiked));
}

