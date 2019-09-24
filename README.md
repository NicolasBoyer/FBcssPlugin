# FBcssPLUGIN

> Ajoute une feature au plugin CSSPlugin de [FuseBox 3.7.1](https://fuse-box.org) : l'injection dans le header d'une partie des CSS présents dans l'application au lieu de tous les CSS

- Transforme l'option inject en permettant à la fonction de renvoyer un booleen :
```Typescript
inject?: boolean | ((file: string) => string | boolean)
```
- Prend en compte ce booleen et s'il retourne **false** alors le fichier sur lequel ce booleen est renvoyé n'est pas injecté
- Le code à écrire dans la propriété inject peut alors ressembler à ça :
```Typescript
inject: (file) => file.includes('main') && `styles${file.substring(file.lastIndexOf('/'))}`
```
- Il s'agit aussi d'un exemple de création minimaliste de package **NPM**

## Install

    npm i fbcssplugin --save

## Usages

- A déclarer comme CSSPlugin :
```Typescript
const { CSSPlugin } = require("fbcssplugin");
```
- [FuseBox 3.7.1](https://fuse-box.org) est recquis