"use strict";

const $results = $("#number-batch-results");
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