# 📦 GitHub Clone with CLI & AWS S3 Integration

A fully functional GitHub-like platform with both a **web interface** and **command line interface** (CLI) support.  
Users can create repositories, manage files, view issues, and run Git-like commands directly from the terminal — with **AWS S3** used for storing repository data.

## 🚀 Live Demo
[🔗 Click here to view deployed project](https://github-clone-kfgk.onrender.com/)

---

## 📜 Features
### 🌐 Web App Features
- 🔑 **User Authentication** – Sign up, login, and logout functionality.
- 📁 **Repository Management** – Create, edit, and delete repositories.
- 📄 **File Upload & View** – Upload files to repositories and view them directly.
- 📝 **Issues Management** – Create and manage issues like GitHub.
- 🔍 **Search Functionality** – Search repositories and users.
- 🎨 **Responsive UI** – Works perfectly on desktop & mobile.

### 💻 CLI Features
Built using **Node.js**, **Express**, **yargs**, and integrated with **AWS S3** for file storage.  
Run commands directly from your terminal:

| Command | Description |
|---------|-------------|
| `node app.js init` | Initialize a new repository |
| `node app.js add <file>` | Add a file to the staging area |
| `node app.js commit <message>` | Commit changes with a message |
| `node app.js push` | Push commits to AWS S3 bucket |
| `node app.js pull` | Pull latest changes from AWS S3 |
| `node app.js revert <commitId>` | Revert repository to a previous commit |

---

## 🛠 Tech Stack
**Frontend:** React.js, React Router, Axios, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Storage:** AWS S3  
**Hosting:** Render  
**Version Control:** Git & GitHub  
**CLI:** yargs, body-parser, cors, supabase

---

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/GITHUB-CLONE.git
cd GITHUB-CLONE
