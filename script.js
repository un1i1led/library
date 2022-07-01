const addBook = document.querySelector('#add');
const closepopup = document.querySelector('.close');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const readInput = document.querySelector('#book-read');

let myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function addBookToLibrary() {
  // do stuff here
}

addBook.addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
});

closepopup.addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none';
})