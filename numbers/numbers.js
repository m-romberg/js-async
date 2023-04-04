"use strict";

const $results = $("#number-batch-results");
const $favNumDiv = $("#number-fav-results");
const NUMBERS_URL = "http://numbersapi.com/";

// make the request

//pull data from response

// turn into html elements

//append to dom

async function get_multiple_nums_fact(){
  const resp = await axios.get(`${NUMBERS_URL}31,33,90?json`);
  const nums_fact = resp.data;

  for (let num in nums_fact){
    const $fact_html = $(`<p id="fact-${num}">${nums_fact[num]}</p>`);
    $results.append($fact_html);
  }
}

get_multiple_nums_fact();

// make 4 requests order doesn't matter, but wait until we have them all
//  allSettled return an array of promises
//  #QUESTION: How to catch/resend request if any of your promises fails?
//  #QUESTION: diff when to use all vs allSettled - gives reason for failure, can get other results

async function get_facts_fav_num(){
  const fact1P = axios(`${NUMBERS_URL}33`);
  const fact2P = axios(`${NUMBERS_URL}33`);
  const fact3P = axios(`${NUMBERS_URL}33`);
  const fact4P = axios(`${NUMBERS_URL}33`);

  const results = await Promise.allSettled([fact1P, fact2P, fact3P, fact4P]);

  const $favNumHeading = $(`<h2>"Facts on my Fav num"</h2>`);
  $favNumDiv.append($favNumHeading);

  for (const p of results){
    const $favNumEl = $(`<p>${p.value.data}</p>`);
    $favNumDiv.append($favNumEl);
  }
}

get_facts_fav_num();