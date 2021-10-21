// MESSAGING LOGIC

$(document).ready(function () {

  const threadId = window.location.href.split("/")[4]

  $("#response-form").on("submit", function(event) {

    event.preventDefault();

    const text = $('.reply-message-body').val();

    $.post(`/api/messages/${threadId}`, { text, threadId })
      .then((result) => {
        loadMessages();

        $('.reply-message-body').val('');
    }).catch((error) => {

      console.log(`there was an error: ${error}`);

    });
  });

  const loadMessages = function () {

    $.get(`/api/messages/${threadId}`)
      .then((data) => {
        renderMessages(data)
    }).catch((error) => {
      console.log(`there was an error: ${error}`);
    });

  };

  loadMessages();

  const renderMessages = function (messages) {

    const container = $('.message-thread');
    container.empty();

    // loop through messages
    for (const message of messages) {

      // calls createMessageElement for each tweet
      const $message = createMessageElement(message);
      container.append($message);

    };
  };

  // CREATE MESSAGE
  const createMessageElement = function (messageObject) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const createdTime = timeago.format(messageObject["created_at"])

    // taken from https://stackoverflow.com/questions/1599287/create-read-and-erase-cookies-with-jquery
    function getCookie(name) {
      let nameEQ = name + "=";
      let ca = document.cookie.split(';');
      for(let i=0;i < ca.length;i++) {
          let c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }

    const currentUser = Number(getCookie('user_id'));

    let $message

    console.log(messageObject.user_id, currentUser)

    if (currentUser !== messageObject.user_id) {
      $message = `
        <div class="container lighter" id="left-sender">
          <span class="sender left">${messageObject.sender}</span>
          <p>${escape(messageObject.message)}</p>
          <span class="time-right">${createdTime}</span>
        </div>
      `
    } else {
      $message = `
        <div class="container darker" id="right-sender">
            <span class="sender right">${messageObject.sender}</span>
            <p>${escape(messageObject.message)}</p>
            <span class="time-left">${createdTime}</span>
        </div>
      `
    }

    return $message;
  }

});
