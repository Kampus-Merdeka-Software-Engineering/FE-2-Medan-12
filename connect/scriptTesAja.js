const apiURL = 'http://localhost:5000';

fetch(`${url}/room/${roomType}`)
  .then(res => res.json())
  .then(hotel => renderDataToContent(hotel.data));

function renderDataToContent(rooms) {
const line = document.getElementById('table');

for (const room of rooms) {
    const roomSection = document.createElement('div');
    roomSection.className = 'row';
    
    const detailsLink = document.createElement('a');
    roomSection.innerHTML = `
      <div class="col">
          <img src="${room.img}" width="50%" align-content="center">
          <div class="judul">
              <h2>${room.type} Room</h2>
              <span>${room.price}</span>
          </div><br>
          <a href="reservation-form.html?id=1"><button>Reserve</button></a>
      </div>
    `;

    roomSection.appendChild(detailsLink);
    line.appendChild(roomSection);
}
}