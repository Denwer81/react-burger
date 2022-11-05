import { useState } from 'react';
import debounce from '../../utils/debounce';

const useScrollTab = ({ containerRef, bunRef, sauceRef, mainRef }) => {
  const [currentTab, setCurrentTab] = useState('bun')

  const scrollToTab = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth"
    })
  };

  const handleSetCurrentTab = () => {
    if (containerRef && bunRef && sauceRef && mainRef) {
      const offset = 240;
      const topOffset = containerRef.current.scrollTop || 0;
      const bunTopOffset = topOffset - bunRef.current.offsetTop + offset;
      const sauceTopOffset = topOffset - sauceRef.current.offsetTop + offset;
      const mainTopOffset = topOffset - mainRef.current.offsetTop + offset;

      if (bunTopOffset >= 0) setCurrentTab('bun');
      if (sauceTopOffset >= 0) setCurrentTab('sauce');
      if (mainTopOffset >= 0) setCurrentTab('main');
    }
  }
  const debounceSetCurrentTab = debounce(handleSetCurrentTab, 80);

  return { scrollToTab, currentTab, debounceSetCurrentTab };
}

export default useScrollTab;
