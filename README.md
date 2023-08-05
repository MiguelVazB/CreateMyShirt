# CreateMyShirt - 3D Shirt Design Website

CreateMyShirt is a web application that allows users to design custom shirts by adding logos and text to a 3D model of a shirt. With an intuitive user interface and powerful features, users can create unique shirt designs and visualize them in real-time. The project is built using React, Vite, Three.js, and Framer Motion, providing a smooth and interactive experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)

## Introduction

Designing custom shirts can be a fun and creative process, but it can also be challenging without the right tools. CreateMyShirt aims to simplify the process by providing a user-friendly interface where users can experiment with logos, text, colors, and various design options to bring their ideas to life.

## Features

- Add logos and text to a 3D model of a shirt.
- Change the color of the shirt using a color picker in the menu.
- Upload a logo from the user's device to add to the shirt.
- Generate AI-based logos using DALL-E by providing text descriptions.
- Adjust the position, size, and rotation of logos using sliders and number boxes.
- Access a variety of fonts through the Google Fonts API to customize text.
- Modify the position, size, and rotation of the text.
- Change the color of the text.
- Toggle the visibility of logos, full shirt design, and text using bottom-center toggles.
- Experience the 3D model in a canvas with lighting and shadows for a realistic view.

## Installation

To run CreateMyShirt locally on your machine, follow these steps:

1. Clone the repository: `git clone https://github.com/MiguelVazB/CreateMyShirt.git`
2. Change into the project directory: `cd CreateMyShirt`
3. Install dependencies: `npm install`

## Usage

To start the development server and run the application, use the following command:

***npm run dev***

The application will be accessible at `http://localhost:5173`.

## Technologies Used

CreateMyShirt is built using the following technologies:

- [React](https://reactjs.org/): A popular JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A fast build tool and development server for modern web projects.
- [Three.js](https://threejs.org/): A lightweight 3D library for creating and rendering 3D scenes in the browser.
- [Framer Motion](https://www.framer.com/motion/): A motion library for animations and transitions.
- [DALL-E](https://openai.com/research/dall-e): An AI model for generating images based on text descriptions.
- [Google Fonts API](https://developers.google.com/fonts): Provides access to a wide range of fonts for customizing text.
- [Node.js](https://nodejs.org/): A JavaScript runtime environment for server-side development.
- [Express](https://expressjs.com/): A fast and minimalist web framework for Node.js.

## How It Works

1. When users visit the CreateMyShirt website, they are welcomed with a visually appealing home screen. The home screen showcases the 3D model of a shirt, ready to be customized. Users are greeted with the following description:

   *"Unleash your Inner Fashion Designer and transform the style of your 3D shirt with our customization
   tool. Get ready to experience fashion in a whole new dimension.
   Are you ready to make a statement with YOUR
   Style?"*

   Additionally, there is a prominent "Create My Shirt" button on the home screen. Clicking this button allows users to proceed to the page where they can start customizing the shirt.

2. The user can use the color picker in the menu to change the color of the shirt.
3. The menu also allows the user to upload a logo from their device or generate an AI-based logo using DALL-E by providing a text description.
4. Sliders and number boxes in the menu enable the user to adjust the position, size, and rotation of logos on the shirt.
5. Access to Google Fonts API allows users to choose different fonts for their text and customize its appearance.
6. Sliders and number boxes in the menu let the user change the position, size, and rotation of the text on the shirt.
7. The user can also change the color of the text using the color picker in the menu.
8. The bottom-center toggles enable the user to toggle the visibility of logos, full shirt design, and text for better visualization.
9. The 3D model in the canvas is enhanced with lighting and shadows to provide a more realistic view of the shirt design.
