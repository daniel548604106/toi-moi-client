import { useState } from 'react';

// For more reference https://web.dev/async-clipboard/
// THis actually Works , but Copy failed in Codesandbox because
// The Clipboard API has been blocked because of a permissions policy applied to the current document. See https://goo.gl/EuHzyv for more details.
type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      console.log(text, 'text');
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error.message);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;
