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
                form{
                    grid-template-columns: 1fr 80px
                ;
                    gap: 10px
                ;
                    padding: 0px
                ;
                }
                #taskItem{
                    width: auto;
                    height: 36px;
                    padding: 0 0 0 12px;
                    border-radius: 5px;
                    outline: none;
                    border: 1px solid  rgb(16, 86, 82);
                    background-color: rgb(251, 243, 228);
                    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
                }
                #addTaskBtn{
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 10px 18px;
                    gap: 10px;
                    height: 36px;
                    background: rgba(16, 86, 82, .75);
                    border-radius: 5px;
                    border: 0;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 15px;
                    color: #000000;
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
        input.value='';
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

