import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './task-list'
/**
 * @customElement
 * @polymer
 */
class TaskShowList extends PolymerElement {
    static get template() {
        return html`
            <style> :host {
                display: block;
            }
            task-list{
                text-align: center;
            }
            </style>
            <task-list on-click-mostar="addInfoToTaskList"></task-list>
        `;
    }

    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'demo-polymer-app'
            }
        };
    }
    addInfoToTaskList(event) {

    }


}

window.customElements.define('task-show-list', TaskShowList);