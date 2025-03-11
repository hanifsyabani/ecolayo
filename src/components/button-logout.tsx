'use client'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function ButtonLogout() {
  const router = useRouter();

  function onLogout(){
    signOut({callbackUrl: '/login'})
  }
  return (
    <Button className="text-white" onClick={onLogout}><LogOut size={20}/> Logout</Button>

  )
}
