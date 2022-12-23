let tasks = [];
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

function showCompleted(){
    const completedTasks = tasks.filter((task)=> task.completed == true);
    taskList.innerHTML = "";
    for(let i=0; i<completedTasks.length; i++){
        addTaskToDOM(completedTasks[i]);
    }
}

function showUnCompleted(){
    const unCompletedTasks = tasks.filter((task)=> task.completed == false);
    taskList.innerHTML = "";
    for(let i=0; i<unCompletedTasks.length; i++){
        addTaskToDOM(unCompletedTasks[i]);
    }
}

function addTaskToDOM(task){
    const li = document.createElement('li');
    
    li.innerHTML = `
        <input type='checkbox' id='${task.id}' ${task.completed ? 'checked': ''} class='custom-checkbox'>
        
        <label for='${task.id}' style="background-color: ${task.completed ? 'lightgreen' : 'white'}"> ${task.title} </label>
        <img src='images/delete-icon.svg' alt="" class='delete' data-id=' ${task.id} '/>
    `;
    taskList.append(li);

}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        return;
    }
}

function renderList(){
    taskList.innerHTML = "";
    taskCount.textContent = tasks.length;
    for(let task of tasks){
        addTaskToDOM(task);
    }
}


function deleteTask(taskId){
    let newTasks = tasks.filter((item)=>{
       return item.id != taskId;
    })
    console.log(tasks)
    tasks = newTasks;
    renderList();
}

function showNotification(msg){
    alert(msg);
}

function handleClickListener(event){
    const target = event.target;
    
    // handling adding task
    if(target.className == 'add'){
        let title = document.getElementById('toDoTitle').value;
        
        if(!title){
            showNotification('Task title cannot be empty');
            return;
        }

        const task = {
            title: title,
            id: Date.now(),
            completed: false
        }
        document.getElementById('toDoTitle').value = "";
        addTask(task);

    }

    // handling toggle task
    if(target.className == 'custom-checkbox'){
        // console.log(target.getAttribute('id'));
        let taskId = target.getAttribute('id');
        tasks.map((task)=>{
            if(task.id == taskId){
                task.completed = !task.completed;
            }
        })
        renderList();
    }

    //handling delete task
    if(target.className == 'delete'){
        // console.log(target.getAttribute('data-id'));
        let taskId = target.getAttribute('data-id');
        deleteTask(taskId);
    }

    //mark all tasks as complete
    if(target.className == 'mark-complete'){
        tasks.map((task)=>{
            task.completed = true;
        })
        renderList();
    }

    // Marking all tasks as Incomplete
    if(target.className == 'mark-incomplete'){
        tasks.map((task)=>{
            task.completed = false;
        })
        renderList();
    }

    //rendering completed tasks
    if(target.id == 'completed'){
        showCompleted();
    }

    //rendering incomplete tasks
    if(target.id == 'uncompleted'){
        showUnCompleted();
    }

    //rendering all tasks
    if(target.id == 'all'){
        renderList();
    }
}

function initialize(){
    document.addEventListener('click', handleClickListener);
}

initialize();