import Link from "next/link";
import Image from "next/image";
import ParliamentLogo from "./parliament-logo";

const Footer = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}.${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${currentDate.getFullYear()} (GMT+5)`;

  return (
    <footer className="bg-[#0047AB] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <div className="flex items-start -mt-8 -ml-1">
              <ParliamentLogo className="w-auto flex-shrink-0" />
            </div>

            <div className="-mt-3">
              <p className="text-sm font-medium mb-2">Ijtimoiy tarmoqlar:</p>
              <div className="flex space-x-3">
                <Link
                  href="https://www.facebook.com/people/Yoshlar-Parlamenti/pfbid0HDYq4MmzRnWJVKsDDAr3TiYNfdZYudAE2qXJGTBHxCPKCAGzN9XUU5L7xdm9vSMpl/"
                  target="_blank"
                  className="text-white hover:text-blue-200"
                >
                  <img
                    src="/images/icons/facebook.svg"
                    alt="Telegram"
                    className="w-6 h-6"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/yoshlar_parlamenti_qp?igshid=MzNlNGNkZWQ4Mg%3D%3D"
                  target="_blank"
                  className="text-white hover:text-blue-200"
                >
                  <img
                    src="/images/icons/instagram.svg"
                    alt="Telegram"
                    className="w-6 h-6"
                  />
                </Link>
                <Link
                  href="https://t.me/yoshlar_parlamenti_qp"
                  target="_blank"
                  className="text-white hover:text-blue-200"
                >
                  <img
                    src="/images/icons/telegram.svg"
                    alt="Telegram"
                    className="w-6 h-6"
                  />
                </Link>
                <Link href="#" className="text-white hover:text-blue-200">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.8 7.5c.2 0 .4.1.4.3 0 .2-.1.4-.3.5l-4.8 3.1c-.1.1-.3.1-.4 0l-4.8-3.1c-.2-.1-.3-.3-.3-.5 0-.2.1-.3.4-.3h9.8zm-9.8 5.5V9.7l4.1 2.6c.2.1.5.2.7.2.2 0 .5-.1.7-.2l4.1-2.6V15c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Yoshlar parlamenti</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/yoshlar-parlamenti/tarixi"
                  className="hover:underline"
                >
                  Yoshlar parlamenti tarixi
                </Link>
              </li>
              <li>
                <Link
                  href="/yoshlar-parlamenti/rahbariyati"
                  className="hover:underline"
                >
                  Yoshlar parlamenti rahbariyati
                </Link>
              </li>
              <li>
                <Link
                  href="/yoshlar-parlamenti/kengashi"
                  className="hover:underline"
                >
                  Yoshlar parlament kengashi
                </Link>
              </li>
              <li>
                <Link
                  href="/yoshlar-parlamenti/qomitalar"
                  className="hover:underline"
                >
                  Yoshlar parlamenti qo'mitalar
                </Link>
              </li>
              <li>
                <Link
                  href="/yoshlar-parlamenti/nizomi"
                  className="hover:underline"
                >
                  Yoshlar parlamenti nizomi
                </Link>
              </li>
              <li>
                <Link
                  href="/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari"
                  className="hover:underline"
                >
                  Parlamentning yoshlar guruxlari
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Tadbirlar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tadbirlar/yalpi-majlislar"
                  className="hover:underline"
                >
                  Yalpi majlislar
                </Link>
              </li>
              <li>
                <Link
                  href="/tadbirlar/siyosiy-partiyalar"
                  className="hover:underline"
                >
                  Siyosiy partiyalarning yoshlar guruhlari
                </Link>
              </li>
              <li>
                <Link
                  href="/tadbirlar/qomitalar-yigilishi"
                  className="hover:underline"
                >
                  Qo'mitalar yig'ilishi
                </Link>
              </li>
              <li>
                <Link href="/tadbirlar/boshqa" className="hover:underline">
                  Boshqa tadbirlar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Yangiliklar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/yangiliklar" className="hover:underline">
                  Yangiliklar
                </Link>
              </li>
              <li>
                <Link href="/maqolalar" className="hover:underline">
                  Maqolalar
                </Link>
              </li>
              <li>
                <Link href="/munosabatlar" className="hover:underline">
                  Munosabatlar
                </Link>
              </li>
              <li>
                <Link href="/mediateka" className="hover:underline">
                  Mediateka
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Aloqa</h4>
            <div className="space-y-2 text-sm">
              <p>Manzil:</p>
              <p>100035, Toshkent, Bunyodkor shoh ko'chasi 1</p>

              <p className="mt-4">Devonxona:</p>
              <p>+998 782382294</p>

              <p className="mt-4">Fuqarolar murojaati uchun:</p>
              <p>+998 782382294</p>
            </div>
          </div>{" "}
        </div>{" "}
        <p>© 2025 Barcha huquqlar himoyalangan</p>
      </div>
    </footer>
  );
};

export default Footer;
