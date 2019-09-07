$("#apply-token").click(function () {
    document.cookie="fishpool="+$("#token").val()
    $.toast("Done")
})