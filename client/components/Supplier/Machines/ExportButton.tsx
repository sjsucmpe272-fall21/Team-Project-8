import * as React from 'react';

import { TableMachine } from "./Machines";


export const ExportButton: React.FC<{
  onExport: () => void
}> = ({ onExport }) => <button className="export-machines-button" onClick={e => onExport()}>Export</button>;


// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(data: TableMachine[]) {
	let result = '';

	const columnDelimiter = ',';
	const lineDelimiter = '\n';
  const keys = Object.keys(data[0]);

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	data.forEach(item => {
		let ctr = 0;
    Object.values(item).forEach(value => {
			if (ctr > 0) result += columnDelimiter;

			result += value;
			
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
export function downloadCSV(array: TableMachine[]) {
	const link = document.createElement('a');
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename = 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute('href', encodeURI(csv));
	link.setAttribute('download', filename);
	link.click();
}
