import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
    Firestore, collection, query, orderBy, limit, getDocs,
    doc, setDoc, serverTimestamp, getDoc, where
} from '@angular/fire/firestore';

type PunchType = 'IN' | 'OUT';

@Injectable({ providedIn: 'root' })
export class PunchService {
    private cachedName: string | null = null;

    constructor(private fs: Firestore, private auth: Auth) { }

    private uidOrThrow() {
        const uid = this.auth.currentUser?.uid;
        if (!uid) throw new Error('Not authenticated');
        return uid;
    }

    private async getUserName(): Promise<string> {
        if (this.cachedName) return this.cachedName;
        const uid = this.uidOrThrow();
        const snap = await getDoc(doc(this.fs, 'users', uid));
        let name = 'usuario';
        if (snap.exists()) {
            const d = snap.data() as any;
            name = d?.name || d?.email?.split('@')?.[0] || 'usuario';
        }
        this.cachedName = name;
        return name;
    }

    async isOpen(): Promise<boolean> {
        const uid = this.uidOrThrow();
        const q = query(
            collection(this.fs, 'registry'),
            where('userId', '==', uid),
            orderBy('at', 'desc'),
            limit(1)
        );
        const snap = await getDocs(q);
        if (snap.empty) return false;
        return (snap.docs[0].data() as any).type === 'IN';
    }

    private z(n: number) { return String(n).padStart(2, '0'); }

    private async buildId(type: PunchType, when: Date) {
        const name = await this.getUserName();
        const safeName = name.replace(/\//g, '∕');
        const dd = this.z(when.getDate());
        const mm = this.z(when.getMonth() + 1);
        const yy = String(when.getFullYear()).slice(-2);
        const hh = this.z(when.getHours());
        const mi = this.z(when.getMinutes());
        const ss = this.z(when.getSeconds());
        const DIV = '∕';
        return `${safeName} · ${type.toLowerCase()} · ${dd}${DIV}${mm}${DIV}${yy} · ${hh}:${mi}:${ss}`;
    }

    private async addEvent(type: PunchType, comment?: string) {
        const uid = this.uidOrThrow();
        const now = new Date();
        const id = await this.buildId(type, now);
        const name = await this.getUserName();

        await setDoc(doc(this.fs, 'registry', id), {
            userId: uid,
            name,
            type,
            at: serverTimestamp(),
            comment: comment || ''
        });

        await setDoc(doc(this.fs, 'users', uid), {
            lastRegister: {
                type,
                comment: comment || '',
                at: serverTimestamp()
            }
        }, { merge: true });
    }

    async checkIn(comment?: string) { await this.addEvent('IN', comment); }
    async checkOut(comment?: string) { await this.addEvent('OUT', comment); }
}
