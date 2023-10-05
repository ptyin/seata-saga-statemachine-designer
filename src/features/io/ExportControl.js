import React from '@bpmn-io/properties-panel/preact/compat';

export default function ExportControl(props) {
  const { sagaExporter } = props;

  function download(data) {
    const a = document.createElement('a');

    a.setAttribute(
      'href',
      `data:text/json;charset=UTF-8,${encodeURIComponent(JSON.stringify(data))}`,
    );
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', 'diagram:download-json');
    a.setAttribute('download', `${data.Name}.json`);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <ul className="io-control io-control-list">
      <li>
        <button
          id="export-json"
          type="button"
          title="Export as state machine definition"
          onClick={() => download(sagaExporter.export())}
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em">
            <path
              d="M512 823.838118l-292.321882-290.936471 42.465882-42.706823L481.882353 708.909176V58.548706h60.235294v650.36047l219.678118-218.654117 42.465882 42.706823L512 823.838118zM963.764706 543.924706v389.722353a30.117647 30.117647 0 0 1-30.117647 30.117647h-843.294118a30.117647 30.117647 0 0 1-30.117647-30.117647V543.623529H0V933.647059c0 49.814588 40.538353 90.352941 90.352941 90.352941h843.294118c49.814588 0 90.352941-40.538353 90.352941-90.352941V543.924706h-60.235294z"
            />
          </svg>
        </button>
      </li>
      <li className="vr" />
      <li>
        <button
          id="export-svg"
          type="button"
          title="Export as image"
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em">
            <path
              d="M60.235294 60.235294v903.529412h903.529412V60.235294H60.235294z m843.294118 843.294118H120.470588v-120.470588h783.058824v120.470588zM120.470588 722.823529V120.470588h783.058824v602.352941H120.470588z m735.051294-110.531764l-41.984 43.188706-145.588706-141.492706-93.605647 100.954353-149.744941-265.938824-204.860235 299.670588-49.754353-33.972706 259.614118-379.663058 156.852706 278.407529 79.329882-85.654588 189.741176 184.500706z"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
}
