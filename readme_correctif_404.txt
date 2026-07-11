CORRECTIF 404 — BOUTON VOIR

Ce correctif évite la page introuvable quand un numéro de téléphone ou un lien non complet est saisi dans une offre.

Corrigé :
- numéro de téléphone converti en tel:
- email converti en mailto:
- lien vide redirigé vers recherche Maps
- texte simple redirigé vers Google Search
- ajout du fichier _redirects pour éviter les 404 Netlify sur chemins accidentels

Après redéploiement :
1. Rafraîchir le site avec Ctrl+F5
2. Refaire le test sur une offre locale
3. Cliquer Voir : plus de page introuvable
