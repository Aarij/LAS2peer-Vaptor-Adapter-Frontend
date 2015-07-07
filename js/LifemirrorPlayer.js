/**
 * A classy way to play HTML5 videos on a loop without gaps
 * @author LifeMirror http://www.lifemirror.org/
 * @constructor
 */

 /**
 * @param playlist An array of URLs to be played - see documentation for details
 * @param container The HTML ID of the element to insert videos into
 * @param baseurl The base URL to append to videos
 * @param options A list of additional <video> options, if any
 */
 function LifemirrorPlayer(){}
 
 LifemirrorPlayer.prototype.init = function(playlist, latList, lngList, timeList, durationList, annotationlist, annotationTextList, container, baseurl, options) {

	this.playlist   = playlist;
    this.container  = container;
    this.baseurl    = baseurl;
    this.options    = options;
    this.preloaded  = 0;
	this.annotationlist = annotationlist;
	this.annotationTextList = annotationTextList;
	this.timeList = timeList;
	this.durationList = durationList;
	this.latList = latList;
	this.lngList = lngList;
	
	/*this.marker0 = google.maps.event.createMarker({
			position: new google.maps.LatLng(33.808678, -117.918921),
			map: map,
			icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
			}, "<h1>Marker 0</h1><p>This is the home marker.</p>");*/

	
	//marker = new google.maps.Marker( {position: myLatLng, map: map} );
	
}


var lifemirror;
var playingNow;

LifemirrorPlayer.prototype.preloadVideos = function() {
    for(var index=0;index<this.playlist.length;index++)
	//for(var index in this.playlist)
    {
        // Prepare HTML to insert
        // This is necessary to prevent the browser closing tags
        var htmlToInsert = "<video controls width='100%' preload oncanplaythrough='lifemirror.preloaderCallback()' onpause='lifemirror.videoCallback(\""+this.playlist[index]+"\")' id='"+ this.playlist[index]+"' style='display:none' "+this.options+">";
        //htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[index]+"/video.mp4' type='video/mp4'>";
        //htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[index]+"/video.ogg' type='video/ogg'>";
		htmlToInsert += "<source src='"+this.playlist[index]+"' type='video/mp4'>";
        //htmlToInsert += "<source src='"+Lifemirror.playlist[index]+"' type='video/ogg'>";
        htmlToInsert += "</video>";
		
		var annotationHtmlToInsert = "<a href=\"#about\"><span id='"+this.annotationlist[index]+"' title='"+this.annotationTextList[index]+"' style='display:block; line-height:30px;' onclick='lifemirror.playVideo(\""+this.playlist[index]+"\")'>";
		//onclick='clicked("+this+");'
		annotationHtmlToInsert += this.annotationlist[index];
		//annotationHtmlToInsert += "onclick='lifemirror.videoCallback(\""+this.playlist[index]+"\")'"
		//annotationHtmlToInsert +="<br>"
		//annotationHtmlToInsert += this.annotationTextList[index];
		annotationHtmlToInsert += "</span></a>";
		
		var url = this.playlist[index];
		var filename = url.substring(url.lastIndexOf('/')+1);
		filename = filename.substr(0, filename.indexOf('#')); 
		console.log("FILENAME: "+filename);
		var num = +this.durationList[index] + +this.timeList[index];
		
		var videoCaption = "<span id='"+ this.timeList[index]+"' style='display:none'>Showing "+filename+" from "+ this.timeList[index]+" secs to " +num+" secs. </span> <br>"
		
        // Insert the HTML
		document.getElementById("videonamedisplay").innerHTML += videoCaption;
        document.getElementById("videodisplay").innerHTML += htmlToInsert;
		document.getElementById("annotationdisplay").innerHTML +=  annotationHtmlToInsert;
		
		if((index+1)>=this.playlist.length){
				
			console.debug("INDEX: "+index);
			console.debug("LENGTH: "+this.playlist.length);
			document.getElementById("annotationdisplay").innerHTML += "<span id='end' style='display:block; line-height:30px;'> End of Adaptive Video </span>";
		}
		
    }
	
	
}

LifemirrorPlayer.prototype.startPlaying = function() {
    var object = document.getElementById(this.playlist[0]);
	var annObject = document.getElementById(this.annotationlist[0]);
	var name = document.getElementById(this.timeList[0]);
	updateMap(this.latList[0],this.lngList[0]);
    object.style.display = 'inline';
	name.style.display = 'inline';
	//annObject.style.display = 'inline';
	annObject.style.backgroundColor = '#5BC0DE';
	annObject.style.color = '#333';
	playingNow = this.playlist[0];
    //object.play();
}

function clicked(item) {
    alert($(item).attr("id"));
	lifemirror.videoCallback($(item).attr("id"));
   }

   
LifemirrorPlayer.prototype.playVideo = function(id) {
	
    //var pausetime = document.getElementById(id).currentTime;
	//console.log(pausetime);
	//var start_time = id.match(/#t=(.*),/);
	//var end_time = id.match(/,(.*)/);
	//alert (start_time[1]+","+end_time[1]);
	
	//if(pausetime>=end_time[1]) {
		document.getElementById(playingNow).pause();
		var index = this.playlist.indexOf(playingNow);
		//console.debug("pausetime>=19");
		//console.debug("INDEX: "+index);
		//console.debug("LENGTH: "+this.playlist.length);
		//if(index+1 < this.playlist.length){
			// Hide current object
			document.getElementById(playingNow).style.display = 'none';
			document.getElementById(this.timeList[index]).style.display = 'none';

			
			
			
			// hide the previous annotation
			//document.getElementById(Lifemirror.annotationlist[index-1]).style.display = 'none';
			document.getElementById(this.annotationlist[index]).style.backgroundColor = 'transparent';
			document.getElementById(this.annotationlist[index]).style.color = '#FFFFFF';
			//index = 0;

			// Find next object in array
			index = this.playlist.indexOf(id);
			
			
			
			// Show next video
			var object = document.getElementById(this.playlist[index]);
			var annObject = document.getElementById(this.annotationlist[index]);
			var name = document.getElementById(this.timeList[index]);
			
			//google.maps.event.moveMarker(map, marker0,50.75968 , 6.0965247);
			updateMap(this.latList[index],this.lngList[index]);
			//moveMarker(map, marker, 50, 7);
			
			//if(index < Lifemirror.playlist.length){
				object.style.display = 'inline';
				name.style.display = 'inline';
				//annobject.style.display = 'inline';
				annObject.style.backgroundColor = '#5BC0DE';
				annObject.style.color = '#333';
				playingNow = id;
				object.play();
				
			//}
		//}
		/*else{
			var annObject = document.getElementById(this.annotationlist[index]);
			annObject.style.backgroundColor = 'transparent';
			annObject.style.color = '#FFFFFF'
			
			document.getElementById("end").style.backgroundColor = '#5BC0DE';
		
		}*/
	//}
}
   
   
   

LifemirrorPlayer.prototype.videoCallback = function(id) {
	
    var pausetime = document.getElementById(id).currentTime;
	console.log(pausetime);
	var start_time = id.match(/#t=(.*),/);
	var end_time = id.match(/,(.*)/);
	//alert (start_time[1]+","+end_time[1]);
	
	if(pausetime>=end_time[1]) {
		
		var index = this.playlist.indexOf(id);
		console.debug("pausetime>=19");
		//console.debug("INDEX: "+index);
		//console.debug("LENGTH: "+this.playlist.length);
		if(index+1 < this.playlist.length){
			// Hide current object
			document.getElementById(id).style.display = 'none';
			document.getElementById(this.timeList[index]).style.display = 'none';

			// Find next object in array
			index += 1;
			
			
			// hide the previous annotation
			//document.getElementById(Lifemirror.annotationlist[index-1]).style.display = 'none';
			document.getElementById(this.annotationlist[index-1]).style.backgroundColor = 'transparent';
			document.getElementById(this.annotationlist[index-1]).style.color = '#FFFFFF';
			//index = 0;

			// Show next video
			var object = document.getElementById(this.playlist[index]);
			var annObject = document.getElementById(this.annotationlist[index]);
			var name = document.getElementById(this.timeList[index]);
			
			//google.maps.event.moveMarker(map, marker0,50.75968 , 6.0965247);
			updateMap(this.latList[index],this.lngList[index]);
			//moveMarker(map, marker, 50, 7);
			
			//if(index < Lifemirror.playlist.length){
				object.style.display = 'inline';
				name.style.display = 'inline';
				//annobject.style.display = 'inline';
				annObject.style.backgroundColor = '#5BC0DE';
				annObject.style.color = '#333';
				playingNow = this.playlist[index];
				object.play();
			//}
		}
		else{
			var annObject = document.getElementById(this.annotationlist[index]);
			annObject.style.backgroundColor = 'transparent';
			annObject.style.color = '#FFFFFF'
			
			document.getElementById("end").style.backgroundColor = '#5BC0DE';
		
		}
	}
}

LifemirrorPlayer.prototype.preloaderCallback = function() {
    this.preloaded++;
    if(this.preloaded == this.playlist.length) this.startPlaying();
}

lifemirror = new LifemirrorPlayer();


var videoplaylist = [];
var annotationlist = [];
var annotationTextList = [];
var timeList = [];
var durationList = [];
var latList = [];
var lngList = [];

function flushLists(){


	//.length = 0
	videoplaylist = [];
	annotationlist = [];
	annotationTextList = [];
	timeList = [];
	durationList = [];
	latList = [];
	lngList = [];
}


function getVideos(searchString, username){
	//$(document).ready(function(event){
		
		//$("#searchbtn").click(function(event){
			//var searchString = document.getElementById("searchString").value;
			//alert(searchString);
			$.ajax({
				url: "http://eiche:7074/adapter/getPlaylist?search="+searchString+"&username="+username,
				type: "GET",
				dataType:'text',
				success: function(value) {
					console.log(value);
					
					var jsonData = JSON.parse(value);
					

					for (var i = 0; i < jsonData.length; i++) {
						var videos = jsonData[i];
						var videoUri = videos.videoURL.toString();
						var title = videos.title.toString();
						var text = videos.text.toString();
						var time = videos.time.toString();
						var duration = videos.duration.toString();
						var latitude = videos.Latitude.toString();
						var longitude = videos.Longitude.toString();
						videoplaylist.push(videoUri);
						annotationlist.push(title);
						annotationTextList.push(text);
						timeList.push(time);
						durationList.push(duration);
						latList.push(latitude);
						lngList.push(longitude);
					}
					console.log(annotationlist[0]);
					$('html,body').animate({
					scrollTop: $("#annotationdisplay").offset().top},'slow');
					playVideos();
				},
				statusCode: {
					401: function() {
						alert("ERROR! Please login again.");
					},
					404: function() {
						alert("ERROR! Please login again.");
					}
					
				},
				error: function(e){console.log(e);}
			});
		//});
	//});
}

function playVideos(){

	var base = "random";
	var options = "";
	
	lifemirror.init(videoplaylist, latList, lngList, timeList, durationList, annotationlist, annotationTextList, "videodisplay", base, options);
	
	lifemirror.preloadVideos();
	lifemirror.startPlaying();
}

function updateUserProfile(username){

	var language = document.getElementById("language");
	var location = document.getElementById("location");
	var duration = document.getElementById("duration");
	$.ajax({
		url: "http://eiche:7074/adapter/postUserProfile?Username="+username+"&language="+language.value+"&location="+location.value+"&duration="+duration.value,
		type: "GET",
		dataType:'text',
		beforeSend: function(xhr) {
			//xhr.setRequestHeader("Username",username);
		},
		success: function(value) {
			//username = value;
			//localStorage.setItem("clvitraUser",value);
			location.value = "";
			language.value = "";
			duration.value = "";
			
			//$("#nameField").text(localStorage.clvitraUser)
		},
		statusCode: {
			401: function() {
				alert("ERROR! Please login again.");
				//window.location = "/clvitra/";
			},
			404: function() {
				alert("ERROR! Please login again.");
				//window.location = "/clvitra/";
			}
			
		},
		error: function(e){console.log(e);}
	});

}

function updateMap(lt,ln) {
    
    var myLatLng = new google.maps.LatLng( lt,ln ),
        myOptions = {
            zoom: 4,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            },
        map = new google.maps.Map( document.getElementById( 'map-canvas' ), myOptions ),
        marker = new google.maps.Marker( {position: myLatLng, map: map} );
    
    marker.setMap( map );
    //moveMarker( map, marker );
    
}


