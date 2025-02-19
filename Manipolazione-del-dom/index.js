

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
