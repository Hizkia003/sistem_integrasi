const ctx = document.getElementById("cuacaChart").getContext("2d");
const tableBody = document.querySelector("#cuacaTable tbody");

fetch("https://api.open-meteo.com/v1/forecast?latitude=-7.7732&longitude=112.7668&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m&timezone=auto&forecast_days=3")
  .then(res => res.json())
  .then(data => {
    const labels = data.daily.time.slice(0, 3);
    const suhuMax = data.daily.temperature_2m_max.slice(0, 3);
    const suhuMin = data.daily.temperature_2m_min.slice(0, 3);
    const hujan = data.daily.precipitation_sum.slice(0, 3);

    // Tampilkan grafik
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Suhu Maks (°C)",
            data: suhuMax,
            backgroundColor: "rgba(84, 13, 165, 0.77)"
          },
          {
            label: "Suhu Min (°C)",
            data: suhuMin,
            backgroundColor: "rgba(54, 162, 235, 0.5)"
          },
          {
            label: "Curah Hujan (mm)",
            data: hujan,
            backgroundColor: "rgba(75, 192, 192, 0.5)"
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Grafik Prakiraan Cuaca 3 Hari"
          }
        }
      }
    });

    // Tampilkan tabel
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${labels[i]}</td>
        <td>${suhuMax[i]}</td>
        <td>${suhuMin[i]}</td>
        <td>${hujan[i]}</td>
      `;
      tableBody.appendChild(row);
    }
  })
  .catch(err => {
    console.error("Gagal mengambil data:", err);
  });
