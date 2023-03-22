import useCopyToClipboard from './useCopyToClipboard';

const useShare = () => {
  const [value, copy] = useCopyToClipboard();

  const handleShare = async (text: string, url: string, callbackFn?: () => void) => {
    if (navigator.share) {
      try {
        const shareData = {
          title: text,
          url,
          text,
        };
        // navigator.share will only work on websites with https and not HTTP
        await navigator.share(shareData);
      } catch (error) {
        console.log(error);
        copy(url);
        callbackFn?.();
      }
    } else {
      copy(url);
      callbackFn?.();
    }
  };

  return handleShare;
};

export default useShare;
