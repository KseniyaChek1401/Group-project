import './App.css';
import {useState} from 'react';
import Axios from 'axios';



function App() {

  const[nimi, asetaNimi] = useState('');
  const[titteli, asetaTitteli] = useState('');
  const[sahkopostiosoite, asetaSahkopostiosoite] = useState('');
  const[puhelinnumero, asetaPuhelinnumero] = useState('');

  const[henkilolista, asetaHenkilolista] = useState([]);

  const [uusiTitteli, asetaUusititteli] = useState('');

  const addEmployee = () => {

    console.log('Painettu');

    Axios.post('http://localhost:3001/create', {
      nimi: nimi, 
      titteli: titteli,
      sahkoposti: sahkopostiosoite, 
      puhelinnumero: puhelinnumero,
    }).then(() => {
      console.log('toimii');
    });
  };

  const haeHenkilot = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      asetaHenkilolista(response.data);
    });

  }

  const paivitaTitteli = (id) => {
    Axios.put("http://localhost:3001/update", {titteli: uusiTitteli, id: id}).then(
      (response) => {
        alert("Päivitetty");        
      
      }
    )
  }  

  return (
    <div className="App">
      <div className="lomake">
        <label>Nimi</label> 
        <input type="text" onChange={(event) => {asetaNimi(event.target.value)}}/> 
        <label>Titteli</label> 
        <input type="text" onChange={(event) => {asetaTitteli(event.target.value)}}/> 
        <label>Sähköpostiosoite</label> 
        <input type="text" onChange={(event) => {asetaSahkopostiosoite(event.target.value)}}/> 
        <label>Puhelinnumero</label> 
        <input type="text" onChange={(event) => {asetaPuhelinnumero(event.target.value)}}/> 
        <button onClick={addEmployee}>Lisää henkilö</button>
      </div>  
      <div className="tiedot">
          <button onClick={haeHenkilot}>Näytä henkilöt</button> 

          {henkilolista.map((val, key) => {
            return <div className="kortti">
              {val.nimi}<br />{val.puhelinnumero}<br />{val.sahkopostiosoite}<br />
              {val.titteli}</div>
            })
          }  
      </div>    
    </div>

  );
}

export default App;
