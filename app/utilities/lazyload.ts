import {directive} from 'lit-html'

const resolved = new WeakSet();
export const lazyload = directive((importPromise, value) =>
    (part: any /* <- I was not able to find a proper type for this unfortunately :( */) => {
        if(!resolved.has(part)) {
            importPromise.then(() => resolved.add(part));
        }
        part.setValue(value);
    }
);
