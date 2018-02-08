import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    public qs;
    public stats;
    public search: string;
    public flyout: boolean = false;
    public info: boolean = false;
    public hideAnswered: boolean = false;
    public hideCorrect: boolean = false;

    private _rts = {};

    constructor(private _localStorageService: LocalStorageService) {
        let qs = require('../assets/quiz.json');
        this.qs = qs.map(q => {
            q.index = [q.id, q.txt, q.ans[0]['txt'], q.ans[1]['txt'], q.ans[2]['txt']].join('');
            return q;
        });

        let _rts = _localStorageService.get('rts');
        if (_rts)
            this._rts = _rts;

        let stats = _localStorageService.get('stats');
        if (stats)
            this.stats = stats;
        else {
            this.stats = {
                'errors': 0,
                'responses': 0
            }
        }
    }

    public percentage(): number {
        return (this.stats['responses'] - this.stats['errors']) / this.stats['responses'];
    }

    public evaluate(q, a) {
        if (this.isAnswered(q.id)) return;

        if (!a.mark) this.stats['errors']++;
        this.stats['responses']++;

        this._rts[q.id] = {
            'mark': a.mark,
            'click': q.ans.indexOf(a)
        }

        this._localStorageService.set('rts', this._rts);
        this._localStorageService.set('stats', this.stats);
    }

    public isCorrect(qid: number): boolean | null {
        if (typeof this._rts[qid] == 'undefined')
            return false;
        else
            return this._rts[qid].mark;
    }

    public isAnswered(qid: number): boolean {
        return typeof this._rts[qid] != 'undefined';
    }

    public isClicked(q, a) {
        return typeof this._rts[q.id] != 'undefined' && this._rts[q.id].click == q.ans.indexOf(a);
    }

    public reset(dialog: string) {
        if (!confirm(dialog)) return;
        this.stats['errors'] = this.stats['responses'] = 0;
        this._rts = {};
        localStorage.clear();
    }

    public resetErrors(dialog: string) {
        if (!confirm(dialog)) return;
        for (let i in this._rts) {
            if (!this._rts[i].mark) {
                this.stats['errors']--;
                this.stats['responses']--;
                delete this._rts[i];
            }
        }
    }

    public pad(num, size) {
        var s = num + '';
        while (s.length < size) s = "0" + s;
        return s;
    }
}
