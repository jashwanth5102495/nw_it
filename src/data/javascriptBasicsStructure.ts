import { FileNode } from '../components/FolderStructure';

export const javascriptBasicsStructure: FileNode[] = [
  {
    name: 'javascript-basics-course',
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
    <title>JavaScript Basics Course</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>JavaScript Basics Interactive Examples</h1>
            <p>Open the browser console to see JavaScript output</p>
        </header>
        
        <main>
            <section id="variables-section">
                <h2>Variables & Data Types</h2>
                <button onclick="demonstrateVariables()">Run Variables Demo</button>
                <div id="variables-output"></div>
            </section>
            
            <section id="functions-section">
                <h2>Functions</h2>
                <button onclick="demonstrateFunctions()">Run Functions Demo</button>
                <div id="functions-output"></div>
            </section>
            
            <section id="dom-section">
                <h2>DOM Manipulation</h2>
                <button onclick="demonstrateDOM()">Run DOM Demo</button>
                <div id="dom-output"></div>
            </section>
        </main>
    </div>
    
    <!-- Load JavaScript files -->
    <script src="js/01-variables.js"></script>
    <script src="js/02-functions.js"></script>
    <script src="js/03-dom-manipulation.js"></script>
    <script src="js/04-events.js"></script>
    <script src="js/05-arrays-objects.js"></script>
    <script src="js/main.js"></script>
</body>
</html>`
      },
      {
        name: 'css',
        type: 'folder',
        children: [
          {
            name: 'styles.css',
            type: 'file',
            language: 'css',
            content: `/* CSS Styles for JavaScript Basics Course */

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
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

section {
    background: white;
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

section h2 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
    margin-bottom: 1rem;
}

button:hover {
    background: #5a67d8;
}

.output {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    padding: 1rem;
    margin-top: 1rem;
    font-family: 'Courier New', monospace;
    white-space: pre-wrap;
}

.highlight {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
}

.error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
}

.success {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
}`
          }
        ]
      }
    ]
  }
];