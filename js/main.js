$(document).ready(function() {

	/**
	 * Set up
	 */
	var total = 0;
	var pourPercent = 0;
	var isPouring = false;
	var pourTimer;
	var gramsPerTeaspoon = 4.2;

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

		setTimeout(function() {
			pourHandler();
		}, 500);
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

	/**
	 * Convert grams to teaspoons math
	 */

	var gramConverter = function(grams){
		return Math.floor(grams / gramsPerTeaspoon);
	};

	/*
	 * Demographic percentages
	 * input total teaspoons
	 */

	var getPercentages = function(teaspoons){

		var childMax = 6;
		var womanMax = 6;
		var manMax = 9;

		var demograpics = {};
		demograpics.child = Math.floor(teaspoons / childMax * 100);
		demograpics.woman = Math.floor(teaspoons / womanMax * 100);
		demograpics.man = Math.floor(teaspoons / manMax * 100);
	};
});
