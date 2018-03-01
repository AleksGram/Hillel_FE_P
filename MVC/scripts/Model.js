(function (window) {
    var App = window.App || {};
    var view =  App.EntityView;

    var ToDoEntityModel = {
       title : "",
       completed : false,
       newTask : function () {
        this.title = $('#inputValue').val();
        view.addTask(this.title);
        },
        doneTask : function (element) {
               view.doneTask(element);
        },
        edit : function (button) {
            if(button.classList.contains('save')){
               button.parentNode.innerHTML = inputField.val() + '<button>Edit</button>';
               button.classList.remove('save');
               view.clearInput();
            } else {
                var currentTaskValue = button.parentNode.innerText.slice(0, -4);
                view.showEditableText(currentTaskValue);
                view.focusInput();
                view.showSaveButton(button);
                button.innerText = 'Save';
            }
        }
    };

    App.ToDoEntityModel = ToDoEntityModel;
    window.App = App;
})(window);