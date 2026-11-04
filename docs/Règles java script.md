# Règles JavaScript du projet gestion de flotte

*Ce fichier enregistre les règles de formatage à respecter dans tous les scripts JavaScript et toutes les pages HTML du dossier `www/`. Toute modification de code doit se conformer à ces règles.*

---

## 1. Préfixes des id des éléments gérés par une page

Dans chaque page HTML (`www/templates/`) et chaque script JavaScript (`www/`), **l'`id` de tout élément utile à la gestion de la page** (élément lu, modifié ou écouté en JavaScript, y compris les éléments créés dynamiquement) **doit commencer par le préfixe correspondant à son type** :

| Préfixe | Type d'élément HTML | Exemples |
| :---- | :---- | :---- |
| `btn_` | bouton (`<button>`, `<a class="button">`) | `btn_enregistrer`, `btn_reset` |
| `tab_` | table et son contenu (`<table>`, `<tbody>`) | `tab_vehicule`, `tab_body_pleins` |
| `tag_` | tout autre élément HTML générique (`<div>`, `<h1>`, `<p>`, `<section>`, `<canvas>`, popup/modal…) | `tag_titre_categorie`, `tag_pup_marque`, `tag_en_tete` |
| `ipt_` | champ de saisie (`<input>`, y compris `type="file"`) | `ipt_nom`, `ipt_file_csv` |
| `txa_` | zone de texte (`<textarea>`, ou `<input>` stylé en textarea) | `txa_cout`, `txa_observation_ct` |
| `slt_` | liste déroulante (`<select>`) | `slt_marque`, `slt_table_import` |
| `ckb_` | case à cocher (`<input type="checkbox">`) | `ckb_categorie` |
| `rdo_` | bouton radio (`<input type="radio">`) | `rdo_categorie`, `rdo_` + nom de la catégorie (créé dynamiquement) |

**Règles complémentaires :**

- Le préfixe est suivi d'un underscore puis du nom en snake_case : `btn_enregistrer`, `tab_liste_vhl`, `tag_pup_ville`.
- Un `id` ne contient **jamais d'espace** (un seul identifiant par attribut `id` ; les classes CSS vont dans l'attribut `class`).
- La règle s'applique aussi bien dans le HTML (`id="btn_..."`) que dans le JavaScript (`getElementById('btn_...')`, `querySelector('#btn_...')`, `element.id = "rdo_..."`).
- Les id déjà conformes (`btn_`, `tab_`, `tag_`, `ipt_`, `txa_`, `slt_`, `ckb_`, `rdo_`) ne sont pas modifiés.

&nbsp;

---

## Règles suivantes

*(à compléter au fur et à mesure)*
