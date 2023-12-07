const apiURL = 'http://localhost:5000';

// Dapatkan nilai ID dari parameter URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

// Gunakan nilai roomId untuk mengambil dan menampilkan detail kamar dari API
fetch(`${apiURL}/room/${roomId}-room`)
  .then(res => res.json())
  .then(hotel => renderRoomDetail(hotel.data))
  .catch(error => console.error('Error fetching room details:', error));

function renderRoomDetail(room) {   
  const cardDetails= document.getElementById('right-section');

  // Tampilkan detail kamar di dalam div room-details-section
  cardDetails.innerHTML += `
  <div class="portrait-box" id=${room.id}>
  <img src="${room.img}">
  <div class="judul">
    <h2>${room.type}</h2>
    <br>
    <span>${room.description}</span>
 </div>
 <br>
  <div id="harga">
  <strong>
    <p>Price Details</p>
    <span>Rp.${room.price}</span><br>
    </strong>
  </div>
</div>
</div>`;
}