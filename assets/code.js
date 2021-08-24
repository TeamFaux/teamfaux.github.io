/*
 *
 * Give an element a .make-snippet class and it's innerhtml
 * will be copied into a pre/code fragment that gets appended
 * adjacent to the element.
 *
 * If Prism.js is included, the snippets will be syntax higlighted.
 *
 * Note, this only autogenerates markup snippets.
 * 
 */

(function(){
  
  document.addEventListener('DOMContentLoaded', function(event) {

    var list = document.querySelectorAll('.make-snippet');

    [].forEach.call(list, function(el) {
      var snippet = el.innerHTML.replace(/</g,'&lt;');
          snippet = snippet.replace(/ /g,'&nbsp;');
      var code = '<pre class="language-markup"><code>'+snippet+'</pre></code>';
      el.insertAdjacentHTML('afterend',code);
    });
    
    // if your page has prism.js you get syntax highlighting
    if(window.Prism){
      Prism.highlightAll(false);
    }

  });

})();
