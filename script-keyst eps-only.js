const keySteps = {
  // ============================================================
  // PASSO INICIAL: FILO TARDIGRADA → CLASSES
  // ============================================================
  1: {
    title: "Filo Tardigrada: Classes",
    question: "1. Observe a presença de cirros laterais A na cabeça (Fig. 1):",
    options: [
      {
        text: "1. Cirros laterais A presentes.",
        next: "heterotardigrada_ordens",
        image: "assets/fig1.png",
      },
      {
        text: "1'. Cirros laterais A ausentes (imagem não disponível).",
        next: "eutardigrada_ordens",
        image: "assets/tardigrade-icon.png",
      },
    ],
  },

  // ============================================================
  // CLASSE HETEROTARDIGRADA
  // ============================================================

  // HETEROTARDIGRADA: Ordens
  heterotardigrada_ordens: {
    title: "Classe Heterotardigrada: Ordens",
    question: "1. Observe o cirro mediano e a inserção das garras (Fig. 2):",
    options: [
      {
        text: "1. Cirro mediano geralmente presente; dígitos ou garras inseridos diretamente na perna.",
        next: "arthrotardigrada_result",
        image: "assets/fig2.png",
      },
      {
        text: "1'. Cirro mediano ausente; cada garra inserida na perna (imagem não disponível).",
        next: "echiniscoidea_familias",
        image: "assets/tardigrade-icon.png",
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
    question:
      "1. Observe o número de garras por perna e as placas dorsais (Fig. 3):",
    options: [
      {
        text: "1. Quatro garras por perna em adultos; com placas dorsais-laterais.",
        next: "echiniscidae_result",
        image: "assets/fig4.png",
      },
      {
        text: "1'. Duas garras nas pernas I–III, uma garra na perna IV em adultos; cutícula sem placas dorsais.",
        next: "carphaniidae_result",
        image: "assets/key-images/fig3-duas-garras.jpg",
      },
    ],
  },

  // FAMÍLIA ECHINISCIDAE (resultado final)
  echiniscidae_result: {
    title: "Resultado: Família Echiniscidae",
    result: "Família Echiniscidae",
    description:
      "Quatro garras por perna em adultos; com placas dorsais-laterais (Fig. 3-4). Três gêneros principais: Echiniscus, Pseudechiniscus e Hypechiniscus.",
    image: "assets/fig4.png",
  },

  // FAMÍLIA CARPHANIIDAE (resultado final)
  carphaniidae_result: {
    title: "Resultado: Família Carphaniidae",
    result: "Gênero Carphania",
    description:
      "Um gênero: Carphania. Duas garras nas pernas I–III, uma garra na perna IV; cutícula sem placas dorsais; cirrus A muito curto (imagem não disponível).",
    image: "assets/tardigrade-icon.png",
  },

  // CLASSE EUTARDIGRADA mantém todos os gêneros
  eutardigrada_ordens: {
    title: "Classe Eutardigrada: Ordens",
    question: "1. Observe as papilas cefálicas e os ganchos (Fig. 6):",
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

  milnesium_result: {
    title: "Resultado: Ordem Apochela",
    result: "Gênero Milnesium",
    description:
      "Cabeça com papilas cefálicas; ganchos com ramo secundário não conectado ao primário; ovos lisos colocados dentro do exúvio; limnoterrestre (Fig. 7).",
    image: "assets/key-results/Milnesium.jpg",
  },

  parachela_superfamilias: {
    title: "Ordem Parachela: Superfamílias",
    question: "1. Observe os filamentos bucais-faríngeos (Fig. 8):",
    options: [
      {
        text: "1. Filamentos bucais-faríngeos rígidos (com espessamento na cutícula).",
        next: "isohypsibioidea_familias",
        image: "assets/key-images/fig8-filamentos-rigidos.jpg",
      },
      {
        text: "1'. Filamentos bucais-faríngeos flexíveis (sem espessamento na cutícula).",
        next: "macrobiotoidea_familias",
        image: "assets/fig6.png",
      },
    ],
  },

  isohypsibioidea_familias: {
    title: "Superfamília Isohypsibioidea: Famílias",
    question:
      "1. Observe as estruturas da faringe e presença de olhos (Fig. 9-10):",
    options: [
      {
        text: "1. Três macroplacóides e microplacóide entre o 2º e 3º macroplacóides; olhos ausentes.",
        next: "isohypsibiidae_generos_1",
        image: "assets/key-images/fig9-macro-micro.jpg",
      },
      {
        text: "1'. Dois macroplacóides; olhos presentes ou, se ausentes, com pontos pigmentados.",
        next: "hypsibiidae_generos_1",
        image: "assets/fig10.png",
      },
    ],
  },

  isohypsibiidae_generos_1: {
    title: "Família Isohypsibiidae: Gêneros (1/4)",
    question: "1. Observe as garras duplas (Fig. 9):",
    options: [
      {
        text: "1. Garras duplas de comprimentos equivalentes (simétricas).",
        next: "isohypsibiidae_generos_2",
        image: "assets/key-images/fig9-garras-simetricas.jpg",
      },
      {
        text: "1'. Garras duplas externas significativamente maiores que as internas (assimétricas).",
        next: "eohypsibius_result",
        image: "assets/key-results/Eohypsibius.jpg",
      },
    ],
  },

  eohypsibius_result: {
    title: "Resultado: Gênero Eohypsibius",
    result: "Gênero Eohypsibius",
    description:
      "Garras duplas externas significativamente maiores que as internas; gigas cuticulares presentes (Fig. 9).",
    image: "assets/key-results/Eohypsibius.jpg",
  },

  isohypsibiidae_generos_2: {
    title: "Família Isohypsibiidae: Gêneros (2/4)",
    question: "2(1). Observe os poros cuticulares (Fig. 10):",
    options: [
      {
        text: "2. Poros cuticulares ausentes.",
        next: "isohypsibiidae_generos_3",
        image: "assets/key-images/fig10-poros-ausentes.jpg",
      },
      {
        text: "2'. Poros cuticulares presentes.",
        next: "dianea_result",
        image: "assets/key-results/Dianea.jpg",
      },
    ],
  },

  dianea_result: {
    title: "Resultado: Gênero Dianea",
    result: "Gênero Dianea",
    description: "Poros cuticulares presentes (Fig. 10).",
    image: "assets/key-results/Dianea.jpg",
  },

  isohypsibiidae_generos_3: {
    title: "Família Isohypsibiidae: Gêneros (3/4)",
    question:
      "3(2). Observe as lamelas peribuccais ao redor da boca (Fig. 11):",
    options: [
      {
        text: "3. Lamelas peribuccais ao redor da abertura bucal ausentes.",
        next: "isohypsibius_result",
        image: "assets/key-images/fig11-lamelas-ausentes.jpg",
      },
      {
        text: "3'. Lamelas peribuccais presentes (pode ser difícil de ver).",
        next: "isohypsibiidae_generos_4",
        image: "assets/key-images/fig11-lamelas-presentes.jpg",
      },
    ],
  },

  isohypsibius_result: {
    title: "Resultado: Gênero Isohypsibius",
    result: "Gênero Isohypsibius",
    description:
      "Lamelas peribuccais ao redor da abertura bucal ausentes (Fig. 11).",
    image: "assets/key-results/Isohypsibius.jpg",
  },

  isohypsibiidae_generos_4: {
    title: "Família Isohypsibiidae: Gêneros (4/4)",
    question: "4(3). Conte as lamelas peribuccais (Fig. 11):",
    options: [
      {
        text: "4. Cerca de 30 lamelas peribuccais presentes.",
        next: "pseudobiotus_result",
        image: "assets/key-results/Pseudobiotus.jpg",
      },
      {
        text: "4'. Doze lamelas peribuccais presentes, frequentemente fundidas.",
        next: "thulinius_result",
        image: "assets/key-results/Thulinius.jpg",
      },
    ],
  },

  pseudobiotus_result: {
    title: "Resultado: Gênero Pseudobiotus",
    result: "Gênero Pseudobiotus",
    description: "Cerca de 30 lamelas peribuccais presentes (Fig. 11).",
    image: "assets/key-results/Pseudobiotus.jpg",
  },

  thulinius_result: {
    title: "Resultado: Gênero Thulinius",
    result: "Gênero Thulinius",
    description:
      "Doze lamelas peribuccais presentes, frequentemente fundidas; uma ou duas barras cuticulares sob as bases das garras (Fig. 11).",
    image: "assets/key-results/Thulinius.jpg",
  },

  hypsibiidae_generos_1: {
    title: "Família Hypsibiidae: Gêneros (1/5)",
    question: "1. Observe o tipo das garras externas (Fig. 9):",
    options: [
      {
        text: "1. Garras externas do tipo Isohypsibius (ramo secundário formando ângulo reto).",
        next: "hypsibiidae_generos_2",
        image: "assets/key-images/fig9-garras-isohypsibius.jpg",
      },
      {
        text: "1'. Garras externas do tipo Hypsibius (ramo secundário formando arco).",
        next: "hypsibiidae_generos_3",
        image: "assets/key-images/fig9-garras-hypsibius.jpg",
      },
    ],
  },

  hypsibiidae_generos_2: {
    title: "Família Hypsibiidae: Gêneros (2/5)",
    question: "2(1). Observe o tipo das garras internas (Fig. 9):",
    options: [
      {
        text: "2. Garras internas do tipo Isohypsibius modificado (ângulo > 90 graus); apofises assimétricas.",
        next: "mixibius_result",
        image: "assets/key-results/Mixibius.jpg",
      },
      {
        text: "2'. Garras internas do tipo Hypsibius; apofises simétricas.",
        next: "acutuncus_result",
        image: "assets/key-results/Acutuncus.jpg",
      },
    ],
  },

  mixibius_result: {
    title: "Resultado: Gênero Mixibius",
    result: "Gênero Mixibius",
    description:
      "Garras internas do tipo Isohypsibius modificado (ângulo > 90 graus); apofises assimétricas (Fig. 9).",
    image: "assets/key-results/Mixibius.jpg",
  },

  acutuncus_result: {
    title: "Resultado: Gênero Acutuncus",
    result: "Gênero Acutuncus",
    description:
      "Garras internas do tipo Hypsibius; apofises simétricas; ovos com processos postos livremente (Fig. 9).",
    image: "assets/key-results/Acutuncus.jpg",
  },

  hypsibiidae_generos_3: {
    title: "Família Hypsibiidae: Gêneros (3/5)",
    question: "3(1). Observe a estrutura do tubo bucal (Fig. 12):",
    options: [
      {
        text: "3. Tubo bucal rígido, sem parte posterior de composição flexível e espiral.",
        next: "hypsibius_result",
        image: "assets/key-images/fig12-tubo-rigido.jpg",
      },
      {
        text: "3'. Tubo bucal com parte posterior de composição flexível e espiral (tubo faríngeo).",
        next: "hypsibiidae_generos_4",
        image: "assets/key-images/fig12-tubo-flexivel.jpg",
      },
    ],
  },

  hypsibius_result: {
    title: "Resultado: Gênero Hypsibius",
    result: "Gênero Hypsibius",
    description:
      "Tubo bucal rígido, sem parte posterior de composição flexível e espiral (Fig. 12); limnoterrestre.",
    image: "assets/key-results/Hypsibius.jpg",
  },

  hypsibiidae_generos_4: {
    title: "Família Hypsibiidae: Gêneros (4/5)",
    question:
      "4(3). Observe o espessamento em forma de gota no tubo bucal (Fig. 12):",
    options: [
      {
        text: "4. Espessamento em forma de gota (entre as porções rígidas e flexíveis) AUSENTE.",
        next: "adropion_result",
        image: "assets/key-images/fig12-sem-gota.jpg",
      },
      {
        text: "4'. Espessamento em forma de gota (entre as porções rígidas e flexíveis) PRESENTE.",
        next: "hypsibiidae_generos_5",
        image: "assets/key-images/fig12-com-gota.jpg",
      },
    ],
  },

  adropion_result: {
    title: "Resultado: Gênero Adropion",
    result: "Gênero Adropion",
    description:
      "Espessamento em forma de gota entre as porções rígidas e flexíveis do tubo bucal ausente (Fig. 12).",
    image: "assets/key-results/Adropion.jpg",
  },

  hypsibiidae_generos_5: {
    title: "Família Hypsibiidae: Gêneros (5/5)",
    question:
      "5(4). Observe os macroplacóides (estruturas na faringe) (Fig. 13):",
    options: [
      {
        text: "5. Dois macroplacóides semelhantes em comprimento, organizados em fileiras (parecem parênteses); septo presente.",
        next: "pilatobius_result",
        image: "assets/key-images/fig13-dois-macroplacoides-septo.jpg",
      },
      {
        text: "5'. Dois macroplacóides sem septo OU três macroplacóides com ou sem septo.",
        next: "diphascon_result",
        image: "assets/key-images/fig13-macroplacoides-variados.jpg",
      },
    ],
  },

  pilatobius_result: {
    title: "Resultado: Gênero Pilatobius",
    result: "Gênero Pilatobius",
    description:
      "Dois macroplacóides semelhantes em comprimento, organizados em fileiras (parecem parênteses); septo presente (Fig. 13).",
    image: "assets/key-results/Pilatobius.jpg",
  },

  diphascon_result: {
    title: "Resultado: Gênero Diphascon",
    result: "Gênero Diphascon",
    description:
      "Dois macroplacóides sem septo ou três macroplacóides com ou sem septo (Fig. 13).",
    image: "assets/key-results/Diphascon.jpg",
  },

  macrobiotoidea_familias: {
    title: "Superfamília Macrobiotoidea: Famílias",
    question: "1. Observe o formato das garras e a lâmina ventral (Fig. 14):",
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

  murrayidae_generos: {
    title: "Família Murrayidae: Gêneros",
    question: "1. Observe as garras e espessamentos cuticulares (Fig. 14):",
    options: [
      {
        text: "1. Garras em forma de L muito bem desenvolvidas, com espessamentos cuticulares conectando a base das garras em cada perna.",
        next: "dactylobiotus_result",
        image: "assets/key-results/Dactylobiotus.jpg",
      },
      {
        text: "1'. Garras em forma de V, sem espessamentos cuticulares conectando a base das garras em cada perna, com lunulas.",
        next: "murrayon_result",
        image: "assets/key-results/Murrayon.jpg",
      },
    ],
  },

  dactylobiotus_result: {
    title: "Resultado: Gênero Dactylobiotus",
    result: "Gênero Dactylobiotus",
    description:
      "Garras em forma de L muito bem desenvolvidas, com espessamentos cuticulares conectando a base das garras em cada perna (Fig. 14); limnoterrestres.",
    image: "assets/key-results/Dactylobiotus.jpg",
  },

  murrayon_result: {
    title: "Resultado: Gênero Murrayon",
    result: "Gênero Murrayon",
    description:
      "Garras em forma de V, sem espessamentos cuticulares conectando a base das garras em cada perna, com lunulas (Fig. 14); limnoterrestres.",
    image: "assets/key-results/Murrayon.jpg",
  },

  macrobiotidae_generos_1: {
    title: "Família Macrobiotidae: Gêneros (1/3)",
    question: "1. Conte os macroplacóides na faringe (Fig. 13):",
    options: [
      {
        text: "1. Três macroplacóides.",
        next: "macrobiotidae_generos_2",
        image: "assets/key-images/fig13-tres-macroplacoides.jpg",
      },
      {
        text: "1'. Dois macroplacóides; microplacóide, se presente, próximo ao segundo macroplacóide.",
        next: "macrobiotus_result",
        image: "assets/key-results/Macrobiotus.jpg",
      },
    ],
  },

  macrobiotus_result: {
    title: "Resultado: Gênero Macrobiotus",
    result: "Gênero Macrobiotus",
    description:
      "Dois macroplacóides; microplacóide, se presente, próximo ao segundo macroplacóide; cutícula com ou sem poros; ovos com processos de vários tipos (Fig. 13).",
    image: "assets/key-results/Macrobiotus.jpg",
  },

  macrobiotidae_generos_2: {
    title: "Família Macrobiotidae: Gêneros (2/3)",
    question:
      "2(1). Observe a forma dos macroplacóides e lamelas bucais (Fig. 13):",
    options: [
      {
        text: "2. Macroplacóides em forma de haste; lamelas bucais presentes.",
        next: "macrobiotidae_generos_3",
        image: "assets/key-images/fig13-macroplacoides-haste.jpg",
      },
      {
        text: "2'. Macroplacóides redondos; microplacóide presente; lamelas bucais ausentes.",
        next: "minibiotus_result",
        image: "assets/key-results/Minibiotus.jpg",
      },
    ],
  },

  minibiotus_result: {
    title: "Resultado: Gênero Minibiotus",
    result: "Gênero Minibiotus",
    description:
      "Macroplacóides redondos; microplacóide presente; lamelas bucais ausentes; pápulas presentes (Fig. 13).",
    image: "assets/key-results/Minibiotus.jpg",
  },

  macrobiotidae_generos_3: {
    title: "Família Macrobiotidae: Gêneros (3/3)",
    question:
      "3(2). Observe a posição do microplacóide (se presente) (Fig. 13):",
    options: [
      {
        text: "3. Microplacóide sempre presente e claramente próximo ao terceiro macroplacóide (menos que seu comprimento).",
        next: "mesobiotus_result",
        image: "assets/key-results/Mesobiotus.jpg",
      },
      {
        text: "3'. Microplacóide, se presente, distante do terceiro macroplacóide (mais que seu comprimento).",
        next: "paramacrobiotus_result",
        image: "assets/key-results/Paramacrobiotus.jpg",
      },
    ],
  },

  mesobiotus_result: {
    title: "Resultado: Gênero Mesobiotus",
    result: "Gênero Mesobiotus",
    description:
      "Microplacóide sempre presente e claramente próximo ao terceiro macroplacóide (menos que seu comprimento); garra característica com septo interno (Fig. 13).",
    image: "assets/key-results/Mesobiotus.jpg",
  },

  paramacrobiotus_result: {
    title: "Resultado: Gênero Paramacrobiotus",
    result: "Gênero Paramacrobiotus",
    description:
      "Microplacóide, se presente, distante do terceiro macroplacóide (mais que seu comprimento); ovos sempre com grandes processos reticulados (Fig. 13).",
    image: "assets/key-results/Paramacrobiotus.jpg",
  },
};
