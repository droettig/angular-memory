function Card(id, imagePath)
{
	this.id = id;
	this.imagePath = imagePath;
	this.coverPath = "images/cover.jpg";
	this.visibleImagePath = this.coverPath;
	this.inPlay = true;

	this.equals = function(card)
	{
		return this.imagePath == card.imagePath && this.id != card.id;
	}

	this.toggleVisible = function()
	{
		if (this.visibleImagePath == this.coverPath)
		{
			this.visibleImagePath = this.imagePath;
		}
		else
		{
			this.visibleImagePath = this.coverPath;
		}
	}
};

function StopWatch(startTime)
{
	var startTime = startTime;
	var stopTime = null;
	var running = false;

	function getTime()
	{
		var day = new Date();
		return day.getTime();
	}


	this.start = function()
	{
		if (running)
		{
			return;
		}
		else if (startTime != null)
		{
			stopTime = null;
		}

		running = true;
		startTime = getTime();
	}

	this.stop = function()
	{
		if (!running)
		{
			return;
		}

		stopTime = getTime();
		running = false;
	}

	this.duration = function()
	{
		if (startTime == null || stopTime == null)
			return 'Undefined';
		else
			return (stopTime - startTime) / 1000;
	}
};

function arrayShuffle(theArray)
{
	var len = theArray.length;
	var i = len;
	while (i--)
	{
		var p = parseInt(Math.random() * len);
		var t = theArray[i];
		theArray[i] = theArray[p];
		theArray[p] = t;
	}
};

function getArrayIndexFromTable(row, column)
{
	if (row == 1)
	{
		row = 4;
	}
	if (row == 2)
	{
		row = 8;
	}
	if (row == 3)
	{
		row = 12;
	}
	return row + column;
};

function cardController($scope, $timeout)
{
	var firstSelectedCard = null;
	var firstClick = true;
	var inputLocked = false;

	var cards = new Array();

	cards[0] = new Card(0, "images/pic01.jpg");
	cards[1] = new Card(1, "images/pic02.jpg");
	cards[2] = new Card(2, "images/pic03.jpg");
	cards[3] = new Card(3, "images/pic04.jpg");
	cards[4] = new Card(4, "images/pic05.jpg");
	cards[5] = new Card(5, "images/pic06.jpg");
	cards[6] = new Card(6, "images/pic07.jpg");
	cards[7] = new Card(7, "images/pic08.jpg");
	cards[8] = new Card(8, "images/pic01.jpg");
	cards[9] = new Card(9, "images/pic02.jpg");
	cards[10] = new Card(10, "images/pic03.jpg");
	cards[11] = new Card(11, "images/pic04.jpg");
	cards[12] = new Card(12, "images/pic05.jpg");
	cards[13] = new Card(13, "images/pic06.jpg");
	cards[14] = new Card(14, "images/pic07.jpg");
	cards[15] = new Card(15, "images/pic08.jpg");

	arrayShuffle(cards);

	$scope.cards = cards;
	$scope.rows = new Array(0, 1, 2, 3);
	$scope.columns = new Array(0, 1, 2, 3);

	$scope.isCardInPlay = function(row, column)
	{
		return $scope.cards[getArrayIndexFromTable(row, column)].inPlay;
	}

	$scope.getCardId = function(row, column)
	{
		return $scope.cards[getArrayIndexFromTable(row, column)].id;
	}

	$scope.getCurrentCardImage = function(row, column)
	{
		return $scope.cards[getArrayIndexFromTable(row, column)].visibleImagePath;
	}

	$scope.showCardByRowAndColumn = function(row, column)
	{
		$scope.showCard($scope.cards[getArrayIndexFromTable(row, column)]);
	}

	$scope.showCard = function(card)
	{
		if (inputLocked)
		{
			return;
		}

		if (firstSelectedCard == card)
		{
			return;
		}

		card.toggleVisible();

		if (firstClick)
		{
			firstSelectedCard = card
			firstClick = false;
		}
		else
		{
			inputLocked = true;

			if (firstSelectedCard.equals(card))
			{

				jQuery("#" + card.id).fadeOut(1000);
				jQuery("#" + firstSelectedCard.id).fadeOut(1000);
				$timeout(function()
				{
					firstSelectedCard.inPlay = false;
					card.inPlay = false;
				}, 1000);
				jQuery("#" + card.id).fadeIn(100);
				jQuery("#" + firstSelectedCard.id).fadeIn({"duration" : 300, "always" : function ()
				{
					inputLocked = false;
				}});

			}
			else
			{
				jQuery("#" + firstSelectedCard.id).delay(1200).slideToggle(400);
				jQuery("#" + card.id).delay(1200).slideToggle(400);
				$timeout(function()
				{
					firstSelectedCard.toggleVisible();
					card.toggleVisible();

				}, 1600);
				jQuery("#" + firstSelectedCard.id).slideToggle(400);
				jQuery("#" + card.id).slideToggle({"duration" : 400, "always" : function ()
				{
					inputLocked = false;
				}});
			}
			firstClick = true;
		}
	}
}