import Explore from "../(components)/explore/Explore";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full">
      <Explore />
      {children}
    </main>
  );
}
