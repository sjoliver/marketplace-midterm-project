// Client facing scripts here
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

    console.log("hello world");

    document.querySelector(".listing-container").prepend(listingArticle);
  }
}

function loadListings() {
  $.get( "/listings", function( data ) {
      createListingElements(data);
  });
}

loadListings();
