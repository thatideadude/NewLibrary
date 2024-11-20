let myLibrary = [];

window.addEventListener('click', (e) => {
  console.log(e.target)
  if (e.target == document.querySelector(".close-info-x")) {
    render.info.closeInfoDialog();
  }
  if (e.target == document.querySelector(".add-icon")) {
    render.addBook.createDialog();
  }
  for (let i = 0; i < myLibrary.length; i++) {

    if (e.target === document.getElementById(`info-icon-${i}`)) {
      render.info.createInfoDialog(i);
    }
  }
})


window.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    if (render.addBook.variables.isDialogShowing === true
      && render.addBook.variables.isAuthorSubmitted === false
      && render.addBook.variables.isTitleSubmitted === false) {
      render.addBook.submitAuthor()
    }
    else if (render.addBook.variables.isDialogShowing === true
      && render.addBook.variables.isAuthorSubmitted === true
      && render.addBook.variables.isTitleSubmitted === false) {
      render.addBook.submitTitle();
    }
  } if (e.key === "Escape" && render.addBook.variables.isDialogShowing === true) {
    render.addBook.closeDialog();
  }
})

if (localStorage.library === undefined || localStorage.library === "[]") {

  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 'Not read yet', 'https://covers.openlibrary.org/b/id/255844-L.jpg');
  const thePrisonerofAzkaban = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 'Read', 'https://covers.openlibrary.org/b/id/10580435-L.jpg');
  const warAndPeace = new Book('War and Peace', 'Leov Tolstoy', 'Read', 'https://covers.openlibrary.org/b/id/12621906-L.jpg');
  const crimeAndPunishment = new Book('Crime and Punishment', 'Fyodor Dostoevsky', 'Read', 'https://covers.openlibrary.org/b/id/13116014-L.jpg');
  const annaKeranina = new Book('Anna Keranina', 'Leo Tolstoy', 'Read', 'https://covers.openlibrary.org/b/id/7913226-L.jpg');
  const theDouble = new Book('O Homem Duplicado', 'José Saramago', 'Read', 'https://covers.openlibrary.org/b/id/14460124-L.jpg');
  const masterAndMargarita = new Book('The Master and Margarita', 'Mikhail Bulgakov', 'Not read yet', 'http://books.google.com/books/content?id=bzTbCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
  const theIdiot = new Book('The Idiot', 'Fyodor Dostoevsky', 'Read', 'http://books.google.com/books/content?id=reB7DSiMaTQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
  const brothersKaramazov = new Book('The Brothers Karamazov', 'Fyodor Dostoevsky', 'Read', 'https://covers.openlibrary.org/b/id/12621719-L.jpg');
  const worldAsWillandRepresentation = new Book('The World as Will and Representation', 'Arthur Schopenhauer', 'Not yet read', 'https://covers.openlibrary.org/b/id/297902-L.jpg');

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
let libraryCardsContainer = document.querySelector('.library-cards-container');
let bookCards = document.querySelectorAll('.card');
let thumbnails = document.querySelectorAll('.thumbnail');
let isBackdrop = false;

const render = {
  mainLibrary: {
    createCards: function () {
      for (let i = myLibrary.length - 1; i >= 0; i--) {
        this.createCardsHTML(i);
        this.showCovers(i);
        this.createBookIcons(i);

        setTimeout(() => { this.blinkCardsIn() }, 200);

      }
    },
    createCardsHTML: function (i) {
      let card = `
          <div class="card card-${i}">
            <img class="thumbnail thumbnail-${i}" id="thumbnail-${i}">
            <div class="replacement-image replacement-image-${i}">
              <p class="replacement-title">${myLibrary[i].title}</p>
              <p class="replacement-author">${myLibrary[i].author}</p>
            </div>          
          </div>
          </div>
          `

      libraryCardsContainer.innerHTML += card;
    },
    blinkCardsIn: function () {
      let a = myLibrary.length - 1;
      let timer = setInterval(() => {
        document.querySelector(`.card-${a}`).style.opacity = 1;
        a--;
        if (a < 0) { clearInterval(timer) }
      }, 300)
    },

    showCovers: function (i) {
      if (myLibrary[i].image !== '-1') {
        document.getElementById(`thumbnail-${i}`).setAttribute('src', `${myLibrary[i].image}`);
        document.querySelector(`.replacement-image-${i}`).remove()
      } else {
        document.getElementById(`thumbnail-${i}`).remove();
        document.querySelector(`.replacement-image-${i}`).style.display = 'grid';
      }
    },

    createBookIcons: function (i) {
      document.querySelector(`.card-${i}`).innerHTML +=
        `<div class="card-icons-container">
            <img data-id="${i}" id="info-icon-${i}"
            class="card-icon info-icon-${i} info-icon" 
            src="./imgs/info_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
            <img onclick="changeBookCover(${i})" class="card-icon change-pic-icon-${i} change-pic-icon" 
            src="./imgs/image_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
            <img class="card-icon share-icon-${i} share-icon" 
            src="./imgs/share_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
            <img class="card-icon delete-icon-${i} delete-icon" 
            src="./imgs/delete_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
          </div>`;
      // setTimeout(() => {
      //   document.getElementById(`info-icon-${i}`).
      //     addEventListener('click', (e) => {
      //       const id = e.target.dataset.id;
      //       render.info.createInfoDialog(i);
      //     })
      // }, 100)

    },

    showLibrary: function () {
      bookCards.forEach((item) => {
        item.style.display = 'flex';
        items.style.transition = '1000ms'
        item.style.opacity = 1;
      })
    },
    hideLibrary: function () {
      bookCards.forEach((item) => {
        item.style.opacity = 0;
        setTimeout(() => { item.style.display = 'flex'; }, 500)
      })
    },
  },

  info: {

    createInfoDialog: async function (i) {
      this.resetBackdropHTML();
      setTimeout(() => {
        document.getElementById('close-info').style.display = 'block';
        document.getElementById('close-info').style.opacity = '1'
      }, 2000);
      let authorInfo = await search.wikiInfo(myLibrary[i].author);
      if (authorInfo == undefined || authorInfo === "") {
        return document.querySelector('.author-info').remove()
      } else {

        if (isBackdrop === false) {
          this.createBackdrop(i);
        }
        this.createAuthorP(authorInfo, i);
      }

      let bookInfo = await search.wikiInfo(myLibrary[i].title);
      if (bookInfo == undefined || bookInfo === "") {
        return document.querySelector('.book-info').remove()

      } else {
        if (isBackdrop === false) {
          render.info.createBackdrop;
        }
        this.createTitleP(bookInfo, i)
      }

      let moreBooks = await search.openLibraryByAuthor(myLibrary[i].author);
      if (moreBooks.length > 0) {
        this.createMoreThumbnails(moreBooks);
      } else {
        document.querySelector('.other-titles').remove();
      }
    },

    resetBackdropHTML: function () {
      document.querySelector('.backdrop').innerHTML = `
       <div id="close-info" class="close-info"><p class="close-info-x">↩</p></div>
        
        <div class="author-info">
          <h1 class="about-author-title"></h1>
          <img class="about-author-image" style="display: none">
          <p class="about-author-paragraph"></p>
        </div>
        <div class="book-info">
          <h1 class="about-title-title"></h1>
          <img class="about-title-image" style="display: none">
          <p class="about-title-paragraph"></p>
        </div>
        <div class="other-titles">
          <h1 class="other-titles-title"></h1>
        </div>`
    },

    closeInfoDialog: function () {
      document.querySelector('.close-info').style.opacity = '0';
      document.querySelector('.wrapper').style.translate = '0vw';
      isBackdrop = false;
    },

    createMoreThumbnails: function (moreBooks) {
      for (let i = 0; i < moreBooks.length; i++) {
        document.querySelector('.other-titles-title').innerHTML = "Other Titles"
        const image = render.element('img', `other-titles-img-${i} other-titles-img`);
        image.setAttribute('src', `${moreBooks[i].Cover}`)
        document.querySelector('.other-titles').appendChild(image);
      }
    },

    createBackdrop: function (i) {
      isBackdrop = true;
      document.querySelector('.wrapper').style.translate = '-100vw'
    },

    createAuthorP: async function (authorInfo, i) {

      document.querySelector('.about-author-title').innerText =
        `${myLibrary[i].author}`;

      let authorImage = await search.wikiImage(myLibrary[i].author);
      if (authorImage != undefined && authorImage !== "") {
        document.querySelector('.about-author-image').setAttribute('src', `${authorImage}`);
        document.querySelector('.about-author-image').style.display = "initial";
      }

      document.querySelector('.about-author-paragraph').innerText =
        `${authorInfo}`;

    },

    createTitleP: async function (bookInfo, i) {

      document.querySelector('.about-title-title').innerText =
        `${myLibrary[i].title}`

      let titleImage = await search.wikiImage(myLibrary[i].title)
      if (titleImage != undefined && titleImage !== "") {
        document.querySelector('.about-title-image').setAttribute('src', `${titleImage}`)
        document.querySelector('.about-title-image').style.display = 'initial'
      }
      document.querySelector('.about-title-paragraph').innerText +=
        `${bookInfo}`
    }

  },

  footer: {
    showFooter: function () {
      setTimeout(() => { document.querySelector('.footer').classList.add('show-footer') }, 300)
    },

    hideFooter: function () {
      footer.classList.style.display = 'none';
    }
  },

  addBook: {

    newBookInfo: {},

    createDialog: function () {
      if (render.addBook.variables.isDialogShowing === false) {
        render.addBook.variables.isDialogShowing = true;
        const dialog = render.element('div', 'new-book-dialog');
        dialog.innerHTML =
          ` 
          <input for="new-book" placeholder="Who's the author?" class="ask"></input>
          <img class="input-check" src="./imgs/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg">
          <img class="input-cross" src="./imgs/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg">
        `
        document.body.prepend(dialog)
        document.querySelector('.new-book-dialog').classList.add('grow');
        document.querySelector('.ask').classList.add('show');
        document.querySelector('.input-check').classList.add('show');
        document.querySelector('.input-cross').classList.add('show');
        setTimeout(() => { document.querySelector('.ask').focus() }, 800);

        document.querySelector('.input-check').addEventListener('click', (e) => {
          render.addBook.submitAuthor(e)
        }, { once: true })
        document.querySelector('.input-cross').addEventListener('click', (e) => {
          render.addBook.closeDialog()
        }, { once: true })
      }
    },



    variables: { isAuthorSubmitted: false, isTitleSubmitted: false, isDialogShowing: false },

    submitAuthor: async function () {
      if (this.variables.isAuthorSubmitted === true) { return }
      this.variables.isAuthorSubmitted = true;
      this.newBookInfo.author = document.querySelector('.ask').value;
      document.querySelector('.ask').value = '';
      document.querySelector('.ask').setAttribute
        ('placeholder', "What's the title of the book?");
      setTimeout(() => {
        document.querySelector('.ask').focus();
      }, 300);
      document.querySelector('.input-check').addEventListener('click', (e) => {
        render.addBook.submitTitle(e)
      }, { once: true })
    },

    submitTitle: async function (e) {
      if (this.variables.isTitleSubmitted === true) { e.stopImmediatePropagation() }
      this.variables.isTitleSubmitted = true;
      this.newBookInfo.title = document.querySelector('.ask').value;
      const covers = await search.openLibraryByAuthorAndTitle(this.newBookInfo.author, this.newBookInfo.title);
      document.querySelector('.new-book-dialog').innerHTML = '';
      document.querySelector('.new-book-dialog').innerHTML =
        `<div class="outer-status-wrapper">
      <h1>Have you read it?</h1>
      <div class="status-wrapper">
      <a id="read-yes" class="read-yes read-status">Yes<img class="status-check" src="./imgs/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg">
      </a>
      <a id="read-no" class="read-no read-status">Not yet<img class="status-cross" src="./imgs/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"></a>
      <a id="read-middle" class="read-middle read-status"> On it<img class="status-middle" src="./imgs/book_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></a>
      </div>
      </div>`

      document.getElementById('read-yes').addEventListener('click', (e) => {
        this.handleListenersCovers('Read', covers, e)
      },)

      document.getElementById('read-no').addEventListener('click', (e) => {
        this.handleListenersCovers('Not yet read', covers, e)
      })

      document.getElementById('read-middle').addEventListener('click', (e) => {
        this.handleListenersCovers('Reading', covers, e)
      })
    },

    handleListenersCovers: function (status, covers, e) {
      if (status === 'Read') {
        render.addBook.newBookInfo.status = 'Read';
      } if (status === 'Not yet read') {
        render.addBook.newBookInfo.status = 'Not yet read';
      } if (status === 'Reading') {
        render.addBook.newBookInfo.status = 'Reading';
      }
      e.stopImmediatePropagation();
      if (covers.length > 0) {
        this.showCovers(covers, e);
      }
    },

    showCovers: function (covers, e) {
      document.getElementById('read-yes').addEventListener('click', this.handleListenersCovers);
      document.getElementById('read-no').addEventListener('click', this.handleListenersCovers);
      document.getElementById('read-middle').addEventListener('click', this.handleListenersCovers);
      document.querySelector('.new-book-dialog').classList.add('grow-more');
      document.querySelector('.new-book-dialog').classList.remove('grow');
      document.querySelector('.new-book-dialog').innerHTML = `<h1 class="pick-cover-title">Pick a cover<h1>`
      const coversWrapper = render.element('div', 'covers-wrapper');
      document.querySelector('.new-book-dialog').appendChild(coversWrapper)
      for (let i = 0; i < covers.length; i++) {
        if (covers[i] != undefined && covers[i] !== '') {
          const thumbnail = render.element('img', `thumbnail pick-cover pick-cover-${i}`);
          thumbnail.setAttribute('src', `${covers[i]}`);
          thumbnail.setAttribute('data-index', `${i}`);
          document.querySelector('.covers-wrapper').appendChild(thumbnail);
        }
      }
      document.querySelector('.new-book-dialog').addEventListener('click', (e) => {
        render.addBook.pickCover(e, covers)
      })
      e.stopImmediatePropagation();
    },

    pickCover: (e, covers) => {
      render.addBook.newBookInfo.image = covers[e.target.dataset.index];
      document.querySelector('.new-book-dialog').removeEventListener('click',
        render.addBook.pickCover)

      if (e.target.dataset.index == undefined) {
        console.log('no dataset')
      } else {
        let i = myLibrary.length;
        let card = `
          <div class="card card-${i}" style="opacity:1">
            <img src="${covers[e.target.dataset.index]}" class="thumbnail thumbnail-${i}" id="thumbnail-${i}">
            <div class="card-icons-container">
            <img data-id="${i}" id="info-icon-${i}"
            class="card-icon info-icon-${i} info-icon" 
            src="./imgs/info_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
            <img onclick="changeBookCover(${i})" class="card-icon change-pic-icon-${i} change-pic-icon" 
            src="./imgs/image_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
            <img class="card-icon share-icon-${i} share-icon" 
            src="./imgs/share_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
            <img class="card-icon delete-icon-${i} delete-icon" 
            src="./imgs/delete_24dp_393E41_FILL0_wght400_GRAD0_opsz24.svg"></img>
          </div>
            </div>          
          </div>
          </div>
          `
        libraryCardsContainer.innerHTML = card + libraryCardsContainer.innerHTML;
        myLibrary.push(render.addBook.newBookInfo);
        saveToStorage();
      }
      render.addBook.closeDialog()
    },


    closeDialog: function () {
      console.log('active')
      // document.querySelector('.new-book-dialog').style.height = "0px";

      Array.from(document.querySelector('.new-book-dialog').children).forEach((element) => {
        element.style.transition = "300ms"
        element.style.opacity = "0"
        setTimeout(() => {
          element.style.display = "none";
        }, 600)
      })
      document.querySelector('.new-book-dialog').style.height = "auto";
      document.querySelector('.new-book-dialog').classList.remove('grow');
      document.querySelector('.new-book-dialog').style.height = '0px';
      setTimeout(() => {

      }, 900)
      setTimeout(() => {

        document.querySelector('.new-book-dialog').remove();
        this.variables.isDialogShowing = false;
        this.variables.isAuthorSubmitted = false;
        this.variables.isTitleSubmitted = false;
      }, 1500);
    }
  },


  element: function (type, classes) {
    let newElement = document.createElement(type);
    newElement.setAttribute('class', `${classes}`);
    return newElement
  }
}

const search = {

  convertToFectchWiki: function (input) {
    input = input.replaceAll(' ', '_');
    input = input.replaceAll('.', '._')
    return input
  },

  googleBooksByAuthorAndTitle: async function (author, title) {
    title = encodeURIComponent(title);
    author = encodeURI(author);
    try {
      const response = await fetch(`
        https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}}&langRestrict=en
  `)
      const data = await response.json();
      const description = data.items[0].volumeInfo.description;
      return (description)
    } catch (error) { console.log(error) }
  },

  openLibraryForBookCover: async function (title) {

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=10`);
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        const book = data.docs[0];

        const bookTitle = book.title;
        const authorName = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const coverId = book.cover_i;
        const fetchedImage = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
          : '';

        console.log(`Title: ${bookTitle}`);
        console.log(`Author: ${authorName}`);
        console.log(`Cover Image: ${fetchedImage}`);
      } else {
        fetchedImage = '';
        console.log('No image could be fecthed for Google Books for ' + bookTitle)
      }
    } catch (error) { fetchedImage = ''; console.log('Google books api error' + error) }
  },


  openLibraryByAuthorAndTitle: async function (author, title) {
    author = encodeURI(author);
    title = encodeURI(title);
    let covers = [];
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${title}&author=${author}&limit=10`
      );
      const data = await response.json();
      if (!data) { console.log('no data available') }
      else {
        for (let i = 0; i < Math.min(10, data.docs.length); i++) {
          const book = data.docs[i];
          const coverId = book.cover_i;
          const fetchedImage = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : '';
          covers.push(fetchedImage);
        } return covers
      }
    } catch (error) { console.log(error) }
  },

  openLibraryByAuthor: async function (author) {
    author = encodeURI(author)
    let moreBooks = [];
    try {
      const response = await fetch(`https://openlibrary.org/search.json?author=${author}&limit=10&language=eng`);
      const data = await response.json();

      if (data.docs.length > 0) {
        for (let i = 0; i < Math.min(10, data.docs.length); i++) {
          const book = data.docs[i];
          const bookTitle = book.title;
          const authorName = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
          const coverId = book.cover_i;
          const coverImageURL = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : '';
          moreBooks.push({ Author: authorName, Title: bookTitle, Cover: coverImageURL });
        };
        return moreBooks;
      } else {
        console.log("No books found for this author.");
        return [];
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  },

  wikiImage: async function (input) {
    let wikiImage = "";
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${search.convertToFectchWiki(input)}&prop=pageimages&format=json&pithumbsize=1000&origin=*`,
        {
          method: 'GET',
          credentials: 'omit',
        });

      const data = await response.json();
      const pages = data.query.pages;
      const pageKey = Object.keys(pages)[0];

      if (pages[pageKey] && pages[pageKey].thumbnail && pages[pageKey].thumbnail.source) {
        wikiImage = pages[pageKey].thumbnail.source;
        return wikiImage;
      }
    } catch (error) {
      console.log(error);
      return wikiImage = "";
    }
  },

  wikiInfo: async function (search) {
    let result = "";
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&exsentences=10&prop=extracts&exintro&explaintext&format=json&origin=*&titles=${this.convertToFectchWiki(search)}`,
        { method: 'GET', credentials: 'omit' });
      if (!response) { return console.log("wikipedia couldn't provide data for this entry") }
      const data = await response.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      result = await page.extract;
      return result
    } catch (error) { console.error(error), result = "" }
  }
}

render.mainLibrary.createCards();
render.footer.showFooter();

function Book(title, author, status, image) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.image = image;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.status}, ${this.image}`;
  }
}

function saveToStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveToStorage();
}
