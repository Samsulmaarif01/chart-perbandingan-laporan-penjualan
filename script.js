// data laporan
const salesData = {
    months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    data2022: [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945],
    data2023: [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689]
};

//calculate percentage change
function calculatePercentageChange(oldValue, newValue) {
    return ((newValue - oldValue) / oldValue * 100).toFixed(1);
}

function populateTable() {
    const tableBody = document.getElementById('tableBody');
    
    salesData.months.forEach((month, index) => {
        const value2022 = salesData.data2022[index];
        const value2023 = salesData.data2023[index];
        const change = calculatePercentageChange(value2022, value2023);
        const changeColor = parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500';

        const row = document.createElement('tr');
        row.className = 'table-row-hover border-b border-gray-100';
        row.innerHTML = `
            <td class="px-4 py-3 text-sm font-medium text-gray-800">${month}</td>
            <td class="px-4 py-3 text-sm text-gray-600 text-right">${value2022.toLocaleString()}</td>
            <td class="px-4 py-3 text-sm text-gray-600 text-right">${value2023.toLocaleString()}</td>
            <td class="px-4 py-3 text-sm font-semibold ${changeColor} text-right">${change}%</td>
        `;
        tableBody.appendChild(row);
    });
}

// membuat chart
function createChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.months,
            datasets: [
                {
                    label: '2022',
                    data: salesData.data2022,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1
                },
                {
                    label: '2023',
                    data: salesData.data2023,
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: "'Plus Jakarta Sans', sans-serif",
                            weight: 'bold'
                        }
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        },
                        font: {
                            family: "'Plus Jakarta Sans', sans-serif"
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: "'Plus Jakarta Sans', sans-serif"
                        }
                    }
                }
            }
        }
    });
}

// menginisialiasi dasboard
document.addEventListener('DOMContentLoaded', () => {
    populateTable();
    createChart();
});