import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class TaskNew extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
            </style>
            <form>
                <label>Task:</label>
                <input type="text" id="taskItem" required>
                <button id="addTaskBtn" type="button">Add Task</button>
            </form>
        `;
    }

    static get properties() {
        return {
            descriptivme: {
                type: Object,
                value: {}
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot.getElementById("addTaskBtn")
            .addEventListener("click", this.getTaskInfo.bind(this));
    }

    getTaskInfo() {
        const input = this.shadowRoot.getElementById("taskItem");
        const task = input ? input.value : '';
        const taskObj = {
            idListaDeTask: task,
            completedTask: false
        };
        this.llamarEvento(taskObj);
    }

    llamarEvento(parametro) {
        this.dispatchEvent(new CustomEvent('click-input', {
            detail: parametro,
            bubbles: true,
            composed: true
        }));
    }
}

window.customElements.define('task-new', TaskNew);

