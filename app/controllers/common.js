const request = require('request');
var titlerg = new RegExp("<title>(.*?)</title>", "g");
function returnTitle(req,resp,urlList){

	var html  = `
<html>
<head></head>
<body>
    <h1> Following are the titles of given websites: </h1>
    <ul>
`
	urlList.forEach(function(obj,i){
		html += `<li> ${obj.url} - ${obj.title} </li> `
	});

	html += `
    </ul>
</body>
</html>
`

	resp.send(html)
	

}


function parsehtml(url,error, html)
	{
		
		
			if (!error) {
				// Find the title using regex				
			var tabtitle = html.match(titlerg);
			if(tabtitle != null && tabtitle.length > 0){
				title = tabtitle[0].replace("<title>","").replace("</title>","");
				
	
			}
			title = `"${title}"`;		 
					
	
		   }
				
			else{
				
				title = "NO RESPONSE";
					}
		return title;
		
	}			

	
	function getUrlTitle(url,setTitle){
		var tUrl = url;
		var title="";
		//  if  'http://'not present in url
		   if (!tUrl.match(/^[a-zA-Z]+:\/\//)) {
			tUrl = 'http://' + tUrl;}	
		
		request(tUrl, function(error, res, html){	
		title=parsehtml(url,error, html);
					//debugLog(`${url} - ${title}`);
		
		setTitle(url,title);
		}
		)
		
		
	}

	
/*		
var isDebug = true;
function setDebug(debug){
	isDebug = debug;
}
function debugLog(str){
	if(isDebug){
		console.log(str);
	}
}
*/

module.exports.returnTitle = returnTitle;
module.exports.getUrlTitle = getUrlTitle;
/*module.exports.setDebug = setDebug;
module.exports.debugLog = debugLog;*/