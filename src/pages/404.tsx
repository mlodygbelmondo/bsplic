import Link from "next/link";
import Image from "next/image";

const Custom = () => {
  return (
    <div className="flex h-screen flex-col gap-2 items-center justify-center">
      <Image src="/sad.png" alt="Sad image" width={96} height={96} />
      <p>Nie znaleziono strony.</p>
      <Link href="/">
        <button className="bg-red-600 w-52 hover:bg-red-700 transition-colors text-white p-3 rounded-md font-semibold">
          Strona główna
        </button>
      </Link>
    </div>
  );
};

export default Custom;
