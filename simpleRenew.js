// Simple craigslist renew script for Chrome.
// 1. Open your craigslist account window, https://accounts.craigslist.org/login/home.
// 2. Open the inspect window (Ctrl+Shift+I), click on "console" or press Esc
// 3. Paste the following code. It will open a new window and simulate Ctrl+Clicking each of the ads
//    that need renewing, with a 3 second gap (3000 ms) between them. 5000 ms may work better.
//    A new window needs to be opened because if the renew page were to be opened in the current page,
//    you'd lose the script, so it would only renew a single ad before it stops.
//
// Limitation: Works for one screen at a time. You'll need to manually go to the next page
//             and run the code again.

// array of forms that will renew the ads.
_ren = document.getElementsByClassName("manage renew")
window.open('', 'nw', 'scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,status=no');

// function for renewing, recursive.
function _r(i) {
	if (i >=_ren.length) return             // all done.
	console.log("renewing " + i)            // show progress
	_ren[i].target="nw"                     // new target window. Opening a new tab with "_blank" does NOT work.
	_ren[i].submit()                        // submit the form, as though the user pressed Ctrl+left click on the "renew" link.
	console.log("renewed")
	setTimeout(function () {_r(i+1)},3000)  // go to the next one. 3000 ms between renews.
}

// start it.
_r(0)
