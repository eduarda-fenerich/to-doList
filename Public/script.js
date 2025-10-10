class Task{
    constructor(description){
        this.description = description;
        this.completed = false;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }
}

class TaskManager{
    constructor(){
        this.taskList = document.getElementById('task-list')
        this.loadTasks();
    }

    async loadTasks(){
        const response = await fetch('/tasks');
        const tasks = await response.json();
        this.render(tasks);
    }

    async addTask(description){
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ description })
        });
        this.loadTasks();
    }
    async removeTask(id){
        await fetch(`/tasks/${id}`, {method: 'DELETE'});
        this.loadTasks();
    }

    async toggleTask(id){
        await fetch(`/tasks/${id}/toggle`, {method: 'PATCH'});
    }

    render(tasks){
        this.taskList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            const span = document.createElement('button');
            span.textContent = task.description;
            span.addEventListener('click', () => this.toggleTask(task.id));

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';removeBtn.addEventListener('click', () => this.removeTask(task.id));

            li.appendChild(span);
            li.appendChild(removeBtn);
            this.taskList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const TaskManager = new TaskManager();
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    addTaskBtn.addEventListener('click', () => {
        const taskDescription = taskInput.value.trim();
    })
})