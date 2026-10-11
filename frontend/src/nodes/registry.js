// registry.js
// Single source of truth for node types. Adding a node = adding one config
// file here; the canvas nodeTypes map, the toolbar, and initial node data
// are all derived from this list.

import { BaseNode } from '../components/BaseNode';

import inputConfig from './configs/input';
import llmConfig from './configs/llm';
import outputConfig from './configs/output';
import textConfig from './configs/text';
import mathConfig from './configs/math';
import apiRequestConfig from './configs/apiRequest';
import conditionConfig from './configs/condition';
import noteConfig from './configs/note';
import delayConfig from './configs/delay';

export const nodeConfigs = [
    inputConfig,
    llmConfig,
    outputConfig,
    textConfig,
    mathConfig,
    apiRequestConfig,
    conditionConfig,
    noteConfig,
    delayConfig,
];

const configByType = Object.fromEntries(nodeConfigs.map((config) => [config.type, config]));

const makeNodeComponent = (config) => {
    const Component = config.component ?? BaseNode;
    const ConfiguredNode = (props) => <Component {...props} config={config} />;
    ConfiguredNode.displayName = `${config.label}Node`;
    return ConfiguredNode;
};

export const nodeTypes = Object.fromEntries(
    nodeConfigs.map((config) => [config.type, makeNodeComponent(config)])
);

export const getInitNodeData = (type, id) => {
    const config = configByType[type];
    const data = { id, nodeType: type };
    config?.fields?.forEach((field) => {
        data[field.name] =
            typeof field.default === 'function' ? field.default(id) : field.default ?? '';
    });
    if (config?.initialData) {
        Object.assign(data, config.initialData);
    }
    return data;
};
