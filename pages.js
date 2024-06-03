function attachMainPage() {

    let container = document.querySelector(".container");


    container.innerHTML = ` 
    <header class="header-container">
        <h1 class="header-title">Online Library</h1>
        <div class="search-container">
            <input type="text" class="search-bar" placeholder="Search for books...">
        </div>
        <div class="filter-container">
            <span class="filter-title">Filter by</span>
            <select class="filter" name="filter" id="filter">
                <option value="home"></option>
                <option value="year">year</option>
                <option value="price">price</option>
            </select>
        </div>
    </header>

    <main class="main-container"></main>

    <div class="pagination">
        <ul class="link-list">
            <li>
                <button type="button" class="active">1</button>
            </li>
            <li>
                <button type="button">2</button>
            </li>
        </ul>
    </div>

    <footer class="footer-container">
        <div class="footer-item">
            <p>Contact us: contact@onlinelibrary.com</p>
        </div>
        <div class="footer-item">
            <p>Social media</p>
            <a href="#" class="fa fa-facebook"></a>
            <a href="#" class="fa fa-twitter"></a>
            <a href="#" class="fa fa-instagram"></a>
        </div>
    </footer>
    `;


    setPage(1, "home", "");

    generateButtons();


    let filter = document.querySelector(".filter");
    let displayBooksStage = filter.value;


    filter.addEventListener('change', function () {
        displayBooksStage = this.value;
        setPage(1, displayBooksStage, "");
    });


    let searchBar = document.querySelector(".search-bar");


    searchBar.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            let query = searchBar.value.toLowerCase();
            searchBooks(query);
            displayBooksStage = "query";
        }
    });


    let lista = document.querySelector(".main-container");
    let listaLinkuri = document.querySelector(".link-list");


    lista.addEventListener("click", (eve) => {

        let pressed = eve.target;
        let divFooter = pressed.parentNode;
        let card = divFooter.parentNode;
        let title = card.querySelector(".name");

        if (pressed.classList.contains("toggle")) {
            showDescription(title.textContent);
        }

    });


    listaLinkuri.addEventListener("click", (eve) => {

        Array.from(listaLinkuri.children).forEach(data => {
            data.children[0].classList.remove("active");
        })


        let btn = eve.target;

        if (btn.tagName == "BUTTON") {

            setPage(btn.textContent, displayBooksStage, "");
            btn.classList.toggle("active");

        }

    });


}
