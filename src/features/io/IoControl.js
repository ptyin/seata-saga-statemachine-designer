import { domify } from 'min-dom';
import React from '@bpmn-io/properties-panel/preact/compat';
import ImportControl from './ImportControl';
import ExportControl from './ExportControl';

export default function IoControl(canvas, sagaImporter, sagaExporter) {
  const container = domify('<div class="io-control-list-container"/>');
  // eslint-disable-next-line no-underscore-dangle
  canvas._container.appendChild(container);

  React.render(
    <div style={{ position: 'fixed', bottom: '10px', left: '20px' }}>
      <ImportControl sagaImporter={sagaImporter} />
      <ExportControl sagaExporter={sagaExporter} />
    </div>,
    container,
  );
}

IoControl.$inject = ['canvas', 'sagaImporter', 'sagaExporter'];
