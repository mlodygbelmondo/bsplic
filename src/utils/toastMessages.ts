type Toast = {
  message: string;
  type: keyof typeof toastType;
  duration?: number;
};

export const toastType = {
  success: "success",
  info: "info",
  failed: "failed",
} as const;

export const TOAST_MESSAGES = {
  standbysToggle: (switchValue: boolean, date: string): Toast => ({
    message: `You have ${
      switchValue ? "disabled" : "enabled"
    } standbys on ${date}`,
    type: switchValue ? toastType.info : toastType.success,
  }),
  resetPasswordLinkSent: (): Toast => ({
    message: "Check your email for link to change password.",
    type: toastType.info,
  }),
  logInSuccess: (): Toast => ({
    message: "Pomyślnie zalogowano!",
    type: toastType.success,
  }),
  logInFailed: (): Toast => ({
    message: "Nie udało się zalogować.",
    type: toastType.failed,
  }),
  fillAllFields: {
    message: "Wypełnij wszystkie pola.",
    type: toastType.info,
  },
  signOutSuccess: (): Toast => ({
    message: "Wylogowano pomyślnie.",
    type: toastType.success,
  }),
  betRequestSent: (): Toast => ({
    message: "Wysłano propozycję zakładu!",
    type: toastType.success,
  }),
  betRequestFailed: (): Toast => ({
    message: "Nie udało się wysłać propozycji zakładu.",
    type: toastType.failed,
  }),
  tooManyRequests: (): Toast => ({
    message: "Zbyt wiele prób. Spróbuj ponownie za chwilę.",
    type: toastType.failed,
  }),
  betPlacedSuccessfully: {
    message: "Zakład został złożony pomyślnie!",
    type: toastType.success,
  },
  betsPlacedSuccessfully: {
    message: "Zakłady zostały złożone pomyślnie!",
    type: toastType.success,
  },
  functionUnderDevelopment: {
    message: "Funkcjonalność w fazie rozwoju.",
    type: toastType.info,
  },
  xD: {
    message: "xD zdrowy",
    type: toastType.failed,
  },
  betCreatedSuccessfully: {
    message: "Zakład został pomyślnie utworzony!",
    type: toastType.success,
  },
};
