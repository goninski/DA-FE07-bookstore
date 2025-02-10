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
        <div class="book-header flex-col gap">
            <img src="assets/img/open-book-illustration-PB4109187-red-512.png" alt="open-book-illustration" class="book-cover mt">
            <h3 class="text-center">${bookTitle}</h3>
        </div>
        <hr>
        <div class="book-metas">
            <div class="book-meta-header flex-row gap justify-between mb">
                <div class="book-price">${bookPrice} €</div>
                <div class="book-likes-wrapper">${bookLikes}
                    <img src="assets/icons/favorite-${bookLikeStatus}.svg" alt="heart-icon" id="bookLikeIcon-${bookIndex}" class="book-like-icon" onclick="toggleLikeStatus(${bookIndex}, ${bookLikeStatus})">
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
        <div class="book-comments flex-col flex-grow justify-between">
            <h4 class="mb-05">Kommentare </h4>
            <div class="book-comments-listing-wrapper">
                <table id="bookCommentsListing-${bookIndex}"></table>
            </div>
            <form class="mt-20 flex-row gap-05 justify-between">
                <label for="comment" class="hide">Dein Kommentar :</label>
                <input type="text" name="comment" placeholder="Schreibe deinen Kommentar...">
                <button type="submit"><img src="assets/icons/send-g.svg" alt="send-icon"></button>
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

function getIcon(type) {
    switch (type) {
        case 'like':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
            `;
    }
}
