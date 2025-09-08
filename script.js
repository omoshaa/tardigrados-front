const API_URL = "https://tardigrados-api.onrender.com"; // altere para sua API no Render

const map = L.map('map').setView([-23.5, -46.6], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

async function carregarRegistros() {
  const res = await fetch(API_URL);
  const dados = await res.json();
  dados.forEach(reg => {
    const marker = L.marker(reg.local).addTo(map)
      .bindPopup(`<b>${reg.genero}</b><br>Qtd: ${reg.quantidade}<br><img src="${reg.foto}" width="100">`);
    L.circle(reg.local, { radius: reg.raioAmbiente }).addTo(map);
  });
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const genero = document.getElementById("genero").value;
  const quantidade = document.getElementById("quantidade").value;
  const raio = document.getElementById("raio").value;
  const foto = document.getElementById("foto").files[0];

  const formData = new FormData();
  formData.append("genero", genero);
  formData.append("quantidade", quantidade);
  formData.append("raioAmbiente", raio);
  formData.append("foto", foto);

  await fetch(API_URL, { method: "POST", body: formData });
  carregarRegistros();
});

carregarRegistros();