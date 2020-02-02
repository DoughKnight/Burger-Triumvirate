const LOWER_BOUND_YEAR = 0;											const UPPER_BOUND_YEAR = 35;
const LOWER_BOUND_WINTER = LOWER_BOUND_YEAR; 						const UPPER_BOUND_WINTER = Math.floor(UPPER_BOUND_YEAR/4);
const LOWER_BOUND_SPRING = Math.floor(UPPER_BOUND_YEAR/4) + 1; 		const UPPER_BOUND_SPRING = Math.floor(UPPER_BOUND_YEAR/2);
const LOWER_BOUND_SUMMER = Math.floor(UPPER_BOUND_YEAR/2) + 1; 		const UPPER_BOUND_SUMMER = Math.floor(UPPER_BOUND_YEAR * (3/4));
const LOWER_BOUND_FALL = Math.floor(UPPER_BOUND_YEAR * (3/4)) + 1; 	const UPPER_BOUND_FALL = UPPER_BOUND_YEAR;

var startDateSpan = document.getElementById("startDate"); 			var endDateSpan = document.getElementById("endDate");
var dateSlider = document.getElementById("dateSlider");				var season = document.getElementsByName("season");
var mealPlan = document.getElementsByName("mealPlan");				var exercise = document.getElementsByName("exercise");
var mealPlanLimit = UPPER_BOUND_FALL;								var exerciseFactor = 1;
var BMI = document.getElementById("BMI");							var WC = document.getElementById("WC");
var img = document.getElementById("growth");						var runningAnimation;

function resetSlider(){dateSlider.value = parseInt(dateSlider.min); pause();}
function play(){pause(); runningAnimation = window.setInterval(animate, 250);}
function pause(){if(runningAnimation!=null){window.clearInterval(runningAnimation);}update();}

function animate()
{
	if(dateSlider.value++ < parseInt(dateSlider.max)) {update();}
	else{window.clearInterval(runningAnimation);}
}

function resetSeason(){season[0].checked = true; setSeason();}
function resetMealPlan(){mealPlan[3].checked = true; setMealPlan();}
function resetExercise(){exercise[2].checked = true; setExercise();}

function setSeason()
{	
	if(season[0].checked){rebindSlider(LOWER_BOUND_YEAR, UPPER_BOUND_YEAR, -1);}
	else if(season[1].checked){rebindSlider(LOWER_BOUND_WINTER, UPPER_BOUND_WINTER, -1);}
	else if(season[2].checked){rebindSlider(LOWER_BOUND_SPRING, UPPER_BOUND_SPRING, -1);}
	else if(season[3].checked){rebindSlider(LOWER_BOUND_SUMMER, UPPER_BOUND_SUMMER, -1);}
	else if(season[4].checked){rebindSlider(LOWER_BOUND_FALL, UPPER_BOUND_FALL, -1);}
	
	dateSlider.value = dateSlider.min;
	pause();
}

function setMealPlan()
{
	if(mealPlan[0].checked) mealPlanLimit = UPPER_BOUND_WINTER;
	else if(mealPlan[1].checked) mealPlanLimit = UPPER_BOUND_SPRING;
	else if(mealPlan[2].checked) mealPlanLimit = UPPER_BOUND_SUMMER;
	else if(mealPlan[3].checked) mealPlanLimit = UPPER_BOUND_FALL;
	
	dateSlider.value = dateSlider.min;
	pause();
}

function setExercise()
{
	if(exercise[0].checked) exerciseFactor = 1;
	else if(exercise[1].checked) exerciseFactor = 2;
	else if(exercise[2].checked) exerciseFactor = 4;
	else if(exercise[3].checked) exerciseFactor = 6;
	else if(exercise[4].checked) exerciseFactor = 8;
	
	dateSlider.value = dateSlider.min;
	pause();
}

function update(arg)
{
	//DATESPAN VIEWS
	if(dateSlider.min==LOWER_BOUND_YEAR) startDateSpan.innerHTML = "January 1st";
	else if(dateSlider.min==LOWER_BOUND_WINTER) startDate.innerHTML = "December 1st";
	else if(dateSlider.min==LOWER_BOUND_SPRING) startDate.innerHTML = "March 1st";
	else if(dateSlider.min==LOWER_BOUND_SUMMER) startDate.innerHTML = "June 1st";
	
	if(dateSlider.max==UPPER_BOUND_YEAR) endDateSpan.innerHTML = "December 31st";
	else if(dateSlider.max==UPPER_BOUND_WINTER) endDate.innerHTML = "February 28th";
	else if(dateSlider.max==UPPER_BOUND_SPRING) endDate.innerHTML = "May 31st";
	else if(dateSlider.max==UPPER_BOUND_SUMMER) endDate.innerHTML = "August 31st";
	
	//IMAGE VIEW
	var relativeWeight;
	if(arg==null || arg < 0)
	{
		relativeWeight = parseInt(dateSlider.value/exerciseFactor);
		if(relativeWeight > mealPlanLimit) relativeWeight = mealPlanLimit;
	}
	else{relativeWeight = arg;}

	if(relativeWeight < 10){img.src = "fat/fat%20growth000";}
	else{img.src = "fat/fat%20growth00";}
	img.src += relativeWeight + ".png";
	
	//STATISTICS VIEW
	BMI.innerHTML = 18.5 + (0.875*relativeWeight);
	
	if(parseFloat(BMI.innerHTML) < 25){WC.innerHTML = "Normal Weight";}
	else if(parseFloat(BMI.innerHTML) < 30){WC.innerHTML = "Over Weight";}
	else if(parseFloat(BMI.innerHTML) < 35){WC.innerHTML = "Obesity Class I";}
	else if(parseFloat(BMI.innerHTML) < 40){WC.innerHTML = "Obesity Class II";}
	else if(parseFloat(BMI.innerHTML) < 50){WC.innerHTML = "Obesity Class III";}
}

//BACK END METHODS
function rebindSlider(lb, ub, s)
{
	setLowerBound(lb); setUpperBound(ub);
	if( s >= 0){setStep(s);}
}
function setLowerBound(lb)
{
	if(lb >= LOWER_BOUND_YEAR && lb <= UPPER_BOUND_YEAR){dateSlider.min = lb;}
}
function setUpperBound(ub)
{
	if(ub >= LOWER_BOUND_YEAR && ub <= UPPER_BOUND_YEAR){dateSlider.max = ub;}
}
function setStep(s)
{
	if(s >= 0 && s <= 35){dateSlider.step = s;}
}