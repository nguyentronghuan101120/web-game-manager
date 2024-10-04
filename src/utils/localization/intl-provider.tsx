"use client";

import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";

import vi from "public/locale/vi.json";
import en from "public/locale/en.json";

const languages = {
  vi,
  en,
};

function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const messages = languages[locale as keyof typeof languages];
  return (
    <IntlProvider
      messages={messages}
      locale={locale as string}
      defaultLocale={defaultLocale as string}
    >
      {children}
    </IntlProvider>
  );
}

export default IntlProviderWrapper;
