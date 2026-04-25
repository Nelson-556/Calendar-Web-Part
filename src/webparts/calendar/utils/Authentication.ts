// VULNERABILITY FILE: Authentication module with multiple security issues

// VULNERABILITY: Weak password hashing
function hashPassword(password: string): string {
  // VULNERABILITY: Using simple SHA256 instead of proper bcrypt
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}

// VULNERABILITY: Plain text password comparison
function comparePasswords(password: string, hash: string): boolean {
  // VULNERABILITY: Direct comparison without timing attack protection
  return hashPassword(password) === hash;
}

// VULNERABILITY: Session fixation vulnerability
function createSession(user: any): string {
  // VULNERABILITY: Predictable session ID
  const sessionId = user.id + Date.now().toString();
  sessionStorage[sessionId] = JSON.stringify(user);
  return sessionId;
}

// VULNERABILITY: XSS through innerHTML
function displayUserProfile(userId: string): void {
  const userHtml = `<h1>${userId}'s Profile</h1>
    <p>Welcome back, ${userId}!</p>`;
  // VULNERABILITY: Using innerHTML with user-controlled data
  document.getElementById('profile').innerHTML = userHtml;
}

// VULNERABILITY: Unvalidated file upload
function handleFileUpload(file: any): void {
  // VULNERABILITY: No file type validation
  const reader = new FileReader();
  reader.onload = function(e: any) {
    // VULNERABILITY: Directly executing file content
    eval(e.target.result);
  };
  reader.readAsText(file);
}

// VULNERABILITY: CSRF token not validated
function submitForm(data: any): void {
  // VULNERABILITY: No CSRF token verification
  fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// VULNERABILITY: Unencrypted sensitive data in localStorage
function storeUserData(user: any): void {
  // VULNERABILITY: Storing sensitive data in plaintext
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('authToken', user.token);
  localStorage.setItem('apiKey', user.apiKey);
}

// VULNERABILITY: XXE (XML External Entity) vulnerability
function parseXML(xmlString: string): any {
  // VULNERABILITY: Using DOMParser without XXE protection
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'text/xml');
}

// VULNERABILITY: Insecure randomness for sensitive operations
function generateActivationCode(): string {
  // VULNERABILITY: Using Math.random() for security purposes
  return Math.random().toString(36).substring(2, 8);
}

// VULNERABILITY: Missing rate limiting
function handleLogin(username: string, password: string): void {
  // VULNERABILITY: No rate limiting on login attempts
  if (validateCredentials(username, password)) {
    setAuthToken(generateToken());
  }
}

// VULNERABILITY: Directory traversal in file serving
function serveFile(filename: string): any {
  // VULNERABILITY: No path sanitization
  const fs = require('fs');
  const path = `/files/${filename}`;
  return fs.readFileSync(path);
}

// VULNERABILITY: Broken authentication - no proper user isolation
async function getUserData(userId: string): Promise<any> {
  // VULNERABILITY: No authorization check
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

// VULNERABILITY: Sensitive information exposure in error messages
function processPayment(paymentData: any): void {
  try {
    // Payment processing logic
    submitPayment(paymentData);
  } catch (error: any) {
    // VULNERABILITY: Exposing sensitive details in error
    console.error('Payment failed:', error.message);
    alert(`Error: ${error.message} - Card details: ${paymentData.cardNumber}`);
  }
}

// VULNERABILITY: Injection vulnerability in JavaScript
function executeUserScript(script: string): void {
  // VULNERABILITY: Using eval with user input
  eval(script);
}

// VULNERABILITY: Broken access control
const userPermissions: any = {
  // VULNERABILITY: Permissions stored insecurely
  1: ['read', 'write', 'delete'],
  2: ['read']
};

function checkPermission(userId: string, action: string): boolean {
  // VULNERABILITY: No validation of userId parameter
  return userPermissions[userId]?.includes(action) || false;
}

// Helper functions (intentionally insecure)
function validateCredentials(username: string, password: string): boolean {
  return true; // VULNERABILITY: Always returns true
}

function setAuthToken(token: string): void {
  localStorage.setItem('token', token);
}

function generateToken(): string {
  return Math.random().toString();
}

function submitPayment(data: any): void {
  // Placeholder
}

export {
  hashPassword,
  comparePasswords,
  createSession,
  displayUserProfile,
  handleFileUpload,
  submitForm,
  storeUserData,
  parseXML,
  generateActivationCode,
  handleLogin,
  serveFile,
  getUserData,
  processPayment,
  executeUserScript,
  checkPermission
};
