var ChaordicCarousel = window.ChaordicCarousel || {};

ChaordicCarousel = (function(){
  
  'use strict';
  
  var defaults = {
    widthItem: 175,
    itemPerPage: 1,
    interval: 200,
    itemView: 4
  };
  
  var plugin = {
    init: function () {
      this.carousel = document.querySelector('.carousel-inner');
      this.btnPrev = document.querySelector('.left a');
      this.btnNext = document.querySelector('.right a');
      this.itensCount = parseInt(this.carousel.children.length +1, 10);
      this.carouselWidth = this.itensCount * defaults.widthItem;
      this.events();

      this.carousel.style.width = this.carouselWidth + 'px';
    },

    events: function () {
      this.btnPrev.addEventListener('click', this.prevItem.bind(this), defaults.interval);
      this.btnNext.addEventListener('click', this.nextItem.bind(this), defaults.interval);
    },

    prevItem: function (evt) {

      var marginLeft = this.directionControl('prev');
      if (marginLeft > 0) {
        this.carousel.style.marginLeft = 0 + 'px';
        return;
      }

      this.carousel.style.marginLeft = marginLeft + 'px';

      evt.preventDefault();
      evt.stopPropagation();

      evt.target.hidden = false;
    },

    nextItem: function (evt) {

      console.log(evt);

      var marginLeft = this.directionControl('next');
      var maxWidth = (this.carouselWidth - defaults.itemView * defaults.widthItem) * -1;
      if (marginLeft < maxWidth) {
        this.carousel.style.marginLeft = maxWidth + 'px';
        return;
      }
      this.carousel.style.marginLeft = marginLeft + 'px';
      evt.preventDefault();
      evt.stopPropagation();
    },

    getCurrentStyle: function () {
      return this.carousel.currentStyle || window.getComputedStyle(this.carousel);
    },

    getMarginLeft: function () {
      var style = this.getCurrentStyle();
      return parseInt(style.marginLeft, 10);  
    },

    directionControl: function (direction) {
      if (direction === 'next') {
        return (this.getMarginLeft() - this.totalItems());
      } else {
        return (this.getMarginLeft() + this.totalItems());
      }
    },
    totalItems: function () {
      return defaults.itemPerPage * defaults.widthItem;
    }

  };

  return plugin;
  
})();

ChaordicCarousel.init();