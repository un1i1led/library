const addBook = document.querySelector('#add');
const closepopup = document.querySelector('.close');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const readInput = document.querySelector('#book-read');
const btnAdd = document.querySelector('.btn-add');
const books = document.querySelector('.books');
const spanError = document.querySelector('span');

let myLibrary = [];
let i = 0;
let bNumber = 0;

// function Book(title, author, numPages, read) {
//     this.title = title;
//     this.author = author;
//     this.numPages = numPages;
//     this.read = read;
// }

class Book {
  constructor(title, author, numPages, read){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  toggleRead() {
    if (this.read == true) {
      return this.read = false;
    } else if (this.read == false) {
      return this.read = true
    }
  }
  
}

titleInput.addEventListener('input', (event) => {
  if (titleInput.validity.valid) {
    spanError.textContent = "";
    spanError.className = "span error";
  } else {
    showError();
  }
});



addBook.addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';

});

const getSpan = (input) => {
  const spans = document.querySelectorAll('span');
  let span = '';
  if (input.name == 'title') {
    span = spans[0];
  } else if (input.name == 'author') {
    span = spans[1];
  } else if (input.name == 'pages') {
    span = spans[2];
  }
  return span;
}

const checkPages = (input) => {
  const number = input.value;
  if (!isNaN(number)) {
    return true;
  }
  return false;
}

const showError = (input) => {
  let span = getSpan(input);
  if (input.validity.valueMissing) {
    if (input.name == 'pages') {
      span.textContent = `Please enter a number`;
    } else {
        span.textContent = `Please enter a ${input.name}`;
    }
  } 
}

closepopup.addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none';
})

let displayBook = function() {
  for (i; i < myLibrary.length; i++){
    const bookCard = document.createElement('div');
    bookCard.setAttribute('data-id', i);
    bookCard.className = 'book-card';
    books.appendChild(bookCard);

    const textTitle = document.createElement('p');
    const textAuthor = document.createElement('p');
    const textPages = document.createElement('p');
    const buttonRead = document.createElement('button');
    const buttonRemove = document.createElement('button');

    buttonRead.setAttribute('data-id', i);
    buttonRemove.setAttribute('data-id', i);

    textTitle.innerHTML = myLibrary[i].title;
    textAuthor.innerHTML = myLibrary[i].author;
    textPages.innerHTML = `${myLibrary[i].numPages} Pages`;
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
    })

    buttonRemove.addEventListener('click', function() {
      myLibrary.splice(buttonRemove.dataset.id, 1);
      books.removeChild(bookCard);
      i -= 1;
    });
  }
}

let takeInfo = () => {
  let checked = 'Not read';
  if (document.querySelector('#book-read').checked == true) {
    checked = 'Read';
  }

  let newbook = new Book(
    document.querySelector('#book-title').value,
    document.querySelector('#book-author').value,
    document.querySelector('#book-pages').value,
    checked
  );

  myLibrary.push(newbook);
  document.querySelector('.bg-modal').style.display = 'none';
  displayBook();
}

btnAdd.addEventListener('click', function() {
  if (!titleInput.validity.valid) {
    showError(titleInput);
    return;
  } else if (!authorInput.validity.valid) {
    showError(authorInput);
    return;
  } else if (!pagesInput.validity.valid) {
    showError(pagesInput);
    return;
  } else if (!checkPages(pagesInput)) {
    let span = getSpan(pagesInput);
    span.textContent = 'Please enter a valid number';
    return;
  }
  takeInfo();
});
