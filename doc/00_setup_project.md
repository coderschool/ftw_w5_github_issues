## Setup a new React App

- **Create new project** with `create_react_app`

```bash
$ mkdir your_project_name
$ cd your_project_name
$ npx create-react-app ./
$ npm i --save react-bootstrap bootstrap
```

- **Remove everything in the folder `/src`**, or delete it and create a new one.

- **Create file** `/src/index.js`:
```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <App />, 
  document.getElementById("root")
);
```

- **Create file** `/src/app.js`:
```javascript
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="text-center">
      <Container>
        <h1>My new React App</h1>
      </Container>
    </div>
  );
}

export default App;
```

**Optional:**

- Replace the **icon** and the **title** of the app:
  - Copy your icon file to `/public/` e.g. `icon.png`
  - Go to `/puclic/index.html` replace `<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />` with `<link rel="icon" href="%PUBLIC_URL%/icon.png" />`
  - In `/puclic/index.html`, change `<title>React App</title>` to `<title>your_project_name</title>`