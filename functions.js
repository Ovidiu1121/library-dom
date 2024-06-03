
function createCard(data) {

    let div = document.createElement('div');
    div.classList = "card";

    let divImg = document.createElement('div');
    divImg.classList = "divimg";

    let img = document.createElement('img');
    img.classList = "card-img";
    img.alt = data.title;
    img.src = data.picture;

    divImg.appendChild(img);

    let divContent = document.createElement('div');
    divContent.classList = "card-content";

    let h2 = document.createElement('h2');
    h2.classList = "name";
    h2.textContent = data.title;

    let author = document.createElement('p');
    author.classList = "author";
    author.textContent = "by " + data.author;

    let year = document.createElement('span');
    year.classList = "year";
    year.textContent = data.year;

    let desc = document.createElement('p');
    desc.classList = "description short";
    desc.textContent = data.description.substring(0, 30) + "...";

    let divFooter = document.createElement('div');
    divFooter.classList = "card-footer";

    let button = document.createElement('button');
    button.classList = "toggle";
    button.textContent = "Show More";

    let price = document.createElement('p');
    price.classList = "price";
    price.textContent = data.price + " $";

    divFooter.appendChild(button);

    divContent.appendChild(h2);
    divContent.appendChild(author);
    divContent.appendChild(year);
    divContent.appendChild(desc);
    divContent.appendChild(divFooter);
    divContent.appendChild(price);

    div.appendChild(divImg);
    div.appendChild(divContent);

    return div;

}

function attachCards(array) {

    let lista = document.querySelector(".main-container");
    lista.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        let card = createCard(array[i]);
        lista.appendChild(card);
    }

}

function pagination(pageNumber, numberOfCards, array) {

    let aux = [];

    for (let i = numberOfCards * (pageNumber - 1); i < numberOfCards * pageNumber && i < array.length; i++) {

        aux.push(array[i]);
    }

    return aux;

}

function createButton(numberOfPages) {

    let lista = document.querySelector(".link-list");

    for (let i = 3; i <= numberOfPages; i++) {
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.textContent = i;
        li.appendChild(btn);
        lista.appendChild(li);
    }

}

function generateButtons() {

    let pages = books.length / 4;

    createButton(pages);

}

function findByTitle(title) {

    let aux = books.findIndex(a => a.title === title);
    return books[aux];

}

function findCardByTitle(title) {

    let lista = document.querySelector(".main-container");
    let cards = Array.from(lista.children);

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].querySelector(".name").textContent == title) {
            return cards[i];
        }
    }

    return null;
}

function showDescription(title) {

    let book = findByTitle(title);
    let card = findCardByTitle(title);

    let toggleButton = card.querySelector(".toggle");

    if (toggleButton.textContent === "Show More") {
        card.innerHTML = `
                        <div class="divimg">
                        <img class="card-img" src="${book.picture}" alt="${book.title}">
                        </div>
                        <div class="card-content">
                            <h2 class="name">${book.title}</h2>
                            <p class="author">by ${book.author}</p>
                            <span class="year">${book.year}</span>
                            <p class="description short">${book.description}</p>
                            <div class="card-footer">
                                <button class="toggle">Show Less</button>
                            </div>
                            <p>${book.price} $</p>
                        </div>
                    `;
    } else if (toggleButton.textContent === "Show Less") {
        card.innerHTML = `
              <div class="divimg">
            <img class="card-img" src="${book.picture}" alt="${book.title}">
            </div>
             <div class="card-content">
            <h2 class="name">${book.title}</h2>
            <p class="author">by ${book.author}</p>
            <span class="year">${book.year}</span>
            <p class="description short">${book.description.substring(0, 30)}...</p>
            <div class="card-footer">
                <button class="toggle">Show More</button>
            </div>
            <p>${book.price} $</p>
        </div>
                    `;
    }
}

function sortBooksByYear() {

    let sortedBooks = [...books];

    sortedBooks.sort((a, b) => a.year - b.year);

    return sortedBooks;
}

function attachSortedCards(booksarray) {

    let lista = document.querySelector(".main-container");
    lista.innerHTML = "";

    for (let i = 0; i < booksarray.length; i++) {
        let card = createCard(booksarray[i]);
        lista.appendChild(card);
    }

}

function paginationForSortedBooks(pageNumber, numberOfCards, sortedBooks) {

    let aux = [];

    for (let i = numberOfCards * (pageNumber - 1); i < numberOfCards * pageNumber && i < sortedBooks.length; i++) {

        aux.push(sortedBooks[i]);
    }

    return aux;

}

function sortBooksByPrice() {

    let sortedBooks = [...books];

    sortedBooks.sort((a, b) => a.price - b.price);

    return sortedBooks;
}

function attachSortedCardsByPrice(booksarray) {

    let lista = document.querySelector(".main-container");
    lista.innerHTML = "";

    for (let i = 0; i < booksarray.length; i++) {
        let card = createCard(booksarray[i]);
        lista.appendChild(card);
    }

}

function paginationForSortedBooksByPrice(pageNumber, numberOfCards, sortedBooks) {

    let aux = [];

    for (let i = numberOfCards * (pageNumber - 1); i < numberOfCards * pageNumber && i < sortedBooks.length; i++) {

        aux.push(sortedBooks[i]);
    }

    return aux;

}

function getBooksByQuery(query) {

    let filteredBooks = books.filter(book => book.title.toLowerCase().startsWith(query));

    return filteredBooks;
}

function setPage(pageNumber, sortBy, query) {

    let booksByPrice = sortBooksByPrice();
    let booksByYear = sortBooksByYear();
    let booksByQuery = getBooksByQuery(query);

    if (sortBy === "home") {
        let carti = pagination(pageNumber, 4, books);
        attachCards(carti);
    } else if (sortBy === "year") {
        let carti = paginationForSortedBooks(pageNumber, 4, booksByYear);
        attachSortedCards(carti);
    } else if (sortBy === "price") {
        let carti = paginationForSortedBooksByPrice(pageNumber, 4, booksByPrice);
        attachSortedCardsByPrice(carti);
    } else if (sortBy === "query") {
        let carti = pagination(pageNumber, 4, booksByQuery);
        attachCards(carti);
    }

}

function searchBooks(query) {

    setPage(1, "query", query);
}


