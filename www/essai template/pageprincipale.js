

const titre = "Mon titre";
const contenu = "Mon contenu dynamique";

const templateHTML = `
  <div>
    <h2>${titre}</h2>
    <p>${contenu}</p>
  </div>
`;

document.body.innerHTML = templateHTML;
