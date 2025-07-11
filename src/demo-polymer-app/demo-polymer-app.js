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
      </style>
      <h2>Hello [[prop1]]!</h2>
      <task-show-list></task-show-list>
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
}

window.customElements.define('demo-polymer-app', DemoPolymerApp);
