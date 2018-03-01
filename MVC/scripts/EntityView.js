(function (window) {
    var App = window.App || {};

    var EntityView = {
        addTask : function (title) {
            var taskView = $('<li></li>');
            taskView.html(title + '<button>Edit</button>');
            $('#itemsList').append(taskView);
           this.clearInput(true);
        },
        doneTask : function (element) {
            if (element.tagName === 'LI'){
                $(element).toggleClass('done');
            }
        },
        showEditableText : function (text) {
            $('#inputValue').val(text);
        },
        showSaveButton : function (button) {
            $(button).addClass('save');
        },
        clearInput : function (f) {
            if(f){
                $('#inputValue').val("").focus();
            } else {
                $('#inputValue').val("");
            }
        },
        focusInput : function () {
            $('#inputValue').focus();
        }
    };

    App.EntityView = EntityView;
    window.App = App;
})(window);