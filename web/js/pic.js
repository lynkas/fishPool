$("#delete").click(function () {
    $.ajax({
        url: window.origin+"/api"+window.location.pathname,
        type: 'DELETE',
        success: function(data) {
            window.location="/"
        }
    });
});