// https://robots.thoughtbot.com/how-to-make-a-chrome-extension
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'clicked_browser_action') {
       var renewForms = $("input[value='renew']:submit").parent(),
           promises = [];
      $.each(renewForms, function(idx) {
        var actionUrl = $(this).attr('action'),
            data = {
              'crypt': $(this).children('input[name="crypt"]').val(),
              'action': 'renew'
            },
            urlWithQueryString = actionUrl + '?' + jQuery.param(data);

        promises.push($.ajax({
          type: "POST",
          url: urlWithQueryString,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        })
        .always(function() {
          console.log('POST sent to  ' + urlWithQueryString);
        }));
      });
      $.when.apply($, promises).always(function() {
        if (confirm('Attempted to renew ' + promises.length + ' posts.')) {location.reload()};
      });
    }
  }
);
