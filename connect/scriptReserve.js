const apiURL = 'http://localhost:5000';

// Fetch reservations and render them
fetch(`${apiURL}/reserve/reserve-get`)
  .then(res => res.json())
  .then(reserves => renderDataToContent(reserves.data));

function renderDataToContent(reserves) {
  let line = document.getElementById('table');
  line.innerHTML = ''; // Clear existing content before rendering

  for (const reserve of reserves) {
    const reservationElement = document.createElement('div');
    reservationElement.className = 'row';
    reservationElement.innerHTML = `
      <div class="col" id="${reserve.id}">
        <img src="${reserve.room.imageUrl}" width="50%" align-content="center">
        <div class="judul">
          <h2>${reserve.room.type}</h2>
          <h4>Orderer by: </h4>
          <h5>${reserve.email}</h5>
          <p>CheckIn: ${reserve.checkin} <br>
             CheckOut: ${reserve.checkout}<br> 
             Guest: ${reserve.guest} </p>
        </div>
        <button type="button" onclick="cancelReservation(${reserve.id})">Cancel Reservation</button>
      </div>
    `;
    line.appendChild(reservationElement);
  }
}

// Function to cancel a reservation using the DELETE method
function cancelReservation(reservationId) {
  if (confirm("Are you sure you want to cancel this reservation?")) {
    // Send a request to the server to cancel the reservation using the DELETE method
    fetch(`${apiURL}/reserve/${reservationId}-reserve`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add any necessary body parameters
      body: JSON.stringify({
        // Add any necessary parameters for cancellation
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        
        // Remove the canceled reservation from the UI
        removeReservationFromUI(reservationId);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during cancellation');
      });
  }
}

// Function to remove a reservation from the UI
function removeReservationFromUI(reservationId) {
  const reservationElement = document.getElementById(reservationId);
  if (reservationElement) {
    reservationElement.parentNode.removeChild(reservationElement);
  }
}
