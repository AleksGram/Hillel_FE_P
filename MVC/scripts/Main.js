var addButton = $("#addButton");
var deleteButton = $("#deleteButton");
var hideShowButton = $("#hideButton");
var inputField = $("#inputValue");
var itemsList = $("#itemsList");
var listContainer = $('.itemsListContainer');


function TasksList() {

};
TasksList.prototype = [];
var listProto = TasksList.prototype;

listProto.push = function (item) {
    [].push.call(this, item);
    itemsList.appendChild(item.render());
};

var taskList = new TasksList();
function Task(text) {
    this.text = text;
    this.isDone = false;
};

var proto = Task.prototype;
proto.render = function () {
    this.el = document.createElement('li');
    $(this.el).text(this.text);
    $(this.el).click(function () {
        this.done();
    }, this);
    return this.el;
};
proto.done = function () {
    this.isDone = true;
    $(this.el).addClass('done');
};

