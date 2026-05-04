import { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { useSpring, animated } from 'react-spring';
import { vp } from '../../../styles/scale';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
  defaultOpen?: boolean;
}

const Container = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid rgba(${theme.borderColor || '44, 46, 51'}, 1)`};
  user-select: none;
`;

interface HeaderProps {
  expanded: boolean;
}

const Header = styled.button<HeaderProps>`
  width: 100%;
  padding: ${vp(14)} ${vp(16)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  &:hover {
    background: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
    
    span { color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`}; }
    svg { color: ${({ theme }) => `rgb(${theme.accentColorHover || '116, 192, 252'})`}; }
  }
  
  span {
    font-size: ${vp(11)};
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(250, 250, 252, 0.95);
    font-family: 'Nexa-Book', sans-serif;
  }
  
  svg {
    width: ${vp(16)};
    height: ${vp(16)};
    color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    transition: transform 0.25s ease;
    transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Content = styled.div`
  padding: 0 ${vp(16)} ${vp(16)};
  display: flex;
  flex-direction: column;
  gap: ${vp(12)};
`;

const Section: React.FC<SectionProps> = ({ children, title, deps = [], defaultOpen = false }) => {
  const [expanded, setExpanded] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const animProps = useSpring({
    height: expanded ? height : 0,
    opacity: expanded ? 1 : 0,
    config: { tension: 300, friction: 30 }
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, deps]);

  return (
    <Container>
      <Header expanded={expanded} onClick={() => setExpanded(state => !state)}>
        <span>{title}</span>
        <ChevronDown strokeWidth={1.5} stroke="currentColor" />
      </Header>

      <animated.div style={{ ...animProps, overflow: 'hidden' }}>
        <Content ref={ref}>{children}</Content>
      </animated.div>
    </Container>
  );
};

export default Section;
