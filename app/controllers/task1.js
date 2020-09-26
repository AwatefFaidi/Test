//const common = require('../common')
const common = require('./common')

//--------------------------------
// for task 1 , without using any control flow abstracting library
//--------------------------------
function Test(req, resp){	 
	var sites = [];
	var  counter = 0;
	var urls = []; 

 urls = req.query.address;

// Remove empty adress from Urls
urls = urls.filter(String);
		if(urls.length > 0 ){
			// return all urls and titles in object  example : urlsites =[ { url: 'google.com', title: '"Google"' } ] and render them to common.js
		var returnUrlTitle = function(url, title){
			sites[url] = title;
			counter++;
			if(counter === urls.length){

				var urlsites = urls.map(function(url){
					return {
						url : url,
						title  : sites[url]
					};
				})
				
				common.returnTitle(req,resp,urlsites);
			}
		}

		urls.forEach(function(url,i){

			common.getUrlTitle(url,returnUrlTitle)
			

		});

	}
	else{
		common.returnTitle(req,resp,[]);
	}

}

module.exports.Test = Test;
