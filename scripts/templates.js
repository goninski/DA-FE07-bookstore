let iconSend = getIcon('send');

function getBookItemTemplate(bookIndex) {
    bookTitle = books[bookIndex].name;
    bookAuthor = books[bookIndex].author;
    bookPrice = Number(books[bookIndex].price).toFixed(2);
    bookPublishedYear = books[bookIndex].publishedYear;
    bookGenre = books[bookIndex].genre;
    bookLikes = books[bookIndex].likes;
    bookLikeStatus = books[bookIndex].liked;
   
    return `
    <div class="book-item flex-col gap">
        <div class="book-header flex-col align-center gap">
            <img src="assets/img/open-book-illustration-PB4109187-red-512.png" alt="open-book-illustration" class="book-cover mt">
            <div class="book-title-wrapper flex-col justify-center"><h3 class="text-center">${bookTitle}</h3></div>
        </div>
        <hr>
        <div class="book-metas">
            <div class="book-meta-header flex-row gap justify-between mb">
                <div class="book-price">${bookPrice} €</div>
                <div class="book-likes-wrapper flex-row align-center">
                    <div id="bookLikes-${bookIndex}" class="book-likes">${bookLikes}</div>
                    <img src="assets/icons/favorite-${bookLikeStatus}.svg" alt="heart-icon" id="bookLikeIcon-${bookIndex}" class="book-like-icon" onclick="toggleBookLikeStatus(${bookIndex})">
                </div>
            </div>
            <table>
                <tr>
                    <td>Author&nbsp;:</td>                                
                    <td>${bookAuthor}</td>
                </tr>
                <tr>
                    <td>Publikations&shy;jahr&nbsp;:</td>
                    <td>${bookPublishedYear}</td>
                </tr>
                <tr>
                    <td>Genre&nbsp;:</td>
                    <td>${bookGenre}</td>
                </tr>
            </table>
        </div>
        <hr>
        <div class="book-comments flex-col flex-grow">
            <h4 class="mb-05">Kommentare </h4>
            <div class="book-comments-listing-wrapper flex-grow">
                <table id="bookCommentsListing-${bookIndex}"></table>
            </div>
            <form class="book-comment-input-wrapper mt-20 flex-row gap-05 justify-between" onsubmit="addBookComment(${bookIndex}, event)">
                <label for="comment" class="hide">Dein Kommentar :</label>
                <input type="text" name="comment" placeholder="Schreibe deinen Kommentar..." id="bookCommentInput-${bookIndex}" required>
                <button type="submit" title="Kommentar übermitteln">${iconSend}</button>
            </form>
        </div>
    </div>
    `;
}

function getBookCommentsTemplate(bookIndex, bookComments, commentIndex) {
    bookCommentName = bookComments[commentIndex].name;
    bookComment = bookComments[commentIndex].comment;
    return `
        <tr>
        <td>[${bookCommentName}]&nbsp;:</td>                                
        <td>${bookComment}</td>
        </tr>
    `;
}

function getIcon(type, fill = '#724444') {
    switch (type) {
        case 'send':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${fill}"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
            `;
    }
}
