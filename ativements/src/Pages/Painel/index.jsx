import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { FormAtivement } from "../../Components/Forms";
import Tabs from "../../Components/Tabs";
import Table from "../../Components/Table";

const Painel = () => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [update, setUpdate] = useState({});
  const [places, setPlaces] = useState([]);
  const [listAtivements, setListAtivements] = useState([]);

  // Buscar os locais cadastrados no banco
  const getPlaces = async () => {
    fetch("http://localhost:3000/locais")
      .then((response) => response.json())
      .then((response) => {
        setPlaces(response);

        // Pegando a primeira referência dos locais dos ativos
        if (response[0]) {
          setSelectedPlace(response[0].id);
        }
      })
      .catch(() => {
        alert("Erro inesperado, não foi possível obter os locais dos ativos");
      });
  };

  useEffect(() => {
    if (selectedPlace === "") {
      getPlaces();
    }
  }, []);

  //   Criando a função de listar os ativos de acordo com o local informado
  const filterAtivements = (local) => {
    fetch(`http://localhost:3000/ativos?local=` + local)
      .then((response) => response.json())
      .then((response) => {
        setListAtivements(response);
      })
      .catch(() => {
        alert("Erro inesperado, não foi possível obter os ativos");
      });
  };

  useEffect(() => {
    filterAtivements(selectedPlace);
  }, [selectedPlace]);

  return (
    <div className="w-10/12 my-0 mx-auto">
      <Header />

      {/* Formulário para criação/edição de ativos */}
      <FormAtivement
        list={listAtivements}
        setList={setListAtivements}
        places={places}
        setPlaces={setPlaces}
        update={update}
      />

      {/* Tabs - listagens de locais ativos */}
      <Tabs
        places={places}
        setSelectedPlace={setSelectedPlace}
        selectedPlace={selectedPlace}
      />

      {/* Listagens dos ativos cadastrados */}
      <Table
        list={listAtivements.filter((x) => x.local == selectedPlace)}
        setUpdate={setUpdate}
        setList={setListAtivements}
      />
    </div>
  );
};

export default Painel;
