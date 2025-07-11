import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './task-new.js'
/**
 * @customElement
 * @polymer
 */
class TaskItem extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
            </style>
            <task-new on-click-input="addInfoToTaskList" ></task-new>
        `;
    }
    static get properties() {
        return {

        };
    }
    addInfoToTaskList(e) {
        this.llamarEvento(e.detail);
    }
    llamarEvento(parametro) {
        this.dispatchEvent(new CustomEvent('click-info', {
            detail: parametro,
            bubbles: true,
            composed: true
        }));
    }
}

window.customElements.define('task-item', TaskItem);
