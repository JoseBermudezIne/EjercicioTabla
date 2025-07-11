import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './task-item'
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
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

                #deleteButtom {
                    background-color: coral;
                }

                #deleteButtom:hover {
                    box-shadow: 5px 5px 5px #8e0012;
                }

                div {
                    border: 1px solid mediumblue;
                    width: 50%;
                }

                #completeButtom:hover {
                    box-shadow: 5px 5px 5px chartreuse;
                }
                h2{
                    text-align: center;
                    border-top-style: solid;
                    border-bottom-style: dashed;
                }
                task-item{
                    text-align: center;
                }
            </style>

            <h2>Lista de tasks</h2>

            <task-item on-click-info="addInfoToTaskList"></task-item>

            <template is="dom-repeat" items="[[task]]" as="t" index-as="i">
                <div>
                    <span>[[t.idListaDeTask]]</span>
                    <button on-click="deleteTask" data-index$="[[i]]" id="deleteButtom">Delete Task</button>
                    <button on-click="toggleCompleted" data-index$="[[i]]" disabled$="[[t.completedTask]]"
                            id="completeButtom">
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
    _getIcon(completedTask) {
        return completedTask ? 'Completado' : 'No completado';
    }
    llamarEvento(parametro,viejo) {
        console.log('Observer triggered with:', parametro);
        this.dispatchEvent(new CustomEvent('click-mostar', {
            detail: parametro,
            bubbles: true,
            composed: true
        }));
    }
}

window.customElements.define('task-list', TaskList);
