$(document)
    .ready(function () {
        var hashTimer;
        var iconPrefix = '.glyphicon-';
        var t8 = window.toastr8;
        var chessboards = [];

        const htmlElementWithPrevious = `
        <div class="col-sm-4 text-center"><div class="row">
            <div class="col-sm-1 text-center"></div>
            <div class="col-sm-10 text-center">
                <h1>Board @id@</h1>
                <div id="board@id@" class="small-board chess-board"></div>
                <button id="startBtn@id@" class="btn btn-primary">Start Position</button>
                <button id="clearBtn@id@" class="btn btn-info">Clear Board</button>
                <button id="copyFromPrev@id@" class="btn btn-link">Copy from previous</button>
                <button id="showFEN@id@" class="btn btn-info">Show FEN</button>
                <form>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="movement@id@" placeholder="Move (eg. e2-e4)" required>
                        </div>
                        <label for="moveBtn@id@" class="col-sm-2 col-form-label">
                        <button id="moveBtn@id@" class="btn btn-info">Move</button>
                    </label>
                    <textarea rows="4" cols="40" class="board-notes" id="notes@id@"></textarea>
                    </div>
                </form>
            </div>
            </div>
        </div>
        `;

                    const htmlElementWithoutPrevious = `
        <div class="col-sm-4 text-center"><div class="row">
            <div class="col-sm-1 text-center"></div>
            <div class="col-sm-10 text-center">
                <h1>Board @id@</h1>
                <div id="board@id@" class="small-board chess-board"></div>
                <button id="startBtn@id@" class="btn btn-primary">Start Position</button>
                <button id="clearBtn@id@" class="btn btn-info">Clear Board</button>
                <button id="showFEN@id@" class="btn btn-info">Show FEN</button>
                <form>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="movement@id@" placeholder="Move (eg. e2-e4)" required>
                        </div>
                        <label for="moveBtn@id@" class="col-sm-2 col-form-label">
                        <button id="moveBtn@id@" class="btn btn-info">Move</button>
                    </label>
                    <textarea rows="4" cols="40" class="board-notes" id="notes@id@"></textarea>
                    </div>
                </form>
            </div>
            </div>
        </div>
        `;

        /* smooth scrolling sections */
        $('#navbar-collapsible li')
            .on('activate.bs.scrollspy', _scrollspy)
            .find('a[href*="#"]:not([href="#"])')
                .click(_hrefClick);

        $(iconPrefix + 'cloud').click(ajaxDemo);
        $(iconPrefix + 'comment').click(alertDemo);
        $(iconPrefix + 'ok').click(confirmDemo);
        $(iconPrefix + 'pencil').click(promptDemo);
        $(iconPrefix + 'screenshot').click(iframeDemo);
        $('#cmn').click(promptDemo);

        $('#new-board').click(function() {
            createBoard();
        });
        ///////////////////* Implementation *///////////////////

        function numberOfBoards() {
            return $('#boards').children().length;
        }

        function createBoard() {

            var isFirstBoard = numberOfBoards() == 0;

            var numberBoards = numberOfBoards();
            var html = isFirstBoard ? htmlElementWithoutPrevious : htmlElementWithPrevious;
            html = html.replace("@id@", (numberBoards + 1));
            html = html.split("@id@").join(numberBoards);

            $('#boards').append(html);

            var board = Chessboard('board' + numberBoards, {
                position: 'start',
                showNotation: true,
                dropOffBoard: 'trash',
                sparePieces: true
            });

            chessboards.push(board);

            $('#startBtn' + numberBoards).on('click', board.start);
            $('#clearBtn' + numberBoards).on('click', board.clear);

            if (!isFirstBoard) {
                $('#copyFromPrev' + numberBoards).on('click', function() {
                    // Disabled for the first one ...
                    if (numberBoards == 0) {
                        return;
                    }

                    var previousChessboard = chessboards[numberBoards - 1];
                    board.position(previousChessboard.position());
                });
            }

            $('#showFEN' + numberBoards).on('click', function() {
                var title = 'Board ' + numberBoards + ' FEN';

                return eModal
                    .alert(board.fen(), title);
                    //.then(function () { t8.facebook('Alert modal is visible.', title); });
            });

            $('#moveBtn' + numberBoards).on('click', function(e) {
                e.preventDefault();
                var movementText = $('#movement' + numberBoards).val();
                board.move(movementText);
            });
        }

        // Demos
        function ajaxDemo() {
            var title = 'Ajax modal';
            var pars = Math.floor((Math.random() * 7) + 1);
            var params = {
                buttons: [
                   { text: 'Close', close: true, style: 'danger' },
                   { text: 'New content', close: false, style: 'success', click: ajaxDemo }
                ],
                size: eModal.size.lg,
                title: title,
                url: 'https://baconipsum.com/api/?type=all-meat&paras=' + pars + '&start-with-lorem=1&format=html'
            };

            return eModal
                .ajax(params)
                .then(function () { t8.info('Ajax Request complete!!!!', title) });
        }

        function alertDemo() {
            var title = 'Alert modal';

            return eModal
                .alert('You welcome! Want clean code?', title)
                .then(function () { t8.facebook('Alert modal is visible.', title); });
        }

        function confirmDemo() {
            var title = 'Confirm modal callback feedback';

            return eModal
                .confirm('It is simple enough?', 'Confirm modal')
                .then(
                    function (/* DOM */) { t8.success('Thank you for your OK pressed!', title); },
                    function (/*null*/) { t8.skype('Thank you for your Cancel pressed!', title) }
                    );
        }

        function iframeDemo() {
            var title = 'Bicycle in Richmond Park';

            return eModal
                .iframe('https://www.youtube.com/embed/YRgluqis7rQ?autoplay=1', title)
                .then(function () { t8.success('iFrame loaded!!!!', title) });
        }

        function promptDemo() {
            var title = 'Prompt modal callback feedback';

            return eModal
                .prompt({ size: eModal.size.sm, message: 'What\'s your name?', title: title })
                .then(
                    function (name) {
                        // t8.github({ message: 'Hi ' + input + '!', title: title, imgURI: 'https://avatars0.githubusercontent.com/u/4276775?v=3&s=89' })
                        // alert('Holis ... ' + input);
                        // console.log(chessboards.length);

                        var boards = [];

                        for (i = 0; i < chessboards.length; i++) {
                            var notes = $('#notes' + i).val();
                            var b = {fen: chessboards[i].fen(), notes: notes};
                            boards.push(b);
                        }

                        var game = {"name": name, "boards": boards};

                        $.ajax({
                            data: JSON.stringify(game),
                            method: 'POST',
                            url: 'http://localhost:8080/save',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: true
                          })
                          .done(function(data) {
                            console.log(':)');
                            console.log(data);
                          })
                          .fail(function(jqXHR, textStatus) {
                            console.log(jqXHR);
                            console.log(textStatus);
                          });
                    },
                    function (/**/) {
                        t8.android('Why don\'t you tell me your name?', title);
                    });
        }

        //#region Page Events
        function _hrefClick(e) {
            e.preventDefault();
            var hash = this.hash;

            if (hash !== location.hash) {
                var query = '#main';
                var scroll = $(this.hash).offset().top - 50 + $(query).scrollTop();

                $(query)
                    .stop()
                    .animate({ scrollTop: scroll }, 1000);
            }
        }

        function _scrollspy() {
            var el = this;
            clearTimeout(hashTimer);

            hashTimer = setTimeout(function () {
                var hash = $(el).find('a').get(0).hash;
                var $el = $(hash).prop('id', '');

                window.location.hash = hash;
                $el.prop('id', hash.slice(1));
            }, 400);
        }

        //#endregion
    });
