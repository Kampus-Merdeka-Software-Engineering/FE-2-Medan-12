const apiURL = 'https://be-2-medan-12.up.railway.app/';

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

fetch(`${apiURL}/room/${roomId}-room`)
  .then(res => res.json())
  .then(hotel => renderRoomDetail(hotel.data))
  .catch(error => console.error('Error fetching room details:', error));

function renderRoomDetail(room) {   
  const cardDetails= document.getElementById('right-section');

  cardDetails.innerHTML += `
  <div class="portrait-box" id=${room.id}>
  <img src="${room.img}">
  <div class="judul">
    <h2>${room.type} Room</h2>
    <br>
    <span>${room.description}</span>
 </div>
 <br>
  <div id="harga">
  <strong>
    <p>Price Details</p>
    <span>Rp.${room.price}/Malam</span><br>
    </strong>
  </div>
</div>
</div>`;
}


const type = urlParams.get('type'); 
const fetchURL = `${apiURL}/room/${type}`;

const searchPageURL = `searchpage.html?type=${type}`;

fetch(fetchURL)
  .then(res => res.json())
  .then(hotel => renderRoomDetail(hotel.data))
  .catch(error => console.error('Error fetching room details:', error));

function renderRoomDetail(room) {
  const cardDetails = document.getElementById('right-section');

  cardDetails.innerHTML += `
    <div class="portrait-box" id=${room.id}>
      <img src="${room.img}">
      <div class="judul">
        <h2>${room.type} Room</h2>
        <br>
        <span>${room.description}</span>
      </div>
      <br>
      <div id="harga">
        <strong>
          <p>Price Details</p>
          <span>Rp.${room.price}/Malam</span><br>
        </strong>
      </div>
    </div>
  </div>`;
}