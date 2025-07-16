# 🛍️ Medsta Front-End

**Medsta Front-End** is the client-side of the Medsta e-commerce web application, built with **Next.js** and designed to provide a smooth shopping experience. It integrates seamlessly with the Medsta backend and supports user and admin features.

---

## 🎯 Purpose

Deliver a responsive, dynamic e-commerce platform where users can:

- Browse and search products
- Add items to their cart and checkout
- Read blogs and product reviews
- Manage their orders and profiles
- Access an admin panel to manage products, categories, blogs, etc.

---

## 🚀 Features

- 🏠 **Home Page**
- 🛒 **Product Listing & Detail Pages**
- 🧺 **Shopping Cart & Checkout**
- 🧑 **User Profile & Orders**
- 📝 **Blog Section**
- ⚙️ **Admin Panel** (for managing products, categories, blogs)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **API Integration**: Medsta Backend (NestJS + PostgreSQL)
- **Authentication**: JWT stored in cookies
- **Image Uploads**: Integrated with [ImageKit.io](https://imagekit.io/)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint
PRIVATE_KEY=your_imagekit_private_key
JWT_SECRET=your_jwt_secret
```

---

## 🧱 Installation

```bash
# Clone the repository
git clone git@github.com:SaboorSohaib/medsta-frontend.git
cd medsta-frontend

# Install dependencies
npm install
```

---

## ▶️ Running the Project

```bash
# Start the development server
npm run dev

# Production build
npm run build
npm start
```

The app will run on:  
`http://localhost:3000`

---

## 📦 Folder Structure

```
app/
├── about-us/              # About us page
├── admin/                 # Admin panel views
├── api/                   # Imagekit API interaction layer
├── blog/                  # Blog section
├── cart/                  # Shopping cart pages
├── check-out/             # Checkout flow
├── customComponents/      # Custom reusable components
├── faq/                   # FAQ section
├── products/              # Product-related pages
├── signin/                # Sign-in page
├── signup/                # Sign-up page
├── user-profile/          # User profile and order management

ComponentsUI/              # shadcn UI components
hooks/                     # Custom React hooks
lib/                       # Utility libraries and helpers
redux/                     # Redux Toolkit slices and store setup
```

---

## 🧾 Notes

- Ensure your backend (`Medsta API`) is running and accessible.
- ImageKit is used for image uploads—credentials are required in `.env.local`.

---

## 🤝 Contributing

Feel free to open issues or pull requests for improvements or bug fixes.

---

## 👨‍💻 Author

Built with ❤️ by Abdul Saboor Sohaib.
