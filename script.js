let bookTitleLiked = '';
let bookTitlesLiked = [];

function renderBody() {
    renderBooks();
}

function renderBooks() {
    updateBookLikesFromStorage();
    let booksListingRef = document.getElementById('booksListing');
    booksListingRef.innerHTML = '';
    for (bookIndex = 0; bookIndex < books.length; bookIndex++) {
        booksListingRef.innerHTML += getBookItemTemplate(bookIndex);
        renderBookComments(bookIndex);
    }
}

function renderBookComments(bookIndex) {
    bookComments = books[bookIndex].comments;
    let bookCommentsListingRef = document.getElementById('bookCommentsListing-' + bookIndex);
    bookCommentsListingRef.innerHTML = '';
    for (let commentIndex = 0; commentIndex < bookComments.length; commentIndex++) {
        bookCommentsListingRef.innerHTML += getBookCommentsTemplate(bookIndex, bookComments, commentIndex);
    }
}

function addBookComment(bookIndex, event) {
    bookComments = books[bookIndex].comments;
    bookCommentName = "Goninski";
    bookCommentRef = document.getElementById('bookCommentInput-' + bookIndex);
    bookComment = bookCommentRef.value;
    if(bookComment) {
        bookCommentRef.required = false;
        let obj = {"name": bookCommentName, "comment": bookComment};
        bookComments.unshift(obj);
        renderBookComments(bookIndex);
        bookCommentRef.value = '';
        event.preventDefault();
    }
}

function updateBookLikesFromStorage() {
    bookTitlesLiked = getBookLikesFromStorage();
    if( bookTitlesLiked.length == 0) {
        bookTitlesLiked = [];
        return bookTitlesLiked;
    }
    for (let index = 0; index < bookTitlesLiked.length; index++) {
        bookIndex = books.findIndex(element => element.name === bookTitlesLiked[index]);
        if(bookIndex >= 0) {
            books[bookIndex].liked = true;
        }
    }
}

function getBookLikesFromStorage() {
    let storageStr = localStorage.getItem("bookTitlesLiked");
    bookTitlesLiked = JSON.parse(storageStr);
    if(! bookTitlesLiked) {
        bookTitlesLiked = [];
    }
    return bookTitlesLiked;
}

function toggleBookLikeStatus(bookIndex) {
    bookLikeStatus = books[bookIndex].liked;
    if(bookLikeStatus) {
        bookLikeStatus = false;
    } else {
        bookLikeStatus = true;
    }
    books[bookIndex].liked = bookLikeStatus;
    saveBookLikesToStorage(bookIndex, bookLikeStatus);
    toggleBookLikeIcon(bookIndex, bookLikeStatus);
    toggleBookLikeQty(bookIndex, bookLikeStatus);
}

function toggleBookLikeQty(bookIndex, bookLikeStatus) {
    bookLikes = books[bookIndex].likes;
    let qty = -1;
    if(bookLikeStatus) {
            qty = 1;
    }
    bookLikes = bookLikes + qty;
    books[bookIndex].likes = bookLikes
    document.getElementById('bookLikes-' + bookIndex).innerHTML = bookLikes;
}

function toggleBookLikeIcon(bookIndex, bookLikeStatus) {
    let imgSource = 'assets/icons/favorite-' + bookLikeStatus + '.svg';
    document.getElementById('bookLikeIcon-' + bookIndex).src = imgSource;
}

function saveBookLikesToStorage(bookIndex, bookLikeStatus) {
    bookTitleLiked = books[bookIndex].name;
    bookTitlesLiked = getBookLikesFromStorage();
    let index = -1;
    if(bookTitlesLiked.length > 0) {
        index = bookTitlesLiked.indexOf(bookTitleLiked);
    }
    if(bookLikeStatus) {
        if (index < 0) {
            bookTitlesLiked.push(bookTitleLiked);
        }
    } else {
        if (index >= 0) {
            bookTitlesLiked.splice(index, 1);
        }
    }
    localStorage.setItem("bookTitlesLiked", JSON.stringify(bookTitlesLiked));
}
