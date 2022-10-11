const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show Loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function hideLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function generateNewQuote() {
  showLoading();
  // Pick a random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author ?? "Unknown";

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set Quote, hide loader
  hideLoading();
  quoteText.textContent = quote.text;
}

// Get Quotes From API
async function fetchQuotes() {
  showLoading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl).then((resp) => {
      return resp.json();
    });
    apiQuotes = response;
    generateNewQuote();
  } catch (error) {
    // alert
    console.error(error);
  }
}

//tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); // "_blank" used to open new tab
}

// Event Listeners
newQuoteBtn.addEventListener("click", generateNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
fetchQuotes();
