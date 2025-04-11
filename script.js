class Task{
    constructor(id, text, completed = false){
        this.id = id;
        this.text = text;
        this.completed = completed; // track it in memory
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

    addTask(text){
        /*This fuction creates a new task and adds it to a list of tasks*/
        if (text != "") {
            const newTask = new Task(cuid(),text); // creating a new task with its own unique ID and text
            this.tasks = [...this.tasks, newTask]; // store it into the tasks array
            this.render();
          }
    }

    completeTask(taskID){
        

        console.log(taskID);

        const selectedTask = this.$taskList.querySelector(`[data-id="${taskID}"]`);

        if(!selectedTask){
            console.log("An error has occured. ID may not exist");
            return;
        }

        const radioIcon = selectedTask.querySelector('.task-check');

        const taskInfo = selectedTask.querySelector('.task-text');

        radioIcon.textContent = "radio_button_checked";

        taskInfo.style.textDecoration = "line-through";
        taskInfo.style.color = "grey";

        // Find the task in the array
        const task = this.tasks.find(t => t.id === taskID);
        if (!task) {
            console.log("Task object not found for ID:", taskID);
            return;
        }

        //Toggle the completed property
        task.completed = true;

        //HAS TO REMOVE THE UNCHECKED RADIO AND ADD NEW CHECKED RADIO
        //SCRATCH OUT THE TEXT
        //MAYBE EVEN CHANGR TEST COLOR TO GREY



    }

    render() { // This method shows our tasks on the DOM or page
        this.$taskList.innerHTML = ""; // clear old stuff(like refreshing the list)
    
        /*For each task created, a list item(li) is made. The text content in the li is the text we input and the radio button.
        Then we create an id attribute for it so that we can get it whenever we need for example if we want to edit or delete.
        We then append this li to the ul we have in html - ($taskList in JS)
        ***WHAT WE ARE CREATING IN HTML***
        <ul>
            <li class="todo-item" id="the unique cuid">
                <i class="material-icons task-check"> radio_button_unchecked</i>
                <span class="task-text"> the text we input</span>
            </li>
        </ul>
        */
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.classList.add("todo-item");
            li.setAttribute("data-id", task.id);
    
            // creating the Radio icon (unchecked by default)
            const radio = document.createElement("i");
            radio.classList.add("material-icons", "task-check");
            radio.textContent = "radio_button_unchecked";
            radio.textContent = task.completed ? "radio_button_checked" : "radio_button_unchecked";
    
            // creating a span with Task text
            const text = document.createElement("span");
            text.textContent = task.text;
            text.classList.add("task-text");
            text.style.textDecoration = task.completed ? "line-through" : "none";
            text.style.color = task.completed ? "grey" : "black";
    
            li.appendChild(radio);
            li.appendChild(text);
            this.$taskList.appendChild(li);
    
            //Add event listener to handle completion
            radio.addEventListener("click", () => this.completeTask(task.id));
        });
    }

    saveTask() {
        const text = this.$todoText.value.trim(); //clearing any unwanted spaces(Good practice)
    
        if (text === "") return; // if the text is empty, we do not save it
    
        //this.tasks.push(newTask); // store it into the tasks array

        this.addTask(text); //add the task
    
        this.tasks.forEach((task) => 
            console.log(`ID: ${task.id} | TASK: ${task.text}`) //log the ID and text for debugging.
        );
    
        this.$todoText.value = ""; // clearing the input section
        this.closeNewTask();// closing or hiding the input section and the save button.
    
        this.render(); //show it on screen
    }

}

const app = new App();