import { FileNode } from '../components/FolderStructure';

export const cssGridStructure: FileNode[] = [
  {
    name: 'css-grid-course',
    type: 'folder',
    children: [
      {
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Course</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/01-basic.css">
</head>
<body>
    <div class="container">
        <header class="header">Header</header>
        <nav class="sidebar">Sidebar</nav>
        <main class="content">Main Content</main>
        <footer class="footer">Footer</footer>
    </div>
</body>
</html>`
      },
      {
        name: 'css',
        type: 'folder',
        children: [
          {
            name: 'base.css',
            type: 'file',
            language: 'css',
            content: `/* Base styles for all examples */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Common grid item styles */
.header, .sidebar, .content, .footer {
    padding: 20px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
}

.header {
    background-color: #3498db;
    color: white;
}

.sidebar {
    background-color: #2ecc71;
    color: white;
}

.content {
    background-color: #e74c3c;
    color: white;
}

.footer {
    background-color: #9b59b6;
    color: white;
}`
          },
          {
            name: '01-basic.css',
            type: 'file',
            language: 'css',
            content: `/* Basic CSS Grid Layout */
.container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header header"
        "sidebar content"
        "footer footer";
    gap: 20px;
    min-height: 100vh;
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.content {
    grid-area: content;
}

.footer {
    grid-area: footer;
}`
          },
          {
            name: '02-placement.css',
            type: 'file',
            language: 'css',
            content: `/* Grid Item Placement */
.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
}

/* Place items using grid-column and grid-row */
.item-1 {
    grid-column: 1 / 3;
    grid-row: 1;
    background-color: #3498db;
}

.item-2 {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
    background-color: #2ecc71;
}

.item-3 {
    grid-column: 1;
    grid-row: 2 / 4;
    background-color: #e74c3c;
}

.item-4 {
    grid-column: 2 / 5;
    grid-row: 3;
    background-color: #9b59b6;
}`
          },
          {
            name: '03-named-areas.css',
            type: 'file',
            language: 'css',
            content: `/* Named Grid Areas */
.container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    gap: 20px;
    min-height: 100vh;
}

.header {
    grid-area: header;
    background-color: #34495e;
    color: white;
    padding: 20px;
    text-align: center;
}

.sidebar {
    grid-area: sidebar;
    background-color: #3498db;
    color: white;
    padding: 20px;
}

.main {
    grid-area: main;
    background-color: #ecf0f1;
    padding: 20px;
}

.aside {
    grid-area: aside;
    background-color: #2ecc71;
    color: white;
    padding: 20px;
}

.footer {
    grid-area: footer;
    background-color: #95a5a6;
    color: white;
    padding: 20px;
    text-align: center;
}`
          },
          {
            name: '04-responsive-gallery.css',
            type: 'file',
            language: 'css',
            content: `/* Responsive Gallery Layout */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.gallery-item {
    background-color: #3498db;
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: translateY(-5px);
}

/* Featured items span multiple columns */
.gallery-item.featured {
    grid-column: span 2;
    background-color: #e74c3c;
}

.gallery-item.large {
    grid-row: span 2;
    background-color: #2ecc71;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
    .gallery {
        grid-template-columns: 1fr;
    }
    
    .gallery-item.featured,
    .gallery-item.large {
        grid-column: span 1;
        grid-row: span 1;
    }
}`
          },
          {
            name: '05-dashboard.css',
            type: 'file',
            language: 'css',
            content: `/* Dashboard Layout */
.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr 300px;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
        "nav header header"
        "nav main sidebar";
    height: 100vh;
    gap: 0;
}

.nav {
    grid-area: nav;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
}

.header {
    grid-area: header;
    background-color: #34495e;
    color: white;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bdc3c7;
}

.main {
    grid-area: main;
    background-color: #ecf0f1;
    padding: 20px;
    overflow-y: auto;
}

.sidebar {
    grid-area: sidebar;
    background-color: #f8f9fa;
    padding: 20px;
    border-left: 1px solid #dee2e6;
}

/* Widget grid inside main area */
.widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.widget {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.widget.large {
    grid-column: span 2;
}

/* Responsive dashboard */
@media (max-width: 1024px) {
    .dashboard {
        grid-template-columns: 1fr;
        grid-template-rows: 60px auto 1fr;
        grid-template-areas:
            "header"
            "nav"
            "main";
    }
    
    .sidebar {
        display: none;
    }
    
    .nav {
        padding: 10px 20px;
    }
}`
          }
        ]
      },
      {
        name: 'demos',
        type: 'folder',
        children: [
          {
            name: '01-basic.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Grid Layout</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/01-basic.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Website Header</h1>
        </header>
        <nav class="sidebar">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <main class="content">
            <h2>Main Content Area</h2>
            <p>This is where your main content goes. The grid layout automatically handles the positioning.</p>
        </main>
        <footer class="footer">
            <p>&copy; 2024 CSS Grid Course. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`
          },
          {
            name: '02-placement.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Item Placement</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/02-placement.css">
</head>
<body>
    <div class="container">
        <div class="item-1">Item 1<br>Spans 2 columns</div>
        <div class="item-2">Item 2<br>Spans 2 rows</div>
        <div class="item-3">Item 3<br>Spans 2 rows</div>
        <div class="item-4">Item 4<br>Spans 3 columns</div>
    </div>
</body>
</html>`
          },
          {
            name: '03-named-areas.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Named Grid Areas</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/03-named-areas.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Blog Layout with Named Areas</h1>
        </header>
        <nav class="sidebar">
            <h3>Categories</h3>
            <ul>
                <li>Web Development</li>
                <li>CSS Grid</li>
                <li>JavaScript</li>
                <li>React</li>
            </ul>
        </nav>
        <main class="main">
            <article>
                <h2>Understanding CSS Grid</h2>
                <p>CSS Grid is a powerful layout system that allows you to create complex layouts with ease...</p>
            </article>
        </main>
        <aside class="aside">
            <h3>Recent Posts</h3>
            <ul>
                <li>Grid vs Flexbox</li>
                <li>Responsive Design</li>
                <li>CSS Variables</li>
            </ul>
        </aside>
        <footer class="footer">
            <p>Copyright 2024 - CSS Grid Tutorial</p>
        </footer>
    </div>
</body>
</html>`
          },
          {
            name: '04-responsive-gallery.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Gallery</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/04-responsive-gallery.css">
</head>
<body>
    <div class="gallery">
        <div class="gallery-item">Image 1</div>
        <div class="gallery-item featured">Featured Image</div>
        <div class="gallery-item">Image 3</div>
        <div class="gallery-item large">Large Image</div>
        <div class="gallery-item">Image 5</div>
        <div class="gallery-item">Image 6</div>
        <div class="gallery-item">Image 7</div>
        <div class="gallery-item">Image 8</div>
    </div>
</body>
</html>`
          },
          {
            name: '05-dashboard.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Layout</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/05-dashboard.css">
</head>
<body>
    <div class="dashboard">
        <nav class="nav">
            <h2>Dashboard</h2>
            <ul>
                <li>Overview</li>
                <li>Analytics</li>
                <li>Reports</li>
                <li>Settings</li>
            </ul>
        </nav>
        <header class="header">
            <h1>Welcome to Your Dashboard</h1>
        </header>
        <main class="main">
            <div class="widgets">
                <div class="widget large">
                    <h3>Sales Overview</h3>
                    <p>Chart goes here...</p>
                </div>
                <div class="widget">
                    <h3>Total Users</h3>
                    <p>1,234</p>
                </div>
                <div class="widget">
                    <h3>Revenue</h3>
                    <p>$12,345</p>
                </div>
                <div class="widget">
                    <h3>Orders</h3>
                    <p>567</p>
                </div>
            </div>
        </main>
        <aside class="sidebar">
            <h3>Recent Activity</h3>
            <ul>
                <li>New user registered</li>
                <li>Order #123 completed</li>
                <li>Payment received</li>
            </ul>
        </aside>
    </div>
</body>
</html>`
          }
        ]
      },
      {
        name: 'assets',
        type: 'folder',
        children: [
          {
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# Assets Folder

This folder contains optional images and placeholders for the CSS Grid course.

## Suggested Images:
- Hero banner images
- Gallery placeholder images
- Icon sets for navigation
- Background patterns

## File Organization:
\`\`\`
assets/
├── images/
│   ├── gallery/
│   ├── icons/
│   └── backgrounds/
└── fonts/ (optional)
\`\`\`

## Usage:
Reference these assets in your CSS using relative paths:
\`\`\`css
background-image: url('../assets/images/hero-bg.jpg');
\`\`\``
          }
        ]
      }
    ]
  }
];