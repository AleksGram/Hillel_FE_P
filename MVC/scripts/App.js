(function (window) {
    var App = window.App || {};
    var controller = App.ToDoController;

    var ToDoApp = {

        init: function () {
            this.addTaskEvent();
            this.doneTaskEvent();
            this.editTaskEvent();
            this.main();

        },

        addTaskEvent : function () {
            $('#addButton').click(controller.addTask)
        },
        doneTaskEvent : function () {
            $('#itemsList').click(controller.done);
        },
        editTaskEvent : function () {
            $('#itemsList').click(controller.editTask);
        },
        main: function () {

        }


    };
    ToDoApp.init();
    App.ToDoApp = ToDoApp;
    window.App = App;
})(window);