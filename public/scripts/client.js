//-> // Client facing scripts here

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

// // MESSAGING LOGIC

// $(document).ready(function () {

//   $("form.response-form").on("submit", function(event) {
//     event.preventDefualt();

//     const data = $(this).serialize();

//     // error handling
//     if (data === null || data === "text=") {
//       errorMessage = "Message cannot be empty, please enter text before sending.";
//       $('.error-message').text(errorMessage);
//       // $('#error-container').slideDown(400);
//       return;
//     }

//     console.log("HI");
//     // // POST REQUEST: processing form submission
//     // $.ajax({
//     //   url: '/messages/reply', // REFACTOR -- how do I get the message id param here??
//     //   method: 'POST',
//     //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//     //   dataType: 'json',
//     //   // data: JSON.stringify({ message: $(this).serialize(), subject: $('header h4').text() }),
//     //   // data: $(this).serialize(),
//     // }).then((result) => {
//     //   loadMessages();
//     // }).catch((error) => {
//     //   console.log(`there was an error: ${error}`);
//     // })

//     // // clears textarea once user submits new tweet
//     // $('.reply-message-body').val('');
//   });

//   const loadMessages = function () {

//     $.ajax({
//       url:'/messages/reply', // REFACTOR -- how do I get the message id param here??
//       method: 'GET'
//     }).then(data => {
//       console.log(data)
//       // createMessageElement(data)
//     })

//   }


//   // CREATE MESSAGE
//   const createMessageElement = function (messageObject) {

//     const escape = function (str) {
//       let div = document.createElement("div");
//       div.appendChild(document.createTextNode(str));
//       return div.innerHTML;
//     };

//     const createdTime = timeago.format(messageObject["created_at"])

//     const $message = `
//       <div class="container">
//         <span class="sender">${messageObject.sender}</span>
//         <p>${messageObject.message}</p>
//         <span class="time-right">${createdTime}/span>
//       </div>
//     `
//     return $message;
//   }

// });
