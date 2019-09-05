$(()=>{
    var imageBoard = new DrawingBoard.Board('title-board');

    Pressure.set('#title-board canvas', {
        change: function(force, event){
            if(event.pointerType==="mouse"){
                imageBoard.controls[2].val=imageBoard.controls[2].realValue;
                imageBoard.controls[2].updateView();
                return
            }
            imageBoard.controls[2].val=force*imageBoard.controls[2].realValue;
            imageBoard.controls[2].updateView();
            $("#number").text(force)

        }
    });



});