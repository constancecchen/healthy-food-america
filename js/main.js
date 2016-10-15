/*
	var gridBox
*/





var foodArr = [];

foodArr.push({
	name: "Sugary Cereal",
	serving: "3/4 cup",
	sugar: 9
});

foodArr.push({
	name: "Fruit Flavored Drink",
	serving: "1 pouch",
	sugar: 16
});

foodArr.push({
	name: "Flavored Yogurt",
	serving: "1 container",
	sugar: 16
});

foodArr.push({
	name: "Soda",
	serving: "1 can",
	sugar: 38
});

foodArr.push({
	name: "Granola Bar",
	serving: "1 bar",
	sugar: 7
});

foodArr.push({
	name: "Chocolate Milk",
	serving: "1 cup",
	sugar: 14
});

foodArr.push({
	name: "Muffin",
	serving: "1 muffin",
	sugar: 13
});

foodArr.push({
	name: "Pasta Sauce",
	serving: "1/2 cup",
	sugar: 8
});

foodArr.push({
	name: "Graham Crackers",
	serving: "2 crackers",
	sugar: 7
});

foodArr.push({
	name: "Cupcake",
	serving: "1 piece",
	sugar: 20
});


foodArr.push({
	name: "Fruit Snacks",
	serving: "1 pouch",
	sugar: 18
});

foodArr.push({
	name: "Sports Drink",
	serving: "1 355ml bottle",
	sugar: 21
});


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