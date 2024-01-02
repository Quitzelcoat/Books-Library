const table = document.querySelector('.tobody');
const formBtn = document.querySelector('.form-btn');
const dialogForm = document.querySelector('#dialog-form');
const confirmBtn = document.querySelector("#confirmBtn");
const myLibrary = [];

class book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    toggleStatus() {
        this.status = this.status === 'Read' ? 'Not Read' : 'Read';
    }
}

class getCheckStatus {

    constructor() {
        this.bookStatus = document.getElementById("book-status");
    }
    getStatus() {
        return this.bookStatus.checked ? "Read" : "Not Read";
    }
}

class addBookToLibrary {
    constructor (title, author, pages, status, myLibrary) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.myLibrary = myLibrary;
    }

    creatingBook() {
        const existingBook = this.myLibrary.findIndex(book => book.title === this.title);

        if(existingBook !== -1) {
            this.myLibrary[existingBook].author = this.author;
            this.myLibrary[existingBook].pages = this.pages;
        } else {
            this.myLibrary.push(this);
        }
    }
}

class displayBooksLibrary {
    constructor(table) {
        this.table = table;
    }

    displayBooks() {
        this.table.innerHTML = "";
        for(let i = 0; i < myLibrary.length; i++) {
            new addBookToDisplay(myLibrary[i]);
        }
    }
}
const displayLibrary = new displayBooksLibrary(table);

class addBookToDisplay {
    constructor(bookData) {
        this.bookData = bookData;

        this.row = document.createElement('tr');

        let titleCell = document.createElement('td');
        titleCell.textContent = this.bookData.title;
        this.row.appendChild(titleCell);

        let authorCell = document.createElement('td');
        authorCell.textContent = this.bookData.author;
        this.row.appendChild(authorCell);
        
        let pagesCell = document.createElement('td');
        pagesCell.textContent = this.bookData.pages;
        this.row.appendChild(pagesCell);

        let statusCell = document.createElement('td');
        let statusBtn = document.createElement('button');
        statusBtn.setAttribute('class', 'status-btn');
        statusBtn.setAttribute('id', 'status-check');
        statusBtn.textContent = this.bookData.status;
        statusBtn.addEventListener("click", (e) => {
            const row = e.target.closest('tr');
            const bookTitle = row.querySelector('td:first-child').textContent;
            const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);

            if(bookIndex !== -1) {
                myLibrary[bookIndex].toggleStatus();
                displayLibrary.displayBooks();
            }
        });
        statusCell.appendChild(statusBtn);
        this.row.appendChild(statusCell);

        let deleteCell = document.createElement('td');
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'delete-btn');
        deleteBtn.innerHTML = "Delete Book";
        deleteBtn.addEventListener("click", (e) => {
            const row = e.target.closest('tr');
            const bookTitle = row.querySelector('td:first-child').textContent;
            const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
                displayLibrary.displayBooks();
            }
        });
        deleteCell.appendChild(deleteBtn);
        this.row.appendChild(deleteCell);
    
        table.appendChild(this.row);
    }

}

formBtn.addEventListener("click", () => {
    dialogForm.showModal();
});

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputTitle = document.getElementById("book-title").value;
    const inputAuthor = document.getElementById("book-author").value;
    const inputPages = document.getElementById("book-pages").value;
    const inputStatus = new getCheckStatus();

    
    const newBook = new addBookToLibrary(inputTitle, inputAuthor, inputPages, inputStatus.getStatus(), myLibrary);
    newBook.creatingBook();

    const statusBtnId = 'status-check';
    const updateStatusBtn = document.getElementById(statusBtnId);
    if(updateStatusBtn) {
        updateStatusBtn.textContent = inputStatus.getStatus();
    }

    const libraryDisply = new displayBooksLibrary(table);
    libraryDisply.displayBooks();

    document.getElementById("dialog-form").querySelector("form").reset();
    dialogForm.close();
    
});


window.addEventListener('load', () => displayLibrary.displayBooks());