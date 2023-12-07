// GET
const apiURL = 'http://localhost:5000';

fetch(`${apiURL}/reserve/reserve-get`)
.then(res =>res.json())
.then(hotel => renderDataToContent(hotel.data));

function renderDataToContent(reserves) {
    let line = document.getElementById('table');
    let id = 1;
  
    for (reserve of reserves) {
      line.innerHTML += `
        <div class="row">
          <div class="col" id="${id}">
            <img src="../img/kamar2.png" width="50%" align-content="center">
            <div class="judul">
              <h2>${reserve.type}</h2>
              <p>checkIn: ${reserve.checkin} <br>
              CheckOut: ${reserve.checkout}<br> 
              Guest: ${reserve.guest} </p>
            </div>
            <button type="button" onclick="cancelReservation(${reserve.id})">Cancel Reservation</button>
          </div>
        </div>`;
      id++;
    }
  }
  

//   DELETE
function cancelReservation(reserveId) {
    // Kirim permintaan penghapusan ke server
    fetch(`${apiURL}/reserve/${reserveId}-reserve`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }
      // Hapus elemen HTML setelah berhasil menghapus di server
      const elementToRemove = document.getElementById(reserveId);
      if (elementToRemove) {
        elementToRemove.remove();
        alert('Reservation canceled successfully!');
      }
    })
    .catch(error => console.error('Error:', error));
  }
