# Parcel seed

> A very simple seed to start a modern Single Page App development in no time
> 
## how to use

First use:
- npm install
- npm start

Next use:
- npm start

Before final deploy:
- npm run build
- profit?

## ESlint

To fully enjoy ESlint, please
- install the official VSCode "ESlint" extension
- add this to your VSCode settings:
```json
  //...
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  //...
```

## JQuery and Bootsrap for quick POCs 

If needed, you can uncomment `bootstrap` + `jquery` imports in
- script.js
- style.scss
  
If you don't need them at all, you can remove thoses comments. Then in `package.json`:
  - remove deps
    - popper.js
    - bootstrap
    - jquery


## Consignes de base
	- dans un index.html, il y a une div avec l'id "app" - interdit d'écrire autre chose dans le HTML
	- dans le javascript il y a l'array ci-dessous
	- grâce à javascript, afficher tous les livres avec leurs images et toutes leurs infos sauf le résumé
	- pour le résumé, n'afficher que les 30 premiers caractères et un bouton "lire la suite"
	- cliquer sur "lire la suite" affiche le reste du résumé
	- chaque livre a aussi un bouton "emprunter"
	- cliquer dessus ajoute le titre de ce livre dans un "panier" toujours visible en position fixed
