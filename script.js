const ctx = document.getElementById('performanceChart').getContext('2d');

// Gradient for asset size line
const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, 'rgba(54, 162, 235, 0.5)');
gradient1.addColorStop(1, 'rgba(54, 162, 235, 0)');

// Gradient for accumulated profit line
const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
gradient2.addColorStop(0, 'rgba(218, 165, 32, 0.5)');
gradient2.addColorStop(1, 'rgba(218, 165, 32, 0)');

const performanceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['October 2023', 'November 2023', 'December 2023', 'January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024'],
    datasets: [
      {
        label: 'Asset Size',
        data: [49470, 61470, 70170, 74997, 90861, 105970, 116170, 125456.32, 129914],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: gradient1,
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Smooth the line
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Color for data points
        pointRadius: 4, // Size of data points
        borderDash: [12, 3], // Dashed line
        yAxisID: 'y' // Link to the first y-axis
      },
      {
        label: 'Accumulated Profit (%)',
        data: [0.68, 5.85, 6.32, 8.22, 12.97, 16.17, 20.37, 23.73, 29.06],
        borderColor: 'rgba(218, 165, 32, 1)',
        backgroundColor: gradient2,
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Smooth the line
        pointBackgroundColor: 'rgba(218, 165, 32, 1)', // Color for data points
        pointRadius: 4, // Size of data points
        borderDash: [12, 3], // Dashed line
        yAxisID: 'y1' // Link to the second y-axis
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14 // Font size for legend
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += `${context.raw.toFixed(2)}`;
            return label;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Background color for tooltips
        titleFont: {
          size: 14 // Font size for tooltip titles
        },
        bodyFont: {
          size: 12 // Font size for tooltip body
        },
        cornerRadius: 4 // Rounded corners for tooltips
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month',
          font: {
            size: 14 // Font size for x-axis title
          }
        },
        ticks: {
          font: {
            size: 12 // Font size for x-axis labels
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Amount ($)',
          font: {
            size: 14 // Font size for y-axis title
          }
        },
        ticks: {
          font: {
            size: 12 // Font size for y-axis labels
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Accumulated Profit (%)',
          font: {
            size: 14 // Font size for y-axis title
          }
        },
        ticks: {
          font: {
            size: 12 // Font size for y-axis labels
          },
          min: 0, // Ensure the y-axis starts at 0
          max: 30, // Adjust the maximum value to better fit your data
          stepSize: 5 // Adjust step size for better readability
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }
});

const ctx2 = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['China asset', 'Semiconductor', 'Natural Gas', 'Long term treasury Bonds', 'Volatility Hedge', 'Cash/Monetary market'],
        datasets: [{
            label: 'Position Distribution',
            data: [14.8, 6.2, 0.0, 21.2, 5.9, 51.9],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});
