import React from 'react';
import styled from 'styled-components';
import {
  User,
  Smile,
  Eye,
  Droplet,
  Scissors,
  Brush,
  ScrollText,
  Shirt,
  Watch,
} from 'lucide-react';
import { FaHatCowboy, FaTshirt } from 'react-icons/fa';
import { GiTrousers } from 'react-icons/gi';
import { ClothesState } from '../interfaces';
import Locales from '../../../shared/interfaces/locales';
import { vp } from '../../../styles/scale';

interface SidebarConfig {
  ped?: boolean;
  headBlend?: boolean;
  faceFeatures?: boolean;
  headOverlays?: boolean;
  components?: boolean;
  props?: boolean;
  tattoos?: boolean;
}

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  config?: SidebarConfig;
  clothes?: ClothesState;
  onSetClothes?: (key: keyof ClothesState) => void;
  locales?: Locales;
}

const IconRail = styled.div`
  width: ${vp(52)};
  flex-shrink: 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${vp(12)} ${vp(4)};
  gap: ${vp(2)};
  box-sizing: border-box;
  border-right: ${({ theme }) => `1px solid rgb(${theme.borderColor || '68, 68, 68'})`};
  background: ${({ theme }) => `rgb(${theme.secondaryBackground || '13, 13, 13'})`};
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

interface SidebarItemProps {
  active: boolean;
}

const SidebarItem = styled.button<SidebarItemProps>`
  width: ${vp(42)};
  height: ${vp(42)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: ${vp(4)};
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
  background: ${({ active, theme }) =>
    active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.16)` : 'transparent'};
  border: ${({ active, theme }) =>
    active
      ? `1px solid rgba(${theme.accentColor || '77, 171, 247'}, 0.75)`
      : `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 0.5)`};

  svg {
    width: ${vp(18)};
    height: ${vp(18)};
    color: ${({ active, theme }) =>
      active ? `rgb(${theme.accentColor || '77, 171, 247'})` : `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
    transition: color 0.15s ease;
  }

  &:hover {
    background: ${({ active, theme }) =>
      active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)` : 'rgba(255, 255, 255, 0.06)'};
    border-color: ${({ active, theme }) =>
      active ? `rgb(${theme.accentColor || '77, 171, 247'})` : `rgba(${theme.borderColorSoft || '55, 58, 64'}, 0.95)`};

    svg {
      color: ${({ active, theme }) =>
        active ? `rgb(${theme.accentColorHover || '116, 192, 252'})` : `rgb(${theme.fontColor || '193, 194, 197'})`};
    }
  }
`;

const SidebarCategories = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${vp(4)};
  min-height: 0;
`;

const ClothesSection = styled.div`
  flex-shrink: 0;
  padding-top: ${vp(8)};
  border-top: ${({ theme }) => `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 1)`};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vp(4)};
`;

interface ClothesButtonProps {
  active: boolean;
}

const ClothesButton = styled.button<ClothesButtonProps>`
  width: ${vp(42)};
  height: ${vp(42)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: ${vp(4)};
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
  background: ${({ active, theme }) =>
    active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.16)` : 'transparent'};
  border: ${({ active, theme }) =>
    active
      ? `1px solid rgba(${theme.accentColor || '77, 171, 247'}, 0.75)`
      : `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 0.5)`};

  svg {
    width: ${vp(17)};
    height: ${vp(17)};
    color: ${({ active, theme }) =>
      active ? `rgb(${theme.accentColor || '77, 171, 247'})` : `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
  }

  &:hover {
    background: ${({ active, theme }) =>
      active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)` : 'rgba(255, 255, 255, 0.06)'};

    svg {
      color: ${({ active, theme }) =>
        active ? `rgb(${theme.accentColorHover || '116, 192, 252'})` : `rgb(${theme.fontColor || '193, 194, 197'})`};
    }
  }
`;

const CATEGORY_IDS = [
  { id: 'ped', labelKey: 'ped', icon: User, configKey: 'ped' },
  { id: 'headBlend', labelKey: 'headBlend', icon: Smile, configKey: 'headBlend' },
  { id: 'faceFeatures', labelKey: 'faceFeatures', icon: Eye, configKey: 'faceFeatures' },
  { id: 'headOverlays', labelKey: 'headOverlays', icon: Droplet, configKey: 'headOverlays' },
  { id: 'hair', labelKey: 'hair', icon: Scissors, configKey: 'headOverlays' },
  { id: 'makeup', labelKey: 'makeup', icon: Brush, configKey: 'headOverlays' },
  { id: 'tattoos', labelKey: 'tattoos', icon: ScrollText, configKey: 'tattoos' },
  { id: 'components', labelKey: 'components', icon: Shirt, configKey: 'components' },
  { id: 'props', labelKey: 'props', icon: Watch, configKey: 'props' },
] as const;

const DEFAULT_LABELS: Record<string, string> = {
  ped: 'Characters', headBlend: 'Face', faceFeatures: 'Features', headOverlays: 'Skin',
  hair: 'Hair', makeup: 'Makeup', tattoos: 'Tattoos', components: 'Clothing', props: 'Accessories',
};

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, config, clothes, onSetClothes, locales }) => {
  // Filter categories based on config
  const categories = CATEGORY_IDS.filter(category => {
    if (!config) return true; // Show all if no config
    const configValue = config[category.configKey as keyof SidebarConfig];
    return configValue !== false; // Show if true or undefined
  });

  const getLabel = (key: string) => (locales?.sidebar as Record<string, string>)?.[key] ?? DEFAULT_LABELS[key] ?? key;
  const clothesLabels = locales?.sidebar?.clothes;

  return (
    <IconRail>
      <SidebarCategories>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <SidebarItem
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
              type="button"
              title={getLabel(category.labelKey)}
              aria-label={getLabel(category.labelKey)}
            >
              <Icon strokeWidth={1.5} stroke="currentColor" />
            </SidebarItem>
          );
        })}
      </SidebarCategories>
      {clothes && onSetClothes && (
        <ClothesSection>
          <ClothesButton
            type="button"
            active={!!clothes.head}
            onClick={() => onSetClothes('head')}
            title={clothesLabels?.hat ?? 'Hat'}
            aria-label={clothesLabels?.hat ?? 'Hat'}
          >
            <FaHatCowboy size={17} />
          </ClothesButton>
          <ClothesButton
            type="button"
            active={!!clothes.body}
            onClick={() => onSetClothes('body')}
            title={clothesLabels?.torso ?? 'Torso'}
            aria-label={clothesLabels?.torso ?? 'Torso'}
          >
            <FaTshirt size={17} />
          </ClothesButton>
          <ClothesButton
            type="button"
            active={!!clothes.bottom}
            onClick={() => onSetClothes('bottom')}
            title={clothesLabels?.pants ?? 'Pants'}
            aria-label={clothesLabels?.pants ?? 'Pants'}
          >
            <GiTrousers size={17} />
          </ClothesButton>
        </ClothesSection>
      )}
    </IconRail>
  );
};

export default Sidebar;
