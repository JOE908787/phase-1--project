const API_URL = 'http://localhost:3000/routes';
const bookingForm = document.getElementById('booking-form');
const routesList = document.getElementById('routes-list');
const ratingForm = document.getElementById('rating-form');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  
  if (!from || !to) {
    alert('Please enter both departure and destination locations.');
    return;
  }

  routesList.innerHTML = '<p>Loading routes...</p>';
  
  fetch(`${API_URL}?from=${from}&to=${to}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch routes');
      }
      return response.json();
    })
    .then((routes) => {
      routesList.innerHTML = '';

      if (routes.length > 0) {
        const ul = document.createElement('ul');
        routes.forEach(route => {
          const li = document.createElement('li');
          li.textContent = `${route.from} to ${route.to} | Departure: ${route.departure_time} | Price: KES ${route.price}`;
          ul.appendChild(li);
        });
        routesList.appendChild(ul);
      } else {
        routesList.innerHTML = '<p>No routes found.</p>';
      }
    })
    .catch((error) => {
      routesList.innerHTML = `<p>Error: ${error.message}</p>`;
    });

  document.getElementById('from').value = '';
  document.getElementById('to').value = '';
});

ratingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const rating = document.getElementById('rating').value.trim();
  
  if (!rating || rating < 1 || rating > 5) {
    alert('Please enter a valid rating between 1 and 5.');
    return;
  }

  fetch('http://localhost:3000/ratings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rating })
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Thank you for your rating!');
      document.getElementById('rating').value = '';
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

function inviteFriend() {
  alert('You have invited a friend! Earn 50 points for each invite.');
}
