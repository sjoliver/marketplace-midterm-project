// Client facing scripts here
function createListingElements() {

  for (let data of tweetDb) {

    let listingArticle = document.createElement('article');

    let timeCreated = timeago.format(data.created_at, 'en_US');

    listingArticle.innerHTML = `
    <header>
      <div class="avatar">
        <img src="${data.user.avatars}">
        <h1>${data.user.name}</h1>
      </div>
      <h2>${data.user.handle}</h2>
    </header>
    <section>
      <p></p>
    </section>
    <footer>
      <p class="timeago">${timeCreated}</p>
      <div class="icon-drawer">
       <span class="fas fa-flag fa-xs"></span>
       <span class="fas fa-retweet fa-sm"></span>
       <span class="fas fa-heart fa-xs"></span>
      </div>
    </footer>
     `;

    console.log("hello world");

    tweetArticle.querySelector('p').textContent = data.content.text;

    document.querySelector(".tweet-container").prepend(tweetArticle);
  }
}
