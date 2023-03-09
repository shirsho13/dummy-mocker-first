import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleInputChange = (event) => {
    setName(event.target.value);
  }

  const handleInsertClick = () => {
    fetch("/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => {
        setTableData(data);
        setName("");
      })
      .catch(error => console.log(error));
  }

  const handleSearchClick = () => {
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => {
        setTableData(data);
        setName("");
      })
      .catch(error => console.log(error));
  }

  return (
    <div style={{ backgroundColor: "orange" }}>
      <h1 style={{ color: "white" }}>Mocker</h1>
      <input type="text" value={name} onChange={handleInputChange} />
      <button onClick={handleInsertClick}>Insert</button>
      <button onClick={handleSearchClick}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
