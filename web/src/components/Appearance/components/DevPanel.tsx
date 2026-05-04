import React from 'react';
import styled from 'styled-components';
import { Store, Scissors, Shirt, ScrollText, Database, RefreshCw } from 'lucide-react';
import { vp } from '../../../styles/scale';

export type DevStore = 'full' | 'barber' | 'clothing' | 'tattoo';

const Panel = styled.div`
  position: fixed;
  left: ${vp(12)};
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  width: ${vp(56)};
  padding: ${vp(10)} ${vp(8)};
  background: ${({ theme }) => `rgb(${theme.primaryBackground || '26, 27, 30'})`};
  border: 1px solid ${({ theme }) => `rgb(${theme.borderColor || '44, 46, 51'})`};
  border-radius: ${vp(12)};
  box-shadow: 0 ${vp(4)} ${vp(20)} rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vp(6)};
  font-family: 'Nexa-Book', sans-serif;
`;

const IconButton = styled.button<{ active?: boolean }>`
  width: ${vp(38)};
  height: ${vp(38)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: ${({ active, theme }) =>
    active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)` : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ active, theme }) =>
      active
        ? `rgb(${theme.accentColor || '77, 171, 247'})`
        : `rgb(${theme.borderColor || '44, 46, 51'})`};
  border-radius: ${vp(6)};
  color: ${({ active, theme }) =>
    active ? `rgb(${theme.accentColor || '77, 171, 247'})` : `rgb(${theme.fontColor || '193, 194, 197'})`};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Nexa-Book', sans-serif;

  svg {
    width: ${vp(16)};
    height: ${vp(16)};
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ active, theme }) =>
      active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)` : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
  }
`;

const Divider = styled.div`
  width: ${vp(32)};
  height: ${vp(1)};
  flex-shrink: 0;
  background: ${({ theme }) => `rgb(${theme.borderColor || '44, 46, 51'})`};
  margin: ${vp(2)} 0;
`;

interface DevPanelProps {
  store: DevStore;
  onStoreChange: (store: DevStore) => void;
  onLoadExampleData: () => void;
  onResetData: () => void;
}

const STORE_OPTIONS: { id: DevStore; label: string; icon: React.ElementType }[] = [
  { id: 'full', label: 'Full editor', icon: Store },
  { id: 'barber', label: 'Barber preview', icon: Scissors },
  { id: 'clothing', label: 'Clothing preview', icon: Shirt },
  { id: 'tattoo', label: 'Tattoo preview', icon: ScrollText },
];

const DevPanel: React.FC<DevPanelProps> = ({ store, onStoreChange, onLoadExampleData, onResetData }) => {
  return (
    <Panel>
      {STORE_OPTIONS.map(({ id, label, icon: Icon }) => (
        <IconButton
          key={id}
          type="button"
          active={store === id}
          title={label}
          aria-label={label}
          onClick={() => onStoreChange(id)}
        >
          <Icon strokeWidth={1.5} stroke="currentColor" />
        </IconButton>
      ))}
      <Divider />
      <IconButton
        type="button"
        title="Load example data"
        aria-label="Load example data"
        onClick={() => {
          onLoadExampleData();
        }}
      >
        <Database strokeWidth={1.5} stroke="currentColor" />
      </IconButton>
      <IconButton
        type="button"
        title="Reset data"
        aria-label="Reset data"
        onClick={() => {
          onResetData();
        }}
      >
        <RefreshCw strokeWidth={1.5} stroke="currentColor" />
      </IconButton>
    </Panel>
  );
};

export default DevPanel;
