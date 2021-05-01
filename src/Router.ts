import page from "page";
import { TemplateResult } from "lit-html";
import {html} from "lit-element";

export type ViewChangedCallback = (templateResult: TemplateResult, path: string) => void;
export type ViewChangedCallbackCleaner = Function;

class Routing {
    public static readonly INSTANCE = new Routing();

    private _viewChangeCallbacks: ViewChangedCallback[] = [];

    installRoutes(callback?: ViewChangedCallback): this {
        if(callback) {
            this.onViewChanged(callback);
        }

        page.redirect('/', '/home');
        page.redirect('/index.html', '/home');

        this.declareRoute('/home', () =>
            html`Welcome !`);
        this.declareRoute('/counters', (params) =>
            html`<counters-view></counters-view>`);
        // this.declareRoute('/counters/:value', (params) =>
        //     html`<my-counters-view sharedValue="${params['value']}"></my-counters-view>`);
        this.declareRoute('/list', (params) =>
            html`<my-list></my-list>`);

        page('*', () => this._notFoundRoute());
        page();

        return this;
    }

    private declareRoute(path: string, viewChunkCreator: (pathParams: Record<string, string>) => Promise<TemplateResult>|TemplateResult) {
        page(path, (context) => {
            const viewComponentResult = viewChunkCreator(context.params);
            // Can be useful to return a Promise for navigation guards
            const viewChunkCreatedPromise = ((viewComponentResult instanceof Promise)?viewComponentResult:Promise.resolve(viewComponentResult));
            viewChunkCreatedPromise.then(viewTemplateResult => {
                this._viewChangeCallbacks.forEach(callback => callback(viewTemplateResult, path));
            }, (error: any) => {
                console.error(`Error during navigation for path [${path}]: ${error}`)
            })
        });
    }

    onViewChanged(callback: ViewChangedCallback): ViewChangedCallbackCleaner {
        this._viewChangeCallbacks.push(callback);

        // Returns a callback cleaner which can be called whenever the callee
        // is unmounted from the DOM
        return () => {
            const idx = this._viewChangeCallbacks.findIndex(registeredCallback => registeredCallback === callback);
            this._viewChangeCallbacks.splice(idx, 1);
        }
    }

    private _notFoundRoute() {
        console.error('Route not found !');
    }
}

export const Router = Routing.INSTANCE;
