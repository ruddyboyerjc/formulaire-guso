document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gusoForm');
    const modal = document.getElementById('confirmationModal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Vérification des champs obligatoires
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });

        if (!isValid) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Récupération des données du formulaire
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Construction du corps du mail
        const mailBody = `
Bonjour,

Voici les informations de votre déclaration GUSO :

Informations personnelles :
-------------------------
Nom : ${data.nom}
Prénom : ${data.prenom}
Téléphone : ${data.tel}
Email : ${data.email}
Adresse : ${data.adresse}

Informations GUSO et DPAE :
-------------------------
Date de naissance : ${data.date_naissance}
Lieu de naissance : ${data.lieu_naissance}
Numéro de sécurité sociale : ${data.secu}

Un lien de paiement vous sera envoyé prochainement.

Cordialement,
Service GUSO
        `.trim();

        // Construction de l'URL mailto
        const mailtoUrl = `mailto:${data.email}?cc=ruddyboyer@live.fr&subject=${encodeURIComponent('Votre déclaration GUSO')}&body=${encodeURIComponent(mailBody)}`;

        // Ouverture du client mail
        window.location.href = mailtoUrl;
            
        // Affichage du modal de confirmation
        showModal();
            
        // Réinitialisation du formulaire après un court délai
        setTimeout(() => {
            form.reset();
        }, 1000);
    });
});

function showModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.add('hidden');
}
