const table = document.querySelector('.tobody');

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
    
    let row = document.createElement('tr');

    let titleCell = document.createElement('td');
    titleCell.textContent = bookData.title;
    row.appendChild(titleCell);

    let authorCell = document.createElement('td');
    authorCell.textContent = bookData.author;
    row.appendChild(authorCell);

    let pagesCell = document.createElement('td');
    pagesCell.textContent = bookData.pages;
    row.appendChild(pagesCell);

    let statusCell = document.createElement('td');
    statusCell.textContent = bookData.status;
    row.appendChild(statusCell);

    table.appendChild(row);
}

const formBtn = document.querySelector('.form-btn');
const confirmBtn = document.querySelector("#confirmBtn");
const dialogForm = document.querySelector('#dialog-form');

formBtn.addEventListener("click", () => {
    dialogForm.showModal();
});



addBookToLibrary("old book", "au1", "49");
addBookToLibrary("2nd", "au2", "87");
addBookToLibrary("3rd", "au3", "789");

window.addEventListener('load', displayBooksLibrary);

/*

Add a “NEW BOOK” button that brings up a form allowing users to input the details 
for the new book: author, title, number of pages, whether it’s been read and 
anything else you might want.

1. Create a new button and create a table to input book data.(done)
2. Manually create a form with fields to input the data.(done)
3. When the data is submitted in the form it should be displayed on the screen. 
4. Style the page and the form display.

*/