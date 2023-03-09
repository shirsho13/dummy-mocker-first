import React, { useState } from 'react';
import axios from 'axios';


function App() {
    const [name, setName] = useState("");
    const [tableData, setTableData] = useState([]);

    const handleInputChange = (event) => {
        setName(event.target.value);
    }

    const handleInsertClick = () => {
        axios.post('/api/insert', { name })
            .then(response => {
                setTableData(response.data);
                setName("");
            })
            .catch(error => console.log(error));
    }

    const handleSearchClick = () => {
        axios.post('/api/search', { name })
            .then(response => {
                setTableData(response.data);
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

// mock axios requests
jest.mock('axios');

// mock insert endpoint
axios.post.mockImplementation((url, data) => {
    const responseData = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
        { id: 3, name: "Bob" }
    ];
    return Promise.resolve({ data: responseData });
});

// mock search endpoint
axios.post.mockImplementation((url, data) => {
    const responseData = [
        { id: 2, name: "Jane" }
    ];
    return Promise.resolve({ data: responseData });
});

export default App;
