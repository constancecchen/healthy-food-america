$(document).ready(function() {

	/**
	 * Set up
	 */
	var totalGrams = 0;
	var curPour = 0;
	var totalPour = 0;
	var maxPour = 12;
	var totalFilled = 0;
	var totalFilledMax = 6;
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
			totalGrams -= $(this).closest(".js-food-item").data("value");
		}
	});

	$('.js-add').click(function(){

		var quantity = $(this).siblings(".js-quantity");
		var num = parseInt(quantity.text());
		if(num < 10){
			quantity.text(++num);
			totalGrams += $(this).closest(".js-food-item").data("value");
		}
	});

	/**
	 * "Page" navigation
	 */
	$(".js-estimate").click(function(){
		if (totalGrams <= 0) {
			$(".js-estimate-error").slideDown('fast');
			return;
		} else {
			$(".js-estimate-error").hide();
		}

		$(".js-main").hide();
		$(".js-estimating").show();
		window.scrollTo(0, 0);
	});

	$(".js-estimate-start").click(function(){
		pourHandler();

		$(this).hide();
		$(".js-estimate-stop").show();
		$(".js-game-explanation").slideUp(300, function() {
			$(".pouring-container").addClass("is-pouring");
		});
	});

	$(".js-estimate-stop").click(function(){
		pourHandler();

		$(".js-sugar-reveal").children(".section-heading").text(gradeUser(totalPour));

		$(".js-user-total").text(totalPour);
		$(".js-actual-total").text(gramConverter(totalGrams));

		var demographics = getPercentages(gramConverter(totalGrams));
		$(".js-child-intake").text(demographics.children);
		$(".js-woman-intake").text(demographics.women);
		$(".js-man-intake").text(demographics.men);

		setTimeout(function() {
			$(".js-estimating").hide();
			$(".js-sugar-reveal").show();
			window.scrollTo(0, 0);
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
			if(curPour < maxPour){
				isPouring = true;

				pourTimer = setInterval(function(){
					$(".js-measuring-level").css({
						"transform": "scaleY(" + curPour / maxPour + ")"
					});

					if(curPour < maxPour){
						curPour++;
						totalPour++;
						$(".js-measuring-quantity").text(totalPour);
					} else if (totalFilled < totalFilledMax){
						totalFilled++;
						curPour = 0;
					} else {
						clearInterval(pourTimer);
					}
				}, 500);
			}
		}
	};

	/**
	 * Convert grams to teaspoons math
	 */
	var gramConverter = function(grams){
		return Math.floor(grams / gramsPerTeaspoon);
	};

	/*
	 * Demographic percentages
	 * @param total teaspoons
	 */
	var getPercentages = function(teaspoons){

		var childrenMax = 6;
		var womenMax = 6;
		var menMax = 9;

		var demographics = {};
		demographics.children = Math.round(teaspoons / childrenMax * 100);
		demographics.women = Math.round(teaspoons / womenMax * 100);
		demographics.men = Math.round(teaspoons / menMax * 100);

		return demographics;
	};
	/**
	 * Final grading math
	*/
	var gradeUser = function(guess){
		
		var rankArr = ["Good guess!","Super close!","You got it!"];
		var message;

		if(Math.abs(guess - totalPour) > 5){
			message = rankArr[0];
		} else if(Math.abs(guess - totalPour) > 0){
			message = rankArr[1];
		} else {
			message = rankArr[2];
		}

		return message;
	}
});
