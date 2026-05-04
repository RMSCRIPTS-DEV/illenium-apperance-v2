import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown, Search } from 'lucide-react';
import { vp } from '../../../styles/scale';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${vp(8)};
`;

const Label = styled.span`
  font-size: ${vp(11)};
  color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
  font-weight: 500;
  text-transform: uppercase;
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: ${vp(10)} ${vp(12)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  span {
    font-size: ${vp(12)};
    color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
  }
  
  svg {
    width: ${vp(14)};
    height: ${vp(14)};
    color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    transition: transform 0.25s ease;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
  
  &:hover {
    background-color: ${({ theme }) => `rgb(${theme.primaryBackgroundSelected || '55, 58, 64'})`};
    border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    
    svg { color: ${({ theme }) => `rgb(${theme.accentColorHover || '116, 192, 252'})`}; }
  }
`;

const Dropdown = styled.div`
  width: 100%;
  background: ${({ theme }) => `rgb(${theme.primaryBackground || '26, 27, 30'})`};
  border-radius: ${vp(8)};
  overflow: hidden;
  border: ${({ theme }) => `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 1)`};
  box-shadow: 0 ${vp(10)} ${vp(40)} rgba(0, 0, 0, 0.5);
`;

const SearchWrapper = styled.div`
  padding: ${vp(10)};
  border-bottom: ${({ theme }) => `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 1)`};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${vp(10)};
  padding: ${vp(8)} ${vp(12)};
  background-color: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: ${vp(6)};
  
  svg {
    width: ${vp(14)};
    height: ${vp(14)};
    color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
  }
  
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: ${vp(12)};
    color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
    font-family: 'Nexa-Book', sans-serif;
    
    &::placeholder {
      color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
    }
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
    }
  }
`;

const OptionsList = styled.div`
  max-height: ${vp(200)};
  overflow-y: auto;
  padding: ${vp(6)};
  
  &::-webkit-scrollbar {
    width: ${vp(4)};
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => `rgb(${theme.secondaryBackground || '16, 17, 19'})`};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgb(${theme.borderColorSoft || '55, 58, 64'})`};
    border-radius: 4px;
  }
`;

const Option = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: ${vp(8)} ${vp(10)};
  display: flex;
  align-items: center;
  gap: ${vp(10)};
  background: ${({ isSelected, theme }) =>
    isSelected ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.15)` : 'transparent'};
  border: 1px solid
    ${({ isSelected, theme }) =>
      isSelected ? `rgb(${theme.accentColor || '77, 171, 247'})` : 'transparent'};
  border-radius: ${vp(6)};
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  font-family: 'Nexa-Book', sans-serif;
  
  &:hover {
    background: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.12)`};
    border-color: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.3)`};
  }
`;

const OptionIcon = styled.div`
  width: ${vp(28)};
  height: ${vp(28)};
  border-radius: ${vp(6)};
  background: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OptionLabel = styled.span`
  font-size: ${vp(12)};
  color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
`;

const SelectInput = ({ title, items, defaultValue, clientValue, onChange }: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    setSearchTerm('');
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container ref={containerRef}>
      <Label>{title}</Label>
      <SelectButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{defaultValue || 'Select'}</span>
        <ChevronDown strokeWidth={1.5} stroke="currentColor" />
      </SelectButton>
      
      {isOpen && (
        <Dropdown>
          <SearchWrapper>
            <SearchInput>
              <Search strokeWidth={1.5} stroke="currentColor" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
          </SearchWrapper>
          <OptionsList>
            {filteredItems.map((item) => (
              <Option
                key={item}
                isSelected={item === defaultValue}
                onClick={() => handleSelect(item)}
              >
                <OptionIcon>
                  {item.substring(0, 2).toUpperCase()}
                </OptionIcon>
                <OptionLabel>{item}</OptionLabel>
              </Option>
            ))}
            {filteredItems.length === 0 && (
              <Option isSelected={false} disabled>
                <OptionLabel>No results found</OptionLabel>
              </Option>
            )}
          </OptionsList>
        </Dropdown>
      )}
    </Container>
  );
};

export default SelectInput;
