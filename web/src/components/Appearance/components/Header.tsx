import React from 'react';
import styled from 'styled-components';
import { Check, X } from 'lucide-react';
import { vp } from '../../../styles/scale';

const HeaderBar = styled.div`
  padding: ${vp(14)} ${vp(16)} ${vp(12)};
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  gap: ${vp(12)};
  border-bottom: ${({ theme }) => `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 0.9)`};
`;

const TitleStack = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: ${vp(2)};

  h1 {
    font-size: ${vp(13)};
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(252, 252, 253, 0.98);
    margin: 0 0 ${vp(4)} 0;
    font-family: 'Nexa-Book', sans-serif;
    line-height: 1.2;
  }

  p {
    font-size: ${vp(10)};
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
    margin: 0;
    font-family: 'Nexa-Book', sans-serif;
    line-height: 1.3;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${vp(6)};
  flex-shrink: 0;
  padding-top: ${vp(1)};
`;

interface HeaderChipProps {
  $variant: 'muted' | 'accent';
}

const HeaderChip = styled.button<HeaderChipProps>`
  width: ${vp(36)};
  height: ${vp(36)};
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: ${vp(4)};
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease,
    transform 0.15s ease;

  svg {
    width: ${vp(17)};
    height: ${vp(17)};
    flex-shrink: 0;
  }

  ${({ $variant, theme }) =>
    $variant === 'muted'
      ? `
    background: transparent;
    border: 1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 0.95);
    color: rgb(${theme.fontColor || '193, 194, 197'});

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.18);
      color: rgba(252, 252, 253, 0.95);
    }
  `
      : `
    background: rgba(${theme.accentColor || '77, 171, 247'}, 0.12);
    border: 1px solid rgba(${theme.accentColor || '77, 171, 247'}, 0.55);
    color: rgb(${theme.accentColor || '77, 171, 247'});

    &:hover {
      background: rgba(${theme.accentColor || '77, 171, 247'}, 0.2);
      border-color: rgb(${theme.accentColor || '77, 171, 247'});
      color: rgba(252, 252, 253, 0.98);
    }
  `}

  &:active {
    transform: scale(0.98);
  }
`;

interface HeaderProps {
  title?: string;
  subtitle?: string;
  cancelLabel?: string;
  saveLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Appearance Editor',
  subtitle = 'Customize your character',
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
  onCancel,
  onSave,
}) => {
  return (
    <HeaderBar>
      <TitleStack>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </TitleStack>
      {onCancel && onSave ? (
        <Actions>
          <HeaderChip
            type="button"
            $variant="muted"
            onClick={onCancel}
            title={cancelLabel}
            aria-label={cancelLabel}
          >
            <X strokeWidth={1.75} stroke="currentColor" />
          </HeaderChip>
          <HeaderChip
            type="button"
            $variant="accent"
            onClick={onSave}
            title={saveLabel}
            aria-label={saveLabel}
          >
            <Check strokeWidth={1.75} stroke="currentColor" />
          </HeaderChip>
        </Actions>
      ) : null}
    </HeaderBar>
  );
};

export default Header;
