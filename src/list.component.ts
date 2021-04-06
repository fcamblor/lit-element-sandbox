import {LitElement, html, customElement, property, css} from 'lit-element';
import {repeat} from "lit-html/directives/repeat";

type MarvelCharacter = {
    id: number;
    name: string;
    thumbnail: {
        extension: string;
        path: string;
    }
};

type MarvelCharactersResponse = {
    data: {
        results: MarvelCharacter[];
    }
};

@customElement('my-list')
export class MyListComponent extends LitElement {

    //language=css
    static styles = css`
      table {
        border: 0px;
      }
      td {
        margin: 4px;
      }
      img {
        max-width: 150px; 
        max-height: 100px
      }
    `;

    @property({type: Array}) characters = [] as MarvelCharacter[];

    constructor() {
        super();

        this.fetchMarvelCharactersFor({ serie: 2265, /* name: 'X-Men (1991 - 2001)', */ pages: [0,1] })
            .then((characters) => {
                this.characters = characters;
            })
    }

    fetchMarvelCharactersFor(config: {serie: number, pages: number[]}): Promise<MarvelCharacter[]> {
        return Promise.all(
            config.pages.map(page => fetch(`https://gateway.marvel.com:443/v1/public/characters?series=${config.serie}&offset=${page*100}&limit=100&apikey=${localStorage.getItem('marvel_api_key')}`)
                .then(response => response.json() as Promise<MarvelCharactersResponse>))
        ).then(responses => {
            return responses.reduce((characters, response) => characters.concat(response.data.results), [] as MarvelCharacter[]);
        });
    }

    render() {
        return html`
            <table>
              ${this.characters.map((character) => {
                  return html`
                    <tr>
                      <td><img src="${character.thumbnail.path}.${character.thumbnail.extension}" /></td>
                      <td>${character.name}</td>
                      <td><button @click="${() => this.deleteCharacterHavingId(character.id)}">Delete</button></td>
                    </tr>`
              })}
            </table>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        // console.log("connected callback")
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // console.log("disconnected callback")
    }

    private deleteCharacterHavingId(id: number) {
        const index = this.characters.findIndex(character => character.id === id);
        this.characters.splice(index, 1);
        console.time("characters-delete")
        this.requestUpdate('characters').then(() => console.timeEnd("characters-delete"))
    }
}
