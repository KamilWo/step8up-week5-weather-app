document.addEventListener('DOMContentLoaded', () => {
  // Chart.js Global Configuration
  Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
  Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.2)';
  Chart.defaults.font.family = "'Montserrat', sans-serif";

  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // 1. Temperature Chart (Line)
  const tempCtx = document.getElementById('temperatureChart');
  if (tempCtx) {
    new Chart(tempCtx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'High °C',
          data: [12, 14, 15, 17, 18, 16, 15],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
          fill: true,
        }, {
          label: 'Low °C',
          data: [4, 5, 6, 7, 8, 7, 6],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  // 2. Wind Speed Chart (Bar)
  const windCtx = document.getElementById('windChart');
  if (windCtx) {
    new Chart(windCtx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Wind Speed (km/h)',
          data: [15, 22, 18, 25, 20, 14, 19],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  // 3. Precipitation Chart (Bar)
  const precipitationCtx = document.getElementById('precipitationChart');
  if (precipitationCtx) {
    new Chart(precipitationCtx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Probability (%)',
          data: [10, 20, 80, 90, 30, 10, 5],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { max: 100 } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 4. Moon Phase Chart (Doughnut)
  const moonPhaseCtx = document.getElementById('moonPhaseChart');
  if (moonPhaseCtx) {
    // Example: 75% illumination (Waning Gibbous)
    const illumination = 75;
    new Chart(moonPhaseCtx, {
      type: 'doughnut',
      data: {
        labels: ['Illuminated', 'Shadow'],
        datasets: [{
          data: [illumination, 100 - illumination],
          backgroundColor: ['rgba(241, 243, 244, 1)', 'rgba(50, 50, 50, 0.8)'],
          borderColor: ['rgba(241, 243, 244, 1)', 'rgba(255, 255, 255, 0.2)'],
          borderWidth: 1,
          circumference: 180, // Makes it a semi-circle
          rotation: 270,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`
            }
          }
        }
      }
    });
  }

  // 5. Air Pressure Chart (Line)
  const pressureCtx = document.getElementById('pressureChart');
  if (pressureCtx) {
    new Chart(pressureCtx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Pressure (hPa)',
          data: [1012, 1010, 1008, 1005, 1011, 1014, 1015],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.3,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  // 6. Humidity Chart (Line)
  const humidityCtx = document.getElementById('humidityChart');
  if (humidityCtx) {
    new Chart(humidityCtx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Humidity (%)',
          data: [65, 68, 75, 80, 72, 68, 66],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          tension: 0.3,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
});
