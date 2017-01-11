ChaordicCarousel = (function(){

  var carousel = document.querySelector('.carousel');
  var next = carousel.querySelector('.right');
  var prev = carousel.querySelector('.left');

  var list = carousel.querySelector('.carousel-inner');
  var items = list.querySelectorAll('li');

  var visible = 4;
  var limit = visible -1;
  var amount = items.length;

  function init() {

  	for (var i = visible; i < amount; i++) {
  		items[i].classList.add('hidden');
  	}
  }

  function move(direction) {

  	var first, last;
  	var slide;

  	if (direction === -1) { 

  		last = list.lastChild;

  		slide = last.cloneNode(true);
  		list.removeChild(list.lastChild);

    	slide.classList.remove('hidden');
  		list.insertBefore(slide, list.firstChild);

  		slide = list.childNodes[visible];
  		slide.classList.add('hidden');
    }

    if (direction === 1) {

    	first = list.firstChild;

  		slide = first.cloneNode(true);
  		list.removeChild(list.firstChild);

    	slide.classList.add('hidden');
  		list.appendChild(slide);

  		slide = list.childNodes[limit];
  		slide.classList.remove('hidden');
    }
  }

  // add event handlers to buttons
  next.addEventListener('click', function(ev) {
    ev.preventDefault();
    move(1);
  });
  prev.addEventListener('click', function(ev) {
  	ev.preventDefault();
    move(-1);
  });

  init();

})();