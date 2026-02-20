// inputNode.js
import { useState } from 'react';
import { MainNode } from './MainNode';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const inputs = [];
  const outputs = [{ id: `${id}-value` }];

  return (
    <MainNode
      id={id}
      data={data}
      title="Input"
      type="input"
      selected={selected} 
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
            className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-xs font-medium text-gray-600 w-12">Type:</label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </MainNode>
  );
};