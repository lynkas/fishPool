var imageBoard
$(()=>{
    imageBoard = new DrawingBoard.Board('title-board');

    Pressure.set('#title-board canvas', {
        change: function(force, event){
            console.log(event)
            if(event.pointerType!=="pen"){
                imageBoard.controls[2].val=imageBoard.controls[2].realValue;
                imageBoard.controls[2].updateView();
                return
            }
            imageBoard.controls[2].val=force*imageBoard.controls[2].realValue;
            imageBoard.controls[2].updateView();
            $("#number").text(force)

        }
    });

$(".use-topic").click(function (e) {
    $("#topic").val(e.target.innerText);
    jQuery('html,body').animate({scrollTop:0},"slow");
})

});

$("#change-topic").click(function (e) {
    var a=e;
    $.get({
        async:true,
        url:"/api/tag/random/",
        then:function(a){
            $(a.target).addClass("disabled")
        },
        success:function (data) {

            $("#topic").val(data["content"])
            $(a.target).removeClass("disabled")
        },
        error:function (response,data) {
            $(a.target).removeClass("disabled")
        }
    })
});

$("#rand-mp").click(function (e) {
    var a=e;

    $.get({
        async:true,
        url:"/api/pic/",
        then:function(a){
            // $(a.target).attr("disabled","")
        },
        success:function (data) {
            data=data["pic"];
            $("#mp-c").html("")
            for (i=0;i<data.length;i++){
                $("#mp-c").append(mkmp(data[i]))
            }

            // $(a.target).removeAttr("disabled")
        },
        error:function (response,data) {
            // $(a.target).removeAttr("disabled")
        }
    })
});

function mkmp(data) {
    var n= $("#mp-s").clone(true)

    $(n.find(".use-topic")).text(data.topic)
    var y=new Date(data.created_time).getFullYear()
    var m=new Date(data.created_time).getMonth()
    m=m<10?"0"+m:m;

    var d=new Date(data.created_time).getDay()
    d=d<10?"0"+d:d;

    var h=new Date(data.created_time).getHours()
    h=h<10?"0"+h:h;
    var min=new Date(data.created_time).getMinutes()
    min=min<10?"0"+min:min;

    $(n.find(".creator")).text(data.creator)

    $(n.find(".creationtime")).text(y+"."+m+"."+d+" "+h+""+min)
    $(n.find(".linkto")).attr("href","/pic/"+data.key).text("View")

    $(n.find(".mp-img-img")).attr("src",data.file_name);
    n.show()
    return n
}

$("#submit").click(function () {
    $.post({
        url:"/api/pic/",
        data:{
            "pic":imageBoard.getImg().split(";")[1].split(",")[1],
            "creator":$("#author").val(),
            "topic":$("#topic").val()
        },
        success:function (data) {
            $.toast("Done")
            window.location="/pic/"+data.key
        },
        error:function (res,data) {
            console.log("data")
        },
    })
});
