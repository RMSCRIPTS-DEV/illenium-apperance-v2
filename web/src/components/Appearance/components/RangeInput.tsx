import { useCallback } from 'react';
import styled from 'styled-components';
import { vp } from '../../../styles/scale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${vp(6)};
`;

const Label = styled.label`
  font-size: ${vp(11)};
  color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: ${vp(6)};
  overflow: hidden;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: ${({ theme }) => `rgb(${theme.primaryBackgroundSelected || '55, 58, 64'})`};
    border-color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
  }
`;

const Button = styled.button`
  width: ${vp(32)};
  height: ${vp(32)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: ${vp(12)};
    height: ${vp(12)};
    color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.15)`};
    
    svg {
      color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    }
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
      
      svg {
        color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
      }
    }
  }
`;

const Value = styled.span`
  flex: 1;
  text-align: center;
  font-size: ${vp(12)};
  color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
  font-weight: 500;
  min-width: ${vp(50)};
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 0,
  onChange,
}) => {
  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, defaultValue - factor);
    onChange(Math.round(newValue * 100) / 100);
  }, [defaultValue, min, factor, onChange]);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, defaultValue + factor);
    onChange(Math.round(newValue * 100) / 100);
  }, [defaultValue, max, factor, onChange]);

  const displayValue = factor < 1 
    ? defaultValue.toFixed(1) 
    : defaultValue.toString();

  const labelText = title ? `${title} (${max})` : undefined;

  return (
    <Container>
      {labelText && <Label>{labelText}</Label>}
      <InputWrapper>
        <Button onClick={handleDecrement} disabled={defaultValue <= min}>
          <ChevronLeft strokeWidth={2} stroke="currentColor" />
        </Button>
        <Value>{displayValue}</Value>
        <Button onClick={handleIncrement} disabled={defaultValue >= max}>
          <ChevronRight strokeWidth={2} stroke="currentColor" />
        </Button>
      </InputWrapper>
    </Container>
  );
};

export default RangeInput;
