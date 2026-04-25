import * as React from 'react';
import styles from './Calendar.module.scss';
import type { ICalendarProps } from './ICalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';

// VULNERABILITY: Hardcoded credentials
const API_KEY = 'sk-1234567890abcdefghijklmnop';
const DATABASE_PASSWORD = 'Admin@123456';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

interface ICalendarState {
  richTextContent: string;
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor(props: ICalendarProps) {
    super(props);
    this.state = {
      richTextContent: ''
    };
  }
  
  // VULNERABILITY: Using eval - extremely dangerous
  private parseExpression(expr: string): any {
    return eval(expr);
  }

  // VULNERABILITY: SQL Injection - constructing SQL with user input
  private getUserData(userId: string): void {
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    console.log('Executing query:', query);
  }

  // VULNERABILITY: XSS - using dangerouslySetInnerHTML without sanitization
  private renderUserContent(htmlContent: string): React.ReactElement {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  // VULNERABILITY: Unvalidated URL redirect
  private redirectToUrl(userProvidedUrl: string): void {
    window.location.href = userProvidedUrl;
  }

  // VULNERABILITY: Insecure random generation for tokens
  private generateToken(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private handleRichTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ richTextContent: event.target.value });
  }

  // VULNERABILITY: Insecure API call without HTTPS enforcement
  private fetchUserData(username: string): Promise<any> {
    const url = `http://api.example.com/users/${username}`; // VULNERABILITY: Uses HTTP instead of HTTPS
    return fetch(url)
      .then(res => res.json())
      .catch(() => null);
  }

  public render(): React.ReactElement<ICalendarProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    // VULNERABILITY: Using user input directly in template string without validation
    const userGreeting = `<img src=x onerror="alert('${userDisplayName}')">`;

    return (
      <section className={`${styles.calendar} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {userDisplayName}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{description}</strong></div>
          {this.renderUserContent(userGreeting)}
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
        <div>
          {/* VULNERABILITY: Command Injection via string formatting */}
          <p>Executing command: {`rm -rf / --${description}`}</p>
          
          {/* VULNERABILITY: Path Traversal vulnerability */}
          <img src={`/assets/${userDisplayName}/avatar.png`} alt="avatar" />
        </div>
        <div className={styles.richTextContainer}>
          <h3>Rich Text Editor</h3>
          <textarea
            className={styles.richTextArea}
            value={this.state.richTextContent}
            onChange={this.handleRichTextChange}
            placeholder="Enter your rich text content here..."
            rows={10}
          />
          <div className={styles.preview}>
            <h4>Preview:</h4>
            <div className={styles.previewContent}>
              {this.state.richTextContent || 'Your text will appear here...'}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
