(function (window) {
    var App = window.App || {};
    var entityModel =  App.ToDoEntityModel;

    var ToDoController = {
        addTask : function () {
            entityModel.newTask();
        },
        done : function (e) {
            entityModel.doneTask(e.target);
        },
        editTask : function (e) {
            entityModel.edit(e.target);
        }


    };

    App.ToDoController = ToDoController;
    window.App = App;
})(window);