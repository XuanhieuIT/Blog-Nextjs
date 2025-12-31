# Blog Next.js Project

This project consists of a **Next.js Frontend** and a **WordPress Backend** (Headless CMS).

## 🚀 How to Run (For New Users)

### 1. Setup Backend (WordPress)
1.  Move the `blog` folder to your server document root (e.g., `htdocs` in XAMPP/MAMP).
2.  Create a MySQL database named `blog_db`.
3.  Import the `blog_db_backup.sql` file into that database (using phpMyAdmin or MySQL Workbench).
4.  Update `blog/wp-config.php` if your database credentials are different from standard (root/empty).
5.  Start your PHP server (e.g., via XAMPP or `php -S localhost:8080`).

### 2. Setup Frontend (Next.js)
1.  Open the `frontend` folder in your terminal.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure
- `blog/`: WordPress source code (Backend).
- `frontend/`: Next.js source code (Frontend).
- `blog_db_backup.sql`: Database backup file.
