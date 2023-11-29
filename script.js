const bookDetail = document.querySelector('.booksDetail')
const myLibrary = [];

function book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

}

function addBookToLibrary(title, author, pages, status)  {
    const bookData = new book(title, author, pages, status);
    myLibrary.push(bookData);
    console.log(myLibrary);
    console.log(bookData);
}

function displayBooksLibrary() {
    for(let i = 0; i < myLibrary.length; i++) {
        addBookToDisplay(myLibrary[i]);
    }
}

function addBookToDisplay(bookData) {
    const bookBox = document.createElement("div")
    bookBox.className = "book-box";

    const bookTitle = document.createElement("h2");
    bookTitle.className = "book-title";
    bookTitle.textContent = bookData.title;
    bookBox.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.className = "book-author";
    bookAuthor.textContent = bookData.author;
    bookBox.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.className = "book-pages";
    bookPages.textContent = `Pages: ${bookData.pages}`;
    bookBox.appendChild(bookPages);

    bookDetail.appendChild(bookBox);
}

const title = prompt("Please enter the book name");
const author = prompt("Please enter the Authors name");
const pages = prompt("Please enter total book pages");

addBookToLibrary(title, author, pages);
addBookToLibrary("old book", "au1", "46");
addBookToLibrary("2nd", "au2", "87");
addBookToLibrary("3rd", "au3", "789");

window.addEventListener('load', displayBooksLibrary);

/*

Add a “NEW BOOK” button that brings up a form allowing users to input the details 
for the new book: author, title, number of pages, whether it’s been read and 
anything else you might want.

1. Create a new button and style the page. Do not worry about the status yet.
2. Manually create a form with fields to input the data and style it.
3. Enable the form field when the button is clicked using javascript. So that when the 
button is clicked form is shown to display the data.
4. When the data is submitted in the form it should be displayed on the screen. 
You can choose the display style before manually for it.

*/