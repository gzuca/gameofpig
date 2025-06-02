(function(){
    'use strict';

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');

    /* keeping data of the game data using an object*/

    const gameData ={
        dice:['1die.jpg', '2die.jpg','3die.jpg',
            '4die.jpg','5die.jpg','6die.jpg'],
        players:['Player 1', 'Player 2'],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd:29
    };

    /*click handler to start the game and change the content of the gameControl <div>*/

    startGame.addEventListener("click",function(){
        // ramdomly set game index to select player 1 or 2
        gameData.index = Math.round(Math.random());

        gameControl.innerHTML ='<h2>The Game Has Started</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna quit?</button>';

        document.getElementById('quit').addEventListener("click", function(){
            location.reload();
        });
        setUpTurn();
    });

        //setting up the turn
        function setUpTurn(){
            game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            actionArea.innerHTML = '<button id="roll">Roll the dice</button>';
            document.getElementById('roll').addEventListener("click", function(){
                throwDice();
            });
        };

        //throwing the dice
        function throwDice(){
            actionArea.innerHTML = ''; //clears out the actionArea
            gameData.roll1 = Math.floor(Math.random() * 6) +1;
            gameData.roll2 = Math.floor(Math.random() * 6) +1; //records the two rolls of the dice
            game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            game.innerHTML += `<img src ="${gameData.dice[gameData.roll1-1]}" alt="die">
                              <img src ="${gameData.dice[gameData.roll2-1]}" alt="die">`; //sets a message and shows the dice
            gameData.rollSum = gameData.roll1 + gameData.roll2; // totals the rolls 
            
            //if two 1's rolled...
            if (gameData.rollSum === 2){
                //snake eyes
                game.innerHTML += '<p> oh snap! Snake Eyes!!</p>';
                gameData.score[gameData.index]=0;
                gameData.index ? (gameData.index = 0):(gameData.index = 1);
                //show current score
                showCurrentScore();
                setTimeout(setUpTurn, 2000);
                
            } 
            // if either die is 1...
            else if(gameData.roll1 ===1 || gameData.roll2=== 1){
                gameData.index ? (gameData.index = 0):(gameData.index = 1);
                game.innerHTML += `<p>Sorry, one of your rolls was one, switching to 
                                   ${gameData.players[gameData.index]}</p>`;
                setTimeout(setUpTurn, 2000);
            }
            // if neither die is a 1...
            else {
                gameData.score[gameData.index] = gameData.score[gameData.index]+gameData.rollSum;
                actionArea.innerHTML='<button id="rollagain"> Roll again</button> or <button id="pass">Pass turn</button>';
                document.getElementById('rollagain').addEventListener('click', function(){throwDice()});

                document.getElementById('pass').addEventListener("click", function(){
                    gameData.index ? (gameData.index=0):(gameData.index=1);
                    setUpTurn();
                });
                checkWiningCondition();
            }
        };
        //check for wining condition

        function checkWiningCondition(){
            if (gameData.score[gameData.index]> gameData.gameEnd){
                score.innerHTML = `<H2>${gameData.players[gameData.index]}
                wins the game with ${gameData.score[gameData.index]} points!</h2>`;

                actionArea.innerHTML = '';
                document.getElementById('quit').innerHTML = "Start a New Game?";
            }
            else{
                //show current score
                showCurrentScore();
            };
        }

        function showCurrentScore(){
            score.innerHTML = `<p> The score is currently: <strong>${gameData.players[0]} has
            ${gameData.score[0]} </strong> points! and <strong>${gameData.players[1]} has ${gameData.score[1]}<strong> points</p>`  

        }

})();