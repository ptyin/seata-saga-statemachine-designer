import {
  assign,
} from 'min-dash';

import {
  hasPrimaryModifier,
} from 'diagram-js/lib/util/Mouse';
import SagaFactory from '../modeling/SagaFactory';

/**
 * A provider for DMN elements context pad
 */
export default function ContextPadProvider(
  eventBus,
  contextPad,
  modeling,
  elementFactory,
  connect,
  create,
  canvas,
  config,
  injector,
) {
  config = config || {};

  contextPad.registerProvider(this);

  this.contextPad = contextPad;
  this.modeling = modeling;
  this.elementFactory = elementFactory;
  this.connect = connect;
  this.canvas = canvas;

  if (config.autoPlace !== false) {
    this.autoPlace = injector.get('autoPlace', false);
  }

  eventBus.on('create.end', 250, (event) => {
    const { shape } = event.context;

    if (!hasPrimaryModifier(event)) {
      return;
    }

    const entries = contextPad.getEntries(shape);

    if (entries.replace) {
      entries.replace.action.click(event, shape);
    }
  });
}

ContextPadProvider.$inject = [
  'eventBus',
  'contextPad',
  'modeling',
  'elementFactory',
  'connect',
  'create',
  'canvas',
  'config.contextPad',
  'injector',
];

ContextPadProvider.prototype.getContextPadEntries = function (element) {
  const { modeling } = this;
  const { connect } = this;

  const actions = {};

  if (element.type === 'label') {
    return actions;
  }

  const { businessObject } = element;
  const { type } = businessObject;

  function startConnect(event, e, autoActivate) {
    connect.start(event, e, autoActivate);
  }

  function removeElement() {
    modeling.removeElements([element]);
  }

  assign(actions, {
    delete: {
      group: 'edit',
      className: 'bpmn-icon-trash',
      title: 'Remove',
      action: {
        click: removeElement,
      },
    },
  });

  if (!SagaFactory.prototype.isConnection(type)) {
    assign(actions, {
      connect: {
        group: 'edit',
        className: 'bpmn-icon-connection-multi',
        title: 'Connect',
        action: {
          click: startConnect,
          dragstart: startConnect,
        },
      },
    });
  }

  return actions;
};
