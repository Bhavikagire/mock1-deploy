document.addEventListener("DOMContentLoaded",() =>{
    const eventcardlist = document.getElementById("event-cards")

  fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(events=>{
        events.forEach(event =>{
           const card = document.createElement("div");
           card.classList.add("eventcard");
           card.innerHTML = `
           <img src="${event.poster}" alt="${event.name}" class="event-image">
           <h2 class="event-name">${event.name}</h2>
           <p class="event-description">${event.description}</p>
           <p class="event-date">${event.date}</p>
           <p class="event-location">${event.location}</p>
           <p class="event-category">${event.category}</p>
           <p class="event-price">${event.price}</p>
           `
           eventcardlist.appendChild(card);
        })
    })
    .catch(err=>{
        console.log(err)
    })
        
})