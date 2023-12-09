const apiURL = 'http://localhost:5000';

// Fetch reservations and render them
fetchReservations();

function fetchReservations() {
  fetch(`${apiURL}/reserve/reserve-get`)
    .then(res => res.json())
    .then(reserves => {
      // Fetch room details for each reservation
      const promises = reserves.data.map(reserve =>
        fetchRoomDetails(reserve.roomId)
      );

      // Wait for all room details to be fetched
      return Promise.all(promises)
        .then(roomDetails => {
          // Merge reservation data with room data
          const mergedData = reserves.data.map((reserve, index) => ({
            ...reserve,
            room: roomDetails[index].data, // Assuming 'data' contains the room details
          }));
          renderDataToContent(mergedData);
        });
    })
    .catch(error => {
      console.error('Error fetching reservations:', error);
      alert('An error occurred while retrieving reservations');
    });
}

function fetchRoomDetails(roomId) {
    if (!roomId) {
      console.error('Error: Room ID is undefined.');
      return Promise.resolve({ data: {} }); // Return an empty object in case of an error
    }
  
    return fetch(`${apiURL}/room/${roomId}-room`)
      .then(res => res.json())
      .catch(error => {
        console.error(`Error fetching room details for room ID ${roomId}:`, error);
        return { data: {} }; // Return an empty object in case of an error
      });
  }
  

function renderDataToContent(reserves) {
  let line = document.getElementById('table');
  line.innerHTML = ''; // Clear existing content before rendering

  for (const reserve of reserves) {
    console.log('Room ID:', reserve.roomId);
    const reservationElement = document.createElement('div');
    reservationElement.className = 'row';
    reservationElement.innerHTML = `
      <div class="col" id="${reserve.id}">
        <img src="${reserve.room.img}" width="50%" align-content="center">
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
