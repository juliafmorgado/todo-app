var trash = document.getElementsByClassName('fa-trash')
Array.from(trash).forEach(elem => elem.addEventListener('click', deleteOne))


async function deleteOne(){
    const sTask = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskS': sTask
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

