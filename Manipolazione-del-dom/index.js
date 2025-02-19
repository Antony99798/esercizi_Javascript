// function addProduct() {
//   const taskInput = document.getElementById("taskInput");
//   const taskList = document.getElementById("taskList");
//   const taskText = taskInput.value.trim();


//     const li = document.createElement("li");
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";

//     li.appendChild(checkbox);
//     li.appendChild(document.createTextNode(taskText));
//     taskList.appendChild(li);
// }


function addProduct() {
    const ul = document.querySelector("ul");
    const input = document.querySelector("input")

    const li = document.createElement("li")
    const checkbox = document.createElement("input")
    li.innerHTML = input.value
    checkbox.setAttribute("type", "checkbox");

    ul.appendChild(li)
    li.appendChild(checkbox)
}
