'use client'
import { useRouter } from "next/navigation"

export default function Dashboard () {
  const router = useRouter()
  router.push("/network")
}