import type { Metadata } from "next";

const googleVerification =
  process.env.GOOGLE_SITE_VERIFICATION ??
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "I_1JTFyJGdvCBkCKSILkex2070Z5SmBrFf2rmH6M_zs";

const bingVerification =
  process.env.BING_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

const yandexVerification =
  process.env.YANDEX_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION;

export const verificationMeta: Metadata["verification"] = {
  ...(googleVerification ? { google: googleVerification } : {}),
  ...(yandexVerification ? { yandex: yandexVerification } : {}),
  ...(bingVerification ? { bing: bingVerification } : {}),
};
