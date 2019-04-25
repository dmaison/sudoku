class Sudoku {

    constructor(){
        this.playArea = document.querySelector( 'main' );
        this.sections = [];
        this.inputs = [];
        this.difficulty = 'easy';
        this.options = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        this.takingNotes = false;
        this.errors = document.querySelector( 'aside > span.errors' );
        this.timer = document.querySelector( 'aside > span.timer' );
        
        this.buttonNotes = document.querySelector( 'nav > button[data-toggle-notes]' );
        this.buttonNotes.onclick = this.toggleNotes;

        this.buttonNewGame = document.querySelector( 'nav > button[data-new-game]' );
        this.buttonNewGame.onclick = this.newGame;

        // bind keyboard controls
        document.addEventListener( 'keydown', e => {
            if( e.code === 'KeyN' ) this.toggleNotes();
            if( e.code === 'ArrowDown' ) this.moveFocus( e, 1, 0 );
            if( e.code === 'ArrowLeft' ) this.moveFocus( e, 0, -1 );
            if( e.code === 'ArrowRight' ) this.moveFocus( e, 0, 1 );
            if( e.code === 'ArrowUp' ) this.moveFocus( e, -1, 0 );
        });

    }

    /**
     * @name clearNotes
     * @method
     * @description Clears the notes for a given cell
     * @param {HTMLElement} container 
     */
    clearNotes( container ){
        let items = container.querySelectorAll( 'mark > span' );
        items.forEach( item => item.classList.remove( 'active' ) );
    }

    /**
     * @name clearSiblingNotes
     * @method
     * @description Clears the notes of a sibling
     * @param {HTMLElement} input Input to get siblings of
     * @param {number} value Value to remove the notes of
     */
    clearSiblingNotes( input, value ){
        if( input.classList.contains( 'error' ) ) return;
        let section = this.sections.find( section => section.values.includes( input ) ).values,
        column = this.inputs.filter( sibling => sibling.dataset.column === input.dataset.column ),
        row = this.inputs.filter( sibling => sibling.dataset.row === input.dataset.row ),
        inputs = [ ...section, ...column, ...row ];

        inputs.forEach( sibling => {
            let note = sibling.parentElement.querySelector( `mark > span[data-value="${ value }"]` );
            note.classList.remove( 'active' );
        });
    }

    /**
     * @name handleError
     * @method
     * @description Increments error count
     */
    handleError(){
        let current = Number( this.errors.dataset.value );
        this.errors.dataset.value = ++current;
    }

    /**
     * @name handleInput
     * @method
     * @description Restrictions input to numbers 1-9 as well as determines what happens when the
     * user inputs a value or a note
     * @param {EventListenerObject} e 
     */
    handleInput = e => {
        let input = e.target,
        value = Number( input.value + e.key ),
        parent = input.parentElement;
        if( isNaN( value ) ) return;
        if( value < 1 || value > 9 ) return e.preventDefault();
        if( !this.takingNotes ){
            let valid = this.isValueValid( input, value, true );
            input.classList[ valid ? 'remove' : 'add' ]( 'error' );
            if( !valid ) this.handleError();
            this.clearNotes( parent );
            return this.clearSiblingNotes( input, value );
        }
        e.preventDefault();
        this.setNote( parent, value );
    }

    /**
     * @name isValueValid
     * @method
     * @description Determines if any other inputs in a row, column, or section match the current value 
     * @param {HTMLElement} input Input used to determine the row column and section, which is also eliminated from the group
     * @param {number} value value to check the availability of
     * @returns {boolean} `true` if value is valid, `false` if value is invalid
     */
    isValueValid( input, value, testHidden=false ){

        let inputs = this.inputs.filter( sibling => {
            if( sibling === input ) return false;
            if( 
                sibling.dataset.column !== input.dataset.column && 
                sibling.dataset.row !== input.dataset.row && 
                sibling.dataset.section !== input.dataset.section
            ) return false;
            return testHidden ? ( sibling.hiddenValue === value.toString() ) : ( sibling.value === value.toString() );
        });

        return ( inputs.length === 0 );
    }

    /**
     * @name moveFocus
     * @method
     * @description
     * @param {*} event 
     * @param {*} horizontal 
     * @param {*} vertical 
     */
    moveFocus( event, horizontal, vertical ){

        event.preventDefault();

        let current = this.playArea.querySelector( 'input:focus' ),
        column, row,
        next;

        if( !current ) return;

        column = Number( current.dataset.column ) + vertical;
        row = Number( current.dataset.row ) + horizontal;
        next = this.playArea.querySelector( `input[data-column="${ column }"][data-row="${ row }"]` )

        if( next && !next.disabled ) next.focus();
    }

    /** */
    newGame = e => {
        e.preventDefault();
        this.playArea.innerHTML = '';
        this.tilesCreate();
    }

    /**
     * @name setNote
     * @method
     * @description 
     * @param {HTMLElement} container 
     * @param {number} value 
     */
    setNote( container, value ){
        let item = container.querySelector( `mark > span[data-value="${ value }"]` );
        item.classList.toggle( 'active' );
    }

    /**
     * @name shuffleOptions
     * @method
     * @description Shuffles the order of the options (1-9) to provide a more randomized puzzle
     */
    shuffleOptions() {
        let currentIndex = this.options.length,
        temporaryValue, 
        randomIndex;
        
        while( 0 !== currentIndex ){        
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            temporaryValue = this.options[currentIndex];
            this.options[ currentIndex ] = this.options[ randomIndex ];
            this.options[ randomIndex ] = temporaryValue;
        }
        
    }

    startTimer(){

        const setTime = container => {
            if( !container.dataset.start ) container.dataset.start = new Date();

            let now = new Date(),
            then = new Date( container.dataset.start ),
            seconds = Math.abs( now - then ) / 1000, 
            minutes = Math.floor( seconds / 60);
            seconds = Math.round( ( seconds - ( minutes * 60 ) ) % 60 );
            

            if( minutes < 10 ) minutes = '0' + minutes.toString();
            if( seconds < 10 ) seconds = '0' + seconds.toString();
            

            container.dataset.value = `${ minutes }:${ seconds }`;

        }

        if( this.timerInt ){
            delete this.timer.dataset.start;
            clearInterval( this.timerInt );
        }
        setTime( this.timer );
        this.timerInt = setInterval( setTime, 1000, this.timer );
    }

    /**
     * @name tilesCreate
     * @method
     * @description Creates the gameplay tiles
     */
    tilesCreate(){

        // create groupings
        this.options.forEach( option => {
            let section = document.createElement( 'section' );
            this.playArea.appendChild( section );
            this.sections.push( section );
        });

        //create inputs
        this.sections.forEach( section => {
            section.values = [];
            this.options.forEach( () => {
                let div = document.createElement( 'div' ),
                mark = document.createElement( 'mark' ),
                input = document.createElement( 'input' );

                this.options.forEach( option => {
                    let span = document.createElement( 'span' );
                    span.dataset.value = option;
                    mark.appendChild( span );
                });

                input.type = 'number';
                input.onkeydown = this.handleInput;

                div.appendChild( input );
                div.appendChild( mark );
                section.appendChild( div );
                section.values.push( input );
            });
        });

        this.shuffleOptions();
        this.tilesAssign();
        this.tilesFill();
        this.tilesCommit();

    }

    /**
     * @name tilesAssign
     * @method
     * @description assigns columns and rows to the inputs
     */
    tilesAssign(){
        var row = 1,
        column = 1;
        this.sections.forEach( ( section, index1 ) => {
            
            if( index1 !== 0 ) column += 3;

            if( index1 % 3 === 0 && index1 !== 0 ){
                row += 3;
                column = 1;
            }

            var innerRow = row,
            innerColumn = column;

            section.values.forEach( ( input, index2 ) => {
                if( index2 !== 0 ) innerColumn += 1;
                if( index2 % 3 === 0 && index2 !== 0 ){
                    innerRow += 1;
                    innerColumn = column;
                }
                input.dataset.section = index1;
                input.dataset.row = innerRow;
                input.dataset.column = innerColumn;
                this.inputs.push( input );
            });

        });
    }

    /**
     * @name tilesFill
     * @method
     * @description Recursive method that fills the tiles on the gameboard
     * @returns {boolean} `true` if board is filled, `false` if board is not filled
     */
    tilesFill(){
        if( this.inputs.every( input => input.value !== '' ) ) return true;
        
        let input = this.inputs.find( input => input.value === '' ), 
        viableOptions = this.options.filter( option => this.isValueValid( input, option ) );
        viableOptions.forEach( option => {
            if( input.value !== '' ) return;
            input.value = option;
            if( !this.tilesFill() ) input.value = '';
        });
        return ( input.value !== '' );
    }

    /**
     * @name tilesCommit
     * @method
     * @description Commits tiles to the board and clears uncommitted tiles
     */
    tilesCommit(){

        let pattern = [ 3, 3, 2, 3, 2, 1, 3, 2, 3 ];

        this.sections.forEach( section => {

            let tilesToCommit = pattern.pop();

            while( tilesToCommit !== 0 ){
                let index = Math.floor( Math.random() * section.values.length );
                if( section.values[ index ].disabled ) continue;
                section.values[ index ].setAttribute( 'disabled', true );
                --tilesToCommit;
            }

        })

        this.inputs.forEach( input => {
            if( !input.disabled ){
                input.hiddenValue = input.value;
                input.value = '';
            }
        });
        
    }

    /**
     * @name toggleNotes
     * @method
     * @description Toggles note taker on and off
     */
    toggleNotes = () => {
        this.buttonNotes.classList.toggle( 'active' );
        this.takingNotes = !this.takingNotes;
    }

    /**
     * @name render
     * @method
     * @description creates the initial game board and starts a new game
     */
    render(){
        this.tilesCreate();
        this.startTimer();
    }

}