## The public Navbar

* Put the logo of your app in `src/images/logo.svg`. A `svg` file is not required, you can use `png` or `jpg` as well.

* Create `src/components/PublicNavbar.js`:

```javascript
import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../images/logo.svg";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" fluid>
      <Navbar.Brand className="mr-auto">
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
    </Navbar>
  );
};

export default PublicNavbar;
```

* In `App.js`, add:

```javascript
    //...
    <div className="text-center">
      <PublicNavbar />
      <Container>
        <h1>Github Issues</h1>
    //...
```