export default function Error({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-red">{children} is required</div>;
}
