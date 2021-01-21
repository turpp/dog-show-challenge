document.addEventListener('DOMContentLoaded', () => {

let tableBody = document.getElementById('table-body')
let dogForm = document.getElementById('dog-form')

fetch(`http://localhost:3000/dogs`).then(resp => resp.json()).then(function(dogs){
    dogs.forEach(function(dog){
    tableBody.innerHTML += `<tr id=dog-${dog.id}>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id='${dog.id}' type="button">Edit</button></td>
    </tr>`
    })
})

tableBody.addEventListener('click', function(e){
    fetch(`http://localhost:3000/dogs/${e.target.id}`).then(resp => resp.json()).then(function(dog){
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed
        dogForm.sex.value = dog.sex
        dogForm.dataset.id= dog.id
    })
})

dogForm.addEventListener('submit', function(e){
    e.preventDefault()
    console.log({id: e.target.dataset.id},
        {name: e.target.name.value},
        {breed: e.target.breed.value},
        {sex: e.target.sex.value})
    fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            id: e.target.dataset.id,
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        )
    }).then(resp => resp.json()).then(function(dog){
        document.getElementById(`dog-${dog.id}`).innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id='${dog.id}' type="button">Edit</button></td>
        `
//         tableBody.innerHTML = ''
//         fetch(`http://localhost:3000/dogs`).then(resp => resp.json()).then(function(dogs){
//     dogs.forEach(function(dog){
//     tableBody.innerHTML += `<tr id=dog-${dog.id}>
//         <td>${dog.name}</td>
//         <td>${dog.breed}</td>
//         <td>${dog.sex}</td>
//         <td><button id='${dog.id}' type="button">Edit</button></td>
//     </tr>`
//     })
// })
    })
})





































})