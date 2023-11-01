document.addEventListener("DOMContentLoaded", function() {
    fetchLocations();

    const form = document.getElementById('predictForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        predictHomePrice();
    });
});

function fetchLocations() {
    fetch('http://127.0.0.1:5000/get_location_names')
    .then(response => response.json())
    .then(data => {
        const locationSelect = document.getElementById('location');
        data.locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationSelect.appendChild(option);
        });
    });
}

function predictHomePrice() {
    const totalSqft = document.getElementById('total_sqft').value;
    const location = document.getElementById('location').value;
    const bhk = document.getElementById('bhk').value;
    const bath = document.getElementById('bath').value;

    fetch('http://127.0.0.1:5000/predict_home_price', {
        method: 'POST',
        body: new URLSearchParams({
            'total_sqft': totalSqft,
            'location': location,
            'bhk': bhk,
            'bath': bath
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = "Estimated Price: " + data.estimated_price;
    });
}
