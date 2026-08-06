const input = document.getElementById('favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];



function displayList(item) {
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');
  listItem.textContent = item;
  deleteButton.textContent = "❌";
  deleteButton.classList.add('delete');

  listItem.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    //listItem.remove()
    list.removeChild(listItem);
    deleteChapter(listItem.textContent);
    input.focus();
  }
  );
  list.appendChild(listItem);
}

chaptersArray.forEach(chapter => {
  displayList(chapter);
});

function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1);
  chaptersArray = chaptersArray.filter((item) => item !== chapter);
  setChapterList();

}

button.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    displayList(input.value);
    chaptersArray.push(input.value);
    setChapterList();
    input.value = "";
    input.focus();
  } else {
    alert("Input scripture!");
  }
  input.focus();
})
