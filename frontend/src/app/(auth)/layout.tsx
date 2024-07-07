export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      {children}
    </div>
  );
};