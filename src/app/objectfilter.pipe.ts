import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'objectfilter'
})
export class ObjectfilterPipe implements PipeTransform {
	transform(items:any[], search:string, keys?:Array<string>):any {
		return search == '' || typeof search == 'undefined' ? items : items.filter(item => this.match(item, search, keys));
	}

	private match(item:any[], search:string, keys?:Array<string>):Boolean{
		let flat = this.flatten(item, keys);
		for(let query of search.split(' '))
			if(!flat.match(new RegExp(query, 'i')))
				return false;
		return true;
	}

	private flatten(items:any[], keys?:Array<string>, route?:string):string{
		let val:string = '';
		for(let key of Object.keys(items)){
			let currentRoute = typeof route == 'undefined' ? key : route + '.' + key;
			if(typeof items[key] == 'object')
				val = val + this.flatten(items[key], keys, currentRoute);
			else if(items[key] !== '' && typeof items[key] !== 'undefined' && (typeof keys == 'undefined' || keys.indexOf(currentRoute) >= 0))
				val = val + items[key];
		}
		return val;
	}

}
