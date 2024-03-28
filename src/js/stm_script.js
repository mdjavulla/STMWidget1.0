const sampleData = [
    { col1: '1', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '12.9%', col5: 'Shipments', col6: '1590', col7: 'Go Detail', col8: 'CW1' },
    { col1: '2a', col2: 'Data Quality Issues - CDZ Declarations', col3: 'N/A', col4: '91.9%', col5: 'Shipments', col6: '1600', col7: 'Go Detail', col8: 'CW1' },
    { col1: '3a1OFR', col2: 'OFR TS completeness Index (OCI)', col3: 'N/A', col4: '14.9%', col5: 'Shipments', col6: '1000', col7: 'Go Detail', col8: 'CW1' },
    { col1: '3a', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '42.9%', col5: 'Shipments', col6: '14500', col7: 'Go Detail', col8: 'CW1' },
    { col1: '2e', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '87.0%', col5: 'Shipments', col6: '15021', col7: 'Go Detail', col8: 'CW1' },
    { col1: '2c', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '43.9%', col5: 'Shipments', col6: '12300', col7: 'Go Detail', col8: 'CW1' },
    { col1: '3aOFR', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '19.9%', col5: 'Shipments', col6: '15600', col7: 'Go Detail', col8: 'CW1' },
    { col1: '3xAFR', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '67.9%', col5: 'Shipments', col6: '100', col7: 'Go Detail', col8: 'CW1' },
    { col1: '3a2OFR', col2: 'AFR FLO COU TS completeness/timeliness', col3: 'N/A', col4: '65%', col5: 'Shipments', col6: '15350', col7: 'Go Detail', col8: 'CW1' },
    { col1: '3vAFR', col2: 'Data Quality Issues - shipment', col3: 'N/A', col4: '57.0%', col5: 'Shipments', col6: '15890', col7: 'Go Detail', col8: 'CW1' }
    // Add more sample objects as needed
];

const tableBody = document.getElementById('table-body');
sampleData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${row.col1}</td>
        <td><a href="${row.col2.url}" target="_blank">${row.col2}</a></td>
        <td>${row.col3}</td>
        <td>${row.col4}</td>
        <td>${row.col5}</td>
        <td>${row.col6}</td>
        <td><a href="${row.col7.url}" target="_blank">${row.col7}</a></td>
        <td>${row.col8}</td>
    `;
    tableBody.appendChild(tr);
});


document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for the "Station Metrics" button
    const stationMetricsButton = document.querySelector('#button-container .button:nth-child(1)');
    stationMetricsButton.addEventListener('click', () => {
        window.open('https://www.google.com', '_blank'); // Open Google in a new tab
    });

    // Add event listener for the "Refresh Layout" button
    const refreshLayoutButton = document.querySelector('#button-container .button:nth-child(2)');
    refreshLayoutButton.addEventListener('click', () => {
        location.reload(); // Refresh the page
    });
});