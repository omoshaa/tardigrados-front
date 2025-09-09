// Configurações iniciais
const API_URL = "https://tardigrados-api.onrender.com";

// Configuração do tema
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Configuração do mapa
const map = L.map('map').setView([-23.5, -46.6], 5);
const markers = L.layerGroup().addTo(map);

// Adiciona a camada do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Alternador de tema claro/escuro
document.getElementById('themeToggle').addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);

  const icon = document.querySelector('.theme-toggle i');
  icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
});

// Função para mostrar notificações
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = type;
  notification.style.display = 'block';
  setTimeout(() => notification.style.display = 'none', 3000);
}

// Função para obter localização atual
document.getElementById('getLocation').addEventListener('click', function () {
  if ("geolocation" in navigator) {
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    navigator.geolocation.getCurrentPosition(
      // Sucesso ao obter localização
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        document.getElementById('latitude').value = lat.toFixed(6);
        document.getElementById('longitude').value = lng.toFixed(6);

        map.setView([lat, lng], 15);

        // Reativa o botão
        const button = document.getElementById('getLocation');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-location-crosshairs"></i>';
      },
      // Erro ao obter localização
      function (error) {
        showNotification('Erro ao obter localização: ' + error.message, 'error');

        // Reativa o botão
        const button = document.getElementById('getLocation');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-location-crosshairs"></i>';
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  } else {
    showNotification("Geolocalização não é suportada pelo seu navegador", 'error');
  }
});

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
    updateRecordsTable(dados);

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

// Evento de submissão do formulário
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = e.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

  try {
    const formData = new FormData();

    // Validação de coordenadas
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (!latitude || !longitude) {
      throw new Error('Selecione uma localização no mapa ou use sua localização atual');
    }

    // Coleta dos dados do formulário
    const campos = ['genero', 'quantidade', 'raio', 'localidade', 'pesquisador', 'observacoes'];
    campos.forEach(campo => {
      const valor = document.getElementById(campo).value;
      if (valor) formData.append(campo, valor);
    });

    // Adiciona múltiplas fotos
    selectedFiles.forEach((file, index) => {
      formData.append(`foto${index}`, file);
    });

    formData.append("local", JSON.stringify([parseFloat(latitude), parseFloat(longitude)]));

    // Envio dos dados para a API
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error('Erro ao salvar registro');

    showNotification('Registro salvo com sucesso!', 'success');
    document.getElementById("form").reset();
    document.getElementById("image-preview").innerHTML = '';
    selectedFiles = []; // Limpa o array de arquivos
    await carregarRegistros();

  } catch (error) {
    showNotification(error.message, 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-save"></i> Salvar Registro';
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

// Função para calcular tempo decorrido
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} anos atrás`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} meses atrás`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} dias atrás`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} horas atrás`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutos atrás`;

  return "agora mesmo";
}

// Variável global para armazenar os arquivos
let selectedFiles = [];

// Evento de mudança do input de arquivo
document.getElementById('foto').addEventListener('change', function (e) {
  const preview = document.getElementById('image-preview');
  const newFiles = Array.from(e.target.files);

  // Adiciona os novos arquivos à lista existente
  selectedFiles = [...selectedFiles, ...newFiles];

  // Atualiza o preview
  updateImagePreviews();
});

// Função para atualizar os previews
function updateImagePreviews() {
  const preview = document.getElementById('image-preview');
  preview.innerHTML = '';

  selectedFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const div = document.createElement('div');
      div.className = 'image-preview-item';
      div.innerHTML = `
        <img src="${e.target.result}" alt="Preview ${index + 1}">
        <button type="button" class="remove-image" onclick="removeImage(${index})">
          <i class="fas fa-times"></i>
        </button>
      `;
      preview.appendChild(div);
    }
    reader.readAsDataURL(file);
  });
}

// Função para remover imagem
function removeImage(index) {
  selectedFiles.splice(index, 1);
  updateImagePreviews();
}

// Adicionar função para atualizar a tabela de registros
function updateRecordsTable(dados) {
  const tbody = document.getElementById('records-body');
  tbody.innerHTML = '';

  dados.forEach(reg => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reg.genero}</td>
      <td>${reg.localidade || 'Não especificado'}</td>
      <td>${reg.pesquisador}</td>
      <td>${reg.quantidade}</td>
      <td>${timeAgo(new Date(reg.data))}</td>
      <td>
        <button onclick="editarRegistro('${reg.id}')" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Inicialização
window.addEventListener('load', () => {
  carregarRegistros();
});
