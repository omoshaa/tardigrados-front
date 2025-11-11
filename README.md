# 🐻 TardiStudy - Portal de Estudos de Tardigrada

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/omoshaa/tardigrados-front)

Portal educativo especializado no estudo de Tardigrada (tardígrados ou "ursos d'água") com mapa interativo, sistema de cadastro e chaves dicotômicas para identificação.

## 📋 Sobre o Projeto

O TardiStudy é um projeto educacional desenvolvido como parte do **Projeto PUNE (Projeto Urso Na Escola)** em parceria com o LEOM-UNICAMP (Laboratório de Evolução de Organismos Meiofaunais). O objetivo é facilitar o aprendizado sobre tardígrados através de ferramentas interativas.

### ✨ Funcionalidades Principais

- 🗺️ **Mapa Interativo**: Visualize a distribuição geográfica de registros de tardígrados
- 🔍 **Chave Dicotômica**: Sistema de identificação passo a passo para classificar espécimes
- 📝 **Cadastro de Achados**: Registre e compartilhe descobertas de tardígrados
- 📊 **Estatísticas**: Visualize dados sobre classes, ordens e gêneros
- 📚 **Material Educativo**: Informações detalhadas sobre biologia e ecologia dos tardígrados
- 🖼️ **Galeria de Estruturas**: Biblioteca visual de características morfológicas

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo com variáveis CSS e Glassmorphism
- **JavaScript (ES6+)** - Lógica da aplicação (SPA)
- **Leaflet.js** - Mapa interativo com OpenStreetMap
- **Moment.js** - Formatação de datas
- **Font Awesome** - Ícones
- **LocalStorage** - Armazenamento de dados no navegador

## 📦 Instalação e Uso

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desenvolvimento)

### Opção 1: Uso Direto

1. Clone o repositório:

```bash
git clone https://github.com/omoshaa/tardigrados-front.git
cd tardigrados-front
```

2. Abra o arquivo `index.html` diretamente no navegador.

### Opção 2: Servidor Local (Recomendado)

Para desenvolvimento, recomenda-se usar um servidor local:

**Com Python:**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Com Node.js:**

```bash
npx http-server -p 8000
```

**Com PHP:**

```bash
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 📂 Estrutura do Projeto

```
tardigrados-front/
├── index.html              # Página principal
├── style.css               # Estilos e tema
├── script.js               # Lógica da aplicação
├── manifest.json           # Configuração PWA
├── .htaccess               # Configurações Apache (cache, segurança)
├── LICENSE                 # Licença MIT
├── README.md               # Este arquivo
└── assets/                 # Imagens e recursos
    ├── tardigrade-icon.png
    ├── fig1.png
    ├── fig2.png
    └── ...
```

## 🎯 Funcionalidades Detalhadas

### Mapa de Tardigrada

- Visualização de todos os registros em mapa interativo
- Filtros por Classe, Ordem e Gênero
- Estatísticas em tempo real
- Popups informativos com detalhes de cada registro
- Alternância entre visualização em cards e tabela

### Identificação

- **Chave Dicotômica**: Sistema de perguntas e respostas para identificação
- **Cadastro de Achados**: Formulário com validação de coordenadas
- **Histórico de Identificações**: Salva identificações anteriores
- **Galeria de Estruturas**: Biblioteca visual com zoom de imagens

### Sobre Tardígrados

- Informações sobre características biológicas
- Curiosidades e capacidades de sobrevivência
- Ecologia e distribuição
- Material de apoio educativo

## 🔧 Configuração

### Cache e Performance

O arquivo `.htaccess` está configurado para:

- Cache de imagens por 1 semana
- Cache de CSS/JS por 1 hora
- Compressão GZIP
- Headers de segurança (XSS, Clickjacking, etc.)

### PWA (Progressive Web App)

O projeto inclui `manifest.json` para instalação como aplicativo web:

- Funciona offline (após primeira visita)
- Ícones para instalação em dispositivos móveis
- Tema personalizado

## 👥 Equipe

### Coordenação

- **Danilo de Castro Santos** - Professor coordenador do PUNE
  - Email: danilocastros@prof.educacao.sp.gov.br
  - Instagram: [@ursonaescola](https://instagram.com/ursonaescola)

### Consultoria Científica

- **Prof. Dr. André Reinaldo Senna Garraffoni**
  - Universidade Estadual de Campinas (UNICAMP)
  - Especialista em Tardigrada

### Desenvolvimento Web

- **Moisés Silva** - Desenvolvedor Frontend
  - GitHub: [@omoshaa](https://github.com/omoshaa)

### Estudantes Colaboradores (Projeto PUNE)

- Gabriel Paschoa Ranuzia Marciel
- Giovanna Emanuelle da Silva Masson Bassanin
- Davi Bernardes Soldeira
- Daniel Mizael Spagiari de Souza
- Sophia Clemente Marcelino
- Ana Lívia Rodrigues

### Escolas Parceiras

- EE Prof. Aprígio Gonzaga (SP)
- EE Julio de Mesquita (Campinas)
- EE Maria de Lourdes (Campinas)

### Parceria Institucional

- **LEOM-UNICAMP** - Laboratório de Evolução de Organismos Meiofaunais

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📮 Contato

Para mais informações, dúvidas ou colaborações:

- 📧 Email: danilocastros@prof.educacao.sp.gov.br
- 📱 Instagram: [@ursonaescola](https://instagram.com/ursonaescola)
- 🐙 GitHub: [omoshaa/tardigrados-front](https://github.com/omoshaa/tardigrados-front)

## 🙏 Agradecimentos

- LEOM-UNICAMP pela parceria científica
- Escolas participantes do Projeto PUNE
- Todos os estudantes e professores envolvidos
- Comunidade OpenStreetMap pelos mapas
- Desenvolvedores das bibliotecas open-source utilizadas

---

**Desenvolvido com 💚 pelo Projeto PUNE**

© 2025 TardiStudy - Portal Educativo Especializado em Tardigrada
