import Link from 'next/link';

interface AuthFormLayoutProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export const AuthFormFooter = ({ text, linkText, linkHref }: AuthFormLayoutProps) => {
  return (
    <div className="flex justify-center text-sm">
      <p>{text}</p>
      <Link className="ml-1 font-bold hover:underline" href={linkHref}>
        {linkText}
      </Link>
    </div>
  );
};
