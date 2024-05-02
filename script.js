const table = document.querySelector(".tobody");
const formBtn = document.querySelector(".form-btn");
const dialogForm = document.querySelector("#dialog-form");
const confirmBtn = document.querySelector("#confirmBtn");
const myLibrary = [];

function book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.toggleStatus = function() {
        this.status = this.status === 'Read' ? 'Not Read' : 'Read';
    }
}

function getCheckStatus() {
    const bookStatus = document.getElementById("book-status");
    return bookStatus.checked ? "Read" : "Not Read";
}

function addBookToLibrary(title, author, pages, status) {
    const existingBook = myLibrary.findIndex(book => book.title === title);
    if (existingBook !== -1) {
        myLibrary[existingBook].author = author;
        myLibrary[existingBook].pages = pages;
    } else {
        const bookData = new book(title, author, pages, status);
        myLibrary.push(bookData);
    }
}

function displayBooksLibrary() {
    table.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++) {
        addBookToDisplay(myLibrary[i]);
    }
}
const displayLibrary = new displayBooksLibrary(table);

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
    let statusBtn = document.createElement('button');
    statusBtn.setAttribute('class', 'status-btn');
    statusBtn.setAttribute('id', 'status-check');
    statusBtn.textContent = bookData.status;
    statusBtn.addEventListener("click", () => {
        bookData.toggleStatus();
        displayBooksLibrary();
    });
    statusCell.appendChild(statusBtn);
    row.appendChild(statusCell);

    let deleteCell = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.innerHTML = "Delete Book";
    deleteBtn.addEventListener("click", (e) => {
        const row = e.target.closest('tr');
        const bookTitle = row.querySelector('td:first-child').textContent;
        const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);
        myLibrary.splice(bookIndex, 1);
        displayBooksLibrary();
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    table.appendChild(row);
}

formBtn.addEventListener("click", () => {
  dialogForm.showModal();
});

function addBookBtn() {
    const inputTitle = document.getElementById("book-title").value;
    const inputAuthor = document.getElementById("book-author").value;
    const inputPages = document.getElementById("book-pages").value;
    const inputStatus = getCheckStatus();
    
    addBookToLibrary(inputTitle, inputAuthor, inputPages, inputStatus);
    
    const statusBtnId = 'status-check';
    const updateStatusBtn = document.getElementById(statusBtnId);
    if(updateStatusBtn) {
        updateStatusBtn.textContent = inputStatus;
    }
    
    displayBooksLibrary();
    document.getElementById("dialog-form").querySelector("form").reset();
    dialogForm.close();
}

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.getElementById("book-form");
    const inputTitle = document.getElementById("book-title");

    const inputAuthor = document.getElementById("book-author");
    const inputPages = document.getElementById("book-pages");

    if(inputTitle.value === '') {
        inputTitle.setCustomValidity('Title is required.');
    }else {
        inputTitle.setCustomValidity('');
    }

    if(inputAuthor.value === '') {
        inputAuthor.setCustomValidity("Author name is required");
    }else if(inputAuthor.value.length > 15) {
        inputAuthor.setCustomValidity('Author name cannot exceed 15 characters');
    }else {
        inputAuthor.setCustomValidity('');
    }

    if(inputPages.value === '') {
        inputPages.setCustomValidity('Please select the number of pages');
    }else if(isNaN(inputPages.value)) {
        inputPages.setCustomValidity('Please select valid number of pages');
    }else if(inputPages.value.length < 50 || inputPages.value > 1000) {
        inputPages.setCustomValidity('Pages must be in between 50 and 1000.');
    }else {
        inputPages.setCustomValidity('');
    }

    if (!form.checkValidity()) { // Corrected condition for form validity check
        form.reportValidity();
        return;
    }

    addBookBtn();
});

const cancelBtn = document.getElementById('cancel');
cancelBtn.addEventListener('click', () => {
    dialogForm.close();
});

// window.addEventListener("load", displayBooksLibrary);
// window.addEventListener('load', displayBooksLibrary);