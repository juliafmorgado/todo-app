const deleteButton = document.querySelector('#delete-button')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})


deleteButton.addEventListener('click', _ => {
    fetch('/tasks', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            task: 'Groceries'
        })
    })
})
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })


async function deleteTask(){
    const sTask = this.parentNode.childNodes[1].innerText
    try{
        const res = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskS': sTask
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}