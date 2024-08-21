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
  xhr.open('GET', `${API_URL}/events`);
  xhr.onload = function() { //le onload est appelé lorsque la requête est terminée le callback est en attente
      if (xhr.status === 200) {
          callback(null, xhr.responseText);
      } else {
          console.error('Erreur de récupération des events', xhr.statusText);
          callback(new Error(xhr.statusText), null);
      }
  };
  xhr.send(); // envoi de la requête et et callback est rappelé quand la requête est terminée
};