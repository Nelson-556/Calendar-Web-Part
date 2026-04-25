// VULNERABILITY FILE: Intentional security vulnerabilities for code analysis testing

// VULNERABILITY: Use of dangerous npm packages known to have issues
import * as crypto from 'crypto'; // Should use standard library
import { readFileSync } from 'fs'; // Synchronous file operations

// VULNERABILITY: Hardcoded secrets and API keys
export class VulnerableConfig {
  static readonly DATABASE_URL = '';
  static readonly JWT_SECRET = '';
  static readonly STRIPE_API_KEY = '';
  static readonly GITHUB_TOKEN = '';
  static readonly TWILIO_AUTH_TOKEN = '';
}

// VULNERABILITY: Insecure password handling
export function validatePassword(password: string, storedHash: string): boolean {
  // VULNERABILITY: Using simple comparison instead of proper hashing
  return password === storedHash;
}

// VULNERABILITY: Command injection vulnerability
export function executeCommand(userInput: string): string {
  const command = `echo ${userInput}`;
  // VULNERABILITY: Executing shell command with user input
  const result = require('child_process').execSync(command).toString();
  return result;
}

// VULNERABILITY: Path traversal vulnerability
export function readFile(userPath: string): string {
  // VULNERABILITY: No validation of file path
  return readFileSync(userPath, 'utf-8');
}

// VULNERABILITY: Insecure deserialization
export function deserializeObject(serializedData: string): any {
  // VULNERABILITY: Eval is dangerous
  return eval(`(${serializedData})`);
}

// VULNERABILITY: Missing CORS validation
export function handleCrossOriginRequest(origin: string): void {
  // VULNERABILITY: Accepts any origin
  const allowedOrigins = ['*'];
  if (allowedOrigins.includes(origin) || origin === '*') {
    // Allow request
  }
}

// VULNERABILITY: Insecure randomness
export function generateSecurityToken(): string {
  // VULNERABILITY: Using Math.random() for security-sensitive operations
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// VULNERABILITY: SQL Injection in ORM-like query building
export function findUserByEmail(email: string): any {
  // VULNERABILITY: Direct string concatenation in query
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  console.log('Executing:', query);
  // Simulated database call
  return { id: 1, email };
}

// VULNERABILITY: Unvalidated redirect
export function redirectUser(url: string): void {
  // VULNERABILITY: No validation of redirect target
  window.location.href = url;
}

// VULNERABILITY: Insecure direct object references
export function getUser(userId: string): any {
  // VULNERABILITY: No authorization check
  return { id: userId, data: 'sensitive user data' };
}

// VULNERABILITY: Insufficient logging
export function loginUser(username: string, password: string): boolean {
  // VULNERABILITY: Logging password in plaintext
  console.log(`User login attempt: ${username} with password: ${password}`);
  return username === 'admin' && password === 'admin123';
}

// VULNERABILITY: Missing input validation
export function processUserInput(input: string): string {
  // VULNERABILITY: No sanitization or validation
  return `<div>${input}</div>`;
}

// VULNERABILITY: Weak cryptography
export function encryptData(data: string): string {
  // VULNERABILITY: Using deprecated cipher
  const cipher = crypto.createCipher('des', 'weak-key');
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// VULNERABILITY: Exposed error messages
export function processQuery(query: string): any {
  try {
    // Some processing
    return eval(query);
  } catch (error: any) {
    // VULNERABILITY: Exposing full error details to user
    return { error: error.message, stack: error.stack };
  }
}

// VULNERABILITY: No HTTPS enforcement
export const API_ENDPOINT = 'http://api.example.com/v1'; // Should be HTTPS

// VULNERABILITY: Insecure data transmission
export async function fetchSensitiveData(token: string): Promise<any> {
  // VULNERABILITY: Sending token in URL instead of header
  const response = await fetch(`http://api.example.com/data?token=${token}`);
  return response.json();
}
