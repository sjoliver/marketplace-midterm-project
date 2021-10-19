// MESSAGING LOGIC

$(document).ready(function () {

  $("#response-form").on("submit", function(event) {

    event.preventDefault();

    const data = $(this).serialize();

    // error handling
    if (data === null || data === "text=") {
      errorMessage = "Message cannot be empty, please enter text before sending.";
      $('.error-message').text(errorMessage);
      // $('#error-container').slideDown(400);
      return;
    }

    // POST REQUEST: processing form submission
    $.ajax({
      url: '/messages/reply', // REFACTOR -- how do I get the message id param here??
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      dataType: 'json',
    }).then((result) => {

      console.log(result);

    }).catch((error) => {
      console.log(`there was an error: ${error}`);
    })

    // clears textarea once user submits new tweet
    $('.reply-message-body').val('');
  });

  // const loadMessages = function () {

  //   $.ajax({
  //     url:'/messages/reply', // REFACTOR -- how do I get the message id param here??
  //     method: 'GET'
  //   }).then(data => {
  //     console.log(data)
  //     // createMessageElement(data)
  //   })

  // }


  // CREATE MESSAGE
  const createMessageElement = function (messageObject) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const createdTime = timeago.format(messageObject["created_at"])

    const $message = `
      <div class="container">
        <span class="sender">${messageObject.sender}</span>
        <p>${messageObject.message}</p>
        <span class="time-right">${createdTime}/span>
      </div>
    `
    return $message;
  }

});
