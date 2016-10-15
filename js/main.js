/*
	var gridBox = $("#js-foodContainer");

	var estimate = $("#estimateButton");
	estimate.addEventListener("mousedown", pourHandler, false);
*/

var pourPercent = 0;
var isPouring = false;
var pourTimer;

var selections = [];
var total = 0;

$('.js-subtract').click(function(){
	
	var quantity = $(this).siblings(".js-quantity");
	var num = parseInt(quantity.text());
	if(num > 0){
		quantity.text(--num);
		total -= $(this).closest(".js-food-item").data("value");
	}

	console.log(total);
});

$('.js-add').click(function(){
	
	var quantity = $(this).siblings(".js-quantity");
	var num = parseInt(quantity.text());
	if(num < 10){
		quantity.text(++num);
		total += $(this).closest(".js-food-item").data("value");
	}

	console.log(total);
});

$(".js-estimate").click(function(){
	// alert(total);
	$(".js-estimate-modal").removeClass('u-hidden');
});

function pourHandler(){
	if(isPouring){
		isPouring = false;
		clearInterval(pourTimer);
	} else {
		if(pourPercent < 100){
			isPouring = true;

			pourTimer = setInterval(function(){
				
				if(pourPercent < 100){
					pourPercent++;
				} else {
					pourTimer = false;
				}
			},1000);
		}
	}
}
    
function gradeUser(score){
	var maxScore = 100;
	var percent = score / maxScore * 100;

	var gradeArr = [60,70,80,90,95];
	var rankArr = ["F for FAILURE","C","B","A","A+",];

	var curRank;

	if(percent <= gradeArr[0]){
		curRank = rankArr[0];
	} else if(percent <= gradeArr[1]){
		curRank = rankArr[1];
	} else if(percent <= gradeArr[2]){
		curRank = rankArr[2];
	} else if(percent <= gradeArr[3]){
		curRank = rankArr[3];
	} else {
		curRank = rankArr[4];
	}

	return curRank;
}
