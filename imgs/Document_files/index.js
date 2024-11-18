
import { libraryCardsContainer } from "./modules/variables.js"
import convertToFectch from "./modules/convert-to-fetch.js"
import fetchBookCover from "./modules/fetch-book-cover.js";
import { fetchedImage } from "./modules/fetch-book-cover.js";
import showFooter from "./modules/show-footer.js";


function Book(title, author, pages, status, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.image = image;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.status}, ${this.image}`;
  }
}
let myLibrary = [];

if (localStorage.library === undefined || localStorage.library === "[]") {

  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Not read yet', '-1');
  const thePrisonerofAzkaban = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '317', 'Read', '-1');
  const warAndPeace = new Book('War and Peace', 'Leov Tolstoy', '1225', 'Read', '-1');
  const crimeAndPunishment = new Book('Crime and Punishment', 'Fyodor Dostoevsky', '565', 'Read', '-1');
  const annaKeranina = new Book('Anna Keranina', 'Leov Tolstoy', '864', 'Read', '-1');
  const theDouble = new Book('O Homem Duplicado', 'José Saramago', '324', 'Read', '');
  const masterAndMargarita = new Book('The Master and Margarita', 'Mikhail Bulgakov', '448', 'Not read yet', '-1');
  const theIdiot = new Book('The Idiot', 'Fyodor Dostoevsky', '768', 'Read', '-1');
  const brothersKaramazov = new Book('The Brothers Karamazov', 'Fyodor Dostoevsky', '875', 'Read', '-1');
  const worldAsWillandRepresentation = new Book('The World as Will and Representation', 'Arthur Schopenhauer', '764', 'Not yet read', '-1');

  addBookToLibrary(theHobbit);
  addBookToLibrary(thePrisonerofAzkaban);
  addBookToLibrary(warAndPeace);
  addBookToLibrary(crimeAndPunishment);
  addBookToLibrary(annaKeranina);
  addBookToLibrary(theDouble);
  addBookToLibrary(masterAndMargarita);
  addBookToLibrary(theIdiot);
  addBookToLibrary(brothersKaramazov);
  addBookToLibrary(worldAsWillandRepresentation);
} else {
  myLibrary = JSON.parse(localStorage.getItem('library'));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

async function renderLibraryCards() {
  
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].image !== '-1') {
    await fetchBookCover(convertToFectch(myLibrary[i].title).toLowerCase())
  }
    let card;
    if (myLibrary[i].image !== '-1') {
      myLibrary[i].image = fetchedImage;
      saveToStorage();
      card = `
        <div class="card card-${i}">
        <img class="thumbnail thumbnail-${i}" id="thumbnail-${i}">
        <p class="author-tag">${myLibrary[i].author}</p>
        <p class="title-tag">${myLibrary[i].title}</p>
        <p class="pages-tag">${myLibrary[i].pages}</p>
        <p class="status-tag">${myLibrary[i].status}</p>        
        `
    } else {
      card = `
        <div class="card card-${i}" >
        <div class="replacement-image">
        <p class="replacement-title">${myLibrary[i].title}</p>
        <p class="replacement-author">${myLibrary[i].author}</p>
        </div>
        <p class="author-tag">${myLibrary[i].author}</p>
        <p class="title-tag">${myLibrary[i].title}</p>
        <p class="pages-tag">${myLibrary[i].pages}</p>
        <p class="status-tag">${myLibrary[i].status}</p>
        `
    }
    card += `
        <div class="card-icons-container">
        <img class="card-icon info-icon-${i} info-icon-pic" 
        src="./imgs/info_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg">
        <img class="card-icon change-pic-icon-${i} change-pic-icon" 
        src="./imgs/image_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg">
        <img class="card-icon share-icon-${i} share-icon" 
        src="./imgs/share_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg">
        <img class="card-icon delete-icon-${i} delete-icon" 
        src="./imgs/delete_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg">
        </div>
        <div>
        `
    libraryCardsContainer.innerHTML += card;
    if (myLibrary[i].image === '-1' && fetchedImage !== '') {
      document.getElementById(`thumbnail-${i}`).setAttribute('src', `${fetchedImage}`);
    } else {
      document.getElementById(`thumbnail-${i}`).setAttribute('src', `${myLibrary[i].image}`);

    }
  }
}

renderLibraryCards();

showFooter();
console.log(myLibrary)