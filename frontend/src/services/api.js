const API_URL = 'http://localhost:3001';

export const getAllEvents = function() {
    return fetch(`${API_URL}/events`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      })
      .catch(function(error) {
        console.error('Erreur lors de la récupération des événements', error);
        throw error;
      });
};