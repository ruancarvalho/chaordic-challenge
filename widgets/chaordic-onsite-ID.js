/**
 * 
 */

var serviceURL = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X";
var stylesURL = "//localhost/chaordic-challenge/css/chaordic-onsite.css";

var ONSITE = ONSITE || {};

ONSITE.init = function(data) {

	fetchStyles(stylesURL);

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

	var recommendationList = document.createElement('ul');
	var recommendationItem;

	for (var i=0; i < 5; i++) {
		
		recommendationItem = document.createElement('li');
		recommendation.id = recommendation[i].businessId;
		recommendationItem.appendChild(ONSITE.createProduct(recommendation[i]));
		recommendationList.appendChild(recommendationItem)

	}

	recommendationSection.appendChild(referenceTitle);
	recommendationSection.appendChild(recommendationList);
 
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
		productInfo.innerHTML = product.productInfo.paymentConditions;

	productWrapper.appendChild(thumbnail);
	productWrapper.appendChild(name);
	if (product.oldPrice) 
		productWrapper.appendChild(oldPrice);
	productWrapper.appendChild(price);
	productWrapper.appendChild(productInfo);

	productLink.appendChild(productWrapper);

	return productLink;
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