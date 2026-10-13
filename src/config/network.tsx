import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const NetworkStatusHandler = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success("You are connected online");
    };

    const handleOffline = () => {
      toast.error("No internet connection");
    };

    // Check initial network status
    if (!navigator.onLine) {
      toast.error("No internet connection");
    }

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <ToastContainer position='top-center' />;
};