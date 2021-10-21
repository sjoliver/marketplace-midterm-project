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

    const $message = `
      <div class="container">
        <span class="sender">${messageObject.sender}</span>
        <p>${escape(messageObject.message)}</p>
        <span class="time-right">${createdTime}</span>
      </div>
    `
    return $message;
  }

});
