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

function cardController($scope, $timeout)
{
	var rowIdMapping = new Array()
	rowIdMapping[0] = 0;
	rowIdMapping[1] = 4;
	rowIdMapping[2] = 8;
	rowIdMapping[3] = 12;
	
	var firstSelectedCard = null;
	var firstClick = true;
	var inputLocked = false;

	var cards = new Array();

	for (var i = 0; i < 16; i++)
	{
		cards[i] = new Card(i, "images/pic" + i % 8 + ".jpg");
	};

	arrayShuffle(cards);

	$scope.cards = cards;
	$scope.rows = new Array(0, 1, 2, 3);
	$scope.columns = new Array(0, 1, 2, 3);

	$scope.getCardInTable = function(row, column)
	{
		return $scope.cards[rowIdMapping[row]+column];
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