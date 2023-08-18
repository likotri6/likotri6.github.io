(function() {
	// Function 1 : GET the variables of htmlFile(h), Bucket(b), gID(g), page reloaded(rl) --from the url
	let _0xbe6fx1 = (function() {
		var _0xbe6fx2 = {};
		location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(_0xbe6fx3, _0xbe6fx4, _0xbe6fx5) {
			_0xbe6fx2[_0xbe6fx4] = _0xbe6fx5
		});
		return _0xbe6fx2
	})();

	// Function 2 : Get url path variables
	(/(\d+)\.html$/ ['exec'](location.pathname)) ? /(\d+)\.html$/ ['exec'](location.pathname)[1] : '';
	
	
	// Function 3 : Get host cookies using 1 liner script
	const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"));
	
	if (cookieObj.get('pg') == 'daily')
	{
		//alert('Already viewed today'); //for testing
		
		var content = 'none'; //Used to block 2nd request to view.php
		
				
		// Function 4 : USE JS async function
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
					//console.log(data); //for testing
			});
		}
		
		// Function 5 : WAIT FOR DATA from above
		async function asyncWait() 
		{
			const result = await getData();
			
			// Function 6 : SET COOKIE function
			function setCookie(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toGMTString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
			}

			// Function 7 : CHECK 1st COOKIE ON 2nd visit & PUT 3rd COOKIE --Allow POST request to view.php
			if (cookieObj.get('2nd_vist') == 'daily')
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
				
				setCookie("3rd_vist", "daily", 1) //1 = 24 hours
			}
			
			//Function 8 : IF 3rd request to new KW FROM same user --BLOCK REQUEST TO view.php (due to google API limits)

			if (cookieObj.get('3rd_vist') == 'daily')
			{					
				if (git == '0') //IF NO human content
				{
					heading = 'Failed';
					content = '';
					location.href = 'https://' + window.location.hostname;
				}				
			}
			
			else
			{
				//Function 9 : //BLOCK POST to view.php on same page multiple reloads.
				if (_0xbe6fx1.rl == '1')
				{
					//BLOCK view.php					
				}
				else
				{						
					setTimeout(function () 
					{					
						if (git == '0') //IF NO human content in ./articles/git/
						{
							//Create Human Content
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
							//reload page in 10 seconds --faster than body --set reload parameter (rl)
							url = location.protocol + '//' + location.host + location.pathname + '?h=' + _0xbe6fx1.h + '&b=' + _0xbe6fx1.b + '&g=' + _0xbe6fx1.g + '&rl=1';
							setTimeout(function(){window.location.href = url;},10000);
						}
					}, 2000);
				}				
			}
			
			//FUCNTION 10: ADD CONTENT FROM JSON data on server		
			setTimeout(function () {				
				$('head').append('<title>' + title + '</title><link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"><link rel="stylesheet" href="resources/style.css" rel="stylesheet">');
				
			
				$('body').append('<div id="page"> <div class="hamburger-menu"> <input id="menu__toggle" type="checkbox" /> <label class="menu__btn" for="menu__toggle"> <span></span> </label> <ul class="menu__box"> <li><a class="menu__item" href="resources/home.html">Home</a></li> <li><a class="menu__item" href="resources/about.html">About Us</a></li> <li><a class="menu__item" href="resources/privacy.html">Privacy Policy</a></li> <li><a class="menu__item" href="resources/disclaimer.html">Disclaimer</a></li> <li><a class="menu__item" href="resources/contact.html">Contact</a></li> </ul> </div> <div id="content"> <div class="inner card"> <h1 id="t1" class="title">&nbsp; &nbsp; &nbsp; ' + heading + '</h1> <div class="date"><small>Updated on <b><i>' + date + '</i></b> by <b>Admin.</b></small></div> <div id="content-image"> <img class="main-image" src="https://i0.wp.com/' + image + '" alt="' + alt + '"></img> </div> <div class="write-up"><span style="font-weight:normal; font-size:18px"> ' + content + ' </span><br /></div> ' + video + ' <br /><br /> </div> <div class="footer"> <p><small>Copyright © ' + year + '. All Rights Reserved.</small></p> <br /><br /> </div> </div> </div>');
			}, 2000);
			
			//FUCNTION 11: SET 2nd COOKIE
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
			
			setCookie("2nd_vist", "daily", 1); //1 = 24 hours		
		}
		
		asyncWait();
	}
	
	else 
	{
		//FUCNTION 12:
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
