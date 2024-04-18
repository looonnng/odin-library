const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus; //readStatus should only accepts user input of yes or no via checkbox

  this.hasRead = function () {
    return this.readStatus ? "has read" : "not read yet";
  };

  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${this.hasRead()}`;
  };
}

// book should be an object instance of Book constructor
function addBookToLibrary(book) {}
