// https://robots.thoughtbot.com/how-to-make-a-chrome-extension
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'clicked_browser_action') {
       var renewForms = $("input[value='renew']:submit").parent();
      $.each(renewForms, function(idx) {
        var actionUrl = $(this).attr('action'),
            data = {
              'crypt': $(this).children('input[name="crypt"]').val(),
              'action': 'renew'
            },
            urlWithQueryString = actionUrl + '?' + jQuery.param(data);

        $.ajax({
          type: "POST",
          url: urlWithQueryString,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        })
        .always(function() {
          console.log('POST sent to  ' + urlWithQueryString);
        });
      });
    }
  }
);
