var addButton = $("#addButton");
var deleteButton = $("#deleteButton");
var hideShowButton = $("#hideButton");
var inputField = $("#inputValue");
var itemsList = $("#itemsList");
var listContainer = $('.itemsListContainer');


function TasksList() {
    this.el = itemsList;
    for(var i = 0; i < localStorage.length; i++){
        this.push(new Task(JSON.parse(localStorage[i]).text));
    }
    addButton.click(this.addTask);
    deleteButton.click(this.deleteIfDone);
    hideShowButton.click(this.hideDone);

}
TasksList.prototype = [];
var listProto = TasksList.prototype;

listProto.push = function (text) {
    var item = new Task(text);
    [].push.call(this, item);
    var id = this.length - 1;
    this.el.append(item.render());
    item.id = id;
    item.save();
};
listProto.deleteIfDone = function () {
     $.each(taskList, function (index, value) {
         if(taskList[index]){
             if(value.isDone){
                 value.el.remove();
                 taskList.splice(index, 1);
             }
         }
      });
};
listProto.addTask = function () {
    var text = inputField.val();
    if (text === ""){
        taskList.emptyFieldError();
    } else {
        // var task = new Task(text);
        taskList.push(text);
        taskList.clearAndFocusInput();
    }
};
listProto.clearAndFocusInput = function () {
    $(inputField).val("");
    $(inputField).focus();
};
listProto.emptyFieldError = function() {
    var errorText  = document.getElementById('error');
    errorText.classList.add('showError');
    setTimeout(function () {
        errorText.classList.remove('showError');
    },500);
};
listProto.hideDone = function() {
    listContainer.toggleClass('hide');
    if (listContainer.hasClass('hide')) {
        hideShowButton.text("show completed");
    } else {
        hideShowButton.text("hide completed");
    }
};


var taskList = new TasksList();

function Task(text) {
    this.text = text;
    this.isDone = false;
};
var proto = Task.prototype;

Task.prototype.render = function () {
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
        this.isDone = !this.isDone;
        $(this.el).toggleClass('done');
        this.save();
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
proto.save = function () {
    localStorage[this.id] = JSON.stringify(this);
};



