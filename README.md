# Admin Panel (Next.js Pages Router)

This is a **Next.js-based Admin Panel** for managing an online store’s product inventory with **responsive design**. The panel allows administrators to **add**, **edit**, **delete**, and **search** products with full **pagination** and **form validation** support. This project uses a **RESTful API** built separately to manage backend data and login/logout authentication.

## Features

- Login/Logout authentication flow (JWT-based)
- Product list with pagination
- Real-time debounced product search
- Add product (with validation)
- Edit product (reusable form component)
- Delete product with confirmation modal
- Axios Interceptor for Auto Authorization
- Form validation using `yup` + `react-hook-form`
- API state management with `react-query`
- Clean and modern UI using CSS Modules
- Dynamic UI updates after any change
- Responsive Design
- Persian (Farsi) based

## Tech Stack

| Category      | Tech                       |
| ------------- | -------------------------- |
| Framework     | **Next.js** (App Router)   |
| Forms         | React Hook Form, Yup       |
| State Mgmt    | React Context, React Query |
| API Requests  | Axio + Interceptors        |
| Icons         | React Icons                |
| Notifications | React Toastify             |
| Styling       | CSS Modules                |
| Unique IDs    | UUID                       |
| Debounce      | Custom hook `useDebounce`  |

## Project Structure

```
.
├── components/
│   ├── Footer.jsx
│   ├── LoginForm.jsx
│   ├── Modal.jsx
│   ├── Pagination.jsx
│   ├── ProductForm.jsx
│   ├── ProductTable.jsx
│   ├── RegisterForm.jsx
│   ├── Searchbar.jsx
│   └── Toast.jsx
│
├── pages/
│   ├── api/
│   ├── _app.js
│   ├── dashboard.js
│   ├── index.js
│   ├── login.js
│   └── register.js
│
├── public/
│   ├── Close.png
│   ├── favicon.ico
│   ├── Union.png
│   ├── user.png
│   └── ...
│
├── src/
│   ├── context/
│   │   └── ProductContext.jsx
│   │
│   ├── hooks/
│   │   └── useDebounce.js
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── schema/
│   │   ├── loginSchema.js
│   │   ├── newProductSchema.js
│   │   └── registerSchema.js
│   │
│   └── services/
│       ├── authService.js
│       └── dataApi.js
│
├── styles/
│   ├── globals.css
│   ├── Footer.module.css
│   ├── LoginForm.module.css
│   ├── LoginPage.module.css
│   ├── Modal.module.css
│   ├── Pagination.module.css
│   ├── ProductForm.module.css
│   ├── ProductTable.module.css
    └── Searchbar.module.css


```

## Authentication

- User logs in with a username and password
- On successful login, a JWT token is stored in `localStorage`
- Protected routes check for the presence of the token
- Logout removes the token and redirects the user

## API Specs

The frontend expects the backend to return paginated product data with this shape:

```json
{
  "totalProducts": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "price": 10000,
      "quantity": 3
    }
  ]
}
```

## License

This project is open-source and free to use under the [MIT License](LICENSE).

## Developer

This project is built and maintained By **MiladNz**.
