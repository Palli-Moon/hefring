import './App.css';
import React, { useEffect, useState } from 'react';
import Map from './components/Map';
// import Papa from 'papaparse';
const jsonData = require('./NN.json');

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
    // fetch('/NN.csv')
    //   .then((response) => response.text())
    //   .then((csvText) => {
    //     Papa.parse(csvText, {
    //       complete: (res) => {
    //         setData(res.data);
    //         // res.data.forEach((row) => {
    //         //   console.log(row[41]); // lat
    //         //   console.log(row[42]); // lon
    //         // });
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching CSV file:', error);
    //   });
  }, [data]);

  return (
    <div>
      <Map data={data} />
    </div>
  );
};

export default App;
