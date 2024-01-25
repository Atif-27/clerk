import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-stone-400 p-5 px-10 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Header</h1>
      <div className="flex gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="sign-up">Sign Up</Link>
          <Link href="sign-in">Sign In</Link>
        </SignedOut>
      </div>
    </div>
  );
}
