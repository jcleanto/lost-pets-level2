export let cards = {
  cards:
    [
      {
        id: 20189201345341,
        type: 'cat',
        petName: 'Riscas',
        image: 'http://placekitten.com/960/690',
        dataPerdido: {
          year: 2018,
          month: 9,
          day: 20
        },
        owner: 'Jorge Sampaio',
        ownerNumber: '+351 678 678 678',
        locality: 'Faro'
      },
      {
        id: 2019342437,
        type: 'cat',
        petName: 'Fofo',
        image: 'http://placekitten.com/960/691',
        dataPerdido: {
          year: 2019,
          month: 3,
          day: 4
        },
        owner: 'Maria da Silva',
        ownerNumber: '+351 123 123 123',
        locality: 'Loulé'
      },
      {
        id: 201751010423,
        type: 'dog',
        petName: 'Ralf',
        image: 'http://placekitten.com/960/692',
        dataPerdido: {
          year: 2017,
          month: 5,
          day: 10
        },
        owner: 'Carolina Santos',
        ownerNumber: '+351 456 456 465',
        locality: 'Faro'
      },
      {
        id: 201971212454,
        type: 'cat',
        petName: 'Bola',
        image: 'http://placekitten.com/960/693',
        dataPerdido: {
          year: 2019,
          month: 7,
          day: 12
        },
        owner: 'Isabel Soares',
        ownerNumber: '+351 654 654 654',
        locality: 'Faro'
      },
      {
        id: 2019643547,
        type: 'other',
        petName: 'Calo',
        image: 'http://placekitten.com/960/694',
        dataPerdido: {
          year: 2019,
          month: 6,
          day: 4
        },
        owner: 'José Silva',
        ownerNumber: '+351 987 987 987',
        locality: 'Loulé'
      },
      {
        id: 201831717431,
        type: 'cat',
        petName: 'Athos',
        image: 'http://placekitten.com/960/695',
        dataPerdido: {
          year: 2018,
          month: 3,
          day: 17
        },
        owner: 'Isabela Sampaio',
        ownerNumber: '+351 187 187 187',
        locality: 'Faro'
      },
      {
        id: 2017653235,
        type: 'dog',
        petName: 'Pipoca',
        image: 'http://placekitten.com/952/696',
        dataPerdido: {
          year: 2017,
          month: 6,
          day: 5
        },
        owner: 'João Almeida',
        ownerNumber: '+351 321 321 321',
        locality: 'Tavira'
      },
      {
        id: 2017145123,
        type: 'dog',
        petName: 'Pepe',
        image: 'http://placekitten.com/960/697',
        dataPerdido: {
          year: 2017,
          month: 1,
          day: 4
        },
        owner: 'Mateus Dantas',
        ownerNumber: '+351 159 159 159',
        locality: 'Montenegro'
      },
      {
        id: 2016373122,
        type: 'cat',
        petName: 'Filo',
        image: 'http://placekitten.com/961/698',
        dataPerdido: {
          year: 2016,
          month: 3,
          day: 7
        },
        owner: 'Gustavo Alves',
        ownerNumber: '+351 590 590 590',
        locality: 'Faro'
      },
      {
        id: 20193148427,
        type: 'cat',
        petName: 'Bogus',
        image: 'http://placekitten.com/960/699',
        dataPerdido: {
          year: 2019,
          month: 3,
          day: 14
        },
        owner: 'Mariana Lima',
        ownerNumber: '+351 628 628 628',
        locality: 'Faro'
      },
      {
        id: 20175520128,
        type: 'cat',
        petName: 'Lia',
        image: 'http://placekitten.com/960/689',
        dataPerdido: {
          year: 2017,
          month: 5,
          day: 5
        },
        owner: 'Vera Souza',
        ownerNumber: '+351 941 941 941',
        locality: 'Faro'
      },
    ]
};

export let users = {
  users:
    [
      {
        id: 2019103019342,
        login: 'admin',
        date: '2019-11-01T17:16:37.307Z'
      },
    ]
};

export let donations = {
  donations:
    [
      {
        id: 2019103019356,
        idAnimal: 20189201345341,
        idUser: 2019103019342,
        amount: 5,
        date: '2019-11-01T17:20:04.109Z'
      },
      {
        id: 2019110214430,
        idAnimal: 20193148427,
        idUser: 2019103019342,
        amount: 3,
        date: '2019-11-02T10:03:56.203Z'
      },
      {
        id: 2019110120037,
        idAnimal: 2017653235,
        idUser: 2019103019342,
        amount: 10,
        date: '2019-11-02T11:24:32.543Z'
      },
    ]
}