import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './task-item'
/**
 * @customElement
 * @polymer
 */
class TaskList extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
            </style>

            <h2>Hello [[prop1]]!</h2>

            <task-item on-click-info="addInfoToTaskList"></task-item>

            <template is="dom-repeat" items="[[task]]" as="t" index-as="i">
                <div>
                    <span>[[t.idListaDeTask]]</span>
                    <button on-click="deleteTask" data-index$="[[i]]">Delete Task</button>
                    <button on-click="toggleCompleted" data-index$="[[i]]">
                        [[_getIcon(t.completedTask)]]
                    </button>
                </div>
            </template>

        `;
    }
    static get properties() {
        return {
            task: {
                type: Array,
                value: [],
                observer: 'llamarEvento'
            }
        };
    }

    ready() {
        super.ready();
        this.loadTasks();
    }

    loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                this.task = JSON.parse(savedTasks);
            } catch (e) {
                console.error('Error loading tasks:', e);
                this.task = [];
            }
        }
    }

    saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.task));
        } catch (e) {
            console.error('Error saving tasks:', e);
        }
    }

    addInfoToTaskList(e) {
        this.task = [...this.task, e.detail];
        this.saveTasks();
    }

    deleteTask(e) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            this.splice('task', index, 1);
            this.saveTasks();
        }
    }

    toggleCompleted(e) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            this.set(`task.${index}.completedTask`, !this.task[index].completedTask);
            this.saveTasks();
        }
    }
    llamarEvento(parametro,viejo) {
        console.log('Observer fired with:', parametro);
        this.dispatchEvent(new CustomEvent('click-mostar', {
            detail: parametro,
            bubbles: true,
            composed: true
        }));
    }
}

window.customElements.define('task-list', TaskList);
