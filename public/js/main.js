// Start New Game
function newGame() {
    // create the board
    var board = new Board(30, 15, 20);
    board.render();
    board.gameOver = false;

    $('.space').click(function(eventObject) {
        board.click(eventObject.target);
    });
    board.plantMines();
    return board;
}

// Board Object
function Board(row, col, bombCount) {
    this.row = row;
    this.col = col;
    this.gameOver = false;
    this.bombCount = bombCount;

    this.click = function(target_elem) {
        var row = $(target_elem).attr("data-row");
        var col = $(target_elem).attr("data-col");
        var bomb = $(target_elem).hasClass('bomb');
        if (this.gameOver === true) {
            return;
        }
        if (bomb) {
            $(target_elem).addClass('red');
            $('#new-game').html('Game Over');
            this.gameOver = true;
        } else {
            $(target_elem).addClass('explored');
        }
    }

    this.render = function() {
        var spaces = "";
        for (i = 1; i <= row; i++) {
            for (j = 1; j <= col; j++) {
                spaces = spaces.concat('<div class="space" data-row="' + i + '" data-col="' + j + '">&nbsp;</div>');
            }

            spaces = spaces.concat('<br />');

        }
        $('#board').empty();
        $('#board').append(spaces);
    }

    this.shuffle = function(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    this.plantMines = function() {
        var spaces = $('.space');
        var shuffled = this.shuffle(spaces);
        for (var i = 0; i < this.bombCount; i++) {
            var div = shuffled[i];
            div.className = 'space bomb';
        }
    }
}


var board;
$(document).ready(function() {
    newGame();
});
