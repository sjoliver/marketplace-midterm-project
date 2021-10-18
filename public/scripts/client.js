// Client facing scripts here


document.body.addEventListener('click', updatePage);

function updatePage(event) {
  if (event.target.className === "nav-watching") {
    loadWatching();
  }
  if (event.target.className === "nav-listings") {
    loadListings();
  }
};

function createListingElements(db) {

  for (let listing of db) {

    let listingArticle = document.createElement('article');

    //let timeCreated = timeago.format(listing.created_at, 'en_US');

    listingArticle.innerHTML = `
    <header>
      <div class="avatar">
        <h1>${listing.title}</h1>
      </div>
      <h2>${listing.country}</h2>
    </header>
    <section>
      <p>${listing.description}</p>
    </section>
    <footer>
      <p class="timeago">${listing.asking_price}</p>
    </footer>
     `;

    document.querySelector(".listing-container").prepend(listingArticle);
  }
}

function loadListings() {
  $.get( "/listings", function( data ) {
      createListingElements(data);
  });
}

function loadWatching() {
  $.get( "/watching", function( data ) {
      createListingElements(data);
  });
}

