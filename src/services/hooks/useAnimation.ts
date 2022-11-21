import { useEffect, useState } from 'react';

interface IUseAnimation {
  modalRef: React.RefObject<HTMLDivElement>;
  classList: string;
  isOpen: boolean;
  timeout?: number;
}

export function useAnimation({ modalRef, classList, isOpen, timeout = 200 }: IUseAnimation) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !mounted) {
      setTimeout(() => {
        modalRef.current!.classList.add(classList)
      }, 10)
      setMounted(true);
    } else if (!isOpen && mounted) {
      modalRef.current!.classList.remove(classList)
      setTimeout(() => {
        setMounted(false)
      }, timeout)
    }
  }, [isOpen, modalRef, classList, mounted, timeout])

  return {
    mounted,
  }
}

export default useAnimation;
