// Select elements from the DOM
const generateBtn = document.querySelector("#generateBtn");
const quoteDisplay = document.querySelector("#quoteDisplay");

/**
 * Renders quotes to the HTML table.
 * @param {Array} quotes - Array of quote objects to render.
 */
function renderQuotes(quotes) {
  // Update the innerHTML of the quoteDisplay element with a table
  quoteDisplay.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Author</th>
          <th>ID</th>
          <th>Quote</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${quotes
          .map(
            (quote, index) => `
          <tr>
            <td>${quote.type}</td>
            <td>${quote.author}</td>
            <td>${quote._id}</td>
            <td>${quote.quote}</td>
            <td><button class="btn btn-danger" onclick="deleteQuote(${index})">Delete</button></td>
          </tr>
        `
          )
          .join(
            ""
          )}  <!-- Map each quote to a table row and join them to form the table body -->
      </tbody>
    </table>
  `;
}

/**
 * Loads quotes from localStorage and renders them.
 */
function loadQuotes() {
  // Retrieve quotes from localStorage or initialize an empty array if not present
  const storedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  renderQuotes(storedQuotes); // Call renderQuotes to display the quotes
}

/**
 * Adds a new quote to localStorage and updates the display.
 * @param {Object} newQuote - The new quote object to add.
 */
function addQuote(newQuote) {
  // Retrieve the existing quotes from localStorage or initialize an empty array if not present
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  quotes.push(newQuote); // Add the new quote to the array
  localStorage.setItem("quotes", JSON.stringify(quotes)); // Save the updated quotes array to localStorage
  renderQuotes(quotes); // Re-render the quotes including the new one
}

/**
 * Deletes a quote from localStorage and updates the display.
 * @param {number} index - The index of the quote to delete.
 */
function deleteQuote(index) {
  // Retrieve the current quotes from localStorage
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  quotes.splice(index, 1); // Remove the quote at the specified index
  localStorage.setItem("quotes", JSON.stringify(quotes)); // Save the updated array back to localStorage
  renderQuotes(quotes); // Re-render the quotes display without the deleted quote
}

window.deleteQuote = deleteQuote; // Make deleteQuote function available in the global scope to be accessible from HTML onclick

// Event listener for the generate button click
generateBtn.addEventListener("click", () => {
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest
  xhr.open("GET", "https://api.everrest.educata.dev/quote/random"); // Configure the request to get a random quote
  xhr.send(); // Send the request
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText); // Parse the JSON response
    addQuote(response); // Add the new quote using the addQuote function
  };
});

window.onload = loadQuotes; // When the window loads, call loadQuotes to populate the table with any stored quotes
