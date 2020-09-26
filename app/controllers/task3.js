const RSVP = require('rsvp');
const request = require('request');
const common = require('./common');

var titlerg = new RegExp("<title>(.*?)</title>", "g");
//--------------------------------
// for task 3 , using Promises
//--------------------------------
function Test(req, resp){
	

	var urls = []; 

 urls = req.query.address;

// Remove empty adress from Urls
urls = urls.filter(String)

	
	var urlPromises = urls.map(function(url) {
		return getUrlTitlePromise(url);
	});

	
	RSVP.all(urlPromises)
	
	.then(function(urlObjList) {
		common.returnTitle(req,resp,urlObjList);
	})
	.catch(function(err){
		
		console.log("errrrrrr");
		});

}

function getUrlTitlePromise(url){

	var tUrl = url;
		var title="";
		//  if  'http://'not present in url
		   if (!tUrl.match(/^[a-zA-Z]+:\/\//)) {
			tUrl = 'http://' + tUrl;}	
			var promiseUrlTilte = new RSVP.Promise(function(resolve, reject){
        getUrlPromise(tUrl)
        .then(function(html){
        	var title = "";
			// Find the title using regex				
			var tabtitle = html.match(titlerg);
if(tabtitle != null && tabtitle.length > 0){
	title = tabtitle[0].replace("<title>","").replace("</title>","");
	}
	
			else{
				console.log("errrrrrrr");
			}

			title = `"${title}"`;

			resolve({
				url : url,
				title : title
			});
        })
        .catch(function(err){
        	resolve({
				url : url,
				title : "NO RESPONSE"
			});
        });
	});
	return promiseUrlTilte;
}
function getUrlPromise(url){
		var UrlPromise=  new RSVP.Promise(function(resolve, reject){
        request(url, function(error, res, html){
        	
            if(!error ){
            	return resolve(html);
			}
			else{
				return reject(error);
			}
        });
	});
	return UrlPromise;
}

module.exports.Test = Test;