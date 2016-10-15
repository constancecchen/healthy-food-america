$(document).ready(function() {

	/**
	 * Set up
	 */
	var total = 0;
	var pourPercent = 0;
	var isPouring = false;
	var pourTimer;

	/**
	 * Increment / decrement logic
	 */
	$('.js-subtract').click(function(){
		
		var quantity = $(this).siblings(".js-quantity");
		var num = parseInt(quantity.text());
		if(num > 0){
			quantity.text(--num);
			total -= $(this).closest(".js-food-item").data("value");
		}
	});

	$('.js-add').click(function(){
		
		var quantity = $(this).siblings(".js-quantity");
		var num = parseInt(quantity.text());
		if(num < 10){
			quantity.text(++num);
			total += $(this).closest(".js-food-item").data("value");
		}
	});

	/**
	 * "Page" navigation
	 */
	$(".js-estimate").click(function(){
		$(".js-main").hide();
		$(".js-estimating").show();
		pourHandler();
	});

	$(".js-estimate-stop").click(function(){
		pourHandler();

		setTimeout(function() {
			$(".js-estimating").hide();
			$(".js-sugar-reveal").show();
	  }, 500);
	});

	/**
	 * Pouring logic
	 */
	var pourHandler = function(){
		if(isPouring){
			isPouring = false;
			clearInterval(pourTimer);
		} else {
			if(pourPercent < 100){
				isPouring = true;

				pourTimer = setInterval(function(){
					$(".js-measuring-level").css({
						"transform": "scaleY(" + pourPercent / 100 + ")"
					});

					if(pourPercent < 100){
						pourPercent++;
					} else {
						pourTimer = false;
					}
				}, 40);
			}
		}
	}

	/**
	 * Final grading math
	 */
	var gradeUser = function(score){
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

});
