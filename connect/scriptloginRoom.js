const apiURL = 'http://localhost:18804';

fetch(`${apiURL}/room/rooms`)
  .then(res => res.json())
  .then(hotel => renderDataToContent(hotel.data));

function renderDataToContent(rooms) {
  const line = document.getElementById('content-section');

  for (const room of rooms) {
    const roomSection = document.createElement('div');
    roomSection.classList.add('content-item');

    const detailsLink = document.createElement('a');
    detailsLink.href = `Details.html?id=${room.id}`;
    detailsLink.innerHTML = `
      <img src=${room.img} alt="Deskripsi Gambar">
      <p>${room.type} Room</p>
      <span>${room.guest} guests</span>
    `;

    roomSection.appendChild(detailsLink);
    line.appendChild(roomSection);
  }
}
