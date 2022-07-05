const addBook = document.querySelector('#add');
const closepopup = document.querySelector('.close');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const readInput = document.querySelector('#book-read');
const btnAdd = document.querySelector('.btn-add');
const books = document.querySelector('.books');

let myLibrary = [];
let i = 0;
let bNumber = 0;

function Book(title, author, numPages, read, bookNumber) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.bookNumber = bookNumber;
}

Book.prototype.toggleRead = function() {
  if (this.read == true) {
    return this.read == false;
  } else {
    return this.read == true;
  }
}

addBook.addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';

});

closepopup.addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none';
})

let displayBook = function() {
  for (i; i < myLibrary.length; i++){
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    books.appendChild(bookCard);

    const textTitle = document.createElement('p');
    const textAuthor = document.createElement('p');
    const textPages = document.createElement('p');
    const buttonRead = document.createElement('button');
    const buttonRemove = document.createElement('button');

    buttonRead.setAttribute('data-id', i);

    textTitle.innerHTML = myLibrary[i].title;
    textAuthor.innerHTML = myLibrary[i].author;
    textPages.innerHTML = myLibrary[i].numPages;
    buttonRead.innerHTML = myLibrary[i].read;
    buttonRemove.innerHTML = 'Remove';

    textTitle.className = 'card-text';
    textAuthor.className = 'card-text';
    textPages.className = 'card-text';

    if (buttonRead.innerHTML == 'Read'){
      buttonRead.className = 'btn-rd read';
    } else {
      buttonRead.className = 'btn-rd not-read';
    }

    bookCard.appendChild(textTitle);
    bookCard.appendChild(textAuthor);
    bookCard.appendChild(textPages);
    bookCard.appendChild(buttonRead);
    bookCard.appendChild(buttonRemove);

    buttonRead.addEventListener('click', function(){
      if (buttonRead.innerHTML == 'Read') {
        buttonRead.innerHTML = 'Not read';
        buttonRead.className = 'btn-rd not-read';
        myLibrary[buttonRead.dataset.id].read = 'Not read';
      } else if (buttonRead.innerHTML == 'Not read') {
        buttonRead.innerHTML = 'Read';
        buttonRead.className = 'btn-rd read';
        myLibrary[buttonRead.dataset.id].read = 'Read';
      }
      console.log(myLibrary);
    })
  }
}

let takeInfo = () => {
  let checked = 'Not read';
  if (document.querySelector('#book-read').checked == true) {
    checked = 'Read';
  }

  if (myLibrary.length == 0){
    bNumber = 0;
  } else {
    bNumber++;
  }

  let newbook = new Book(
    document.querySelector('#book-title').value,
    document.querySelector('#book-author').value,
    document.querySelector('#book-pages').value,
    checked,
    bNumber
  );

  myLibrary.push(newbook);
  document.querySelector('.bg-modal').style.display = 'none';
  console.log(myLibrary);
  displayBook();
}

btnAdd.addEventListener('click', takeInfo);
