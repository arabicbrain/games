// http://stackoverflow.com/a/950146/210780
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = window.prototypePath + url;

    if (callback != null) {
      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;
    }

    // Fire the loading
    head.appendChild(script);
}

// Load everything "automagically"

// Load externs. If the file is missing, use an empty hash.
externs = { };
loadScript('data/external.json');

loadScript('lib/helpers.js');
loadScript('lib/actor.js');
loadScript('lib/spawner.js');
loadScript('lib/console.js');
