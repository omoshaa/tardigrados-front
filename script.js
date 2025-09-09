const API_URL = "https://tardigrados-api.onrender.com";

// Configuração do mapa
const map = L.map('map').setView([-23.5, -46.6], 5);
const markers = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Função para mostrar notificações
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = type;
  notification.style.display = 'block';
  setTimeout(() => notification.style.display = 'none', 3000);
}

// Função para atualizar estatísticas
function updateStats(dados) {
  const totalRegistros = dados.length;
  const generosUnicos = new Set(dados.map(d => d.genero)).size;

  document.getElementById('total-registros').textContent = totalRegistros;
  document.getElementById('total-generos').textContent = generosUnicos;
}

// Função para carregar registros
async function carregarRegistros() {
  try {
    markers.clearLayers();
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Erro ao carregar dados');

    const dados = await res.json();
    updateStats(dados);

    dados.forEach(reg => {
      const marker = L.marker(reg.local)
        .bindPopup(createPopupContent(reg));

      const circle = L.circle(reg.local, {
        radius: reg.raioAmbiente,
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.2
      });

      markers.addLayer(marker);
      markers.addLayer(circle);
    });
  } catch (error) {
    showNotification('Erro ao carregar dados: ' + error.message, 'error');
  }
}

// Adicionar evento de clique no mapa
map.on('click', function (e) {
  document.getElementById('latitude').value = e.latlng.lat.toFixed(6);
  document.getElementById('longitude').value = e.latlng.lng.toFixed(6);
});

// Botão de localização atual
document.getElementById('getLocation').addEventListener('click', function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      document.getElementById('latitude').value = lat.toFixed(6);
      document.getElementById('longitude').value = lng.toFixed(6);

      map.setView([lat, lng], 15);
    }, function (error) {
      alert("Erro ao obter localização: " + error.message);
    });
  } else {
    alert("Geolocalização não é suportada pelo seu navegador");
  }
});

// Evento de submissão do formulário
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Coletar dados do formulário
  const campos = ['genero', 'quantidade', 'raio', 'localidade', 'pesquisador', 'observacoes', 'data'];
  campos.forEach(campo => {
    const valor = document.getElementById(campo).value;
    if (valor) formData.append(campo, valor);
  });

  const foto = document.getElementById("foto").files[0];
  if (foto) formData.append("foto", foto);

  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;
  formData.append("local", JSON.stringify([latitude, longitude]));

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error('Erro ao salvar registro');

    showNotification('Registro salvo com sucesso!', 'success');
    document.getElementById("form").reset();
    await carregarRegistros();
  } catch (error) {
    showNotification('Erro ao salvar: ' + error.message, 'error');
  }
});

// Adicionar preview de imagem
document.getElementById('foto').addEventListener('change', function (e) {
  const preview = document.getElementById('image-preview');
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    }
    reader.readAsDataURL(file);
  }
});

// Função para editar registro
function editarRegistro(id) {
  const registro = registros.find(r => r.id === id);
  if (registro) {
    document.getElementById('genero').value = registro.genero;
    document.getElementById('quantidade').value = registro.quantidade;
    document.getElementById('raio').value = registro.raioAmbiente;
    document.getElementById('latitude').value = registro.local[0];
    document.getElementById('longitude').value = registro.local[1];
    document.getElementById('localidade').value = registro.localidade;
    document.getElementById('pesquisador').value = registro.pesquisador;
    document.getElementById('observacoes').value = registro.observacoes;

    window.scrollTo({
      top: document.getElementById('form').offsetTop,
      behavior: 'smooth'
    });
  }
}

// Atualizar o popup do mapa para incluir botão de edição
function createPopupContent(registro) {
  return `
        <div class="popup-content">
            <h3>${registro.genero}</h3>
            <p>Quantidade: ${registro.quantidade}</p>
            <p>Local: ${registro.localidade || 'Não especificado'}</p>
            <p>Data: ${new Date(registro.data).toLocaleDateString()}</p>
            <p>Pesquisador: ${registro.pesquisador || 'Não especificado'}</p>
            <img src="${registro.foto}" width="150">
            <button onclick="editarRegistro('${registro.id}')" class="edit-btn">
                <i class="fas fa-edit"></i> Editar
            </button>
        </div>
    `;
}

// Inicialização
window.addEventListener('load', () => {
  carregarRegistros();
});
