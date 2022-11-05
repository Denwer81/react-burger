import { useEffect, useState } from 'react';

export function useAnimation(ref, classListAdd, isOpen, timeout = 200) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !mounted) {
      setTimeout(() => {
        ref.current.classList.add(classListAdd)
      }, 10)
      setMounted(true);
    } else if (!isOpen && mounted){
      ref.current.classList.remove(classListAdd)
      setTimeout(() => {
        setMounted(false)
      }, timeout)
    }
  }, [isOpen, ref, classListAdd, mounted, timeout])

  return {
    mounted,
  }
}

export default useAnimation;
