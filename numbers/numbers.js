"use strict";

const $resultsBatchDiv = $("#number-batch-results");
const $resultNumDiv = $("#number-results");
const $favNumDiv = $("#number-fav-results");

const NUMBERS_URL = "http://numbersapi.com/";

/**
 * getNumFact: return one fact for one number and append to DOM
 */
async function getNumFact() {
  const resp = await axios.get(`${NUMBERS_URL}90?json`);
  const num_fact = resp.data;

  const $numHeading = $(`<h2>"Fact on ONE number"</h2>`);
  $resultNumDiv.append($numHeading);

    const $fact_html = $(`
    <p id="fact-${num_fact["number"]}">${num_fact["text"]}</p>
    `);
    $resultNumDiv.append($fact_html);
  }
  getNumFact();

/**
 * getMultipleNumFacts: return one fact for four numbers and append to DOM
 */
async function getMultipleNumFacts() {
  const resp = await axios.get(`${NUMBERS_URL}31,33,90?json`);
  const nums_fact = resp.data;

  const $batchNumHeading = $(`<h2>"Facts on multiple numbers"</h2>`);
  $resultsBatchDiv.append($batchNumHeading);

  for (let num in nums_fact) {
    const $fact_html = $(`<p id="fact-${num}">${nums_fact[num]}</p>`);
    $resultsBatchDiv.append($fact_html);
  }
}

getMultipleNumFacts();

//  #QUESTION: How to catch/resend request if any of your promises fails? Try/catch

/**
 * getFavNumFacts: return four facts for one number and append to DOM
 */
async function getFavNumFacts() {
  const fact1P = axios(`${NUMBERS_URL}33`);
  const fact2P = axios(`${NUMBERS_URL}33`);
  const fact3P = axios(`${NUMBERS_URL}33`);
  const fact4P = axios(`${NUMBERS_URL}33`);

  const results = await Promise.allSettled([fact1P, fact2P, fact3P, fact4P]);

  const $favNumHeading = $(`<h2>"Facts on my Fav num"</h2>`);
  $favNumDiv.append($favNumHeading);

  for (const p of results) {
    const $favNumEl = $(`<p>${p.value.data}</p>`);
    $favNumDiv.append($favNumEl);
  }
}

getFavNumFacts();