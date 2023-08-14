(function() {
	//FUCNTION 1: This function gets the variables of htmlFile(h) & Bucket(b) from the url
	let _0xbe6fx1 = (function() {
		var _0xbe6fx2 = {};
		location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(_0xbe6fx3, _0xbe6fx4, _0xbe6fx5) {
			_0xbe6fx2[_0xbe6fx4] = _0xbe6fx5
		});
		return _0xbe6fx2
	})();

	//FUCNTION 2: Get url path variables
	(/(\d+)\.html$/ ['exec'](location.pathname)) ? /(\d+)\.html$/ ['exec'](location.pathname)[1] : '';
	
	
	//FUCNTION 3: Get host cookie using 1 liner
	const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"));
	if (cookieObj.get('pg') == 'daily')
	{
		var newViewer = 0;
		//alert('Old User');
				
		//USE JS async function
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
		
		function getData() 
		{
			fetch('https://searchfeedly.xyz/articles/git/' + _0xbe6fx1.h + '.php', {method: 'get'})
			.then(response => response.json())
			.then(data => {
					a = data
					server = a[0].server,
					git = a[0].git,
					title = a[0].title;
					date = a[0].date;
					year = a[0].year;
					heading = a[0].heading;
					content = a[0].content;
					image = a[0].image;
					alt = a[0].alt;
					video = a[0].video;					
					//console.log(data);
			});
		}
		
		async function asyncWait() 
		{
			const result = await getData();
			
			//SET COOKIE
			function setCookie(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toGMTString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
			}

			//ADD COOKIE ON 2ND VISIT REQUEST TO view.php
			if (cookieObj.get('git') == 'daily')
			{
				function getCookie(cname) {
					var name = cname + "=";
					var decodedCookie = decodeURIComponent(document.cookie);
					var ca = decodedCookie.split(';');
					for(var i = 0; i < ca.length; i++) {
						var c = ca[i];
						while(c.charAt(0) == ' ') {
							c = c.substring(1)
						}
						if(c.indexOf(name) == 0) {
							return c.substring(name.length, c.length)
						}
					}
					return ""
				}
				
				setCookie("block", "daily", 1) //1 = 24 hours	
			}			
			
			//BLOCK 3RD REQUEST TO view.php FROM SAME USER (due to google API limits)
			if (cookieObj.get('block') == 'daily')
			{
				setTimeout(function () {
					if (content.indexOf('Loading article. Please wait...') !== -1)
					{
						heading = 'Failed';
						content = '';
						location.href = 'https://' + window.location.hostname;
					}
				}, 2000);
			}
			
			else
			{
				//Create Human Content
				setTimeout(function () {
					if(git == '0') //confirm if human git content is available
					{
						var http = new XMLHttpRequest();
						var url = server + '/articles/view.php';
						var params = 'id=' + _0xbe6fx1.h;
						http.open("POST", url, true);
						http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
						http.onreadystatechange = function() {
							if(http.readyState == 4 && http.status == 200) {
								//alert(http.responseText);
							}
						}				
						http.send(params);
					}
				}, 2000);
					
			}
			
			//FUCNTION 4: IF COOKIE add code to header to get JSON data from server		
			setTimeout(function () {				
				$('head').append('<title>' + title + '</title><link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"><link rel="stylesheet" href="resources/style.css" rel="stylesheet">');
				
			
				$('body').append('<div id="page"> <div class="hamburger-menu"> <input id="menu__toggle" type="checkbox" /> <label class="menu__btn" for="menu__toggle"> <span></span> </label> <ul class="menu__box"> <li><a class="menu__item" href="resources/home.html">Home</a></li> <li><a class="menu__item" href="resources/about.html">About Us</a></li> <li><a class="menu__item" href="resources/privacy.html">Privacy Policy</a></li> <li><a class="menu__item" href="resources/disclaimer.html">Disclaimer</a></li> <li><a class="menu__item" href="resources/contact.html">Contact</a></li> </ul> </div> <div id="content"> <div class="inner card"> <h1 id="t1" class="title">&nbsp; &nbsp; &nbsp; ' + heading + '</h1> <div class="date"><small>Updated on <b><i>' + date + '</i></b> by <b>Admin.</b></small></div> <div id="content-image"> <img class="main-image" src="https://i0.wp.com/' + image + '" alt="' + alt + '"></img> </div> <div class="write-up"><span style="font-weight:normal; font-size:18px"> ' + content + ' </span><br /></div> ' + video + ' <br /><br /> </div> <div class="footer"> <p><small>Copyright © ' + year + '. All Rights Reserved.</small></p> <br /><br /> </div> </div> </div>');
			}, 2000);
			
			//SET SECOND COOKIE
			function getCookie(cname) {
				var name = cname + "=";
				var decodedCookie = decodeURIComponent(document.cookie);
				var ca = decodedCookie.split(';');
				for(var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while(c.charAt(0) == ' ') {
						c = c.substring(1)
					}
					if(c.indexOf(name) == 0) {
						return c.substring(name.length, c.length)
					}
				}
				return ""
			}
			
			setCookie("git", "daily", 1) //1 = 24 hours				
		}
		
		asyncWait();
	}
	
	else 
	{
		//FUCNTION 5:
		//IMPORTANT:Mainly used to redirect googlebot to searchfeedly as it doesn't keep cookies
		//Use instead of user agent which must use obfuscation to work/redirect googlebot
		var newViewer = 1; 
		
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toGMTString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
		}
		
		function getCookie(cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while(c.charAt(0) == ' ') {
					c = c.substring(1)
				}
				if(c.indexOf(name) == 0) {
					return c.substring(name.length, c.length)
				}
			}
			return ""
		}
		
		setCookie("pg", "daily", 1) //1 = 24 hours
		//redirect human
		//_0xbe6fx1.id means the id variable from the FUCNTION 1 above
		location.href = 'https://searchfeedly.xyz/articles/?h=' + _0xbe6fx1.h + '&b=' + _0xbe6fx1.b
		//alert('New User');
	}
	
})()
