import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useRedirectAfterSomeSeconds(redirectTo: any, seconds = 5) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const router = useRouter();

  useEffect(() => {

    const timer = setTimeout(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      if (secondsRemaining === 1) router.push(redirectTo);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [router, secondsRemaining, redirectTo]);

  return { secondsRemaining };
}