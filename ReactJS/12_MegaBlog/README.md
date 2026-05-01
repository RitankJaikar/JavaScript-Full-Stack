### Live URL- https://blog-project-ritank.netlify.app/

# Blog Project - InkNova 🖋️
InkNova is a modern, full-stack blogging platform built using React and Vite, powered by Appwrite as the backend. It provides a seamless experience for creating, editing, and viewing blog posts, with authentication and state management handled efficiently using Redux Toolkit.


## 🔧 Tech Stack:

- Frontend: React (with Vite for bundling)
- Backend: Appwrite (authentication, database, storage)
- State Management: Redux Toolkit
- Routing: React Router DOM
- Forms: React Hook Form
- Styling: Tailwind CSS
- Rich Text Editor: TinyMCE
- HTML Rendering: HTML React Parser

## 📁 Folder Structure Highlights:

```
src/appwrite: Appwrite configuration and auth utilities.

src/components: Reusable components like Header, Footer, Form controls, Auth Layouts, and PostCard.

src/pages: Core pages like Home, AddPost, AllPosts, EditPost, Login, Signup.

src/store: Redux slices for authentication and post management.

App.jsx: Root component managing the layout and routes.

main.jsx: Entry point for the React app.
```

## 📌 Features:
```
✅ User Authentication – Signup, Login, Logout with secure session handling

📝 Blog Management (CRUD) – Create, update, delete blog posts

📚 All Blogs Page – View all posts (active & inactive)

🏠 Home Page – View only active blog posts

✍️ Rich Text Editor – Integrated TinyMCE for blog content creation

📱 Responsive UI – Tailwind CSS-based design across all devices

🔄 Global State Management – Efficient data handling with Redux Toolkit

🔐 Secure Backend – Appwrite ensures safe auth and DB interactions

🧩 Component-Driven Architecture – Clean, reusable, and modular code

🌐 Deployed on:
- Netlify for production hosting
- GitHub for source control and collaboration
```

## ⚠️ Error Handling
```
❌ Auth Errors – Displays validation messages (e.g., invalid credentials, weak passwords)

🚫 Network/API Errors – Catches and displays issues from Appwrite services

🔁 Form Validations – Built-in checks using React Hook Form (e.g., required fields, formats)

🕵️ Edge Cases – Proper feedback when no posts are found or unauthorized actions attempted

✅ Graceful Degradation – Ensures fallback UI or messages in case of unexpected issues
```
