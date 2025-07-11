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
            } </style>
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
        const tasks = event.detail;
        const ul = document.createElement('ul');

        tasks.forEach((t, idx) => {
            const li = document.createElement('li');
            li.textContent = t.idListaDeTask;

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('delete-task', t));
            });

            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = t.completedTask ? '⬛' : '◻️';
            toggleBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('toggle-task', t));
            });

            li.append(delBtn, toggleBtn);
            ul.appendChild(li);
        });

        // clear any old list, then append
        const old = document.querySelector('ul.task-list');
        if (old) old.remove();
        ul.classList.add('task-list');
        document.body.appendChild(ul);
    }


}

window.customElements.define('task-show-list', TaskShowList);