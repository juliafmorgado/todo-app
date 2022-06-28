const update = document.querySelector('#update-button')
const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})


update.addEventListener('click', _ => {
    fetch('/tasks', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            task: 'Take dog out'
        })
    })
})

async function deleteTask(){
    const sTask = this.parentNode.childNodes[1].innerText
}