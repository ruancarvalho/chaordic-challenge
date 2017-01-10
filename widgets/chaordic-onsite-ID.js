
var url = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X";

var ONSITE = ONSITE || {};

ONSITE.init = function(data) {

	var widget = document.getElementById('chaordic-onsite-UID');
	widget.className = 'chaordic chaordic-onsite';

	widget.appendChild(
		ONSITE.referenceSection(data.reference)
	);
	
	widget.appendChild(
		ONSITE.recommendationSection(data.recommendation)
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

ONSITE.recommendationSection = function(recommendation) {

	if (typeof recommendation === 'undefined')
		return null;

	var recommendationSection = document.createElement('section');
	recommendationSection.className='chaordic-recommendation';

	var referenceTitle = document.createElement('h3');
	referenceTitle.className='chaordic-title';	
	referenceTitle.innerHTML='e talvez se interesse por:';

	var recommendationList = document.createElement('ul');
	var recommendationItem;

	for (var i=0; i < recommendation.length; i++) {
		
		recommendationItem = document.createElement('li');
		recommendationItem.appendChild(ONSITE.createProduct(recommendation[i]));
		recommendationList.appendChild(recommendationItem)

	}

	recommendationSection.appendChild(referenceTitle);
	recommendationSection.appendChild(recommendationList);
 
	return recommendationSection;
}

ONSITE.createProduct = function(product) {

	var productWrapper = document.createElement('a');
	productWrapper.href=product.detailUrl;
	productWrapper.target='_blank';

	var productItem = document.createElement('div');
	productItem.id = product.businessId; 
	productItem.className = 'chaordic-product';

		var imageName = document.createElement('img');
		imageName.src = product.imageName;

		var name = document.createElement('p');
		name.className = 'chaordic-item-title';
		name.innerHTML = product.name;

		var oldPrice = document.createElement('p');
		oldPrice.className = 'chaordic-item-oldprice';
		oldPrice.innerHTML = product.oldPrice;

		var price = document.createElement('p');
		price.className = 'chaordic-item-price';
		price.innerHTML = product.price;

		var productInfo = document.createElement('p');
		productInfo.className = 'chaordic-item-title';
		productInfo.innerHTML = product.productInfo.paymentConditions;

		productItem.appendChild(imageName);
		productItem.appendChild(name);
		productItem.appendChild(oldPrice);
		productItem.appendChild(price);
		productItem.appendChild(productInfo);

	productWrapper.appendChild(productItem);

	return productWrapper;
}

/**
 * Script injection to make a remote AJAX call using JSONP
 * from Chaordic Systems
 * 
 * @param  {string} url - service address
  */
function getJSONP(url) {
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

	getJSONP(url);

})();