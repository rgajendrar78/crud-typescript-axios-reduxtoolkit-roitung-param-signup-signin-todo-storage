export const SetCookies = ({ name, value, exdays }: { name: string; value: string; exdays?: number }) => {
    if (name && value) {
      const date = new Date();
      date.setTime(date.getTime() + (exdays ?? 30) * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    }
  };