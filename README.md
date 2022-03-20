# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![desktop](.src/images/desktop.png)
![desktop select](.src/images/desktop-select.png)
![desktop cart](.src/images/desktop-cart.png)


### Links

- Live site URL: [ecommerce product page](https://chamu-ecommerce-product-page.netlify.app)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- mongodb and realm
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library


### What I learned

Fixing the following error [Can’t resolve ‘crypto’ in node_modules/bson/dist react](https://www.mongodb.com/community/forums/t/cant-resolve-crypto-in-node-modules-bson-dist-react/143227). Netlify was failing to deploy because of the error . The main steps are as follows.

- add the following line `fallback: { "crypto": require.resolve("crypto-browserify") },` 
Into the file `./node_modules/react-scripts/config/webpack.config.js` (line 304 to be precise in the react-scripts v5.0.0) so it looks something like this:

```js
...
module.exports = function (webpackEnv) {
  ...
  return {
   ...
    resolve: {
      fallback: { "crypto": require.resolve("crypto-browserify") }
      ...
      }
    }
  }
}
...
```
- install the following node_modules
  1. `npm install crypto-browserify`
  2. `npm install stream` 

- To make it work in Netlify make a little bash script that edit the file and run it as a prebuild script.
  1. Created the bash script `./fix_crypto_dependency.sh` . The file should be in the root folder
  2. 
```js
  #!/bin/bash
webpack_config="./node_modules/react-scripts/config/webpack.config.js"
webpack_config_backup="./node_modules/react-scripts/config/webpack.config.js.bckp"

line_number=304
line_to_add='fallback: { "crypto": require.resolve("crypto-browserify") }, // Patch realm-web crypto dependency'

echo "Fixing realm-web crypto dependency..."


if grep -q "$line_to_add" $webpack_config
then
    echo "Crypto fallback already added into the file $webpack_config"
else
    echo "Adding Crypto fallback into the file $webpack_config"
    cp $webpack_config $webpack_config_backup
    # The '\' character are for adding the indentation in the new line:
    sed -i "$line_number i \ \ \ \ \ \ $line_to_add" $webpack_config
fi
echo "Done! realm-web crypto dependency fixed. You can now run 'npm run build' without warnings :)"
``` 

- Configure the script to be run before build in the package.json file, to look like this:

```js
...
  "scripts": {
    "start": "react-scripts start",
    "prebuild": "chmod +x ./fix_crypto_dependency.sh; ./fix_crypto_dependency.sh",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
...
```

### Continued development


### Useful resources

- fix for [Can’t resolve ‘crypto’ in node_modules/bson/dist react](https://www.mongodb.com/community/forums/t/cant-resolve-crypto-in-node-modules-bson-dist-react/143227/2)
- CodePen - [CSS filter generator to convert from black to target hex color](https://codepen.io/sosuke/pen/Pjoqqp)

## Author

- Website - [Chamu Mutezva](https://github.com/ChamuMutezva)
- Frontend Mentor - [@ChamuMutezva](https://www.frontendmentor.io/profile/ChamuMutezva)
- Twitter - [@ChamuMutezva](https://twitter.com/ChamuMutezva)

## Acknowledgments

- Frontend Mentor for all the effort in creating the challenges [Frontend mentor](https://www.frontendmentor.io/challenges)
