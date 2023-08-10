document.addEventListener("DOMContentLoaded",() =>{
    const eventform = document.getElementById("event-form")
    const eventtable = document.getElementById("event-table");

    eventform.addEventListener("submit", event=>{
        event.preventDefault();

        const poster = document.getElementById("poster").value;
        const name = document.getElementById("name").value;
        const description  = document.getElementById("description").value;
        const date  = document.getElementById("date").value;
        const location  = document.getElementById("location").value;
        const Category  = document.getElementById("category").value;
        const price  = document.getElementById("price").value;

        const newEvent = {
            "poster": poster,
            "name" : name,
            "description" : description,
            "date" : date,
            "location" : location,
            "category" : Category,
            "price" : price,  
        }
        fetch('http://localhost:3000/events',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
        .then(res => res.json())
        .then(createevent => {
            if (createevent){
                alert(`New Event Added`);
                eventform.reset()
            }
        })
        .catch(err =>{
            console.log(err)
        })
    })

  fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(events=>{
        events.forEach(event =>{
            let row=document.createElement("tr");
            row.innerHTML = `
            <td class="id-all">${event.id}</td>
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.category}</td>
            <td>${event.price}</td>
            <td><button class="edit-button"> Edit </button></td>
            <td><button class="delete-button"> Delete </button></td>`;
            eventtable.querySelector("tbody").appendChild(row);

        })
    })
    .catch(err=>{
        console.log(err)
    })
        
    function deleteEvent(eventID){
        return  fetch(`http://localhost:3000/events/${eventID}`,{
            method:"DELETE"
    });
    }

     eventtable.addEventListener("click", event => {
    if(event.target.classList.contains("delete-button")){
        const row = event.target.closest("tr");
        const eventID = row.querySelector(".id-all").innerText;

        deleteEvent(eventID)
        .then(()=>{
            row.remove()
        })
        .catch(err => {
            console.log(err)
        })
    }    
    

     })


    const editButtons = document.querySelectorAll(".edit-button");


})