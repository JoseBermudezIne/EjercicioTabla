import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './task-show-list.js'
/**
 * @customElement
 * @polymer
 */
class DemoPolymerApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        h1{
          text-align: center;
        }
        task-show-list{
          text-align: center;
        }
      </style>
      <h1><strong>[[prop1]]!</strong></h1>
      <task-show-list></task-show-list>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Gestor de Tareas'
      }
    };
  }
}

window.customElements.define('demo-polymer-app', DemoPolymerApp);
