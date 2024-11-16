# Drug Search App

## Features
- **Search for Drugs**: Users can search for drugs by name.
- **Spelling Suggestions**: If the search query is invalid or incomplete, the application provides spelling suggestions.
- **Drug Details**: Users can view detailed information about  a selected drug, including its RXCUI, name, synonym, and associated  NDCs.

## Technologies Used
- **React**: A Javascript Library for building user interfaces.
- **Vite**: A build tool that provides a fasr developement environment.
- **Axios**: A promise based HTTP client for making API Requests.
- **React Router**: A library for routing in React applications.

## Getting Started

### prerequisites
- Node.js
- npm

### Installation

1. Clone the Repository:
    ```bash
    git clone https://github.com/rabhasajan/Xogene-test.git
    cd Xogene-test
    ```
2. Install the dependencies:
```bash
npm i
```
3. Start the developement Server:
```bash
npm run dev
```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints
- **Search for Drugs**: `https://rxnav.nlm.nih.gov/REST/drugs.json?name={query}`
- **Get Spelling Suggestions**: `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name={query}`
- **Get NDCs**: `https://rxnav.nlm.nih.gov/REST/rxcui/{rxcui}/ndcs.json`