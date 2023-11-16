# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## DYNAMIC FORM 
#### WORKING

# Running the Dynamic Form

## Prerequisites
Ensure you have Node.js and npm (Node Package Manager) installed on your machine.

## Installation
1. Clone the repository or download the source code.
   ```bash
   git clone [https://github.com/swaraj381/DynamicFormGenerator]
   ```

2. Navigate to the project directory.
   ```bash
   cd [src]
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

## Running the Application
Run the development server.
   ```bash
   npm run dev
   ```
Open your browser and visit `http://localhost:5173` to view the application.

## Preview the Application
To preview the application using Vite, run the following command:
   ```bash
   npm run preview
   ```

Open your browser and visit `http://localhost:4173` to view the application.

# Functionality

The Dynamic Form is a React-based web application that allows users to fill in various details, including a username, email, full name, address, age, date of birth, phone numbers, and gender. The form incorporates dynamic elements such as adding and removing phone numbers and updating address details based on user input.

## Features

- **Username Input:** Requires a non-empty username.

- **Email Input:** Validates email format and checks against certain conditions such as not being "admin@example.com" and not ending with "baddomain.com".

- **Full Name Input:** Requires a non-empty full name.

- **Address Input (Line 1 and Line 2):** Line 2 becomes disabled until Line 1 is filled.

- **Age Input:** Requires a non-negative number.

- **Date of Birth Input:** Requires a valid date.

- **Phone Numbers:** Users can add multiple phone numbers dynamically and remove them as needed.

- **Gender Selection:** Requires selecting either male or female.

- **Form Validation:** Provides real-time validation feedback, displaying error messages for invalid inputs.

- **Form Submission:** Logs the form data when successfully submitted.

- **Debugging Tools:** Includes `react-hook-form` dev tools for debugging and monitoring form state.

# Additional Commands

- **Get Values:** Click the "Get values" button to log the current value of the username.

- **Set Value:** Click the "Set value" button to set the username to an empty string.

- **Reset Form:** Click the "Reset" button to reset the form.

- **Validate Full Name:** Click the "FullName" button to trigger validation for the full name field.

- **Submit Form:** Click the "Submit" button to submit the form. The form will reset upon successful submission.
