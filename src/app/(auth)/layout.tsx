export default function AuthLayout({children}: {children: React.ReactNode}){
  return(
    <div className="flex bg-gray-100 justify-center items-center h-screen">{children}</div>
  )
}