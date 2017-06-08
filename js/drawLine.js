function drawLine()
{
	var oC = document.createElement('canvas');

	console.log(oBox.offsetWidth);

	oC.width = oBox.offsetWidth;
	oC.height = oBox.offsetHeight;

	var gd = oC.getContext('2d'); 

	oBox.appendChild(oC);

}