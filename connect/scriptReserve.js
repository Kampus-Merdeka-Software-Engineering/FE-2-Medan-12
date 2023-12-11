const apiURL = 'http://localhost:5000';
fetchReservations();

async function fetchReservations() {
  try {
    const res = await fetch(`${apiURL}/reserve/reserve-get`);
    const reserves = await res.json();

    const promises = reserves.data.map(reserve =>
      fetchRoomDetails(reserve.roomId)
    );
    const roomDetails = await Promise.all(promises);
    const mergedData = reserves.data.map((reserve, index) => ({
      ...reserve,
      room: roomDetails[index].data,
    }));

    renderDataToContent(mergedData);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    alert('An error occurred while retrieving reservations');
  }
}

async function fetchRoomDetails(roomId) {
  try {
    if (!roomId) {
      console.error('Error: Room ID is undefined.');
      return { data: {} };
    }

    const response = await fetch(`${apiURL}/room/${roomId}-room`);
    const data = await response.json();

    return { data };
  } catch (error) {
    console.error(`Error fetching room details for room ID ${roomId}:`, error);
    return { data: {} }; 
  }
}

function renderDataToContent(reserves) {
  let line = document.getElementById('table');
  line.innerHTML = '';

  for (const reserve of reserves) {
    const roomId = reserve.roomId || '';

    const reservationElement = document.createElement('div');
    reservationElement.className = 'row';

    // Destructure the data property from the room object
    const { type: roomType, img: roomImg } = reserve.room || { type: '', img: '' };

    reservationElement.innerHTML = `
      <div class="col" id="${reserve.id}">
        <img src="${roomImg}" width="50%" align-content="center">
        <div class="judul">
          <h2>${roomType}</h2>
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



function cancelReservation(reservationId) {
  if (confirm("Are you sure you want to cancel this reservation?")) {
    fetch(`${apiURL}/reserve/${reservationId}-reserve`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        removeReservationFromUI(reservationId);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during cancellation');
      });
  }
}

function removeReservationFromUI(reservationId) {
  const reservationElement = document.getElementById(reservationId);
  if (reservationElement) {
    reservationElement.parentNode.removeChild(reservationElement);
  }
}
