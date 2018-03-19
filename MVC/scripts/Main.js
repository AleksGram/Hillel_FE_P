var addButton = $("#addButton");
var deleteButton = $("#deleteButton");
var hideShowButton = $("#hideButton");
var inputField = $("#inputValue");
var itemsList = $("#itemsList");
var listContainer = $('.itemsListContainer');
var myApp = [];


function Task(text) {
    this.text = text;
    this.isDone = false;
};
var proto = Task.prototype;

Task.prototype.render = function (tmplItem) {
    // this.el = document.createElement('li');
    // $(this.el).text(this.text);

    this.el =  tmplItem[0];
    $(this.el).click(this.done.bind(this));
    $(this.el).click(this.editTask);
    // this.addEditButton(this.el);
    return this.el;
};
// proto.addEditButton = function (task) {
//     var editButton = document.createElement('button');
//     $(editButton).text('Edit');
//     $(task).append(editButton);
// };
proto.done = function (e) {
    if (e.target.tagName === 'LI') {
        this.isDone = !this.isDone;
        $(this.el).toggleClass('done');
        this.save();
    }
};
proto.editTask = function (e) {
    if (e.target.tagName === 'BUTTON') {
        if (e.target.classList.contains('save')) {
            e.target.parentNode.innerHTML = inputField.val() + '<button>Edit</button>';
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
    myApp[this.id] = (this);
    localStorage.setItem('myApp', JSON.stringify(myApp));
};

function TasksList() {
    this.el = itemsList;
    var ls = JSON.parse(localStorage.getItem('myApp'));
    if (ls) {
        for (var i = 0; i < ls.length; i++) {
            this.push(ls[i].text);
        }
    }
    addButton.click(this.addTask);
    deleteButton.click(this.deleteIfDone);
    hideShowButton.click(this.hideDone);

}

TasksList.prototype = [];
var listProto = TasksList.prototype;

listProto.push = function (text) {
    var item = new Task(text);

    var tmplItem = $('#taskTemplate').tmpl(item);
    item.render(tmplItem);


    [].push.call(this, item);
    var id = this.length - 1;
    // this.el.append(item.render());

    this.el.append(tmplItem);

    item.id = id;
    item.save();
};
listProto.deleteIfDone = function () {
    for (var i = 0; i < taskList.length; i++){
        if(taskList[i]){
            if(taskList[i].isDone){
                taskList[i].el.remove();
                taskList.updateStorage(taskList[i].id);
                taskList.splice(i, 1);
                i--;
            }
        }
    }
};
listProto.updateStorage = function (id) {
    for(var i =0; i < myApp.length; i++){
        if(myApp[i]){
            if(id === myApp[i].id){
                myApp.splice(i, 1);
                i--;
            }
        }
    }
    localStorage.setItem('myApp', JSON.stringify(myApp));
};
listProto.addTask = function () {
    var text = inputField.val();
    if (text === "") {
        taskList.emptyFieldError();
    } else {
        taskList.push(text);
        taskList.clearAndFocusInput();
    }
};
listProto.clearAndFocusInput = function () {
    $(inputField).val("");
    $(inputField).focus();
};
listProto.emptyFieldError = function () {
    var errorText = document.getElementById('error');
    errorText.classList.add('showError');
    setTimeout(function () {
        errorText.classList.remove('showError');
    }, 500);
};
listProto.hideDone = function () {
    listContainer.toggleClass('hide');
    if (listContainer.hasClass('hide')) {
        hideShowButton.text("show completed");
    } else {
        hideShowButton.text("hide completed");
    }
};
var taskList = new TasksList();







