import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

	public qs;
	public stats = {};

	public hideAnswered = false;
	public hideCorrect = false;

	private _rts = {};

	constructor(private _localStorageService: LocalStorageService){
		this.qs = require('../assets/quiz.json');

		let _rts = _localStorageService.get('rts');
		if(_rts)
			this._rts = _rts;

		let stats = _localStorageService.get('stats');
		if(stats)
			this.stats = stats;
		else
			this.stats['errors'] = this.stats['responses'] = 0;
	}

	public evaluate(q, a){
		if(this.isAnswered(q.id)) return;

		if(!a.mark) this.stats['errors']++;
		this.stats['responses']++;

		this._rts[q.id] = {
			'mark': a.mark,
			'click': q.ans.indexOf(a)
		}

		this._localStorageService.set('rts', this._rts);
		this._localStorageService.set('stats', this.stats);
	}

	public isCorrect(qid:number): boolean | null{
		if(typeof this._rts[qid] == 'undefined')
			return false;
		else
			return this._rts[qid].mark;
	}

	public isAnswered(qid:number): boolean{
		return typeof this._rts[qid] != 'undefined';
	}

	public isClicked(q, a){
		return typeof this._rts[q.id] != 'undefined' && this._rts[q.id].click == q.ans.indexOf(a);
	}

	public reset(dialog:string){
		if(!confirm(dialog)) return;
		this.stats['errors'] = this.stats['responses'] = 0;
		this._rts = {};
		localStorage.clear();
	}

	public pad(num, size) {
		var s = num + '';
		while (s.length < size) s = "0" + s;
		return s;
	}
}
