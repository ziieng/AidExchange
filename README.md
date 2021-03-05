# AidExchange  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AidExchange is here to help you help others (and yourself!) by providing a platform to request donations from your community and find requests that are near you. Our main focus is on Mutual Aid organizations and non-profits, but we also support individuals looking to reduce their spending in everyday life.

<!-- ![Project Gif](gif.gif) -->



Explore the [Project Page](https://github.com/ziieng/AidExchange)

[Deployed Application](https://aidexchange.herokuapp.com/)

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About the Project:

The goal for this app is to help people find things they need, or donate things to others. The idea began with the individual’s perspective, but we expanded it to non-profit and mutual aid organizations for a bigger purpose. 

It provides a way for users to post lists of things they want to give away or have donated, so that others can find their requests.  The app’s search is location based and includes a map of where the request is located so people can find what they need and select those that are closest to their location. 

We also added a way to print a list of the items a user has pledged to donate or take away, so they don’t forget to bring something with them.

### Built With:

* [Node.js](https://nodejs.org/en/)
  * [Express](https://www.npmjs.com/package/express)
  * [Axios](https://www.npmjs.com/package/axios)
* [React](https://reactjs.org/)
  * [React-Bootstrap](https://react-bootstrap.netlify.app/)
  * [React-PDF](https://react-pdf.org/)
  * [Google-Map-React](https://www.npmjs.com/package/google-map-react)
* [Firebase Authentication](https://react-firebase-js.com)
* [MongoDB](https://www.mongodb.com/)
  * [mongoose](https://www.npmjs.com/package/mongoose)

## Getting Started:

To get a local copy up and running follow the steps below.

### Prerequisites:
Clone the Repository:

```sh
git clone git@github.com:ziieng/AidExchange.git
```

### Installation:
To install app dependencies, run this command in the /AidExchange folder:
```
npm i
```

To add the provided seed data, run this command after installation:
```
npm run seed
```

## Roadmap:

AidExchange is just starting its development! We're looking to add many more features in the future.
- Messaging system
  - Let users coordinate meeting times/locations
  - Email notifications on new messages
  - Text messaging push notification regarding their request and listings.
- Inventory management
  - Automatically reduce quantities requested/offered when something is reserved or donated
  - Give users a way to see their inventory levels
- Improved Receipts
  - Include address for meeting point, contact information for recipient
  - Allow 501(c)(3) orgs to print receipts for tax-deductible donations
- Improved Posts
  - Include way to link an eCommerce listing for requested donations
  - Add support for images on posts

## Contributing:

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact:

Feel free to reach out to our team if you have any additional questions:

  * [Zii Engelhardt](https://github.com/ziieng/) (Gitkeeper, Database Structures, API Implementation)
  * [Ali Schreck.](https://github.com/Alischrec) (Page Layouts, Design)
  * [Metages Worku](https://github.com/Mgithub89) (Page Layouts, Firebase)
  * [Carolina Yoedhana](https://github.com/CarolinaYo) (React-PDF, Firebase, Research)

Github repository for [AidExchange](https://github.com/ziieng/AidExchange)
Live application deployed on Heroku, [here](https://aidexchange.herokuapp.com/)

## Acknowledgements:

- University of Washington Coding Bootcamp for providing us with the skills and knowledge to create this project.
