document.getElementById('reserveForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const checkin = document.getElementById('datein').value;
    const checkout = document.getElementById('dateout').value;
    const guest = document.getElementById('guests').value;

    const roomIdElement = document.querySelector('.portrait-box');
    const roomId = roomIdElement ? roomIdElement.id : null;

    try {
        const apiURL = 'http://localhost:5000';
        const response = await fetch(`${apiURL}/reserve/reserve-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, checkin, checkout, guest, roomId })
        });

        if (response.ok) {
            const result = await response.json();
            alert('Reservation Successfully!');
            window.location.href = `reservations.html?`;
        } else {
            const errorData = await response.json();
            console.error('Reservation failed:', errorData.message);
            alert('Reservation failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});
