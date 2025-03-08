# Shopping Vue

A shopping cart web application built with Vue.js as a personal project for learning and practice. This project demonstrates a complete shopping experience including product listing, detailed product view, cart management, search functionality, and a checkout flow.

## Features

- **Product Listing & Search**
    - Browse products in different layouts (grid or one-line list).
    - Search products by keyword with sorting options (price ascending/descending).
- **Product Detail Page**
    - View detailed information about individual products.
- **Shopping Cart**
    - Add products to the cart.
    - Update quantities and remove items.
    - "Buy Now" functionality for proceeding to checkout.
- **Checkout Process**
    - Review selected products with discount and shipping fee calculations.
    - Input shipping information and submit orders.
- **Responsive & Modern Design**
    - Clean UI with reusable components such as Header, Bottom Navigation, Banner, Product Cards, and a custom Footer.

## Project Structure
```
shopping-vue/
├── public/               # Static assets (images, favicon, etc.)
├── src/
│   ├── api/              # HTTP utilities for API calls (using Axios)
│   ├── assets/           # Images and global styles
│   ├── components/       # Reusable Vue components
│   │   ├── Header.vue
│   │   ├── BottomNav.vue
│   │   ├── Banner.vue
│   │   ├── ProductCard.vue
│   │   ├── OneLineProductCard.vue
│   │   └── FooterInfo.vue
│   ├── views/            # Page-level components
│   │   ├── Home.vue
│   │   ├── Cart.vue
│   │   ├── ProductDetail.vue
│   │   ├── SearchPage.vue
│   │   └── Checkout.vue
│   ├── router/           # Vue Router configuration
│   └── App.vue           # Root component
├── package.json
└── README.md
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/youseonghyeon/shopping-vue.git
   cd shopping-vue
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
   
3. **Run the development server:**

   ```bash
    npm run serve
    ```

## Technologies

- **Vue.js** – A progressive JavaScript framework for building user interfaces.
- **Vue Router** – The official routing library for Vue.js, enabling seamless SPA navigation.
- **Axios** – A promise-based HTTP client used for making API requests.
- **CSS3 / SCSS** – For modern styling, responsive design, and layout management.
- **FontAwesome** – For scalable and customizable icons.
- **Modern JavaScript (ES6+)** – Leveraged throughout the project for clean, efficient code.

## Customization

- **API Endpoints:**  
  Update the endpoints in `src/api/http.js` to match your backend services.
- **Components & Styling:**  
  Customize reusable components (Header, Footer, Product Cards, etc.) and adjust the styling to fit your personal project's branding.
- **State Management:**  
  Consider using Vuex or another state management library if your project scales further.
