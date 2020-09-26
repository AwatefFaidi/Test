const async = require('async');
const common = require('./common');



function Test(req, resp){
	
	var sites = [];
	var  counter = 0;
	var urls = []; 

 urls = req.query.address;

// Remove empty adress from Urls
urls = urls.filter(String);

	
	async.series( urls.map(function(url) {
		return 	 function(callback){

			var setTitle = function(url,title){
				var Obj = {
					url : url,
					title : title
				};

				callback(null, Obj);
			};

			common.getUrlTitle(url, setTitle);
		};
	}),
	/*
	function(callback) {
		setTimeout(function() {
		  console.log('Task two');
		  
		}, 2);
	  },*/
 function(err, results){
	if(err){
		common.returnTitle(req,resp,[]);
	}
	
		common.returnTitle(req,resp,results);
	}
	);

}

module.exports.Test = Test;