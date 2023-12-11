const apiURL = 'https://be-2-medan-12.up.railway.app/';

fetch(`${apiURL}/room/rooms`)
.then(res =>res.json())
.then(hotel => renderDataToContent(hotel.data));

function renderDataToContent(rooms){
  let line = document.getElementById('content-section');
  let id = 1;
  for(room of rooms){
      line.innerHTML += `
      <div class="content-item" id="${id}">
      <div id="reserve-room">
        <a href="login.html" onclick="alertLogin()">
            <img src="${room.img}" alt="Deskripsi Gambar">
            <p>${room.type}</p>
            <span>${room.guest} guests</span>
        </a>
    </div>
</div>`
      id++;
  }
}

function redirectToDetail(detail){
  window.location.href = "beranda/Details.html" + detail;
}