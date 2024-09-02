const API_URL = 'http://localhost:3001';

// export const getAllEvents = function() {
//     return fetch(`${API_URL}/events`)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(data) {
//         return data;
//       })
//       .catch(function(error) {
//         console.error('Erreur lors de la récupération des événements', error);
//         throw error;
//       });
// };

export const getAllEvents = function(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${API_URL}/events`); // c'est l'URL de la requête
  xhr.onload = function() { //le onload est appelé lorsque la requête est terminée le callback est en attente
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText)); // parser la réponse en JSON et appeler le callback avec les données
      } else {
          console.error('Erreur de récupération des events', xhr.statusText);
          callback(new Error(xhr.statusText), null);
      }
  };
  xhr.send(); // envoi de la requête et et callback est rappelé quand la requête est terminée
};

export const getAllClients = function(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/clients`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error('Erreur de récupération des clients', xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
};
