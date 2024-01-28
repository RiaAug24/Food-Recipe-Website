"use strict";

/**
 * API Setup
 */

import {fetchData} from "./app.js"
import { cardQueries } from "./app.js";
import { $skeletonCard } from "./app.js";
/**
 * home page search
 */

const $searchField = document.querySelector("[data-search-field]");
const $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function () {
  if ($searchField.value)
    window.location = `/recipe.html?q=${$searchField.value}`;
});

/**
 * Search submit when press "Enter" key
 */

$searchField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") $searchBtn.click();
});

/**
 * Tab panel navigation
 */

const $tabBtns = document.querySelectorAll("[data-tab-btn]");

const $tabPanels = document.querySelectorAll("[data-tab-panel]");

let [$lastActiveTabPanel] = $tabPanels;

let [$lastActiveTabBtn] = $tabBtns;

window.addEventOnElements = ($elements, eventType, callBack) => {
  for (const $element of $elements) {
    $element.addEventListener(eventType, callBack);
  }
};

addEventOnElements($tabBtns, "click", function () {
  $lastActiveTabPanel.setAttribute("hidden", "");
  $lastActiveTabBtn.setAttribute("aria-selected", false);
  $lastActiveTabBtn.setAttribute("tabindex", -1);

  const $currentTabPanel = document.querySelector(
    `#${this.getAttribute("aria-controls")}`
  );

  $currentTabPanel.removeAttribute("hidden");
  this.setAttribute("aria-selected", true);
  this.setAttribute("tabindex", 0);

  $lastActiveTabPanel = $currentTabPanel;
  $lastActiveTabBtn = this;

  addTabContent(this, $currentTabPanel);
});


const addTabContent = ($currentTabBtn, $currentTabPanel) => {
  const $gridList = document.createElement("div");

  $gridList.classList.add("grid-list");

  $currentTabPanel.innerHTML = `
  <ul class="container grid-list">
  ${$skeletonCard.repeat(12)}
  </div>
  `;

  fetchData(
    [
      ["mealType", $currentTabBtn.textContent.trim().toLowerCase()],
      ...cardQueries,
    ],

    function (data) {
      //console.log(data);

      $currentTabPanel.innerHTML = "";

      for (let i = 0; i < 12; i++) {
        const {
          recipe: { image, label: title, totalTime: cookingTime, uri },
        } = data.hits[i];

        const recipeId = uri.slice(uri.lastIndexOf("_") + 1);

        const isSaved = window.localStorage.getItem(`foodyz-recipe${recipeId}`);

        const $card = document.createElement("div");
        $card.classList.add("card");
        $card.style.animationDelay = `${100 * i}ms`;

        $card.innerHTML = `
        <figure class="card-media img-holder">
          <img src="${image}" loading="lazy" class="img-cover" alt="${title}" />
        </figure>

        <div class="card-body">
          <h3 class="title-small">
            <a href="detail.html?recipe=${recipeId}" class="card-link">${
          title ?? "Untitled"
        }</a>
          </h3>
          <div class="meta-wrapper">
            <div class="meta-item">
              <span aria-hidden="true">
                <i class="fa-regular fa-clock"></i></span>
              <span class="label-medium" style="margin-left: 0.25rem">
                ${getTime(cookingTime).time || "< 1"} ${
          getTime(cookingTime).timeUnit
        }</span>
            </div>
            <button class="icon-btn has-state ${
              isSaved ? "saved" : "removed"
            }" aria-label="Add to saved recipes" onclick="saveRecipe(this, '${recipeId}')">
              <span class="bookmark-add" aria-hidden="true">
                <i class="fa-regular fa-bookmark"></i>
              </span>

              <span class="bookmark-remove" aria-hidden="true">
                <i class="fa-regular fa-trash-can"></i>
              </span>
            </button>
          </div>
        </div>
        `;

        $gridList.appendChild($card);
      }

      $currentTabPanel.appendChild($gridList);

      $currentTabPanel.innerHTML += `

      <a href="./recipe.html?mealType=${$currentTabBtn.textContent
        .trim()
        .toLowerCase()}" class="btn btn-secondary label-large has-state">Show more</a>
      `;
    }
  );
};

addTabContent($lastActiveTabBtn, $lastActiveTabPanel);

const getTime = (minute) => {
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  const time = day || hour || minute;
  const unitIndex = [day, hour, minute].lastIndexOf(time);
  const timeUnit = ["days", "hours", "minutes"][unitIndex];

  return { time, timeUnit };
};

const ROOT = "https://api.edamam.com/api/recipes/v2";
window.saveRecipe = function (element, recipeId) {
  const isSaved = window.localStorage.getItem(`foodyz-recipe${recipeId}`);
  ACCESS_POINT = `${ROOT}/${recipeId}`;

  if (!isSaved) {
    fetchData(cardQueries, function (data) {
      window.localStorage.setItem(
        `foodyz-recipe${recipeId}`,
        JSON.stringify(data)
      );
      element.classList.toggle("saved");
      element.classList.toggle("removed");
      showNotificationMessage("Added to Saved Recipes")
    });
    ACCESS_POINT = ROOT;
  } else {
    window.localStorage.removeItem(`foodyz-recipe${recipeId}`);
    element.classList.toggle("saved");
    element.classList.toggle("removed");
    showNotificationMessage("Removed from Saved Recipes")
  }
};

/**
 * Fetch data for slider card
 */

let cuisineType = ["Asian", "French"];
const $sliderSections = document.querySelectorAll("[data-slider-section]");

for (const [index, $sliderSection] of $sliderSections.entries()) {
  $sliderSection.innerHTML = `
  <div class="container">
     <h2 class="section-title headline-small" id="slider-label-1">
    Latest ${cuisineType[index]} Recipes
     </h2>
     <div class="slider">
     <ul class="slider-wrapper" data-slider-wrapper>
     ${`<li class="slider-item">${$skeletonCard}</li>`.repeat(10)}
     </ul>
  </div>
  `;

  const $sliderWrapper = $sliderSection.querySelector("[data-slider-wrapper]");

  fetchData(
    [...cardQueries, ["cuisineType", cuisineType[index]]],
    function (data) {
      $sliderWrapper.innerHTML = "";

      data.hits.map((item) => {
        const {
          recipe: { image, label: title, totalTime: cookingTime, uri },
        } = item;

        const recipeId = uri.slice(uri.lastIndexOf("_") + 1);

        const isSaved = window.localStorage.getItem(`foodyz-recipe${recipeId}`);

        const $sliderItem = document.createElement("li");

        $sliderItem.classList.add("slider-item");

        $sliderItem.innerHTML = `

        <div class="card">
        <figure class="card-media img-holder">
        <img src="${image}" loading="lazy" class="img-cover" alt="${title}" />
      </figure>

      <div class="card-body">
        <h3 class="title-small">
          <a href="detail.html?recipe=${recipeId}" class="card-link">${
          title ?? "Untitled"
        }</a>
        </h3>
        <div class="meta-wrapper">
          <div class="meta-item">
            <span aria-hidden="true">
              <i class="fa-regular fa-clock"></i></span>
            <span class="label-medium" style="margin-left: 0.25rem">
              ${getTime(cookingTime).time || "< 1"} ${
          getTime(cookingTime).timeUnit
        }</span>
          </div>
          <button class="icon-btn has-state ${
            isSaved ? "saved" : "removed"
          }" aria-label="Add to saved recipes" onclick="saveRecipe(this, '${recipeId}')">
            <span class="bookmark-add" aria-hidden="true">
              <i class="fa-regular fa-bookmark"></i>
            </span>

            <span class="bookmark-remove" aria-hidden="true">
              <i class="fa-regular fa-trash-can"></i>
            </span>
          </button>
        </div>
      </div>
      </div>
      `;

        $sliderWrapper.appendChild($sliderItem);
      });

      $sliderWrapper.innerHTML += `

      <li class="slider-item" data-slider-item>
      <a href="recipe.html?cuisineType=${cuisineType[
        index
      ].toLowerCase()}" class="load-more-card has-state">
        <span class="label-large">Show more</span>
        <span aria-hidden="true"
          ><i class="fa-regular fa-share-from-square"></i
        ></span>
      </a>
    </li>

      `;
    }
  );
}

const $snackbarContainer = document.createElement("div");
$snackbarContainer.classList.add("snackbar-container");
document.body.appendChild($snackbarContainer);

function showNotificationMessage(message) {
  const $snackbar = document.createElement("div");
  $snackbar.classList.add("snackbar");
  $snackbar.innerHTML = `
  <p>${message}</p>
  `;
  $snackbarContainer.appendChild($snackbar);
  $snackbar.addEventListener("animationend", e => $snackbarContainer.removeChild($snackbar));
}
