"use strict";

/*
 * @param {Array} queries Query array
 * @param {Function} successCallback successCallback function
 */

window.ACCESS_POINT = " https://api.edamam.com/api/recipes/v2";
const APP_ID = "1d56952c";
const API_KEY = "1381bfc880a44ab80149dd1489b90f1e";
const TYPE = "public";

export const fetchData = async function (queries, successCallback) {
  const query = queries
    ?.join("&")
    .replace(/,/g, "=")
    .replace(/g /g, "%20")
    .replace(/\+/g, "%2B");

  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }

};
