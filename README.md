# Incógnito: A Fuga do Algoritmo

https://anderitmo.github.io/game-incognito/


> **Os Moldes da Educação: Entre a Fabricação do "Capital Humano" e a Emancipação pela Cultura Técnica**

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-brightgreen)
![Tech](https://img.shields.io/badge/Tecnologia-HTML5%20Canvas%20%7C%20Vanilla%20JS-blue)

[Jogue online ](https://anderitmo.github.io/game-incognito/)

## 📖 Sobre o Projeto

**Incógnito** é um jogo de plataforma 2D executável direto no navegador, desenvolvido como um projeto prático para a disciplinas **Sociedade, Trabalho e Educação** do **Programa de Pós-graduação Profissional em Gestão e Desenvolvimento da Educação Profissional** ministrados pelos docentes Prof. Dr. Emerson Freire e Profa. Dra. Juliana Augusta Verona.

O objetivo principal é traduzir conceitos acadêmicos complexos — como o **Capitalismo de Vigilância** de Shoshana Zuboff, a Cultura Técnica e a Tecno-estética — em mecânicas interativas de *Game Design*.

Neste jogo, as regras clássicas dos videogames são subvertidas: coletar itens brilhantes não garante pontos, mas sim a extração massiva dos seus dados pessoais por *Big Techs*.

---

## 🎮 Mecânicas e Game Design Subversivo

Para ensinar através da interação, o jogo adota mecânicas baseadas em teorias reais:

* **A Isca do "Feed" (Os Cookies):** Em vez de moedas, o cenário possui "Likes" e "Cookies" brilhantes. Coletá-los **reduz** a sua Barra de Privacidade. O desafio é resistir à conveniência e desviar das recompensas.
* **Vigilância Ativa e Passiva:** Inimigos não causam dano físico, mas extraem dados. Drones patrulham as redes, assistentes de voz emitem ondas de escuta e algoritmos preditivos alteram as plataformas sob seus pés.
* **Citações Dinâmicas:** Telas de *Game Over* (Vazamento de Dados) e *Vitória* (Servidor Seguro) exibem citações reais de Shoshana Zuboff sorteadas aleatoriamente para provocar reflexão acadêmica.

---

## 🗺️ O Mapa de Fases (Roteiro Acadêmico)

O avanço de níveis acompanha a progressão do escopo do mestrado:

1. **O Vale do Feed (A Conveniência):** O rastreamento nas redes sociais e a alienação algorítmica.
2. **A Casa Inteligente (Internet das Coisas):** A invasão do espaço privado através de assistentes de voz e eletrodomésticos.
3. **O Mercado de Futuros (A Matrix):** O núcleo de processamento, onde o comportamento humano vira matéria-prima (Estética Cyberpunk/Glitch).
4. **Quebrando o Molde (Cultura Técnica):** O momento de resistência e emancipação, abrindo a "caixa preta" da tecnologia com a ajuda da academia.
5. **O Molde da Tecno-estética:** A tecnologia não apenas como máquina, mas como sensibilidade artística e expressão humana.

---

## 👥 Corpo Docente (Personagens)

O jogador escolhe seu avatar e recebe ajuda de NPCs (Personagens Aliados) baseados em professores reais do programa, cada um com seus próprios focos de pesquisa e bordões (*Idle Quotes*):

* **Avatares Jogáveis:**
  * **Prof. Emerson** (Azul) - *"Do que eu estava falando mesmo?"*
  * **Profª. Juliana** (Verde) - *"Como eu sou geógrafa, vou puxar para o meu lado..."*
* **Companheiros Aliados (Apoio na Gameplay):**
  * **Profª. Celi** - Ajuda o jogador na Fase 4 desativando rastreadores temporariamente jogando livros. (*"Pergunte ao seu orientador!"*)
  * **Prof. Giordano** - Presta apoio na Fase 5. (*"Se eu estiver na sua banca eu vou perguntar!"*)

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído do zero, sem o uso de engines externas (como Unity ou Phaser), garantindo leveza e compreensão profunda do código:

* **HTML5 `<canvas>`:** Para renderização gráfica a 60FPS.
* **CSS3:** Para a interface minimalista de menus e balões de diálogo.
* **Vanilla JavaScript:** Para o *Game Loop*, física de colisões, controle de estados e lógica de entidades.
* **Web Audio API:** Sintetizador nativo do JavaScript para criar efeitos sonoros processuais (ondas senoidais e quadradas), dispensando arquivos `.mp3`.

---

## 🚀 Como Executar o Jogo

1. Você pode jogar on-line:
[Jogue online ](https://anderitmo.github.io/game-incognito/)

2. Pode baixar os arquivos, descompactar e abrir o arquivo index.html

3. Pode clonar o repositório: 
O jogo roda inteiramente no lado do cliente (Client-side). Não é necessário instalar Node.js, bancos de dados ou servidores complexos.

   ```bash
   git clone [https://github.com/seu-usuario/incognito-jogo-mestrado.git](https://github.com/seu-usuario/incognito-jogo-mestrado.git)
