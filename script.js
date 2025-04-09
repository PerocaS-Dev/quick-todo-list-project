class Task{
    constructor(id, text){
        this.id = id;
        this.text = text;
    }
}

class App{
    constructor(){
        this.tasks = []; /*this will hole the list of tasks*/
        
        this.$todoText = document.querySelector("#todo-text"); /*This is the input section for a new task*/
        this.$addBtn = document.querySelector(".addTaskBtn");/*This is the button we need to click*/
        this.$saveBtn = document.querySelector(".saveTaskBtn");/*This is the button we need to click to save*/
        this.$newTask = document.querySelector(".new-todo");/*This is the what should pop up when it's clicked */
        this.$taskList = document.querySelector(".list-items")// the list where each task will be added

        this.$newTask.style.display = "none"; // Ensure it's hidden initially
        this.$saveBtn.style.display = "none"; //hidden
        this.addEventListener();/*Function where we will add the click event listener */

    }

    addEventListener(){
        /*we are listening for a click on the save button or addbutton section.
        if addBtn is clicked> send it to the openNewTask method which makes the input section visible
        if saveBtn is clicked> send it to the saveTask method which will ...*/
        this.$addBtn.addEventListener("click", () => this.openNewTask());
        this.$saveBtn.addEventListener("click", () => this.saveTask());

        document.body.addEventListener("click", (event) =>{
            /*Listens for event that is outside of the input or button sections */
            if (!this.$newTask.contains(event.target) && !this.$addBtn.contains(event.target)) {
                this.closeNewTask();
            }
        })
    }

    openNewTask(){
        this.$saveBtn.style.display = "flex";
        this.$newTask.style.display = "flex";
        this.$todoText.focus();
    }

    closeNewTask(){
        /*this closes the input section and save button when the click is outide the input section or the add button */
        this.$newTask.style.display = "none";
        this.$saveBtn.style.display = "none";
    }

    saveTask(){

    }

    addTask(id, text){
        const newTask = new Task(id,text);
        this.tasks = [...this.tasks, newTask];
    }
    
}

const app = new App();