import page from "page";

export type ViewName = 'home'|'counters'|'list';
export type ViewChangedCallback = (viewName: ViewName, context: PageJS.Context) => void;
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
        page('/home', (context) => this._updateToView('home', context));
        // page('/counters', (context) => this._updateToView('counters', context));
        // page('/counters/:value', (context) => this._updateToView('counters', context));
        // page('/list', (context) => this._updateToView('list', context));
        page('*', () => this._notFoundRoute());
        page();

        return this;
    }

    onViewChanged(callback: ViewChangedCallback): ViewChangedCallbackCleaner {
        this._viewChangeCallbacks.push(callback);
        return () => {
            const idx = this._viewChangeCallbacks.findIndex(registeredCallback => registeredCallback === callback);
            this._viewChangeCallbacks.splice(idx, 1);
        }
    }

    private _updateToView(viewName: ViewName, context: PageJS.Context) {
        this._viewChangeCallbacks.forEach(callback => callback(viewName, context));
    }

    private _notFoundRoute() {
        console.error('Route not found !');
    }
}

export const Router = Routing.INSTANCE;
