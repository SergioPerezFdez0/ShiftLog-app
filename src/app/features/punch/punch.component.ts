import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { PunchService } from './punch.service';

@Component({
  selector: 'app-punch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container">
    <header>
      <h1>Time tracking</h1>
      <button (click)="logout()">Sign out</button>
    </header>

    <div class="card">
  <p *ngIf="loading">Loading status…</p>
  <p *ngIf="error" class="err">{{ error }}</p>

      <ng-container *ngIf="!loading && !error">
  <p>Status: <strong>{{ inShift ? 'On shift' : 'Off shift' }}</strong></p>

  <textarea [(ngModel)]="comment" rows="3" placeholder="Comment (optional)"></textarea>

        <button (click)="togglePunch()">
          {{ inShift ? 'Clock out' : 'Clock in' }}
        </button>

        <p class="hint">* The comment is saved in the created event.</p>
      </ng-container>
    </div>
  </div>
  `,
  styles: [`
    .container{max-width:520px;margin:40px auto;padding:0 12px}
    header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
    .card{border:1px solid #ddd;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px}
    textarea{width:100%;resize:vertical}
    button{padding:10px 14px;border-radius:10px;border:none;background:#2d6cdf;color:#fff;cursor:pointer}
    .hint{color:#666;font-size:.9rem}
    .err{color:#b00020}
  `]
})

export class PunchComponent implements OnInit, OnDestroy {
  inShift = false;
  loading = true;
  comment = '';
  error: string | null = null;
  private unsubAuth?: () => void;

  constructor(private svc: PunchService, private auth: Auth, private router: Router) { }

  ngOnInit() {
    this.unsubAuth = onAuthStateChanged(this.auth, async user => {
      if (!user) { this.router.navigateByUrl('/'); return; }
      await this.refresh();
    });
  }
  ngOnDestroy() { this.unsubAuth?.(); }

  private async refresh() {
    this.loading = true;
    try { this.inShift = await this.svc.isOpen(); this.error = null; }
    catch (e: any) { this.error = e?.message || 'An error occurred while loading.'; }
    finally { this.loading = false; }
  }

  async togglePunch() {
    this.loading = true;
    try {
      if (this.inShift) await this.svc.checkOut(this.comment || undefined);
      else await this.svc.checkIn(this.comment || undefined);
      this.comment = '';
      await this.refresh();
    } catch (e: any) {
      this.error = e?.message || 'Could not save.';
    } finally { this.loading = false; }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigateByUrl('/');
  }
}
