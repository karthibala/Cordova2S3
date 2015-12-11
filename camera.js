var pictureSource;
var destinationType;

// Wait for Cordova to connect with the device
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used
function onDeviceReady()
{
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully received
function onPhotoURISuccess(imageURI)
{
	var myImg = document.getElementById('myImg');
	myImg.style.display = 'block';
	myImg.src = imageURI;
}

// Called if something bad happens
function onFail(message)
{
	alert('Failed because: ' + message);
}

// Gets a photo using the device's camera
function capturePhoto()
{
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI });
}

// Gets a photo from the library or album
function getPhoto(source)
{
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });
}

// Uploads the image to S3
function uploadPhoto()
{
	var myImg = document.getElementById('myImg');
	var options = new FileUploadOptions();
	options.key="file.jpg"; // temporary key for testing
	options.AWSAccessKeyId=""; // value removed for privacy reasons
	options.acl="private";
	options.policy=""; // value removed for privacy reasons
	options.signature=""; // value removed for privacy reasons
	
	var ft = new FileTransfer();
	ft.upload(myImg.src, encodeURI("https://andrewscm-bucket.s3.amazonaws.com/"), onUploadSuccess, onUploadFail, options);
}

// On upload success
function onUploadSuccess(r)
{
	alert("Successfully uploaded. Code = " + r.responseCode);
}

// On upload fail
function onUploadFail(error)
{
	alert("An error has occurred.\nCode = " + error.code + "\nSource = " + error.source + "\nTarget = " + error.target);
}