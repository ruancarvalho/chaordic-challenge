/**
 * 
 */

var serviceURL = "//roberval.chaordicsystems.com/challenge/challenge.json?callback=X";
var stylesURL = "css/chaordic-onsite.css";
var carouselURL = "js/chaordic-carousel.js"

var ONSITE = ONSITE || {};

ONSITE.init = function(data) {

	fetchStyles(stylesURL);
	fetchCarousel(carouselURL);

	var widget = document.getElementById('chaordic-onsite-UID');
	widget.className = 'chaordic chaordic-onsite';

	widget.appendChild(
		ONSITE.referenceSection(data.reference)
	);
	
	widget.appendChild(
		ONSITE.recommendationSection(data.recommendation, data.widget.size)
	);
}

ONSITE.referenceSection = function(reference) {

	if (typeof reference === 'undefined')
		return null;

	var referenceSection = document.createElement('section');
	referenceSection.className='chaordic-reference';

	var referenceTitle = document.createElement('h3');
	referenceTitle.className='chaordic-title';	
	referenceTitle.innerHTML='Voc&ecirc; visitou:';

	var referenceProduct = ONSITE.createProduct(reference.item);

	referenceSection.appendChild(referenceTitle);
	referenceSection.appendChild(referenceProduct);
 
	return referenceSection;
}

ONSITE.recommendationSection = function(recommendation, limit) {

	if (typeof recommendation === 'undefined')
		return null;

	var recommendationSection = document.createElement('section');
	recommendationSection.className='chaordic-recommendation';

	var referenceTitle = document.createElement('h3');
	referenceTitle.className='chaordic-title';	
	referenceTitle.innerHTML='e talvez se interesse por:';

	var carouselWrapper = ONSITE.createCarousel();

	var recommendationList = document.createElement('ul');
	recommendationList.className='carousel-inner';

	var recommendationItem;
	for (var i=0; i < limit; i++) {
		
		recommendationItem = document.createElement('li');
		recommendationItem.id = 'slide' + i;
		recommendationItem.className='slide';

		recommendationItem.appendChild(ONSITE.createProduct(recommendation[i]));
		
		recommendationList.appendChild(recommendationItem)
	}

	recommendationSection.appendChild(referenceTitle);
	
	carouselWrapper.appendChild(recommendationList);
	carouselWrapper.appendChild(ONSITE.createCarouselControl('left', 'Anterior'));
	carouselWrapper.appendChild(ONSITE.createCarouselControl('right', 'Próximo'));

	recommendationSection.appendChild(carouselWrapper);
	
	return recommendationSection;
}

ONSITE.createProduct = function(product) {

	var productLink = document.createElement('a');
	productLink.href=product.detailUrl;
	productLink.target='_blank';

	var productWrapper = document.createElement('div');
	productWrapper.id = product.businessId; 
	productWrapper.className = 'chaordic-product';

		var thumbnail = document.createElement('figure');
		thumbnail.className = "chaordic-product-thumb"
		var imageName = document.createElement('img');
		imageName.src = product.imageName;
		thumbnail.appendChild(imageName);


		var name = document.createElement('p');
		name.className = 'chaordic-product-title';
		name.innerHTML = product.name.substring(0, 80) + '...';

		if (product.oldPrice != null ) {
			var oldPrice = document.createElement('p');
			oldPrice.className = 'chaordic-product-oldprice';
			oldPrice.innerHTML = 'De: ' + product.oldPrice;
		}

		var price = document.createElement('p');
		price.className = 'chaordic-product-price';
		price.innerHTML = 'Por: <strong>' + product.price + '</strong>';

		var productInfo = document.createElement('p');
		productInfo.className = 'chaordic-product-info';
		productInfo.innerHTML = product.productInfo.paymentConditions + "<br><span>sem juros<span>";

	productWrapper.appendChild(thumbnail);
	productWrapper.appendChild(name);
	if (product.oldPrice) 
		productWrapper.appendChild(oldPrice);
	productWrapper.appendChild(price);
	productWrapper.appendChild(productInfo);

	productLink.appendChild(productWrapper);

	return productLink;
}

ONSITE.createCarousel = function() {

	var wrapper = document.createElement('div'); 
	wrapper.className='carousel';

	return wrapper;
}

ONSITE.createCarouselControl = function(type, text) {

	var control = document.createElement('a'); 
	control.className='carousel-control ' + type;
	control.href='#';
	control.text=text;

	return control;
}

function fetchStyles(url) {
	var head = document.head;
	var link = document.createElement('link');

	link.setAttribute('href', url);
	link.type = "text/css";
	link.rel = "stylesheet";
	link.media = "screen,print";
	head.appendChild(link);
}

function fetchCarousel(url) {
	var head = document.head;
	var script = document.createElement('script');

	script.setAttribute('src', url);

	head.appendChild(script);
}

/**
 * Script injection to make a remote AJAX call using JSONP
 * from Chaordic Systems
 * 
 * @param  {string} url - service address
  */
function fetchJSONP(url) {
	var head = document.head;
	var script = document.createElement('script');

	script.setAttribute('src', url);

	head.appendChild(script);
	head.removeChild(script);
}

/**
 * Callback from Remote Service
 * @param {jsonp} response - the JSONP returned from service
 */
function X(response) {

  ONSITE.init(response.data);

}


(function(){

	fetchJSONP(serviceURL);

})();