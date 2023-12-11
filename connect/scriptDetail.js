const apiURL = 'http://localhost:31132';

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

fetch(`${apiURL}/room/${roomId}-room`)
  .then(res => res.json())
  .then(hotel => renderRoomDetail(hotel.data))
  .catch(error => console.error('Error fetching room details:', error));

function renderRoomDetail(room) {
  const roomDetailsSection = document.getElementById('detail');
  roomDetailsSection.innerHTML = `
  <div class="containergallery id=${room.id}">
    <section class="gallery">
      <img src="${room.img}" alt="">
    </section>
  </div> 

  <div class="judul" id="judul">
    <h2>${room.type}</h2>
  </div>

  <div class="boxcontainer">
    <div class="left-section">
      <div class="landscape-box">
        <div id="box">
          <i class="fa-solid fa-bed"></i> 
          <p>${room.guest} guest</p>
        </div>
        <div id="box">
          <i class="fa-solid fa-utensils"></i>
          <p>kitchen</p>
        </div>
        <div id="box">
          <i class="fa-solid fa-wifi"></i>
          <p>free wifi</p>
        </div>
        <div id="box">
          <i class="fa-solid fa-tv"></i>
          <p>netflix</p>
        </div>
      </div> 

      <div class="landscape-box">
        <div id="deskripsi">
          <p>Properties Description</p>
          <span>${room.description}</span></br>
        </div>
      </div> 
    </div>

    <div class="right-section">
      <div class="portrait-box">
        <div id="harga">
          <h2>Rp. ${room.price}</h2><br>
          <span>Harga terjangkau sesuai dengan fasilitas yang disediakan. Ayo tekan tombol reserve!</span>
        </div>
        <a href="reservation-form.html?id=${room.id}">
            <button class="btn-reserve">Reserve</button>
          </a>
      </div>
    </div>   
  </div>`;
}