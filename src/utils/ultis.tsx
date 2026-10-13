

export const getNetworkErrorMessage = (error: any): string => {
    if (error?.code === 'ERR_NETWORK' || error?.message?.includes('Network Error')) {
      return 'Network error: Unable to connect to the server. Please check your internet connection.';
    }
    if (error?.name === 'NS_ERROR_CONNECTION_REFUSED') {
      return 'Connection refused: The server may be temporarily unavailable. Please try again';
    }
    if (error?.name === 'NS_ERROR_OFFLINE') {
      return 'Offline: It seems you are not connected to the internet. Please check your connection.';
    }
    if (error?.name === 'NS_ERROR_NET_TIMEOUT' || error?.message?.includes('timeout')) {
      return 'Request timed out: The server took too long to respond. Please try again.';
    }
    if (error?.name === 'NS_BINDING_ABORTED') {
      return 'Request aborted: The network request was canceled. This could happen if the request was interrupted. Please try again';
    }
    if (error?.response?.status >= 400 && error?.response?.status < 500) {
      return `Client error (${error?.response?.status}): ${error?.response?.data?.message || error?.response?.statusText || 'An error occurred on the client side.'}`;
    }
    if (error?.response?.status >= 500) {
      return `Server error (${error?.response?.status}): ${error?.response?.data?.message || error?.response?.statusText || 'An error occurred on the server. Please try again later.'}`;
    }
    return 'An unexpected error occurred. Please try again.';
  };
  
  


  export const getSuccessMessage = (res: any, defaultMessage: string = 'Successful'): string => {
    if (res?.status === 200 || res?.status === 201) {
      return res?.data?.message || res?.statusText || defaultMessage;
    }
  
    if (res?.status >= 202 && res?.status < 300) {
      return res?.statusText || defaultMessage;
    }
  
    return defaultMessage;
  };



  export const getErrorMessage = (err: unknown, fallback: string) =>
  (err as { data?: { message?: string } })?.data?.message ?? fallback