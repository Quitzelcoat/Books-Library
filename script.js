function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return "The " + this.title + " by " + this.author + ", " 
        + this.pages + " pages, " + this.read + " yet.";
    };
}

const theHobbit = new book('Hobbit', 'J.J.R', '295', 'not read');
console.log(theHobbit.info());