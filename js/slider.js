"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const nextBtn = document.querySelector(".slider-btn-right");
  const prevBtn = document.querySelector(".slider-btn-left");
  const slider = document.querySelector(".services-slider");

  if (!track) {
    console.error("No existe .slider-track");
    return;
  }

  let originalCards = [...document.querySelectorAll(".service-card")];

  if (originalCards.length === 0) {
    console.error("No existen .service-card");
    return;
  }

  // ===============================
  // RESPONSIVE CARDS
  // ===============================

  function getVisibleCards() {
    return window.innerWidth <= 544 ? 1 : 3;
  }

  let visibleCards = getVisibleCards();
  let index = visibleCards;

  // ===============================
  // CLONES
  // ===============================

  function createClones() {
    // limpiar clones anteriores
    document.querySelectorAll(".clone").forEach((card) => card.remove());

    const firstClones = originalCards.slice(0, visibleCards).map((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    });

    const lastClones = originalCards.slice(-visibleCards).map((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    });

    lastClones.reverse().forEach((card) => {
      track.prepend(card);
    });

    firstClones.forEach((card) => {
      track.append(card);
    });

    cards = [...document.querySelectorAll(".service-card")];
  }

  let cards;

  createClones();

  // ===============================
  // DIMENSIONES
  // ===============================

  let cardSize;

  function calculateSize() {
    const gap = parseInt(getComputedStyle(track).gap);

    cardSize = cards[0].offsetWidth + gap;
  }

  calculateSize();

  function moveSlider() {
    track.style.transform = `translateX(-${index * cardSize}px)`;
  }

  function resetPosition() {
    track.style.transition = "none";

    moveSlider();

    requestAnimationFrame(() => {
      track.style.transition = "transform .5s ease";
    });
  }

  resetPosition();

  // ===============================
  // BOTONES
  // ===============================

  function next() {
    index++;

    moveSlider();
  }

  function previous() {
    index--;

    moveSlider();
  }

  nextBtn.addEventListener("click", next);

  prevBtn.addEventListener("click", previous);

  // ===============================
  // LOOP INFINITO
  // ===============================

  track.addEventListener("transitionend", () => {
    if (index >= cards.length - visibleCards) {
      index = visibleCards;

      resetPosition();
    }

    if (index <= 0) {
      index = cards.length - visibleCards * 2;

      resetPosition();
    }
  });

  // ===============================
  // RESPONSIVE
  // ===============================

  window.addEventListener("resize", () => {
    const newVisibleCards = getVisibleCards();

    if (newVisibleCards !== visibleCards) {
      visibleCards = newVisibleCards;

      index = visibleCards;

      createClones();

      calculateSize();

      resetPosition();

      return;
    }

    calculateSize();

    resetPosition();
  });

  // ===============================
  // AUTOPLAY
  // ===============================

  let autoplay = setInterval(next, 5000);

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  slider.addEventListener("mouseleave", () => {
    autoplay = setInterval(next, 5000);
  });
});

/* Slider Proceso de Purificación" */

const processCards = [...document.querySelectorAll(".card-process")];
const btnLeft = [...document.querySelectorAll(".slider-btn-left")];
const btnRight = [...document.querySelectorAll(".slider-btn-right")];
let contador = 0;

processCards[contador].classList.remove("hidden");

const nextCard = function () {
  if (contador >= processCards.length - 1) return;

  processCards[contador].classList.add("hidden");
  contador++;
  processCards[contador].classList.remove("hidden");
};

const previousCard = function () {
  if (contador <= 0) return;

  processCards[contador].classList.add("hidden");
  contador--;
  processCards[contador].classList.remove("hidden");
};

btnLeft[1].addEventListener("click", previousCard);
btnRight[1].addEventListener("click", nextCard);
