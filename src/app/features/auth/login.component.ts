import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container">
    <h1>Sign in</h1>

<form (ngSubmit)="login()" class="card" autocomplete="off">
  <input type="text" name="fakeuser" autocomplete="username" class="offscreen" />
  <input type="password" name="fakepass" autocomplete="current-password" class="offscreen" />

  <input [(ngModel)]="email" name="loginEmail"
    type="email" placeholder="Email"
    autocomplete="email" inputmode="email"
    autocapitalize="off" spellcheck="false" autofocus required />

  <input [(ngModel)]="password" name="loginPassword"
    type="password" placeholder="Password"
    autocomplete="off" required />

  <button type="submit" [disabled]="loading">Sign in</button>
</form>

    <p class="or">— or —</p>

<form (ngSubmit)="register()" class="card" autocomplete="on">
  <input [(ngModel)]="name" name="regName" type="text" placeholder="Name" />

  <input [(ngModel)]="regEmail" name="regEmail"
    type="email" placeholder="Email"
    autocomplete="email"
    autocapitalize="off" spellcheck="false" required />

  <input [(ngModel)]="regPassword" name="regPassword"
    type="password" placeholder="Password (min. 6)"
    autocomplete="new-password" required />
  <button type="submit" [disabled]="loading">Create account</button>
</form>
  </div>
  `,
  styles: [`
    .container{max-width:380px;margin:40px auto;padding:0 12px;display:flex;flex-direction:column;gap:16px}
    .card{display:flex;flex-direction:column;gap:10px;border:1px solid #ddd;border-radius:12px;padding:16px}
    input{padding:10px;border:1px solid #ccc;border-radius:8px}
    button{padding:10px 14px;border-radius:10px;border:none;background:#2d6cdf;color:#fff;cursor:pointer}
    .or{ text-align:center; color:#666 }
    .offscreen{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden}
  `]
})

export class LoginComponent {
  loading = false;

  email = '';
  password = '';
  regEmail = '';
  regPassword = '';
  name = '';

  constructor(private auth: Auth, private fs: Firestore, private router: Router) { }

  private showAuthError(code: string, fallback: string) {
    const map: Record<string, string> = {
      'auth/weak-password': 'Password is too short (minimum 6 characters).',
      'auth/email-already-in-use': 'That email is already registered.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/invalid-credential': 'Incorrect email or password.',
      'auth/user-not-found': 'No account found with that email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/too-many-requests': 'Too many attempts. Try again later.'
    };
    alert(map[code] ?? fallback);
  }

  ngOnInit() {
    const last = localStorage.getItem('lastEmail');
    if (last) this.email = last;
  }

  async login() {
    this.loading = true;
    try {
      const cred = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      localStorage.setItem('lastEmail', this.email);
      await setDoc(doc(this.fs, 'users', cred.user.uid), {
        email: this.email.toLowerCase(),
        name: (this.email.split('@')[0] || 'null')
      }, { merge: true });
      this.router.navigateByUrl('/fichar');
    } catch (e: any) {
      this.showAuthError(e?.code, 'Could not sign in.');
    } finally { this.loading = false; }
  }

  async register() {
    if (!this.regEmail || !this.regPassword) {
      alert('Enter email and password.');
      return;
    }
    if (this.regPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    this.loading = true;
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, this.regEmail, this.regPassword);
      const uid = cred.user.uid;

      await setDoc(doc(this.fs, 'users', uid), {
        uid,
        email: this.regEmail.toLowerCase(),
        name: (this.name || this.regEmail.split('@')[0] || 'null').trim()
      }, { merge: true });

      this.router.navigateByUrl('/fichar');
    } catch (e: any) {
      this.showAuthError(e?.code, 'Could not create the account.');
    } finally { this.loading = false; }
  }
}
