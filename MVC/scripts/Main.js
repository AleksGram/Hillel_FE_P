var addButton = $("#addButton");
var deleteButton = $("#deleteButton");
var hideShowButton = $("#hideButton");
var inputField = $("#inputValue");
var itemsList = $("#itemsList");
var listContainer = $('.itemsListContainer');


function TasksList() {
    this.el = itemsList;
}
TasksList.prototype = [];
var listProto = TasksList.prototype;

listProto.push = function (item) {
    [].push.call(this, item);
    itemsList.append(item.render());
};
listProto.deleteDone = function () {
 $.each(taskList, function (index, value) {
      if(value.isDone){
          value.el.remove();
          taskList.splice(index, 1);
      }
  })
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
    $(this.el).click(this.done.bind(this));
    $(this.el).click(this.editTask);
    this.addEditButton(this.el);
    return this.el;
};
proto.addEditButton = function (task) {
    var editButton = document.createElement('button');
    $(editButton).text('Edit');
    $(task).append(editButton);
};
proto.done = function (e) {
    if(e.target.tagName === 'LI'){
        this.isDone = true;
        $(this.el).toggleClass('done');
    }
};
proto.editTask = function (e) {
    if (e.target.tagName === 'BUTTON'){
        if(e.target.classList.contains('save')){
            e.target.parentNode.innerHTML = inputField.val() + '<button>Edit</button>' ;
            e.target.classList.remove('save');
            inputField.val("");
        } else {
            var currentTaskValue = e.target.parentNode.innerText.slice(0, -4);
            inputField.val(currentTaskValue);
            inputField.focus();
            e.target.classList.add('save');
            e.target.innerText = 'Save';
        }
    }
};
proto.deleteTask = function () {

};
addButton.click(function () {
    var text = inputField.val();
    if (text === ""){
        emptyFieldError();
    } else {
        var task = new Task(text);
        taskList.push(task);
        clearAndFocusInput();
    }
});
// deleteButton.click(deleteItem);
var clearAndFocusInput = function () {
    $(inputField).val("");
    $(inputField).focus();
};
function emptyFieldError() {
    var errorText  = document.getElementById('error');
    errorText.classList.add('showError');
    setTimeout(function () {
        errorText.classList.remove('showError');
    },500);
};

