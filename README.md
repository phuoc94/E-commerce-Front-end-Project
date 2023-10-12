# E-commerce Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Architecture & Design](#architecture--design)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

### 1. Introduction

This E-commerce front-end project is a web application developed using React.js, Material-UI, Redux Toolkit, and TypeScript. It provides a user-friendly interface for shopping online, allowing customers to browse, search for products, add items to their cart, and complete their purchase. The project is designed for both desktop and mobile users, providing a seamless shopping experience.

#### Target Audience

- Online shoppers looking for a modern, responsive, and feature-rich E-commerce platform.
- Developers interested in exploring the integration of popular technologies like React, Redux, and Material-UI in a real-world application.

#### Live Project

You can explore the live project by visiting the following link:
[Live E-commerce Project](https://fs16-6-frontend-project.vercel.app/)

---

### 2. Getting Started

#### Prerequisites

Before you begin, ensure you have the following software and tools installed:

- Node.js
- npm (Node Package Manager) or yarn
- Git

#### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/phuoc94/E-commerce-Front-end-Project.git
```

Installation Steps
Install project dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

This command will install all the required packages listed in the package.json file.

### 3. Usage

#### Scripts

The project includes several scripts defined in the `package.json` file:

- `start`: Starts the development server.
- `build`: Builds the production version of the project.
- `test`: Runs tests.

To start the development server, use the following command:

```bash
`npm start`
# or
`yarn start`
```

#### Features

- Browse, search and filter for products.
- Add items to your cart.
- Admin can add Product
- User can login with email address & password

---

### 4. Architecture & Design

#### Folder Structure

The project is organized into directories for better code organization. Here's a brief overview of the key directories:

```
src/
├── components: Holds React components.
├── containers: Contains higher-level components or containers.
├── hooks: Stores custom React hooks.
├── layouts: Contains layout components defining page structure.
├── pages: Houses the main pages or views.
├── routes: May include route configuration and routing code.
├── store: Contains state management related code.
├── styles: Stores stylesheets or styles-related code.
├── test: Holds unit tests, integration tests, or test utilities.
├── types: Contains TypeScript type definitions and interfaces.
└── utils: Stores utility functions or modules.
```

#### Data Flow

Data in the application is managed using Redux Toolkit, which provides a predictable state container. The data flows in a unidirectional manner, making it easy to maintain and update.

1. **Component Dispatch (User Interaction)**

   - A component dispatches the `fetchCategories()` action. This action is created using `createAsyncThunk`, a Redux Toolkit utility that simplifies the process of handling asynchronous data fetching.

2. **`fetchCategories` - CreateAsyncThunk**

   - Inside `createAsyncThunk`, we initiate the API request to fetch the product categories. This action encapsulates the asynchronous API call.

3. **API Request and Response**

   - The `fetchCategories` action sends a request to the Platzi Fake Store API (https://fakeapi.platzi.com/). The API responds with the product categories data.

4. **Category Reducers - ExtraReducers**

   - In the Redux store, the category reducers define how the fetched data is processed and stored. The `extraReducers` section of the `createSlice` or `createAsyncThunk` builder is used to handle different action outcomes.

   - Specifically, we use `builder.addCase(fetchCategories.fulfilled)` to specify the logic that should run when the `fetchCategories` action is fulfilled successfully. In this case, the fetched category data is stored in the Redux store, making it available for components to use.

5. **Store Reducers**

   - Within the store reducers, the data is updated in response to dispatched actions. The `fetchCategories.fulfilled` action's payload, which contains the category data fetched from the API, is used to update the store state.

This data flow ensures that the product category information is efficiently fetched from the API, processed, and stored in the Redux store, making it accessible for various components in the application. This organized data flow contributes to a seamless and responsive user experience.

#### Component Structure

In this project, the component structure follows a route-based organization, where each route corresponds to a specific URL path. Here's a breakdown of the component structure:

##### Routes

- The project starts by routing requests to their respective paths. For example, when a user accesses domain.com/products, the route system directs the request to the appropriate page component.

##### Page Components

- Each route typically has an associated page component responsible for rendering the main content of that route. For example, pages/productspage.tsx is a page component that represents the /products route.

###### Containers

- Within the page components, you may find container components. These containers act as intermediary components that connect the page component to various data sources, including Redux for state management. They facilitate the passing of data and actions between the page component and other components.

##### Individual Components

- Inside the container components, you'll find individual components that make up the user interface. These components are designed to be reusable and modular. They can include components like product cards, cart displays, and checkout forms.

This structured approach ensures that the project's codebase remains organized and maintainable, allowing for the separation of concerns and facilitating code reusability. It also makes it easier to understand the relationship between different parts of the application and helps in the efficient development and testing of each component.

### 5. Testing

#### Testing Framework

The project uses Jest as the testing framework.

#### How to Run Tests

To run tests, use the following command:

`npm test`

or

`yarn test`

Describe the structure of your tests (unit, integration, end-to-end) and any other relevant testing details.

---

### 6. Deployment

The project is deployed on Vercel.
