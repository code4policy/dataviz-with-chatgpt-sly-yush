fetch('boston_311_2023_by_reason.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // Remove header row
    const reasons = [];
    const counts = [];

    rows.forEach(row => {
      const columns = row.split(',');
      reasons.push(columns[0].trim()); // Assuming the reason is in the first column
      counts.push(parseInt(columns[1].trim())); // Assuming count is in the second column
    });

    const ctx = document.getElementById('barGraph').getContext('2d');
    const barGraph = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: reasons,
        datasets: [{
          label: 'Reasons Count',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
