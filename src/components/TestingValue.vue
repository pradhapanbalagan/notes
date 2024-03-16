<template>
    <div class="page-container">
      <!-- Page Header -->
      <header class="page-header">
        <h1>Welcome to Your Page</h1>
        <p>Some Information Here</p>
      </header>
  
      <!-- Table Section -->
      <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
            <th> column 4 pradhap> </th>
          <!-- Add more columns as needed -->
        </tr>
      </thead>
      <tbody>
        <!-- Add 10 rows -->
        <tr v-for="index in 10" :key="index">
          <td>Data {{ index * 3 - 2 }}</td>
          <td>Data {{ index * 3 - 1 }}</td>
          <td>Data {{ index * 3 }}</td>
        </tr>
        <!-- End of 10 rows -->
      </tbody>
    </table>
  </div>

  
      <!-- Page Body -->
      <div class="page-body">
        <!-- Your page content goes here -->
        <p>This is the main content of your page.</p>
      </div>
  
      <!-- Buttons -->
      <div class="buttons-container">
        <button @click="buttonClick(1)">Button 1</button>
        <button @click="buttonClick(2)">Button 2</button>
        <button @click="buttonClick(3)">Button 3</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const buttonClick = (buttonNumber) => {
    // Handle button click logic here
    console.log(`Button ${buttonNumber} clicked!`);
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    flex-direction: column;
  }
  
  .page-header {
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
  }
  
  .table-container {
    overflow-x: auto;
    max-height: 400px; /* Adjust the height based on your design */
    margin: 20px 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead, tbody {
    display: block;
  }
  
  thead {
    background-color: #3498db;
    color: #fff;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    min-width: 100px; /* Adjust the width for each column */
    box-sizing: border-box;
  }
  
  th:first-child, td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: #3498db;
  }
  
  tbody {
    max-height: 300px; /* Adjust the height based on your design */
    overflow-y: auto;
  }
  
  .page-body {
    flex-grow: 1;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .buttons-container {
    display: flex;
    justify-content: space-around;
    margin: 20px;
  }
  </style>
  
