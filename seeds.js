var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
		{
			name:"Salmon Creek", 
			image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg", 
			description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},
		{
			name:"Granite hill", 
			image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg", 
			description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},
		{
			name:"Yosemite Jungle", 
			image:"https://farm4.staticflickr.com/3881/14146164489_0cb49d2904.jpg", 
			description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},
	];

function seedDB() {	
	Campground.deleteMany({}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Removed campgrounds!");
			data.forEach(function(seed) {
				Campground.create(seed, function(err, campground) {
					if(err) {
						console.log(err);
					} else {
						console.log("added a campground");
						Comment.create(
							{
								text:"This place is great, but I wish there was internet",
								author:"homer"
							}, function(err, comment) {
								if(err) {
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log("comment pushed to campground");
								}								
							});
					}
				});
			});
		}
	});
	
}

module.exports = seedDB;