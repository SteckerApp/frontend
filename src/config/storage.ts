

export const saveToSessionStorage = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving ${key} to session storage:`, error);
      }
    }
  };
  
  export const getFromSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
      const storageItem = window.sessionStorage.getItem(key);
      if (storageItem) return JSON.parse(storageItem);
      return null;
    }
    return null;
  };
  
  export const deleteFromSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
    }
  };
  

  export const sessionStorageAuthKey = "@accessToken";