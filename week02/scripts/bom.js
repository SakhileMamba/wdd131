const input = document.getElementById('favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    listItem.textContent = input.value;
    deleteButton.textContent = "❌";
    listItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      //listItem.remove()
      list.removeChild(listItem);
      input.focus();
    }
    );
    list.appendChild(listItem);
    input.value = "";
  } else {
    alert("Input scripture!");
  }
  input.focus();
})
