// Fonction pour l'autocomplétion des adresses avec l'API Gouvernementale
let timeoutId;

function initAddressAutocomplete() {
    const adresseInput = document.getElementById('adresse');
    const suggestionsDiv = document.getElementById('adresse-suggestions');
    
    adresseInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        const query = this.value;
        
        if (query.length < 3) {
            suggestionsDiv.innerHTML = '';
            return;
        }
        
        timeoutId = setTimeout(() => {
            fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`)
                .then(response => response.json())
                .then(data => {
                    suggestionsDiv.innerHTML = '';
                    data.features.forEach(feature => {
                        const div = document.createElement('div');
                        div.className = 'p-2 hover:bg-purple-100 cursor-pointer';
                        div.textContent = feature.properties.label;
                        div.addEventListener('click', () => {
                            adresseInput.value = feature.properties.label;
                            suggestionsDiv.innerHTML = '';
                        });
                        suggestionsDiv.appendChild(div);
                    });
                })
                .catch(error => console.error('Erreur:', error));
        }, 300);
    });
}

// Autocomplétion pour le lieu de naissance
function initBirthplaceAutocomplete() {
    const lieuInput = document.getElementById('lieu_naissance');
    const suggestionsDiv = document.getElementById('lieu-suggestions');
    
    lieuInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        const query = this.value;
        
        if (query.length < 3) {
            suggestionsDiv.innerHTML = '';
            return;
        }
        
        timeoutId = setTimeout(() => {
            fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&boost=population&limit=5`)
                .then(response => response.json())
                .then(data => {
                    suggestionsDiv.innerHTML = '';
                    data.forEach(commune => {
                        const div = document.createElement('div');
                        div.className = 'p-2 hover:bg-purple-100 cursor-pointer';
                        div.textContent = `${commune.nom} (${commune.codeDepartement})`;
                        div.addEventListener('click', () => {
                            lieuInput.value = `${commune.nom} (${commune.codeDepartement})`;
                            suggestionsDiv.innerHTML = '';
                        });
                        suggestionsDiv.appendChild(div);
                    });
                })
                .catch(error => console.error('Erreur:', error));
        }, 300);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initAddressAutocomplete();
    initBirthplaceAutocomplete();
});
