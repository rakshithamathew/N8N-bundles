// outputNode.js
import { useState } from 'react';
import { MainNode } from './MainNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputs = [{ id: `${id}-value` }];
  const outputs = [];

  return (
    <MainNode
      id={id}
      data={data}
      title="Output"
      type="output"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label className="text-xs font-medium text-gray-600 w-12">Name:</label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-xs font-medium text-gray-600 w-12">Type:</label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </MainNode>
  );
};