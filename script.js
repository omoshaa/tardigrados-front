// ===================================
// TARDISTUDY - Portal de Estudos de Tardigrada
// Script principal da aplicação
// ===================================

// ============================================================
// CONTROLE DE VERSÃO E CACHE
// ============================================================
const APP_VERSION = "2.0.0";

// Verifica e atualiza a versão do cache
function checkCacheVersion() {
  const storedVersion = localStorage.getItem("tardistudy_version");

  if (storedVersion !== APP_VERSION) {
    // Nova versão detectada - limpa o cache
    console.log(
      `Atualizando de ${storedVersion || "versão antiga"} para ${APP_VERSION}`
    );

    // Limpa localStorage seletivamente (mantém os registros de tardigrada)
    const tardiRecords = localStorage.getItem("tardiRecords");
    localStorage.clear();
    if (tardiRecords) {
      localStorage.setItem("tardiRecords", tardiRecords);
    }

    // Salva nova versão
    localStorage.setItem("tardistudy_version", APP_VERSION);

    // Limpa cache do Service Worker se existir
    if ("caches" in window) {
      caches.keys().then(function (names) {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }

    // Recarrega a página para garantir novos arquivos
    window.location.reload(true);
  }
}

// Executa verificação ao carregar
checkCacheVersion();

// ============================================================
// MENU MOBILE E NAVEGAÇÃO RESPONSIVA
// ============================================================
let isMobileMenuOpen = false;
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  if (!mobileNav || !mobileMenuBtn) return;
  isMobileMenuOpen = !isMobileMenuOpen;
  if (isMobileMenuOpen) {
    mobileNav.classList.add("active");
    mobileMenuBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    mobileNav.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// ============================================================
// NAVEGAÇÃO ENTRE SEÇÕES (SPA - Single Page Application)
// ============================================================
function showSection(sectionId) {
  if (isMobileMenuOpen) {
    toggleMobileMenu();
  }
  const sections = document.querySelectorAll(
    "main > .section, main > .hero-section"
  );
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  // Seção "home" é a hero-section
  if (sectionId === "home") {
    document.getElementById("home").classList.remove("hidden");
  } else {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }
  }

  // Lógica pós-exibição
  setTimeout(() => {
    if (sectionId === "mapa-tardigrada" && !map) {
      initMap();
      renderAll();
    } else if (sectionId === "mapa-tardigrada" && map) {
      map.invalidateSize();
      renderAll(); // Garante que filtros e tabela sejam atualizados
    }
    if (sectionId === "chave-dicotomica") {
      resetKey();
    }
    if (sectionId === "guia-estruturas") {
      renderStructures();
    }
  }, 300);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ============================================================
// DADOS DOS REGISTROS DE TARDIGRADA
// ============================================================
let tardiRecords = JSON.parse(localStorage.getItem("tardiRecords")) || [
  {
    id: "1a2b3c",
    latitude: -23.5505,
    longitude: -46.6333,
    classe: "Eutardigrada",
    ordem: "Parachela",
    superfamilia: "Macrobiotoidea",
    familia: "Macrobiotidae",
    genero: "Macrobiotus",
    especie: "harmsworthi", // Adicionado
    localidade: "Parque Ibirapuera, SP",
    habitat: "Terrestre - Musgo",
    pesquisador: "Ana Silva",
    instituicao: "USP",
    fotos: [],
    data: "2025-09-22T19:00:00Z",
  },
  {
    id: "4d5e6f",
    latitude: -15.7801,
    longitude: -47.9292,
    classe: "Heterotardigrada",
    ordem: "Echiniscoidea",
    superfamilia: "",
    familia: "Echiniscidae",
    genero: "Echiniscus",
    especie: "testudo", // Adicionado
    localidade: "Parque Nacional de Brasília, DF",
    habitat: "Terrestre - Líquen",
    pesquisador: "João Costa",
    instituicao: "UnB",
    fotos: [],
    data: "2025-09-23T19:00:00Z",
  },
  {
    id: "7g8h9i",
    latitude: -22.9068,
    longitude: -43.1729,
    classe: "Eutardigrada",
    ordem: "Apochela",
    superfamilia: "",
    familia: "Milnesiidae",
    genero: "Milnesium",
    especie: "tardigradum", // Adicionado
    localidade: "Tijuca, Rio de Janeiro, RJ",
    habitat: "Terrestre - Folhiço",
    pesquisador: "Maria Santos",
    instituicao: "UFRJ",
    fotos: [],
    data: "2025-09-24T19:00:00Z",
  },
  // === NOVOS DADOS ADICIONADOS ===
  // Escola Gonzaga (SP) - Coordenadas aproximadas da Penha, SP
  {
    id: "gonzaga1",
    latitude: -23.5284,
    longitude: -46.5432,
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
    genero: "Mesobiotus",
    especie: "",
    localidade: "Escola Estadual Prof. Aprígio Gonzaga (SP)",
    habitat: "Terrestre - Musgo",
    pesquisador: "Aluno PUNE",
    instituicao: "EE Gonzaga",
    fotos: [],
    data: "2025-10-29T10:00:00Z",
  },
  {
    id: "gonzaga2",
    latitude: -23.5285,
    longitude: -46.5433,
    classe: "Heterotardigrada",
    ordem: "Echiniscoidea",
    familia: "Echiniscidae",
    genero: "Pseudoechiniscus",
    especie: "",
    localidade: "Escola Estadual Prof. Aprígio Gonzaga (SP)",
    habitat: "Terrestre - Líquen",
    pesquisador: "Aluno PUNE",
    instituicao: "EE Gonzaga",
    fotos: [],
    data: "2025-10-29T10:01:00Z",
  },
  {
    id: "gonzaga3",
    latitude: -23.5286,
    longitude: -46.5434,
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
    genero: "Paramacrobiotus",
    especie: "",
    localidade: "Escola Estadual Prof. Aprígio Gonzaga (SP)",
    habitat: "Terrestre - Musgo",
    pesquisador: "Aluno PUNE",
    instituicao: "EE Gonzaga",
    fotos: [],
    data: "2025-10-29T10:02:00Z",
  },
  {
    id: "gonzaga4",
    latitude: -23.5287,
    longitude: -46.5435,
    classe: "Eutardigrada",
    ordem: "Apochela",
    familia: "Milnesiidae",
    genero: "Milnesium",
    especie: "",
    localidade: "Escola Estadual Prof. Aprígio Gonzaga (SP)",
    habitat: "Terrestre - Folhiço",
    pesquisador: "Aluno PUNE",
    instituicao: "EE Gonzaga",
    fotos: [],
    data: "2025-10-29T10:03:00Z",
  },
  // Julio Mesquita (Campinas) - Coordenadas aproximadas de Campinas
  {
    id: "julio1",
    latitude: -22.9345,
    longitude: -47.0461,
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
    genero: "Paramacrobiotus",
    especie: "",
    localidade: "Escola Estadual Julio de Mesquita (Campinas)",
    habitat: "Terrestre - Musgo",
    pesquisador: "Danilo de Castro Santos",
    instituicao: "EE Julio de Mesquita",
    fotos: [],
    data: "2025-10-29T11:00:00Z",
  },
  // Maria de Lourdes (Campinas) - Coordenadas aproximadas de Campinas
  {
    id: "maria1",
    latitude: -22.9715,
    longitude: -47.1082,
    classe: "Eutardigrada",
    ordem: "Apochela",
    familia: "Milnesiidae",
    genero: "Milnesium",
    especie: "",
    localidade: "EE Maria de Lourdes (Campinas)",
    habitat: "Terrestre - Musgo",
    pesquisador: "Aluno PUNE",
    instituicao: "EE Maria de Lourdes",
    fotos: [],
    data: "2025-10-29T12:00:00Z",
  },
  {
    id: "maria2",
    latitude: -22.9716,
    longitude: -47.1083,
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
    genero: "Paramacrobiotus",
    especie: "",
    localidade: "EE Maria de Lourdes (Campinas)",
    habitat: "Terrestre - Líquen",
    pesquisador: "Aluno PUNE",
    instituicao: "EE Maria de Lourdes",
    fotos: [],
    data: "2025-10-29T12:01:00Z",
  },
  {
    id: "daniel1",
    latitude: -22.9718,
    longitude: -47.1085,
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
    genero: "Macrobiotus",
    especie: "",
    localidade: "Campinas, SP",
    habitat: "Terrestre - Musgo",
    pesquisador: "Daniel Mizael Spagiari de Souza",
    instituicao: "PUNE",
    fotos: [],
    data: "2025-10-30T10:00:00Z",
  },
];

// ============================================================
// MAPA DE TAXONOMIA (Para formulário simplificado)
// ============================================================
const GENUS_TAXONOMY_MAP = {
  Macrobiotus: {
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
  },
  Echiniscus: {
    classe: "Heterotardigrada",
    ordem: "Echiniscoidea",
    familia: "Echiniscidae",
  },
  Milnesium: {
    classe: "Eutardigrada",
    ordem: "Apochela",
    familia: "Milnesiidae",
  },
  Mesobiotus: {
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
  },
  Pseudoechiniscus: {
    classe: "Heterotardigrada",
    ordem: "Echiniscoidea",
    familia: "Echiniscidae",
  },
  Paramacrobiotus: {
    classe: "Eutardigrada",
    ordem: "Parachela",
    familia: "Macrobiotidae",
  },
  Outro: {
    classe: "Indeterminado",
    ordem: "Indeterminado",
    familia: "Indeterminado",
  },
  // Adicionar outros gêneros da chave aqui...
};

// ============================================================
// VARIÁVEIS GLOBAIS
// ============================================================
let map = null;
let markers = [];
let currentStep = "1"; // Usar string para IDs
let choiceHistory = [];
let savedSearches = []; // Histórico de pesquisas salvas

// ============================================================
// SISTEMA DE HISTÓRICO DE PESQUISAS
// ============================================================

// Carrega histórico de pesquisas salvas do localStorage
function loadSavedSearches() {
  const saved = localStorage.getItem("tardiSearchHistory");
  if (saved) {
    try {
      savedSearches = JSON.parse(saved);
    } catch (e) {
      console.error("Erro ao carregar histórico de pesquisas:", e);
      savedSearches = [];
    }
  }
  renderSavedSearches();
}

// Salva histórico de pesquisas no localStorage
function saveSavedSearches() {
  localStorage.setItem("tardiSearchHistory", JSON.stringify(savedSearches));
}

// Salva a pesquisa atual quando chega no resultado
function saveCurrentSearch(result, description) {
  const searchData = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    result: result,
    description: description,
    history: [...choiceHistory], // Copia o histórico de escolhas
    currentStep: currentStep,
  };

  // Adiciona no início do array (mais recente primeiro)
  savedSearches.unshift(searchData);

  // Limita a 20 pesquisas salvas
  if (savedSearches.length > 20) {
    savedSearches = savedSearches.slice(0, 20);
  }

  saveSavedSearches();
  renderSavedSearches();
}

// Renderiza o histórico de pesquisas salvas
function renderSavedSearches() {
  const container = document.getElementById("saved-searches-list");
  const clearBtn = document.getElementById("clear-history-btn");
  if (!container) return;

  if (savedSearches.length === 0) {
    container.innerHTML = `
      <div class="no-searches">
        Nenhuma identificação salva ainda.
      </div>
    `;
    // Oculta o botão de limpar se não houver pesquisas
    if (clearBtn) clearBtn.style.display = "none";
    return;
  }

  // Mostra o botão de limpar se houver pesquisas
  if (clearBtn) clearBtn.style.display = "inline-flex";

  container.innerHTML = savedSearches
    .map((search) => {
      const date = new Date(search.date);
      const dateStr = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return `
        <div class="saved-search-item" data-search-id="${search.id}">
          <div class="saved-search-header">
            <div class="saved-search-title">
              <i class="fas fa-microscope"></i>
              ${escapeHtml(search.result)}
            </div>
            <div class="saved-search-date">
              <i class="fas fa-clock"></i> ${dateStr}
            </div>
          </div>
          <div class="saved-search-result">
            ✓ Identificação completa
          </div>
          <div class="saved-search-actions">
            <button class="btn-continue" onclick="continueSearch('${
              search.id
            }')">
              <i class="fas fa-eye"></i> Ver Caminho
            </button>
            <button class="btn-delete-search" onclick="deleteSearch('${
              search.id
            }')">
              <i class="fas fa-trash"></i> Apagar
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

// Continua uma pesquisa salva (mostra o caminho expandindo o card)
function continueSearch(searchId) {
  const search = savedSearches.find((s) => s.id === searchId);
  if (!search) return;

  // Encontra o card da pesquisa
  const searchCard = document.querySelector(`[data-search-id="${searchId}"]`);
  if (!searchCard) return;

  // Verifica se já existe o caminho expandido
  let pathSection = searchCard.querySelector(".search-path-expanded");

  if (pathSection) {
    // Se já existe, apenas alterna a visibilidade
    const isHidden = pathSection.style.display === "none";
    pathSection.style.display = isHidden ? "block" : "none";

    // Atualiza o botão
    const btn = searchCard.querySelector(".btn-continue");
    if (btn) {
      btn.innerHTML = isHidden
        ? '<i class="fas fa-eye-slash"></i> Ocultar Caminho'
        : '<i class="fas fa-eye"></i> Ver Caminho';
    }
  } else {
    // Cria a seção do caminho
    pathSection = document.createElement("div");
    pathSection.className = "search-path-expanded";
    pathSection.innerHTML = `
      <h5 style="margin: 16px 0 12px 0; color: var(--primary-dark); font-size: 1rem;">
        <i class="fas fa-route"></i> Caminho Percorrido
      </h5>
      <ol class="path-steps-list">
        ${search.history
          .map((entry) => {
            return `<li><strong>${escapeHtml(
              entry.question
            )}</strong><br><em>→ ${escapeHtml(entry.answer)}</em></li>`;
          })
          .join("")}
      </ol>
    `;

    // Adiciona após as ações
    const actionsDiv = searchCard.querySelector(".saved-search-actions");
    if (actionsDiv) {
      actionsDiv.parentNode.insertBefore(pathSection, actionsDiv.nextSibling);
    }

    // Atualiza o botão
    const btn = searchCard.querySelector(".btn-continue");
    if (btn) {
      btn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Caminho';
    }
  }

  // Rola suavemente para o card
  searchCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Apaga uma pesquisa do histórico
function deleteSearch(searchId) {
  if (confirm("Deseja realmente apagar esta identificação do histórico?")) {
    savedSearches = savedSearches.filter((s) => s.id !== searchId);
    saveSavedSearches();
    renderSavedSearches();
    showNotification("Identificação removida do histórico", "success");
  }
}

// Apaga todo o histórico
function clearAllSearches() {
  if (confirm("Deseja realmente apagar TODAS as identificações salvas?")) {
    savedSearches = [];
    saveSavedSearches();
    renderSavedSearches();
    showNotification("Histórico completamente limpo", "success");
  }
}

// ============================================================
// MAPA INTERATIVO LEAFLET
// ============================================================
function initMap() {
  if (typeof L === "undefined") {
    // console.log("Leaflet não está carregado");
    return;
  }
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    // console.log("Elemento do mapa não encontrado");
    return;
  }
  try {
    map = L.map("map").setView([-15.7942, -47.8822], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileSize: 256,
      zoomOffset: 0,
    }).addTo(map);
    setTimeout(() => {
      renderMarkers();
      map.invalidateSize();
    }, 500);
    // console.log("Mapa inicializado com sucesso");
  } catch (error) {
    // console.error("Erro ao inicializar o mapa:", error);
  }
}

function renderMarkers() {
  if (!map) return;
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];
  const filteredRecords = getFilteredRecords();
  filteredRecords.forEach((record) => {
    const speciesName =
      record.especie && record.especie !== "N/A"
        ? `<i>${escapeHtml(record.genero)} ${escapeHtml(record.especie)}</i>`
        : `<i>${escapeHtml(record.genero)}</i> sp.`;

    const popupHtml = `
      <div class="popup-content">
        <h4>${escapeHtml(record.classe)}</h4>
        <p><strong>Ordem:</strong> ${escapeHtml(record.ordem)}</p>
        <p><strong>Gênero/Espécie:</strong> ${speciesName}</p>
        <p><strong>Localidade:</strong> ${escapeHtml(record.localidade)}</p>
        <p><strong>Habitat:</strong> ${escapeHtml(record.habitat)}</p>
        <p><strong>Pesquisador:</strong> ${escapeHtml(record.pesquisador)}</p>
        <p><strong>Data:</strong> ${new Date(record.data).toLocaleDateString(
          "pt-BR"
        )}</p>
      </div>
    `;
    const marker = L.marker([record.latitude, record.longitude])
      .addTo(map)
      .bindPopup(popupHtml);
    markers.push(marker);
  });
}

function getFilteredRecords() {
  const grupoFilter = document.getElementById("grupo-filter")?.value;
  const ordemFilter = document.getElementById("ordem-filter")?.value;
  const generoFilter = document.getElementById("genero-filter")?.value;

  return tardiRecords.filter((record) => {
    const grupoMatch = !grupoFilter || record.classe === grupoFilter;
    const ordemMatch = !ordemFilter || record.ordem === ordemFilter;
    const generoMatch = !generoFilter || record.genero === generoFilter;
    return grupoMatch && ordemMatch && generoMatch;
  });
}

// Popula o filtro de Ordem baseado na classe selecionada
function populateOrdemFilter() {
  const grupoFilter = document.getElementById("grupo-filter");
  const ordemFilter = document.getElementById("ordem-filter");
  if (!ordemFilter) return;

  const selectedClasse = grupoFilter?.value || "";

  let filteredRecords = tardiRecords;
  if (selectedClasse) {
    filteredRecords = tardiRecords.filter((r) => r.classe === selectedClasse);
  }

  const ordens = [...new Set(filteredRecords.map((r) => r.ordem))]
    .filter((o) => o && o.trim() !== "" && o !== "Indeterminado")
    .sort();

  ordemFilter.innerHTML = '<option value="">Todas as Ordens</option>';

  ordens.forEach((ordem) => {
    const option = document.createElement("option");
    option.value = ordem;
    option.textContent = ordem;
    ordemFilter.appendChild(option);
  });

  if (ordemFilter.value && !ordens.includes(ordemFilter.value)) {
    ordemFilter.value = "";
  }
}

// Popula o filtro de Gênero baseado na classe e ordem selecionadas
function populateGeneroFilter() {
  const grupoFilter = document.getElementById("grupo-filter");
  const ordemFilter = document.getElementById("ordem-filter");
  const generoFilter = document.getElementById("genero-filter");
  if (!generoFilter) return;

  const selectedClasse = grupoFilter?.value || "";
  const selectedOrdem = ordemFilter?.value || "";

  let filteredRecords = tardiRecords;
  if (selectedClasse) {
    filteredRecords = filteredRecords.filter(
      (r) => r.classe === selectedClasse
    );
  }
  if (selectedOrdem) {
    filteredRecords = filteredRecords.filter((r) => r.ordem === selectedOrdem);
  }

  const generos = [...new Set(filteredRecords.map((r) => r.genero))]
    .filter(
      (g) => g && g.trim() !== "" && g !== "Outro" && g !== "Indeterminado"
    )
    .sort();

  generoFilter.innerHTML = '<option value="">Todos os Gêneros</option>';

  generos.forEach((genero) => {
    const option = document.createElement("option");
    option.value = genero;
    option.textContent = genero;
    generoFilter.appendChild(option);
  });

  if (generoFilter.value && !generos.includes(generoFilter.value)) {
    generoFilter.value = "";
  }
}

// ============================================================
// ESTATÍSTICAS (Cards de contadores)
// ============================================================
function updateStats() {
  const filteredRecords = getFilteredRecords();
  const totalRegistros = filteredRecords.length;

  // Conta classes únicas (não "Indeterminado")
  const totalClasses = [
    ...new Set(filteredRecords.map((r) => r.classe)),
  ].filter((g) => g && g !== "Indeterminado").length;

  // Conta ordens únicas
  const totalOrdens = [...new Set(filteredRecords.map((r) => r.ordem))].filter(
    (o) => o && o !== "Indeterminado"
  ).length;

  // Conta gêneros únicos (não "Outro" ou "Indeterminado")
  const totalGeneros = [
    ...new Set(filteredRecords.map((r) => r.genero)),
  ].filter((g) => g && g !== "Outro" && g !== "Indeterminado").length;

  document.getElementById("total-registros").textContent = totalRegistros;
  document.getElementById("total-grupos").textContent = totalClasses;
  document.getElementById("total-ordens").textContent = totalOrdens;
  document.getElementById("total-especies").textContent = totalGeneros;
}

// ============================================================
// FORMULÁRIO DE CADASTRO (Atualizado)
// ============================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const genero = formData.get("genero");
  const taxonomia = GENUS_TAXONOMY_MAP[genero] || GENUS_TAXONOMY_MAP["Outro"];

  const newRecord = {
    id: generateId(),
    latitude: parseFloat(formData.get("latitude")),
    longitude: parseFloat(formData.get("longitude")),

    // Preenchido automaticamente pelo GENUS_TAXONOMY_MAP
    classe: taxonomia.classe,
    ordem: taxonomia.ordem,
    familia: taxonomia.familia,

    // Preenchido pelo formulário
    genero: genero,
    especie: formData.get("especie") || "",

    localidade: formData.get("localidade"),
    habitat: formData.get("habitat"),
    pesquisador: formData.get("pesquisador"),
    instituicao: formData.get("instituicao") || "",

    fotos: [], // O preview de fotos não é salvo no localStorage
    data: new Date().toISOString(),
  };

  tardiRecords.push(newRecord);
  localStorage.setItem("tardiRecords", JSON.stringify(tardiRecords));

  showNotification("Registro salvo com sucesso!", "success");
  e.target.reset();

  // Limpa o preview de imagens
  const previewContainer = document.getElementById("image-preview");
  if (previewContainer) {
    previewContainer.innerHTML = "";
  }

  renderAll(); // Atualiza mapa, tabela e filtros
  showSection("mapa-tardigrada"); // Leva o usuário ao mapa
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("latitude").value =
          position.coords.latitude.toFixed(6);
        document.getElementById("longitude").value =
          position.coords.longitude.toFixed(6);
        showNotification("Localização obtida!", "success");
      },
      () => showNotification("Erro ao obter localização", "error")
    );
  } else {
    showNotification("Geolocalização não suportada.", "error");
  }
}

// NOVO: Função para preview de imagens
function handleImagePreview(event) {
  const previewContainer = document.getElementById("image-preview");
  if (!previewContainer) return;

  previewContainer.innerHTML = ""; // Limpa previews anteriores

  const files = event.target.files;
  if (files.length > 5) {
    showNotification("Você só pode enviar até 5 fotos.", "error");
    event.target.value = ""; // Limpa a seleção
    return;
  }

  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Preview da imagem";
      img.classList.add("preview-image"); // (Estilo será adicionado no CSS)
      previewContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
}

// CHAVE DICOTÔMICA COMPLETA - TARDIGRADA
// ============================================================
// Baseada em: Damborenea, C., Rogers, D. C., & Thorp, J. H. (2020).
// Thorp and Covich's Freshwater Invertebrates (Fourth Edition)
// Volume 3: Keys to Nearctic Fauna, Chapter 25: Phylum Tardigrada, p. 679–696.
// Adaptado por: Prof. Danilo de Castro Santos (PUNE/TardiStudy)

const keySteps = {
  // ============================================================
  // PASSO INICIAL: FILO TARDIGRADA → CLASSES
  // ============================================================
  1: {
    title: "Filo Tardigrada: Classes",
    question: "1. Observe a presença de cirros laterais A na cabeça:",
    options: [
      {
        text: "1. Cirros laterais A presentes.",
        next: "heterotardigrada_ordens",
        image: "assets/fig1.png",
      },
      {
        text: "1'. Cirros laterais A ausentes.",
        next: "eutardigrada_ordens",
        noImage: true,
      },
    ],
  },

  // ============================================================
  // CLASSE HETEROTARDIGRADA
  // ============================================================

  // HETEROTARDIGRADA: Ordens
  heterotardigrada_ordens: {
    title: "Classe Heterotardigrada: Ordens",
    question: "1. Observe o cirro mediano e a inserção das garras:",
    options: [
      {
        text: "1. Cirro mediano geralmente presente; dígitos ou garras inseridos diretamente na perna.",
        next: "arthrotardigrada_result",
        image: "assets/fig2.png",
      },
      {
        text: "1'. Cirro mediano ausente; cada garra inserida na perna.",
        next: "echiniscoidea_familias",
        noImage: true,
      },
    ],
  },

  // ORDEM ARTHROTARDIGRADA (resultado final)
  arthrotardigrada_result: {
    title: "Resultado: Ordem Arthrotardigrada",
    result: "Ordem Arthrotardigrada",
    description:
      "Uma espécie: Styraconyx hallasi. Tardigrado marinho encontrado acidentalmente em fontes da Groenlândia.",
    image: "assets/resultadoArthrotardigrada.png",
  },

  // ORDEM ECHINISCOIDEA: Famílias
  echiniscoidea_familias: {
    title: "Ordem Echiniscoidea: Famílias",
    question: "1. Observe o número de garras por perna e as placas dorsais:",
    options: [
      {
        text: "1. Quatro garras por perna em adultos; com placas dorsais-laterais.",
        next: "echiniscidae_result",
        image: "assets/fig4.png",
      },
      {
        text: "1'. Duas garras nas pernas, uma garra na perna em adultos;",
        next: "carphaniidae_result",
        noImage: true,
      },
    ],
  },

  // FAMÍLIA ECHINISCIDAE (resultado final)
  echiniscidae_result: {
    title: "Resultado: Família Echiniscidae",
    result: "Família Echiniscidae",
    description:
      "Quatro garras por perna em adultos; com placas dorsais-laterais. Três gêneros principais: Echiniscus, Pseudechiniscus e Hypechiniscus.",
    image: "assets/fig4.png",
  },

  // FAMÍLIA CARPHANIIDAE (resultado final)
  carphaniidae_result: {
    title: "Resultado: Família Carphaniidae",
    result: "Gênero Carphania",
    description:
      "Um gênero: Carphania. Duas garras nas pernas I–III, uma garra na perna IV; cutícula sem placas dorsais; cirrus A muito curto.",
    noImage: true,
  },
  // ============================================================
  // CLASSE EUTARDIGRADA
  // ============================================================

  // EUTARDIGRADA: Ordens
  eutardigrada_ordens: {
    title: "Classe Eutardigrada: Ordens",
    question: "1. Observe as papilas cefálicas e os ganchos:",
    options: [
      {
        text: "1. Cabeça sem papilas cefálicas; geralmente 2 ganchos duplos por perna.",
        next: "parachela_superfamilias",
        image: "assets/fig12.png",
      },
      {
        text: "1'. Cabeça com papilas cefálicas (incluindo duas papilas laterais); ganchos com ramo secundário não conectado ao primário.",
        next: "milnesium_result",
        image: "assets/papilas.png",
      },
    ],
  },

  // ORDEM APOCHELA (resultado final)
  milnesium_result: {
    title: "Resultado: Ordem Apochela",
    result: "Gênero Milnesium",
    description:
      "Cabeça com papilas cefálicas; ganchos com ramo secundário não conectado ao primário; ovos lisos colocados dentro do exúvio; limnoterrestre.",
    noImage: true,
  },

  // ============================================================
  // ORDEM PARACHELA
  // ============================================================

  // PARACHELA: Superfamílias
  parachela_superfamilias: {
    title: "Ordem Parachela: Superfamílias",
    question:
      "1. Observe a simetria das garras duplas (sequência de garras nas pernas I–IV):",
    options: [
      {
        text: '1. Garras duplas "assimétricas" (sequência 2-1-2-1); tubo bucal sem lâmina ventral.',
        next: "hypsibioidea_isohypsibioidea",
        image: "assets/fig9.png",
      },
      {
        text: '1\'. Garras duplas "simétricas" (sequência 2-1-1-2); tubo bucal com lâmina ventral.',
        next: "macrobiotoidea_familias",
        image: "assets/fig6.png",
      },
    ],
  },

  // ============================================================
  // SUPERFAMÍLIAS HYPSIBIOIDEA & ISOHYPSIBIOIDEA
  // ============================================================

  hypsibioidea_isohypsibioidea: {
    title: "Superfamílias Isohypsibioidea e Hypsibioidea",
    question: "2(1). Observe a forma das garras internas e externas:",
    options: [
      {
        text: "2. Garras internas e externas de tamanho e forma semelhantes (tipo Isohypsibius, com ramos formando ângulo reto).",
        next: "isohypsibiidae_generos_1",
        noImage: true,
      },
      {
        text: "2'. Garras internas e externas de tamanho e forma claramente diferentes (tipo Hypsibius, com ramo secundário formando um arco).",
        next: "hypsibiidae_generos_1",
        noImage: true,
      },
    ],
  },

  // ============================================================
  // FAMÍLIA ISOHYPSIBIIDAE
  // ============================================================

  isohypsibiidae_generos_1: {
    title: "Família Isohypsibiidae: Gêneros (1/4)",
    question: "1. Observe o tipo de garras:",
    options: [
      {
        text: "1. Ramo secundário de cada garra formando um ângulo reto com o ramo primário (tipo Isohypsibius).",
        next: "isohypsibiidae_generos_2",
        noImage: true,
      },
      {
        text: "1'. Garra externa do tipo Hypsibius com ramo primário extremamente longo e esbelto; garra interna do tipo Isohypsibius.",
        next: "ramajendas_result",
        noImage: true,
      },
    ],
  },

  ramajendas_result: {
    title: "Resultado: Gênero Ramajendas",
    result: "Gênero Ramajendas",
    description:
      "Garra externa do tipo Hypsibius com ramo primário extremamente longo e esbelto; garra interna do tipo Isohypsibius.",
    noImage: true,
  },

  isohypsibiidae_generos_2: {
    title: "Família Isohypsibiidae: Gêneros (2/4)",
    question: "2(1). Observe a lâmina ventral no tubo bucal:",
    options: [
      {
        text: "2. Lâmina ventral ausente.",
        next: "isohypsibiidae_generos_3",
        noImage: true,
      },
      {
        text: "2'. Lâmina ventral presente.",
        next: "doryphoribius_result",
        noImage: true,
      },
    ],
  },

  doryphoribius_result: {
    title: "Resultado: Gênero Doryphoribius",
    result: "Gênero Doryphoribius",
    description: "Lâmina ventral presente no tubo bucal; limnoterrestre.",
    noImage: true,
  },

  isohypsibiidae_generos_3: {
    title: "Família Isohypsibiidae: Gêneros (3/4)",
    question:
      "3(2). Observe as lamelas peribuccais ao redor da abertura bucal:",
    options: [
      {
        text: "3. Lamelas peribuccais ausentes.",
        next: "isohypsibius_result",
        noImage: true,
      },
      {
        text: "3'. Lamelas peribuccais presentes (pode ser difícil de ver).",
        next: "isohypsibiidae_generos_4",
        noImage: true,
      },
    ],
  },

  isohypsibius_result: {
    title: "Resultado: Gênero Isohypsibius",
    result: "Gênero Isohypsibius",
    description: "Lamelas peribuccais ao redor da abertura bucal ausentes.",
    noImage: true,
  },

  isohypsibiidae_generos_4: {
    title: "Família Isohypsibiidae: Gêneros (4/4)",
    question: "4(3). Conte as lamelas peribuccais:",
    options: [
      {
        text: "4. Cerca de 30 lamelas peribuccais presentes.",
        next: "pseudobiotus_result",
        noImage: true,
      },
      {
        text: "4'. Doze lamelas peribuccais presentes, frequentemente fundidas.",
        next: "thulinius_result",
        noImage: true,
      },
    ],
  },

  pseudobiotus_result: {
    title: "Resultado: Gênero Pseudobiotus",
    result: "Gênero Pseudobiotus",
    description: "Cerca de 30 lamelas peribuccais presentes.",
    noImage: true,
  },

  thulinius_result: {
    title: "Resultado: Gênero Thulinius",
    result: "Gênero Thulinius",
    description:
      "Doze lamelas peribuccais presentes, frequentemente fundidas; uma ou duas barras cuticulares sob as bases das garras.",
    noImage: true,
  },

  // ============================================================
  // FAMÍLIA HYPSIBIIDAE
  // ============================================================

  hypsibiidae_generos_1: {
    title: "Família Hypsibiidae: Gêneros (1/5)",
    question: "1. Observe o tipo das garras externas:",
    options: [
      {
        text: "1. Garras externas do tipo Isohypsibius (ramo secundário formando ângulo reto).",
        next: "hypsibiidae_generos_2",
        noImage: true,
      },
      {
        text: "1'. Garras externas do tipo Hypsibius (ramo secundário formando arco).",
        next: "hypsibiidae_generos_3",
        noImage: true,
      },
    ],
  },

  hypsibiidae_generos_2: {
    title: "Família Hypsibiidae: Gêneros (2/5)",
    question: "2(1). Observe o tipo das garras internas:",
    options: [
      {
        text: "2. Garras internas do tipo Isohypsibius modificado (ângulo > 90 graus); apofises assimétricas.",
        next: "mixibius_result",
        noImage: true,
      },
      {
        text: "2'. Garras internas do tipo Hypsibius; apofises simétricas.",
        next: "acutuncus_result",
        noImage: true,
      },
    ],
  },

  mixibius_result: {
    title: "Resultado: Gênero Mixibius",
    result: "Gênero Mixibius",
    description:
      "Garras internas do tipo Isohypsibius modificado (ângulo > 90 graus); apofises assimétricas.",
    noImage: true,
  },

  acutuncus_result: {
    title: "Resultado: Gênero Acutuncus",
    result: "Gênero Acutuncus",
    description:
      "Garras internas do tipo Hypsibius; apofises simétricas; ovos com processos postos livremente.",
    noImage: true,
  },

  hypsibiidae_generos_3: {
    title: "Família Hypsibiidae: Gêneros (3/5)",
    question: "3(1). Observe a estrutura do tubo bucal:",
    options: [
      {
        text: "3. Tubo bucal rígido, sem parte posterior de composição flexível e espiral.",
        next: "hypsibius_result",
        noImage: true,
      },
      {
        text: "3'. Tubo bucal com parte posterior de composição flexível e espiral (tubo faríngeo).",
        next: "hypsibiidae_generos_4",
        noImage: true,
      },
    ],
  },

  hypsibius_result: {
    title: "Resultado: Gênero Hypsibius",
    result: "Gênero Hypsibius",
    description:
      "Tubo bucal rígido, sem parte posterior de composição flexível e espiral; limnoterrestre.",
    noImage: true,
  },

  hypsibiidae_generos_4: {
    title: "Família Hypsibiidae: Gêneros (4/5)",
    question: "4(3). Observe o espessamento em forma de gota no tubo bucal:",
    options: [
      {
        text: "4. Espessamento em forma de gota (entre as porções rígidas e flexíveis) AUSENTE.",
        next: "adropion_result",
        noImage: true,
      },
      {
        text: "4'. Espessamento em forma de gota (entre as porções rígidas e flexíveis) PRESENTE.",
        next: "hypsibiidae_generos_5",
        noImage: true,
      },
    ],
  },

  adropion_result: {
    title: "Resultado: Gênero Adropion",
    result: "Gênero Adropion",
    description:
      "Espessamento em forma de gota entre as porções rígidas e flexíveis do tubo bucal ausente.",
    noImage: true,
  },

  hypsibiidae_generos_5: {
    title: "Família Hypsibiidae: Gêneros (5/5)",
    question: "5(4). Observe os macroplacóides (estruturas na faringe):",
    options: [
      {
        text: "5. Dois macroplacóides semelhantes em comprimento, organizados em fileiras (parecem parênteses); septo presente.",
        next: "pilatobius_result",
        noImage: true,
      },
      {
        text: "5'. Dois macroplacóides sem septo OU três macroplacóides com ou sem septo.",
        next: "diphascon_result",
        noImage: true,
      },
    ],
  },

  pilatobius_result: {
    title: "Resultado: Gênero Pilatobius",
    result: "Gênero Pilatobius",
    description:
      "Dois macroplacóides semelhantes em comprimento, organizados em fileiras (parecem parênteses); septo presente.",
    noImage: true,
  },

  diphascon_result: {
    title: "Resultado: Gênero Diphascon",
    result: "Gênero Diphascon",
    description:
      "Dois macroplacóides sem septo ou três macroplacóides com ou sem septo.",
    noImage: true,
  },

  // ============================================================
  // SUPERFAMÍLIA MACROBIOTOIDEA
  // ============================================================

  macrobiotoidea_familias: {
    title: "Superfamília Macrobiotoidea: Famílias",
    question: "1. Observe o formato das garras e a lâmina ventral:",
    options: [
      {
        text: "1. Garras em formato L ou V (ramos das garras divergindo desde a base); gancho evidente na lâmina ventral.",
        next: "murrayidae_generos",
        image: "assets/fig8.png",
      },
      {
        text: "1'. Garras em formato Y (ramos das garras fundidos por um trecho); sem gancho evidente na lâmina ventral.",
        next: "macrobiotidae_generos_1",
        image: "assets/fig7.png",
      },
    ],
  },

  // ============================================================
  // FAMÍLIA MURRAYIDAE
  // ============================================================

  murrayidae_generos: {
    title: "Família Murrayidae: Gêneros",
    question: "1. Observe as garras e espessamentos cuticulares:",
    options: [
      {
        text: "1. Garras em forma de L muito bem desenvolvidas, com espessamentos cuticulares conectando a base das garras em cada perna.",
        next: "dactylobiotus_result",
        noImage: true,
      },
      {
        text: "1'. Garras em forma de V, sem espessamentos cuticulares conectando a base das garras em cada perna, com lunulas.",
        next: "murrayon_result",
        noImage: true,
      },
    ],
  },

  dactylobiotus_result: {
    title: "Resultado: Gênero Dactylobiotus",
    result: "Gênero Dactylobiotus",
    description:
      "Garras em forma de L muito bem desenvolvidas, com espessamentos cuticulares conectando a base das garras em cada perna; limnoterrestres.",
    noImage: true,
  },

  murrayon_result: {
    title: "Resultado: Gênero Murrayon",
    result: "Gênero Murrayon",
    description:
      "Garras em forma de V, sem espessamentos cuticulares conectando a base das garras em cada perna, com lunulas; limnoterrestres.",
    noImage: true,
  },

  // ============================================================
  // FAMÍLIA MACROBIOTIDAE
  // ============================================================

  macrobiotidae_generos_1: {
    title: "Família Macrobiotidae: Gêneros (1/3)",
    question: "1. Conte os macroplacóides na faringe:",
    options: [
      {
        text: "1. Três macroplacóides.",
        next: "macrobiotidae_generos_2",
        noImage: true,
      },
      {
        text: "1'. Dois macroplacóides; microplacóide, se presente, próximo ao segundo macroplacóide.",
        next: "macrobiotus_result",
        noImage: true,
      },
    ],
  },

  macrobiotus_result: {
    title: "Resultado: Gênero Macrobiotus",
    result: "Gênero Macrobiotus",
    description:
      "Dois macroplacóides; microplacóide, se presente, próximo ao segundo macroplacóide; cutícula com ou sem poros; ovos com processos de vários tipos.",
    noImage: true,
  },

  macrobiotidae_generos_2: {
    title: "Família Macrobiotidae: Gêneros (2/3)",
    question: "2(1). Observe a forma dos macroplacóides e lamelas bucais:",
    options: [
      {
        text: "2. Macroplacóides em forma de haste; lamelas bucais presentes.",
        next: "macrobiotidae_generos_3",
        noImage: true,
      },
      {
        text: "2'. Macroplacóides redondos; microplacóide presente; lamelas bucais ausentes.",
        next: "minibiotus_result",
        noImage: true,
      },
    ],
  },

  minibiotus_result: {
    title: "Resultado: Gênero Minibiotus",
    result: "Gênero Minibiotus",
    description:
      "Macroplacóides redondos; microplacóide presente; lamelas bucais ausentes; pápulas presentes.",
    noImage: true,
  },

  macrobiotidae_generos_3: {
    title: "Família Macrobiotidae: Gêneros (3/3)",
    question: "3(2). Observe a posição do microplacóide (se presente):",
    options: [
      {
        text: "3. Microplacóide sempre presente e claramente próximo ao terceiro macroplacóide (menos que seu comprimento).",
        next: "mesobiotus_result",
        noImage: true,
      },
      {
        text: "3'. Microplacóide, se presente, distante do terceiro macroplacóide (mais que seu comprimento).",
        next: "paramacrobiotus_result",
        noImage: true,
      },
    ],
  },

  mesobiotus_result: {
    title: "Resultado: Gênero Mesobiotus",
    result: "Gênero Mesobiotus",
    description:
      "Microplacóide sempre presente e claramente próximo ao terceiro macroplacóide (menos que seu comprimento); garra característica com septo interno.",
    noImage: true,
  },

  paramacrobiotus_result: {
    title: "Resultado: Gênero Paramacrobiotus",
    result: "Gênero Paramacrobiotus",
    description:
      "Microplacóide, se presente, distante do terceiro macroplacóide (mais que seu comprimento); ovos sempre com grandes processos reticulados.",
    noImage: true,
  },
};

function nextStep(stepId) {
  const step = keySteps[stepId];
  if (!step) {
    // console.error("Passo da chave não encontrado:", stepId);
    return;
  }

  const currentStepData = keySteps[currentStep];
  if (currentStepData && currentStepData.question) {
    const chosenOption = currentStepData.options?.find(
      (opt) => opt.next === stepId
    );
    const response = chosenOption
      ? chosenOption.text
      : "Resposta não identificada";

    // Adiciona ao histórico
    choiceHistory.push({
      question: currentStepData.question,
      answer: response,
    });
  }

  // Atualiza o passo atual
  currentStep = stepId;

  if (step.result) {
    showResult(step);
  } else {
    showStep(step);
  }
}

function showStep(step) {
  document.getElementById("step-title").textContent = step.title;
  const content = document.getElementById("step-content");
  content.innerHTML = `
    <div class="key-question">
      <p><strong>${escapeHtml(step.question)}</strong></p>
    </div>
    <div class="key-options">
      ${step.options
        .map(
          (option) => `
        <button class="key-option" data-step="${option.next}">
          ${
            option.noImage
              ? `
            <div style="display: flex; align-items: center; justify-content: center; width: 180px; height: 150px; background: rgba(0,0,0,0.05); border-radius: 8px; border: 2px dashed rgba(0,0,0,0.2);">
              <div style="background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Sem imagem</div>
            </div>
          `
              : `
            <img src="${
              option.image || "assets/tardigrade-photo.jpg"
            }" onerror="this.onerror=null;this.src='assets/tardigrade-photo.jpg'" alt="Imagem para ${escapeHtml(
                  option.text
                )}" class="key-option-image">
          `
          }
          <div class="key-option-text">${escapeHtml(option.text)}</div>
        </button>
      `
        )
        .join("")}
    </div>
  `;
}

// (Função showResult ATUALIZADA para incluir "Parabéns!" e salvar no histórico)
function showResult(step) {
  document.getElementById("key-step").style.display = "none";
  document.getElementById("key-result").style.display = "block";

  // Adiciona a mensagem de "Parabéns"
  let parabensMsg = "";
  if (step.result.toLowerCase().includes("gênero")) {
    parabensMsg = `<h4>Parabéns, você achou o ${escapeHtml(step.result)}!</h4>`;
  }

  document.getElementById("result-content").innerHTML = `
    <div class="result-card">
      ${parabensMsg}
      <h4>Identificação: ${escapeHtml(step.result)}</h4>
      <p>${escapeHtml(step.description)}</p>
      ${
        step.noImage
          ? `
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 100%; max-width: 400px; height: 300px; background: rgba(0,0,0,0.05); border-radius: 12px; border: 3px dashed rgba(0,0,0,0.2); margin-top: 20px;">
          <div style="background: rgba(0,0,0,0.75); color: white; padding: 12px 24px; border-radius: 8px; font-size: 1rem; font-weight: 600;">Sem imagem disponível</div>
        </div>
      `
          : `
        <img src="${
          step.image || "assets/tardigrade-photo.jpg"
        }" onerror="this.onerror=null;this.src='assets/tardigrade-photo.jpg'" alt="Imagem de ${escapeHtml(
              step.result
            )}" class="result-image">
      `
      }
    </div>
  `;

  // Salva a pesquisa automaticamente quando chega no resultado
  saveCurrentSearch(step.result, step.description);

  // Não atualiza o histórico aqui, pois o histórico é atualizado no nextStep
}

function resetKey() {
  currentStep = "1"; // Reseta para o passo inicial (string "1")
  choiceHistory = [];
  document.getElementById("key-step").style.display = "block";
  document.getElementById("key-result").style.display = "none";

  // Mostra o primeiro passo
  if (keySteps[currentStep]) {
    showStep(keySteps[currentStep]);
  } else {
    // console.error("Passo inicial '1' não encontrado na chave.");
  }
}

// ============================================================
// TABELA DE REGISTROS (Atualizada)
// ============================================================
function renderRecordsTable() {
  const tbody = document.getElementById("records-body");
  if (!tbody) return;

  // Ordena por ordem, depois por gênero, depois por data
  const records = getFilteredRecords().sort((a, b) => {
    if (a.ordem !== b.ordem) return a.ordem.localeCompare(b.ordem);
    if (a.genero !== b.genero) return a.genero.localeCompare(b.genero);
    return new Date(b.data) - new Date(a.data);
  });

  if (records.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="8" style="text-align: center;">Nenhum registro encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = records
    .map((record) => {
      // Formata nome científico correto
      const speciesDisplay =
        record.especie &&
        record.especie !== "N/A" &&
        record.especie.trim() !== ""
          ? record.especie
          : "sp.";

      return `
    <tr>
      <td data-label="Classe">${escapeHtml(record.classe)}</td>
      <td data-label="Ordem">${escapeHtml(record.ordem)}</td>
      <td data-label="Gênero"><i>${escapeHtml(record.genero)}</i></td>
      <td data-label="Espécie"><i>${escapeHtml(speciesDisplay)}</i></td>
      <td data-label="Localidade">${escapeHtml(record.localidade)}</td>
      <td data-label="Pesquisador">${escapeHtml(record.pesquisador)}</td>
      <td data-label="Data">${new Date(record.data).toLocaleDateString(
        "pt-BR"
      )}</td>
      <td data-label="Ações">
        <button class="btn-action btn-delete" data-id="${
          record.id
        }" aria-label="Excluir registro">
          <i class="fas fa-trash" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  `;
    })
    .join("");
}

// ============================================================
// VISUALIZAÇÃO POR ORDEM E GÊNERO (CARDS)
// ============================================================
function renderTaxonomyCards() {
  const container = document.getElementById("taxonomy-cards");
  if (!container) return;

  const records = getFilteredRecords();

  // Agrupa por ordem
  const byOrdem = {};
  records.forEach((record) => {
    if (!byOrdem[record.ordem]) {
      byOrdem[record.ordem] = {
        classe: record.classe,
        generos: {},
      };
    }
    if (!byOrdem[record.ordem].generos[record.genero]) {
      byOrdem[record.ordem].generos[record.genero] = [];
    }
    byOrdem[record.ordem].generos[record.genero].push(record);
  });

  // Ordena as ordens
  const ordensOrdenadas = Object.keys(byOrdem).sort();

  if (ordensOrdenadas.length === 0) {
    container.innerHTML = '<p class="no-data">Nenhum registro encontrado.</p>';
    return;
  }

  container.innerHTML = ordensOrdenadas
    .map((ordem) => {
      const data = byOrdem[ordem];
      const generosOrdenados = Object.keys(data.generos).sort();
      const totalRegistros = generosOrdenados.reduce(
        (sum, genero) => sum + data.generos[genero].length,
        0
      );

      return `
        <div class="taxonomy-card">
          <div class="taxonomy-card-header">
            <h3>${escapeHtml(data.classe)}</h3>
            <h4>Ordem: ${escapeHtml(ordem)}</h4>
            <span class="badge">${totalRegistros} registro${
        totalRegistros > 1 ? "s" : ""
      }</span>
          </div>
          <div class="taxonomy-card-body">
            ${generosOrdenados
              .map((genero) => {
                const registros = data.generos[genero];
                const especies = [
                  ...new Set(
                    registros
                      .map((r) => r.especie)
                      .filter((e) => e && e !== "N/A")
                  ),
                ];

                return `
                  <div class="genero-item">
                    <div class="genero-header">
                      <i class="fas fa-dna"></i>
                      <strong><i>${escapeHtml(genero)}</i></strong>
                      <span class="genero-count">${registros.length}</span>
                    </div>
                    ${
                      especies.length > 0
                        ? `
                      <div class="especies-list">
                        ${especies
                          .map(
                            (e) =>
                              `<span class="especie-tag"><i>${escapeHtml(
                                genero
                              )} ${escapeHtml(e)}</i></span>`
                          )
                          .join("")}
                      </div>
                    `
                        : `<div class="especies-list"><span class="especie-tag"><i>${escapeHtml(
                            genero
                          )}</i> sp.</span></div>`
                    }
                    <div class="localidades-preview">
                      ${registros
                        .slice(0, 2)
                        .map(
                          (r) =>
                            `<small><i class="fas fa-map-marker-alt"></i> ${escapeHtml(
                              r.localidade
                            )}</small>`
                        )
                        .join("")}
                      ${
                        registros.length > 2
                          ? `<small>+${registros.length - 2} mais</small>`
                          : ""
                      }
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

function handleDeleteRecord(id) {
  if (confirm("Deseja realmente excluir este registro?")) {
    tardiRecords = tardiRecords.filter((record) => record.id !== id);
    localStorage.setItem("tardiRecords", JSON.stringify(tardiRecords));
    showNotification("Registro excluído com sucesso!", "success");
    renderAll();
  }
}

// ============================================================
// NOTIFICAÇÕES (Toast Messages)
// ============================================================
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification");
  if (!notification) return;
  notification.textContent = message;
  notification.className = `notification ${type} show`;
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// ============================================================
// RENDERIZAÇÃO GERAL
// ============================================================
function renderAll() {
  populateOrdemFilter(); // Atualiza o filtro de ordem
  populateGeneroFilter(); // Atualiza o filtro de gênero
  updateStats();
  renderTaxonomyCards(); // Renderiza os cards por ordem/gênero
  renderRecordsTable();
  renderMarkers();
}

// ============================================================
// DADOS E FUNÇÕES DO GUIA DE ESTRUTURAS (Sem alterações)
// ============================================================
const tardigradeStructures = [
  {
    id: "cirros-laterais-A",
    name: "Cirros Laterais A",
    description:
      "Estruturas sensoriais em forma de seta (cA) localizadas lateralmente na cabeça. Essenciais para diferenciar Heterotardigrada (presentes) de Eutardigrada (ausentes).",
    image: "assets/fig1.png",
  },
  {
    id: "cirro-mediano",
    name: "Cirro Mediano",
    description:
      "Uma única estrutura sensorial no centro da cabeça. Comum em Arthrotardigrada, mas ausente em Echiniscoidea.",
    image: "assets/fig2.png",
  },
  {
    id: "placas-dorsais",
    name: "Placas Dorsais e Laterais",
    description:
      "Armadura cuticular protetora encontrada em Echiniscoidea (ex: Echiniscus). Ausente em Eutardigrada.",
    noImage: true,
  },
  {
    id: "papilas-cefalicas",
    name: "Papilas Cefálicas",
    description:
      "Pequenas protuberâncias sensoriais na cabeça, características da Ordem Apochela (ex: Milnesium).",
    image: "assets/papilas.png",
  },
  {
    id: "garras-assimetricas",
    name: "Garras Assimétricas (2-1-2-1)",
    description:
      "Garras de tamanhos ou formas diferentes, com sequência 2-1-2-1. Típico de Hypsibioidea e Isohypsibioidea.",
    image: "assets/fig5.png",
  },
  {
    id: "garras-simetricas",
    name: "Garras Simétricas (2-1-1-2)",
    description:
      "Garras semelhantes em tamanho e forma, com sequência 2-1-1-2. Característica de Macrobiotoidea.",
    image: "assets/fig6.png",
  },
  {
    id: "garras-tipo-Y",
    name: "Garras Tipo Y (Macrobiotidae)",
    description:
      "Garras onde os ramos primário e secundário são fundidos por um trecho, formando um 'Y'.",
    image: "assets/fig7.png",
  },
  {
    id: "garras-tipo-V-L",
    name: "Garras Tipo V ou L (Murrayidae)",
    description:
      "Garras onde os ramos divergem diretamente da base, sem um trecho fundido, formando um 'V' ou 'L'.",
    image: "assets/fig8.png",
  },
  {
    id: "garras-tipo-isohypsibius",
    name: "Garras Tipo Isohypsibius",
    description:
      "Garras onde o ramo secundário forma um ângulo reto (ou maior) com a base da garra.",
    image: "assets/fig9.png",
  },
  {
    id: "garras-tipo-hypsibius",
    name: "Garras Tipo Hypsibius",
    description:
      "Garras externas onde o ramo secundário forma um arco comum com a porção basal.",
    image: "assets/fig10.png",
  },
  {
    id: "lamina-ventral",
    name: "Lâmina Ventral",
    description:
      "Uma estrutura presente no tubo bucal de alguns gêneros, como Doryphoribius.",
    noImage: true,
  },
  {
    id: "lamelas-peribuccais",
    name: "Lamelas Peribuccais",
    description:
      "Anel de lamelas delicadas ao redor da boca. Presentes em gêneros como Pseudobiotus.",
    noImage: true,
  },
];

function renderStructures() {
  const container = document.getElementById("estrutura-cards-container");
  if (!container) return;

  const searchTerm = document
    .getElementById("estrutura-search")
    .value.toLowerCase();

  const filteredStructures = tardigradeStructures.filter(
    (estrutura) =>
      estrutura.name.toLowerCase().includes(searchTerm) ||
      estrutura.description.toLowerCase().includes(searchTerm)
  );

  if (filteredStructures.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">Nenhuma estrutura encontrada.</p>';
    return;
  }

  container.innerHTML = filteredStructures
    .map(
      (estrutura) => `
        <div class="estrutura-card" data-id="${estrutura.id}">
            <div class="estrutura-card-image-container">
                <img src="${
                  estrutura.image || "assets/tardigrade-icon.png"
                }" onerror="this.onerror=null;this.src='assets/tardigrade-photo.jpg'" alt="${escapeHtml(
        estrutura.name
      )}" class="estrutura-card-image">
            </div>
            <div class="estrutura-card-content">
                <h4 class="estrutura-card-title">${escapeHtml(
                  estrutura.name
                )}</h4>
                <p class="estrutura-card-description">${escapeHtml(
                  estrutura.description
                )}</p>
            </div>
        </div>
    `
    )
    .join("");
}

// ============================================================
// INICIALIZAÇÃO DA APLICAÇÃO (Atualizada)
// ============================================================
function init() {
  // Event Listeners para Navegação
  const menuToggleTriggers = document.querySelectorAll(
    ".mobile-menu-btn, .mobile-nav-close"
  );
  menuToggleTriggers.forEach((trigger) => {
    trigger.addEventListener("click", toggleMobileMenu);
  });

  // Gatilhos de navegação atualizados
  const sectionNavTriggers = document.querySelectorAll(
    '.desktop-nav a[href^="#"], .mobile-nav-item[href^="#"], .menu-btn[data-section], .back-btn[data-section]'
  );
  sectionNavTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      // Ignora botões desabilitados (placeholders)
      if (trigger.disabled) return;

      const sectionId =
        trigger.dataset.section || trigger.getAttribute("href").substring(1);
      showSection(sectionId);
    });
  });

  // Event Listener para Formulário
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  // Event Listener para Botão de Localização
  const getLocationBtn = document.getElementById("getLocation");
  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", getLocation);
  }

  // NOVO: Event Listener para Preview de Imagem
  const fotoInput = document.getElementById("foto");
  if (fotoInput) {
    fotoInput.addEventListener("change", handleImagePreview);
  }

  // Event Listener para Filtro de Classes (Mapa)
  const grupoFilter = document.getElementById("grupo-filter");
  if (grupoFilter) {
    grupoFilter.addEventListener("change", () => {
      populateOrdemFilter();
      populateGeneroFilter();
      updateStats();
      renderTaxonomyCards();
      renderRecordsTable();
      renderMarkers();
    });
  }

  // Event Listener para Filtro de Ordem (Mapa)
  const ordemFilter = document.getElementById("ordem-filter");
  if (ordemFilter) {
    ordemFilter.addEventListener("change", () => {
      populateGeneroFilter();
      updateStats();
      renderTaxonomyCards();
      renderRecordsTable();
      renderMarkers();
    });
  }

  // Event Listener para Filtro de Gênero (Mapa)
  const generoFilter = document.getElementById("genero-filter");
  if (generoFilter) {
    generoFilter.addEventListener("change", () => {
      updateStats();
      renderTaxonomyCards();
      renderRecordsTable();
      renderMarkers();
    });
  }

  // Event Listener para Toggle de Visualização (Cards/Tabela)
  const viewToggles = document.querySelectorAll(".view-toggle");
  viewToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const view = toggle.dataset.view;
      viewToggles.forEach((t) => t.classList.remove("active"));
      toggle.classList.add("active");

      const cardsContainer = document.getElementById("taxonomy-cards");
      const tableContainer = document.querySelector(".table-container");

      if (view === "cards") {
        if (cardsContainer) cardsContainer.style.display = "grid";
        if (tableContainer) tableContainer.style.display = "none";
      } else {
        if (cardsContainer) cardsContainer.style.display = "none";
        if (tableContainer) tableContainer.style.display = "block";
      }
    });
  });

  // Event Listener para Filtro da Galeria de Estruturas
  const estruturaSearch = document.getElementById("estrutura-search");
  if (estruturaSearch) {
    estruturaSearch.addEventListener("input", renderStructures);
  }

  // Event Listeners para Delegação (Delete e Chave)
  document.addEventListener("click", (e) => {
    // Botão Deletar
    const deleteButton = e.target.closest(".btn-delete");
    if (deleteButton) {
      const id = deleteButton.dataset.id;
      handleDeleteRecord(id);
    }
  });

  // Listener da Chave Dicotômica
  const keyStepContainer = document.getElementById("key-step");
  if (keyStepContainer) {
    keyStepContainer.addEventListener("click", (event) => {
      const optionButton = event.target.closest(".key-option");
      if (optionButton && optionButton.dataset.step) {
        nextStep(optionButton.dataset.step);
      }
    });
  }

  // Event Listeners para Botões da Chave (Reset/Path)
  const resetKeyBtn = document.getElementById("reset-key-btn");
  if (resetKeyBtn) {
    resetKeyBtn.addEventListener("click", resetKey);
  }

  // Event Listener para Limpar Histórico
  const clearHistoryBtn = document.getElementById("clear-history-btn");
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearAllSearches);
  }

  // Inicialização da Página
  showSection("home");
  // Renderiza os dados iniciais
  renderAll();
  renderStructures(); // Renderiza a galeria (para o filtro)
  loadSavedSearches(); // Carrega o histórico de pesquisas salvas
}

// Executa Inicialização
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ============================================================
// FUNÇÕES UTILITÁRES (escapeHtml)
// ============================================================
function escapeHtml(text) {
  if (typeof text !== "string") {
    return text;
  }
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
