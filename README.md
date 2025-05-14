# Admin Panel

This is a **React-based Admin Panel** for managing an online store’s product inventory with **responsive design**. The panel allows administrators to **add**, **edit**, **delete**, and **search** products with full **pagination** and **form validation** support. This project uses a **RESTful API** built separately to manage backend data and login/logout authentication.

## Features

- Login/Logout authentication flow (JWT-based)
- Product list with pagination
- Real-time debounced product search
- Add product (with validation)
- Edit product (reusable form component)
- Delete product with confirmation modal
- Form validation using `yup` + `react-hook-form`
- API state management with `react-query`
- Clean and modern UI using CSS Modules
- Dynamic UI updates after any change
- Responsive Design
- Persian (Farsi) based

## Tech Stack

| Category      | Tech                             |
| ------------- | -------------------------------- |
| Frontend      | React, React Router, CSS Modules |
| Forms         | React Hook Form, Yup             |
| State Mgmt    | React Context, React Query       |
| API Requests  | Axios                            |
| Icons         | React Icons                      |
| Notifications | React Toastify                   |
| Unique IDs    | UUID                             |
| Debounce      | Custom hook `useDebounce`        |

## Project Structure

```
src/
│
├── components/         # Reusable components (Form, Table, Searchbar, Modal, etc.)
├── context/            # ProductContext (for managing search, pagination)
├── hooks/              # Custom hooks (e.g. useDebounce)
├── pages/              # Page-level components (e.g. AdminPage, LoginPage)
├── schema/             # Yup validation schemas
├── services/           # API calls via Axios
└── App.jsx             # Main app & routing

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
