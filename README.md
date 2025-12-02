

# Account Management System  
### A Beautiful & Secure User Authentication App built with React + Vite

Live Demo: https://data-manage-app.netlify.app/login 
---
### Features
```


- Complete User Authentication System
- Register with strong password validation (8+ chars, uppercase, number, special char)
- Gmail-only registration (@gmail.com)
- Auto-login after registration (No double login!)
- Secure login & logout
- Edit Profile (Name, Email, Phone, Profile Picture)
- Change Password (Works globally – you can log in with new password)
- Beautiful purple gradient design (Login, Register, Dashboard)
- Fully responsive (Mobile + Desktop)
- Data persists using `localStorage` (No backend needed)
- Built with React, Vite, React Router, Bootstrap 5 & Lucide Icons

```
---
### Tech Stack
```
- *Frontend*: React.js + Vite
- *Routing*: React Router DOM v6
- *Styling*: Bootstrap 5 + Custom CSS
- *Icons*: Lucide React
- *State Management*: React Context API
- *Storage*: localStorage (Offline-first)
```
---
### Project Structure
```
      
         my-account-app/
         ├── public/
         │   └── vite.svg
         ├── src/
         │   ├── Components/               ← All your pages & context here
         │   │   ├── App.jsx               ← Main routes (Login, Register, Dashboard)
         │   │   ├── AuthContext.jsx       ← Authentication logic (register, login, etc.)
         │   │   ├── LoginPage.jsx
         │   │   ├── RegistrationPage.jsx
         │   │   └── Dashboard.jsx
         │   ├── assets/
         │   │   ├── img-1.png             ← Your logo (for login/register)
         │   │   └── img-2.png             ← Default profile picture
         │   └── main.jsx                  ← Entry point (renders <App />)
         ├── index.html
         ├── package.json
         ├── vite.config.js
         └── README.md
```
---

### How to Run Locally

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

---

### Deploy on Netlify (2 Minutes)

1. Run build:
   ```bash
   npm run build
   ```

2. Drag & drop the `dist` folder here → https://app.netlify.com/drop

   OR connect GitHub for auto-deploy:
   - Build command: `npm run build`
   - Publish directory: `dist`

Your site will be live instantly!

---

### Default Login (For Testing)

After registering once, you can log in with your created account.

**Example Test Account (after first register):**
- Email: `khushi@gmail.com`
- Password: `Khushi@123`

---

### Screenshots
Login Page
------------
<img width="1779" height="879" alt="{4D040BE7-7504-4656-9390-D2578A05567A}" src="https://github.com/user-attachments/assets/9e0d1acb-5950-49b7-8659-58383253527b" />

 Registration
 ------------
 <img width="1805" height="947" alt="{725CA998-3206-4143-BC7D-BF61E7BE1A38}" src="https://github.com/user-attachments/assets/76266a2c-9192-4fb3-afa0-50b53828634e" />

 Dashboard
 ----------
 <img width="1638" height="956" alt="{E1CDB15C-2B6D-4A43-8963-559349F09F7A}" src="https://github.com/user-attachments/assets/abb54ef2-c704-4650-953f-fd0e0526505a" />


---

### Future Enhancements (Optional)

- Add Firebase / Supabase backend
- Email verification
- Forgot password
- Dark mode toggle
- Google Sign-In

---

### Made with Love by Khushi

> A clean, modern, and fully functional account management system — perfect for learning React authentication!

Give a Star if you like it!  
Feel free to fork and customize!

---
### Instructions:
```

1. Create a file named `README.md` in your project root
2. Paste the above content
3. (Optional) Create a `screenshots/` folder and add real screenshots
4. Push to GitHub → Deploy on Netlify → Update the live link

Your project will look **super professional** on GitHub and impress everyone!

Want me to generate the screenshots or make a GitHub repo banner too? Just say the word!
```
